# MAXEK Website — Future Enhancement Seams

The current website is **complete and final for this release**. None of the features
below are implemented. This document records the extension points that already
exist in the codebase so each one can be added later **without any structural
change**.

---

## 1. Live email delivery to info@maxekindia.com

**Seam:** `/app/backend/email_service.py` → `_deliver(to_address, subject, body)`

Already in place:
- `send_submission_email(kind, payload)` is **already called** (fire-and-forget via
  FastAPI `BackgroundTasks`) by `POST /api/enquiry`, `POST /api/contact` and
  `POST /api/careers/apply`.
- Destination mailboxes are already resolved: business enquiries and contacts →
  `MAXEK_BUSINESS_EMAIL` (default `info@maxekindia.com`); career applications →
  `MAXEK_HR_EMAIL` (default `hr@maxekindia.com`).
- `EMAIL_ENABLED` env flag already gates delivery; currently `false`, so messages
  are rendered and logged instead of sent.
- Every submission is **persisted to MongoDB before** notification is attempted,
  so no lead can be lost and notification failures can never break the API.

To go live later: add provider credentials to `/app/backend/.env`, set
`EMAIL_ENABLED=true`, and implement the body of `_deliver()`. **No other file
needs to change.**

---

## 2. Enquiry dashboard

**Seam:** read endpoints already exist and are already serialisation-safe.

- `GET /api/enquiries?limit=` — all business enquiries and contact submissions,
  newest first, with `kind` (`enquiry` / `contact`), `status`, `source` and
  `created_at`.
- `GET /api/careers/applications?limit=` — all career applications with
  `job_title` and `status`.
- `serialize_doc()` in `server.py` already converts `datetime` → ISO strings and
  strips `_id`, so records are JSON-safe for any UI.
- Records carry a `status` field (`new` / `received`) ready for triage workflows.

A future dashboard is purely additive: a new protected route in
`/app/frontend/src/pages/` consuming these endpoints, plus auth. Existing pages,
routing and the enquiry system are unaffected.

---

## 3. Real project / article / job content replacement

**Seam:** all content is database-driven, not hard-coded in components.

- Seed records live in `/app/backend/seed_data.py` and are written to MongoDB via
  **idempotent upserts** keyed on `slug` (projects, articles) and `id` (jobs) in
  `seed_content()`.
- Frontend pages fetch exclusively through `/app/frontend/src/lib/api.js`
  (`fetchProjects`, `fetchProject`, `fetchArticles`, `fetchArticle`, `fetchJobs`)
  — no page contains project, article or job copy.
- Article bodies use a **block schema** (`heading` / `paragraph` / `list` /
  `quote`) in `models.py`, so richer real content renders without touching
  `ArticleDetail.js`.
- Company identity, verticals, services, industries, FAQs and all fixed PRD copy
  live in one place: `/app/frontend/src/lib/site.js`.
- Image paths are centralised in `/app/frontend/src/lib/images.js`, so stock
  photography can be swapped for official MAXEK photography by editing that one
  file. Official assets are referenced under `/assets/...` and are never modified.

Replacing content later means editing `seed_data.py` (or writing directly to the
`projects` / `articles` / `jobs` collections). **No component changes required.**

> Note: leadership profiles on `/about` intentionally render role + focus with a
> "Profile coming soon" label, driven by `LEADERSHIP` in `site.js` — real names
> and photographs can be added there.

---

## 4. Brochure download

**Seam:** the `Article` model already carries an optional `download_url`.

- `models.py` → `Article.download_url`.
- The `maxek-corporate-profile-download` record (category `Downloads`) already
  uses it, and `ArticleDetail.js` already branches on it to render a request
  block.
- The Knowledge Center already has a working `Downloads` category filter.
- `/about` already links to the corporate profile record via its
  **Download Brochure** button.

To enable a real file later: upload the PDF, set `download_url` to its URL on the
record, and change that one branch in `ArticleDetail.js` from "request" to a
direct download link. Routing, filters and navigation stay as they are.

---

## Structural guarantees relied on by all four

- Every backend route is under the `/api` prefix (Kubernetes ingress requirement).
- Backend reads `MONGO_URL` / `DB_NAME` from the environment; the frontend reads
  `REACT_APP_BACKEND_URL`. No URLs, database names or secrets are hard-coded.
- Reusable primitives (`Section`, `SectionHeader`, `Reveal`, `Btn`, `PageHero`,
  `CTASection`, card components, `EnquiryForm`, `SEO`) mean new pages inherit the
  design system automatically.
- `EnquiryForm` is a single component shared by the header modal and the Contact
  page, so any future change to enquiry handling applies in both places at once.
- `SEO.js` exposes composable JSON-LD builders, so new pages and content types can
  add structured data without duplicating markup.
