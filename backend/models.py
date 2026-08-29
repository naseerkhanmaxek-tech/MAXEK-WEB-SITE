"""Pydantic models for the MAXEK India corporate website API."""
from datetime import datetime, timezone
from typing import List, Optional
import uuid

from pydantic import BaseModel, EmailStr, Field, field_validator


def _uuid() -> str:
    return str(uuid.uuid4())


def _now() -> datetime:
    return datetime.now(timezone.utc)


# --------------------------------------------------------------------------
# Enquiry / Contact (shared structure — used by the Business Enquiry modal
# and the Contact page form)
# --------------------------------------------------------------------------
class EnquiryCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120)
    company_name: Optional[str] = Field(default="", max_length=160)
    email: EmailStr
    phone: str = Field(..., min_length=6, max_length=32)
    business_vertical: Optional[str] = Field(default="", max_length=80)
    service_required: Optional[str] = Field(default="", max_length=160)
    project_details: Optional[str] = Field(default="", max_length=4000)
    source: Optional[str] = Field(default="business-enquiry-modal", max_length=80)

    @field_validator("full_name", "phone")
    @classmethod
    def _not_blank(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("This field is required")
        return v.strip()


class Enquiry(EnquiryCreate):
    id: str = Field(default_factory=_uuid)
    kind: str = "enquiry"
    status: str = "new"
    notified: bool = False
    created_at: datetime = Field(default_factory=_now)


class ContactCreate(EnquiryCreate):
    source: Optional[str] = Field(default="contact-page", max_length=80)


class SubmissionResponse(BaseModel):
    success: bool
    id: str
    message: str


# --------------------------------------------------------------------------
# Careers
# --------------------------------------------------------------------------
class JobApplicationCreate(BaseModel):
    job_id: str = Field(..., max_length=80)
    full_name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=6, max_length=32)
    experience_years: Optional[str] = Field(default="", max_length=40)
    current_location: Optional[str] = Field(default="", max_length=120)
    portfolio_url: Optional[str] = Field(default="", max_length=300)
    cover_note: Optional[str] = Field(default="", max_length=4000)


class JobApplication(JobApplicationCreate):
    id: str = Field(default_factory=_uuid)
    job_title: str = ""
    status: str = "received"
    created_at: datetime = Field(default_factory=_now)


class Job(BaseModel):
    id: str
    title: str
    vertical: str
    department: str
    location: str
    employment_type: str
    experience: str
    summary: str
    responsibilities: List[str] = []
    requirements: List[str] = []
    is_internship: bool = False
    posted_on: str = ""


# --------------------------------------------------------------------------
# Projects
# --------------------------------------------------------------------------
class ProjectVideo(BaseModel):
    src: str
    title: str


class Project(BaseModel):
    slug: str
    title: str
    vertical: Optional[str] = ""
    vertical_slug: Optional[str] = ""
    sector: Optional[str] = None
    type: Optional[str] = None
    industry: Optional[str] = None
    location: Optional[str] = None
    year: Optional[str] = None
    status: Optional[str] = None
    project_value: Optional[str] = None
    client: Optional[str] = None
    developed_by: Optional[str] = None
    role: Optional[str] = None
    core_purpose: Optional[str] = None
    about_platform: Optional[str] = None
    summary: Optional[str] = None
    overview: Optional[str] = None
    scope: List[str] = []
    features: List[str] = []
    who_it_serves: List[str] = []
    challenges: List[str] = []
    solutions: List[str] = []
    results: List[str] = []
    image: str
    videos: List[ProjectVideo] = []
    gallery: List[str] = []
    featured: bool = False


# --------------------------------------------------------------------------
# Knowledge Center
# --------------------------------------------------------------------------
class ArticleBlock(BaseModel):
    type: str  # heading | paragraph | list | quote
    text: Optional[str] = None
    items: List[str] = []


class Article(BaseModel):
    slug: str
    title: str
    category: str
    excerpt: str
    author: str
    published_on: str
    read_minutes: int
    image: str
    tags: List[str] = []
    body: List[ArticleBlock] = []
    related_vertical: Optional[str] = None
    related_industry: Optional[str] = None
    download_url: Optional[str] = None
