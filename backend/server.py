"""
MAXEK India Private Limited — Corporate Website API
====================================================
FastAPI + MongoDB backend serving:
  * Business Enquiry / Contact submissions (persisted, email plug-in point)
  * Career applications
  * Project, Knowledge Center and Job content (seeded, CMS-ready)
"""
import logging
import os
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, BackgroundTasks, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

from email_service import send_submission_email  # noqa: E402
from models import (  # noqa: E402
    Article,
    ContactCreate,
    Enquiry,
    EnquiryCreate,
    Job,
    JobApplication,
    JobApplicationCreate,
    Project,
    SubmissionResponse,
)
from seed_data import ARTICLES, JOBS, PROJECTS  # noqa: E402

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("maxek.api")

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ.get("DB_NAME", "maxek_website")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

SUCCESS_MESSAGE = (
    "Thank you! Your enquiry has been submitted successfully. "
    "Our team will contact you shortly."
)


# --------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------
def serialize_doc(doc: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    """Make a Mongo document JSON-safe (drops _id, converts datetimes)."""
    if doc is None:
        return None
    out: Dict[str, Any] = {}
    for key, value in doc.items():
        if key == "_id":
            continue
        if isinstance(value, datetime):
            out[key] = value.astimezone(timezone.utc).isoformat()
        elif isinstance(value, dict):
            out[key] = serialize_doc(value)
        elif isinstance(value, list):
            out[key] = [
                serialize_doc(v)
                if isinstance(v, dict)
                else (v.isoformat() if isinstance(v, datetime) else v)
                for v in value
            ]
        else:
            out[key] = value
    return out


async def seed_content() -> None:
    """Idempotently seed content collections and ensure indexes."""
    await db.projects.create_index("slug", unique=True)
    await db.articles.create_index("slug", unique=True)
    await db.jobs.create_index("id", unique=True)
    await db.enquiries.create_index("created_at")
    await db.job_applications.create_index("created_at")

    # Clear projects collection to ensure exact counts from seed_data
    await db.projects.delete_many({})

    for project in PROJECTS:
        await db.projects.update_one(
            {"slug": project["slug"]}, {"$set": project}, upsert=True
        )
    for article in ARTICLES:
        await db.articles.update_one(
            {"slug": article["slug"]}, {"$set": article}, upsert=True
        )
    for job in JOBS:
        await db.jobs.update_one({"id": job["id"]}, {"$set": job}, upsert=True)

    logger.info(
        "Seeded content: %s projects, %s articles, %s jobs",
        len(PROJECTS),
        len(ARTICLES),
        len(JOBS),
    )


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await seed_content()
    except Exception:
        logger.exception("Content seeding failed")
    yield
    client.close()


app = FastAPI(
    title="MAXEK India Private Limited — Website API",
    description="Integrated Engineering Group corporate website backend.",
    version="1.0.0",
    lifespan=lifespan,
)

api = APIRouter(prefix="/api")


# --------------------------------------------------------------------------
# Health
# --------------------------------------------------------------------------
@api.get("/")
async def root():
    return {"service": "MAXEK India Website API", "status": "ok"}


@api.get("/health")
async def health():
    try:
        await client.admin.command("ping")
        return {"status": "healthy", "database": "connected"}
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=503, detail=f"Database unavailable: {exc}")


# --------------------------------------------------------------------------
# Enquiry / Contact  (shared structure per PRD)
# --------------------------------------------------------------------------
async def _store_submission(
    payload: EnquiryCreate, kind: str, background: BackgroundTasks
) -> SubmissionResponse:
    record = Enquiry(**payload.model_dump())
    record.kind = kind
    doc = record.model_dump()
    await db.enquiries.insert_one(dict(doc))
    logger.info("Stored %s submission %s from %s", kind, record.id, record.email)

    # Email delivery plug-in point (see backend/email_service.py)
    background.add_task(send_submission_email, kind, serialize_doc(doc))

    return SubmissionResponse(success=True, id=record.id, message=SUCCESS_MESSAGE)


@api.post("/enquiry", response_model=SubmissionResponse, status_code=201)
async def create_enquiry(payload: EnquiryCreate, background: BackgroundTasks):
    """Business Enquiry modal submissions."""
    return await _store_submission(payload, "enquiry", background)


@api.post("/contact", response_model=SubmissionResponse, status_code=201)
async def create_contact(payload: ContactCreate, background: BackgroundTasks):
    """Contact page form submissions (same structure as the enquiry modal)."""
    return await _store_submission(payload, "contact", background)


@api.get("/enquiries")
async def list_enquiries(limit: int = Query(default=50, ge=1, le=200)):
    """Internal listing of received submissions (newest first)."""
    cursor = db.enquiries.find().sort("created_at", -1).limit(limit)
    items = [serialize_doc(doc) async for doc in cursor]
    total = await db.enquiries.count_documents({})
    return {"total": total, "items": items}


# --------------------------------------------------------------------------
# Projects
# --------------------------------------------------------------------------
@api.get("/projects", response_model=List[Project])
async def list_projects(
    vertical: Optional[str] = Query(default=None, description="Vertical slug filter"),
    featured: Optional[bool] = None,
):
    query: Dict[str, Any] = {}
    if vertical and vertical not in ("all", ""):
        query["vertical_slug"] = vertical
    if featured is not None:
        query["featured"] = featured
    cursor = db.projects.find(query)
    return [Project(**serialize_doc(doc)) async for doc in cursor]


@api.get("/projects/{slug}", response_model=Project)
async def get_project(slug: str):
    doc = await db.projects.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Project not found")
    return Project(**serialize_doc(doc))


# --------------------------------------------------------------------------
# Knowledge Center
# --------------------------------------------------------------------------
@api.get("/articles", response_model=List[Article])
async def list_articles(category: Optional[str] = None):
    query: Dict[str, Any] = {}
    if category and category not in ("all", "All", ""):
        query["category"] = category
    cursor = db.articles.find(query).sort("published_on", -1)
    return [Article(**serialize_doc(doc)) async for doc in cursor]


@api.get("/articles/{slug}", response_model=Article)
async def get_article(slug: str):
    doc = await db.articles.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Article not found")
    return Article(**serialize_doc(doc))


# --------------------------------------------------------------------------
# Careers
# --------------------------------------------------------------------------
@api.get("/jobs", response_model=List[Job])
async def list_jobs(internship: Optional[bool] = None):
    query: Dict[str, Any] = {}
    if internship is not None:
        query["is_internship"] = internship
    cursor = db.jobs.find(query)
    return [Job(**serialize_doc(doc)) async for doc in cursor]


@api.get("/jobs/{job_id}", response_model=Job)
async def get_job(job_id: str):
    doc = await db.jobs.find_one({"id": job_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Job not found")
    return Job(**serialize_doc(doc))


@api.post("/careers/apply", response_model=SubmissionResponse, status_code=201)
async def apply_for_job(payload: JobApplicationCreate, background: BackgroundTasks):
    job = await db.jobs.find_one({"id": payload.job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    record = JobApplication(**payload.model_dump())
    record.job_title = job.get("title", "")
    doc = record.model_dump()
    await db.job_applications.insert_one(dict(doc))
    logger.info("Stored application %s for %s", record.id, record.job_title)

    background.add_task(send_submission_email, "job_application", serialize_doc(doc))

    return SubmissionResponse(
        success=True,
        id=record.id,
        message=(
            "Thank you! Your application has been submitted successfully. "
            "Our team will contact you shortly."
        ),
    )


@api.get("/careers/applications")
async def list_applications(limit: int = Query(default=50, ge=1, le=200)):
    cursor = db.job_applications.find().sort("created_at", -1).limit(limit)
    items = [serialize_doc(doc) async for doc in cursor]
    total = await db.job_applications.count_documents({})
    return {"total": total, "items": items}


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
