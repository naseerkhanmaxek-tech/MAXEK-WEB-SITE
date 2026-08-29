"""
=============================================================================
EMAIL DELIVERY PLUG-IN POINT
=============================================================================
MAXEK PRD requirement:

    "These endpoints will later be connected to an email service. The backend
     should be designed so that future submissions are delivered to
     info@maxekindia.com"

Every enquiry / contact / job application is ALWAYS persisted to MongoDB
first, so no lead can ever be lost. This module is the single, clearly-marked
integration seam for outbound email.

TO GO LIVE WITH EMAIL
---------------------
1. Add credentials to /app/backend/.env, e.g.

       SMTP_HOST=smtp.yourprovider.com
       SMTP_PORT=587
       SMTP_USER=...
       SMTP_PASSWORD=...
       MAIL_FROM=website@maxekindia.com

   ...or a transactional provider key (SendGrid / Resend / Postmark).

2. Implement the body of `_deliver()` below using that provider.

3. Nothing else in the codebase needs to change — `send_submission_email()`
   is already called (fire-and-forget, non-blocking) by /api/enquiry,
   /api/contact and /api/careers/apply.
=============================================================================
"""
import logging
import os
from typing import Dict, Any

logger = logging.getLogger("maxek.email")

# Destination mailboxes mandated by the PRD
BUSINESS_EMAIL = os.environ.get("MAXEK_BUSINESS_EMAIL", "info@maxekindia.com")
HR_EMAIL = os.environ.get("MAXEK_HR_EMAIL", "hr@maxekindia.com")

EMAIL_ENABLED = os.environ.get("EMAIL_ENABLED", "false").lower() == "true"


def _render(subject: str, payload: Dict[str, Any]) -> str:
    lines = [subject, "=" * len(subject), ""]
    for key, value in payload.items():
        if key in ("_id",):
            continue
        label = key.replace("_", " ").title()
        lines.append(f"{label}: {value}")
    return "\n".join(lines)


def _deliver(to_address: str, subject: str, body: str) -> bool:
    """
    >>> IMPLEMENT REAL EMAIL SENDING HERE <<<

    Until credentials are configured this is a no-op that logs the fully
    rendered message, so the delivery pipeline can be verified end-to-end
    without sending real mail.
    """
    if not EMAIL_ENABLED:
        logger.info(
            "[EMAIL NOT CONFIGURED] Would send to %s\n%s", to_address, body
        )
        return False

    # Example (uncomment and adapt once SMTP credentials exist):
    #
    # import smtplib
    # from email.message import EmailMessage
    # msg = EmailMessage()
    # msg["Subject"] = subject
    # msg["From"] = os.environ["MAIL_FROM"]
    # msg["To"] = to_address
    # msg.set_content(body)
    # with smtplib.SMTP(os.environ["SMTP_HOST"], int(os.environ["SMTP_PORT"])) as s:
    #     s.starttls()
    #     s.login(os.environ["SMTP_USER"], os.environ["SMTP_PASSWORD"])
    #     s.send_message(msg)
    # return True

    logger.warning("EMAIL_ENABLED=true but no provider implemented in _deliver()")
    return False


def send_submission_email(kind: str, payload: Dict[str, Any]) -> bool:
    """Notify MAXEK about a new website submission. Never raises."""
    try:
        if kind == "job_application":
            to_address = HR_EMAIL
            subject = (
                f"New career application — {payload.get('job_title') or 'MAXEK'}"
            )
        elif kind == "contact":
            to_address = BUSINESS_EMAIL
            subject = f"New contact form submission — {payload.get('full_name')}"
        else:
            to_address = BUSINESS_EMAIL
            subject = f"New business enquiry — {payload.get('full_name')}"

        return _deliver(to_address, subject, _render(subject, payload))
    except Exception:  # pragma: no cover - notification must never break the API
        logger.exception("Failed to dispatch %s notification", kind)
        return False
