import React from "react";
import { ArrowRight } from "lucide-react";
import SEO, { breadcrumbSchema } from "@/components/common/SEO";
import PageHero from "@/components/common/PageHero";
import Section, { SectionHeader, Stagger, StaggerItem } from "@/components/common/Section";
import { Icon } from "@/components/common/Cards";
import Btn from "@/components/common/Btn";
import CTASection from "@/components/common/CTASection";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { INDUSTRIES, VERTICALS } from "@/lib/site";
import { INDUSTRY_IMAGES, OFFICIAL } from "@/lib/images";

const CRUMBS = [
  { label: "Home", to: "/" },
  { label: "Industries", to: "/industries" },
];

export default function Industries() {
  const { openEnquiry } = useEnquiry();

  return (
    <>
      <SEO
        title="Industries We Serve | MAXEK India Engineering Solutions"
        description="MAXEK delivers engineering, technology and business growth solutions across manufacturing, infrastructure, industrial, commercial, energy, technology and more."
        path="/industries"
        keywords="Manufacturing Industry, Infrastructure, Commercial Construction, Industrial Plants, Healthcare, Education, Government, Technology, Energy, Logistics"
        schemas={[breadcrumbSchema(CRUMBS)]}
      />

      <PageHero
        kicker="Industries"
        title="Industries We Serve"
        support="Providing innovative engineering and business solutions across multiple industries."
        image={OFFICIAL.industriesHero}
        imageAlt="Isometric composition of MAXEK's industrial, infrastructure, and technology sectors"
        overlay="left"
        breadcrumbs={CRUMBS}
      >
        <Btn variant="onDark" size="lg" onClick={() => openEnquiry()} data-testid="industries-hero-enquiry-button">
          Business Enquiry
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Btn>
      </PageHero>

      <Section>
        <SectionHeader
          kicker="Industries"
          title="Industries we serve"
          support={`${INDUSTRIES.length} sectors where engineering rigour, digital capability and business structure are engaged — individually or together.`}
          align="split"
          className="mb-14 md:mb-16"
        />
        <Stagger className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, index) => (
            <StaggerItem key={industry.name} className="h-full">
              <article
                className="group flex h-full flex-col"
                data-testid={`industry-card-${industry.name.toLowerCase()}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-maxek-navy">
                  <img
                    src={INDUSTRY_IMAGES[industry.name]}
                    alt={`${industry.name} sector engineering and technology solutions by MAXEK`}
                    title={industry.name}
                    className="image-zoom h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute left-5 top-5 font-mono text-[11px] tracking-[0.2em] text-white/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-maxek-red shadow-sm">
                    <Icon name={industry.icon} className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col pt-6">
                  <h2 className="text-display-3 text-maxek-navy">{industry.name}</h2>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-maxek-text">
                    {industry.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => openEnquiry({ service_required: "Other", project_details: `Enquiry relating to the ${industry.name} sector.` })}
                    className="link-underline mt-5 self-start text-sm text-maxek-navy"
                    data-testid={`industry-${industry.name.toLowerCase()}-enquire-button`}
                  >
                    Discuss this sector
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section dark>
        <SectionHeader
          light
          kicker="Capability"
          title="One group, three ways to help"
          support="Whichever sector you operate in, the same three verticals are available to you — individually or combined."
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
          {VERTICALS.map((v) => (
            <StaggerItem key={v.slug} className="h-full">
              <article className="card-surface flex h-full flex-col">
                <h3 className="text-[1.0625rem] font-semibold text-maxek-navy">{v.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-maxek-red">
                  {v.subtitle}
                </p>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-maxek-text">
                  {v.description}
                </p>
                <Btn to={`/verticals/${v.slug}`} variant="outlineDark" size="sm" className="mt-6 self-start">
                  {v.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Btn>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CTASection />
    </>
  );
}
