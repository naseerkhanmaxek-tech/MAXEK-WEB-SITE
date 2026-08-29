import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import * as Icons from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { ADDRESS_LINES, COMPANY, LOGOS, VERTICALS } from "@/lib/site";

const QUICK_LINKS = [
  { label: "About", to: "/about" },
  { label: "Business Verticals", to: "/verticals" },
  { label: "Projects", to: "/projects" },
  { label: "Industries", to: "/industries" },
  { label: "Knowledge Center", to: "/knowledge-center" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  const { openEnquiry } = useEnquiry();
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-auto bg-maxek-ink text-white"
      data-testid="site-footer"
    >
      <div className="shell relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="md:col-span-1 lg:col-span-4">
            <Link to="/" aria-label="MAXEK India Private Limited — home" data-testid="footer-logo-link">
              <img
                src={LOGOS.light}
                alt="MAXEK India Private Limited logo"
                title="MAXEK India Private Limited"
                className="h-12 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-white/60">
              {COMPANY.summary}
            </p>

            <ul className="mt-8 flex flex-wrap items-center gap-3">
              {COMPANY.social.map((s) => {
                const Ico = s.icon === "WhatsApp" ? WhatsAppIcon : Icons[s.icon] || Icons.Link;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`MAXEK on ${s.label}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 [transition:background-color_.25s_ease,color_.25s_ease,border-color_.25s_ease] hover:border-maxek-red hover:bg-maxek-red hover:text-white"
                      data-testid={`footer-social-${s.label.toLowerCase()}-link`}
                    >
                      <Ico className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Verticals */}
          <nav className="md:col-span-1 lg:col-span-3" aria-label="Business verticals">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-maxek-red">
              Business Verticals
            </h2>
            <ul className="mt-6 space-y-4">
              {VERTICALS.map((v) => (
                <li key={v.slug}>
                  <Link
                    to={`/verticals/${v.slug}`}
                    className="group block"
                    data-testid={`footer-vertical-${v.slug}-link`}
                  >
                    <span className="block text-[0.9375rem] font-medium text-white/85 [transition:color_.2s_ease] group-hover:text-maxek-red">
                      {v.name}
                    </span>
                    <span className="mt-0.5 block text-[0.8125rem] text-white/60">
                      {v.subtitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick links */}
          <nav className="md:col-span-1 lg:col-span-2" aria-label="Quick links">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-maxek-red">
              Quick Links
            </h2>
            <ul className="mt-6 space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[0.9375rem] text-white/85 [transition:color_.2s_ease] hover:text-maxek-red"
                    data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-1 lg:col-span-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-maxek-red">
              Contact
            </h2>
            <address className="mt-6 space-y-4 text-[0.9375rem] not-italic">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-maxek-red" aria-hidden="true" />
                <span className="text-white/85">
                  {ADDRESS_LINES.slice(1).map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-3 text-white/85 [transition:color_.2s_ease] hover:text-maxek-red"
                data-testid="footer-phone-link"
              >
                <Phone className="h-4 w-4 shrink-0 text-maxek-red" aria-hidden="true" />
                {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.businessEmail}`}
                className="flex break-all items-center gap-3 text-white/85 [transition:color_.2s_ease] hover:text-maxek-red"
                data-testid="footer-business-email-link"
              >
                <Mail className="h-4 w-4 shrink-0 text-maxek-red" aria-hidden="true" />
                {COMPANY.businessEmail}
              </a>
              <a
                href={`mailto:${COMPANY.hrEmail}`}
                className="flex break-all items-center gap-3 text-white/85 [transition:color_.2s_ease] hover:text-maxek-red"
                data-testid="footer-hr-email-link"
              >
                <Mail className="h-4 w-4 shrink-0 text-maxek-red" aria-hidden="true" />
                {COMPANY.hrEmail}
                <span className="text-[0.75rem] text-white/60">(HR)</span>
              </a>
            </address>

            <button
              type="button"
              onClick={() => openEnquiry()}
              className="mt-7 inline-flex items-center gap-2 border-b border-maxek-red pb-1 text-[0.9375rem] font-medium text-white [transition:gap_.25s_ease] hover:gap-3"
              data-testid="footer-business-enquiry-button"
            >
              Business Enquiry
              <ArrowUpRight className="h-4 w-4 text-maxek-red" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-4 py-6 text-[0.8125rem] text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {COMPANY.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-6">
            <li>
              <Link
                to="/privacy-policy"
                className="[transition:color_.2s_ease] hover:text-maxek-red"
                data-testid="footer-privacy-policy-link"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-and-conditions"
                className="[transition:color_.2s_ease] hover:text-maxek-red"
                data-testid="footer-terms-link"
              >
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
