import React from "react";
import SEO from "@/components/common/SEO";
import PageHero from "@/components/common/PageHero";
import Section from "@/components/common/Section";
import { ADDRESS_LINES, COMPANY } from "@/lib/site";

const CRUMBS = [
  { label: "Home", to: "/" },
  { label: "Privacy Policy", to: "/privacy-policy" },
];

const SECTIONS = [
  {
    heading: "1. Introduction",
    body: [
      `${COMPANY.legalName} ("MAXEK", "we", "us") respects your privacy. This policy explains what personal information we collect through this website, why we collect it, how we use it, and the choices available to you.`,
      "By using this website you agree to the practices described in this policy.",
    ],
  },
  {
    heading: "2. Information we collect",
    list: [
      "Information you submit through the Business Enquiry form or Contact form: full name, company name, email address, phone number, business vertical, service required and project details.",
      "Information you submit through a career application: name, email address, phone number, experience, location, portfolio or profile link and cover note.",
      "Technical information generated automatically when you browse, such as pages viewed and general usage patterns, used only in aggregate to improve the website.",
    ],
  },
  {
    heading: "3. How we use your information",
    list: [
      "To respond to your enquiry and to provide the information or proposal you requested.",
      "To assess career applications and contact shortlisted candidates.",
      "To maintain internal records of business enquiries and communications.",
      "To improve the content, structure and performance of this website.",
    ],
  },
  {
    heading: "4. Legal basis and consent",
    body: [
      "We process the information you provide on the basis of your consent, given when you voluntarily submit a form, and on the basis of our legitimate interest in responding to business enquiries and managing recruitment.",
    ],
  },
  {
    heading: "5. Sharing of information",
    body: [
      "We do not sell, rent or trade your personal information. Information may be shared internally within MAXEK and its business verticals strictly to respond to your enquiry, and with service providers who host or operate our systems under confidentiality obligations. We may disclose information where required by applicable law.",
    ],
  },
  {
    heading: "6. Data retention",
    body: [
      "Enquiry and contact records are retained for as long as necessary to serve the business relationship and to meet our legal and record-keeping obligations. Career applications are retained so that we may contact you about suitable future roles, unless you ask us to remove them.",
    ],
  },
  {
    heading: "7. Security",
    body: [
      "We apply reasonable technical and organisational measures to protect information submitted through this website. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "8. Cookies and analytics",
    body: [
      "This website may use cookies and similar technologies for essential functionality and aggregated usage measurement. You can control cookies through your browser settings; disabling them may affect parts of the site.",
    ],
  },
  {
    heading: "9. Your rights",
    list: [
      "Request access to the personal information we hold about you.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion of your information, subject to our legal obligations.",
      "Withdraw consent to further communication at any time.",
    ],
  },
  {
    heading: "10. Third-party links",
    body: [
      "This website may link to third-party websites. We are not responsible for the privacy practices or content of those websites.",
    ],
  },
  {
    heading: "11. Changes to this policy",
    body: [
      "We may update this policy from time to time. The current version will always be published on this page.",
    ],
  },
  {
    heading: "12. Contact us",
    body: [
      `To exercise any of your rights or to raise a privacy question, contact us at ${COMPANY.businessEmail} or by telephone on ${COMPANY.phone}.`,
      ADDRESS_LINES.join(", "),
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | MAXEK India Private Limited"
        description="How MAXEK India Private Limited collects, uses, stores and protects personal information submitted through this website."
        path="/privacy-policy"
      />
      <PageHero
        kicker="Legal"
        title="Privacy Policy"
        support="How we collect, use and protect the information you share with us."
        breadcrumbs={CRUMBS}
        compact
      />
      <Section>
        <div className="max-w-reading">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-maxek-muted">
            Last updated: January 2026
          </p>
          {SECTIONS.map((section) => (
            <section key={section.heading} className="mt-12 first:mt-10">
              <h2 className="text-display-3">{section.heading}</h2>
              {section.body?.map((p) => (
                <p key={p} className="mt-5 text-[1.0625rem] leading-[1.75] text-maxek-text">
                  {p}
                </p>
              ))}
              {section.list ? (
                <ul className="mt-5 space-y-3">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[1.0625rem] leading-[1.75] text-maxek-text"
                    >
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-maxek-red" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
