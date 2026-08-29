import React from "react";
import SEO from "@/components/common/SEO";
import PageHero from "@/components/common/PageHero";
import Section from "@/components/common/Section";
import { ADDRESS_LINES, COMPANY } from "@/lib/site";

const CRUMBS = [
  { label: "Home", to: "/" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
];

const SECTIONS = [
  {
    heading: "1. Acceptance of terms",
    body: [
      `These terms govern your use of the website operated by ${COMPANY.legalName} ("MAXEK"). By accessing or using this website you accept these terms in full. If you do not accept them, please do not use the site.`,
    ],
  },
  {
    heading: "2. Information on this website",
    body: [
      "Content on this website is provided for general information about MAXEK, its business verticals and its capabilities. It does not constitute a technical recommendation, engineering advice, or a contractual offer.",
      "Project descriptions, case studies and figures are indicative and are published for illustration. Any engagement is governed solely by the executed contract between MAXEK and the client.",
    ],
  },
  {
    heading: "3. Intellectual property",
    body: [
      "All content on this website — including text, layout, graphics, photographs, logos, product names and software — is owned by or licensed to MAXEK and is protected by applicable intellectual property law.",
      "MAXEK, MAXEK INFRA, MAXEK TECHNOLOGIES, MAXEK BUSINESS HUB, MAXEK EDU, SmartQTO and the named solution marks are marks of MAXEK. You may not reproduce, modify, distribute or otherwise use them without our prior written consent.",
    ],
  },
  {
    heading: "4. Permitted use",
    list: [
      "You may view, download and print pages from this website for your own internal business evaluation.",
      "You may not republish, sell, rent, sub-licence or commercially exploit material from this website.",
      "You may not use this website in any way that damages it, impairs its availability, or is unlawful or fraudulent.",
      "You may not use automated systems to extract data from this website without our written consent.",
    ],
  },
  {
    heading: "5. Submissions",
    body: [
      "By submitting an enquiry, contact form or career application you confirm that the information provided is accurate and that you are entitled to share it. Submissions are handled in accordance with our Privacy Policy.",
      "Please do not submit confidential technical or commercial information through this website. Confidential material should be exchanged under an appropriate agreement.",
    ],
  },
  {
    heading: "6. Third-party links",
    body: [
      "This website may contain links to third-party websites. Such links are provided for convenience only, and we accept no responsibility for the content, accuracy or availability of those websites.",
    ],
  },
  {
    heading: "7. Limitation of liability",
    body: [
      "To the maximum extent permitted by law, MAXEK excludes liability for any indirect or consequential loss arising from the use of, or inability to use, this website or reliance on its content. Nothing in these terms excludes liability that cannot lawfully be excluded.",
    ],
  },
  {
    heading: "8. Availability",
    body: [
      "We aim to keep this website available and accurate but do not warrant uninterrupted availability. We may modify, suspend or withdraw any part of the website without notice.",
    ],
  },
  {
    heading: "9. Governing law",
    body: [
      "These terms are governed by the laws of India. The courts at Thiruvananthapuram, Kerala shall have exclusive jurisdiction over any dispute arising in connection with this website.",
    ],
  },
  {
    heading: "10. Contact",
    body: [
      `Questions about these terms may be sent to ${COMPANY.businessEmail} or telephoned to ${COMPANY.phone}.`,
      ADDRESS_LINES.join(", "),
    ],
  },
];

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms & Conditions | MAXEK India Private Limited"
        description="The terms governing use of the MAXEK India Private Limited website, including intellectual property, permitted use and limitation of liability."
        path="/terms-and-conditions"
      />
      <PageHero
        kicker="Legal"
        title="Terms & Conditions"
        support="The terms that govern your use of this website."
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
