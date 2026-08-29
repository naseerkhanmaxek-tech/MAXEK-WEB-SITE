import React from "react";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import SEO, { breadcrumbSchema, localBusinessSchema } from "@/components/common/SEO";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import PageHero from "@/components/common/PageHero";
import Section, { Kicker, Reveal } from "@/components/common/Section";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import { ADDRESS_LINES, COMPANY } from "@/lib/site";
import { STOCK } from "@/lib/images";

const CRUMBS = [
  { label: "Home", to: "/" },
  { label: "Contact", to: "/contact" },
];

const MAP_QUERY = encodeURIComponent(
  "Singapore Plaza, Pattom Palace, Thiruvananthapuram, Kerala 695004, India"
);

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact MAXEK India Private Limited"
        description="Connect with MAXEK India Private Limited for engineering, technology, and business solutions. Call +91 9666822000 or email info@maxekindia.com."
        path="/contact"
        keywords="Engineering Consultation, Business Enquiry, Engineering Partner, Contact MAXEK, Industrial Solutions, Engineering Company Thiruvananthapuram"
        schemas={[localBusinessSchema, breadcrumbSchema(CRUMBS)]}
      />

      <PageHero
        kicker="Contact"
        title="Let’s Build Something Great Together"
        support="Whether you’re planning a new project or seeking a trusted engineering partner, we’re ready to help."
        image={STOCK.glassOffice}
        imageAlt="MAXEK India corporate office building"
        breadcrumbs={CRUMBS}
        compact
      />

      <Section id="contact-info">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Company information */}
          <Reveal className="lg:col-span-5">
            <Kicker className="mb-7">Our Office</Kicker>
            <h2 className="text-display-3 text-maxek-navy">{COMPANY.legalName}</h2>

            <address className="mt-8 space-y-7 not-italic">
              <div className="flex gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-maxek-navy/5 text-maxek-red">
                  <MapPin className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-maxek-muted">
                    Registered Office
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-maxek-text">
                    {ADDRESS_LINES.slice(1).map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-maxek-navy/5 text-maxek-red">
                  <Phone className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-maxek-muted">
                    Phone
                  </p>
                  <a
                    href={COMPANY.phoneHref}
                    className="link-underline mt-2 block text-[0.9375rem] text-maxek-text"
                    data-testid="contact-phone-link"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-maxek-navy/5 text-maxek-red">
                  <Mail className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-maxek-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${COMPANY.businessEmail}`}
                    className="link-underline mt-2 block text-[0.9375rem] text-maxek-text"
                    data-testid="contact-business-email-link"
                  >
                    {COMPANY.businessEmail}
                    <span className="ml-2 text-[0.75rem] text-maxek-muted">Business</span>
                  </a>
                  <a
                    href={`mailto:${COMPANY.hrEmail}`}
                    className="link-underline mt-2 block text-[0.9375rem] text-maxek-text"
                    data-testid="contact-hr-email-link"
                  >
                    {COMPANY.hrEmail}
                    <span className="ml-2 text-[0.75rem] text-maxek-muted">HR</span>
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-maxek-navy/5 text-maxek-red">
                  <Clock className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-maxek-muted">
                    Office Hours
                  </p>
                  <p className="mt-2 text-[0.9375rem] text-maxek-text">
                    Monday – Saturday, 9:00 – 18:00 IST
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-maxek-navy/5 text-maxek-red">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-maxek-muted">
                    WhatsApp
                  </p>
                  <a
                    href={COMPANY.whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline mt-2 block text-[0.9375rem] text-maxek-text"
                    data-testid="contact-whatsapp-link"
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-maxek-navy/5 text-maxek-red">
                  <Instagram className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-maxek-muted">
                    Social Media
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                    <a
                      href="https://www.facebook.com/profile.php?id=61586026727151"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline inline-flex items-center gap-2 text-[0.9375rem] text-maxek-text"
                      data-testid="contact-facebook-link"
                    >
                      <Facebook className="h-4 w-4" aria-hidden="true" />
                      Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/maxekindia/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline inline-flex items-center gap-2 text-[0.9375rem] text-maxek-text"
                      data-testid="contact-instagram-link"
                    >
                      <Instagram className="h-4 w-4" aria-hidden="true" />
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </address>
          </Reveal>

          {/* Reusable enquiry form */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="rounded-card border border-maxek-border bg-maxek-surface p-7 shadow-card lg:p-9">
              <p className="kicker">Send an enquiry</p>
              <h2 className="mt-3 text-display-3 text-maxek-navy">Tell us about your requirement</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-maxek-text">
                We respond to every enquiry. Required fields are marked with an
                asterisk.
              </p>
              <div className="mt-8">
                <EnquiryForm variant="contact" idPrefix="contact" dark={false} />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Google Maps placeholder */}
      <Section dark id="location">
        <Kicker light className="mb-7">Location</Kicker>
        <h2 className="text-display-2 text-balance text-white">Find us in Thiruvananthapuram</h2>
        <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/80">
          Our registered office is at Singapore Plaza, Pattom Palace,
          Thiruvananthapuram. Please contact us before visiting so we can arrange
          a meeting with the right team.
        </p>

        <figure
          className="mt-10 overflow-hidden rounded-card border border-white/10 bg-maxek-navy shadow-card"
          data-testid="contact-map-placeholder"
        >
          <div className="aspect-[16/9] w-full bg-white/5">
            <iframe
              title="MAXEK India Private Limited office location map"
              src={`https://maps.google.com/maps?q=${MAP_QUERY}&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4 text-[0.8125rem] text-white/50">
            <span>
              Singapore Plaza, Pattom Palace, Thiruvananthapuram, Kerala – 695004
            </span>
            <a
              href={`https://maps.google.com/?q=${MAP_QUERY}`}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline"
              data-testid="contact-open-in-maps-link"
            >
              Open in Google Maps
            </a>
          </figcaption>
        </figure>
      </Section>
    </>
  );
}
