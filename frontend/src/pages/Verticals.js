import React from "react";
import { ArrowRight } from "lucide-react";
import SEO, { breadcrumbSchema } from "@/components/common/SEO";
import PageHero from "@/components/common/PageHero";
import Section, { Kicker, Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/common/Section";
import { Icon } from "@/components/common/Cards";
import Btn from "@/components/common/Btn";
import CTASection from "@/components/common/CTASection";
import { cn } from "@/lib/utils";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { STOCK } from "@/lib/images";
import { VERTICALS } from "@/lib/site";

/* Representative existing stock imagery per vertical — no new assets. */
const VERTICAL_IMAGES = {
  "maxek-infra": STOCK.factoryHall,
  "maxek-solutions": STOCK.dataCenter,
  "maxek-business-hub": STOCK.boardroomTeam,
};

const CRUMBS = [
  { label: "Home", to: "/" },
  { label: "Business Verticals", to: "/verticals" },
];

const QUICK_FACTS = [
  {
    icon: "Layers",
    title: "One accountable group",
    description:
      "Engineering, technology and business capability held inside a single organisation with one point of accountability.",
  },
  {
    icon: "GitMerge",
    title: "Verticals that work together",
    description:
      "INFRA builds the facility, SOLUTIONS digitises the operation inside it, BUSINESS HUB structures the business around both.",
  },
  {
    icon: "ShieldCheck",
    title: "Consistent governance",
    description:
      "The same quality, safety and reporting standards apply regardless of which vertical delivers the work.",
  },
  {
    icon: "Scaling",
    title: "Engage one or all",
    description:
      "Each vertical can be engaged independently — or combined into a single integrated programme.",
  },
];

export default function Verticals() {
  const { openEnquiry } = useEnquiry();

  return (
    <>
      <SEO
        title="Business Verticals | MAXEK India Integrated Engineering Group"
        description="Explore MAXEK's three specialized business verticals — MAXEK INFRA, MAXEK TECHNOLOGIES and MAXEK BUSINESS HUB — delivering engineering, technology and growth."
        path="/verticals"
        keywords="MAXEK Infra, MAXEK Technologies, MAXEK Business Hub, Integrated Engineering Group, Engineering Verticals"
        schemas={[breadcrumbSchema(CRUMBS)]}
      />

      <PageHero
        kicker="Business Verticals"
        title="Three Specialized Business Verticals"
        support="Delivering integrated solutions across engineering, technology, and business transformation."
        image={STOCK.factoryHall}
        imageAlt="Modern industrial facility representing MAXEK's engineering verticals"
        video="/assets/video/business-verticals-hero-h264.mp4"
        breadcrumbs={CRUMBS}
      >
        <Btn variant="onDark" size="lg" onClick={() => openEnquiry()} data-testid="verticals-hero-enquiry-button">
          Business Enquiry
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Btn>
      </PageHero>

      {VERTICALS.map((vertical, index) => {
        const dark = index % 2 === 0;
        const imageOnRight = index % 2 === 0;
        return (
          <Section
            key={vertical.slug}
            id={vertical.slug}
            dark={dark}
            className={index === 0 ? "pt-10 md:pt-12 lg:pt-14" : undefined}
          >
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal
                as="div"
                className={cn("lg:col-span-6", !imageOnRight && "lg:order-2")}
              >
                <span
                  className={cn(
                    "font-heading text-[3.5rem] font-semibold leading-none",
                    dark ? "text-white/15" : "text-maxek-navy/10"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className={cn("mt-4 text-display-2 text-balance", dark ? "text-white" : "text-maxek-navy")}>
                  {vertical.name}
                </h2>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-maxek-red">
                  {vertical.subtitle}
                </p>
                <p className={cn("mt-6 max-w-lg text-pretty text-[1.0625rem] leading-relaxed", dark ? "text-white/80" : "text-maxek-text")}>
                  {vertical.description}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2 max-w-lg">
                  {vertical.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "rounded-full border px-3 py-1 text-[12px]",
                        dark ? "border-white/15 text-white/80" : "border-maxek-border bg-maxek-surface text-maxek-text"
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Btn to={`/verticals/${vertical.slug}`} variant={dark ? "outlineLight" : "outlineDark"}>
                    {vertical.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Btn>
                </div>
              </Reveal>

              <Reveal
                as="div"
                delay={0.1}
                className={cn("lg:col-span-6", !imageOnRight && "lg:order-1")}
              >
                <div className={cn("relative aspect-[4/3] overflow-hidden rounded-card", dark ? "border border-white/10" : "border border-maxek-border")}>
                  <img
                    src={VERTICAL_IMAGES[vertical.slug]}
                    alt={`${vertical.name} — ${vertical.subtitle}`}
                    className="image-zoom h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </Reveal>
            </div>
          </Section>
        );
      })}

      <Section dark>
        <SectionHeader
          light
          kicker="How the group works"
          title="Specialised divisions, single accountability"
          support="The value of an integrated group is not breadth for its own sake. It is that decisions crossing engineering, technology and commercial boundaries happen in one conversation."
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {QUICK_FACTS.map((fact) => (
            <StaggerItem key={fact.title} className="h-full">
              <article className="card-surface h-full">
                <span className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-maxek-navy/5 text-maxek-red">
                  <Icon name={fact.icon} className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-maxek-navy">{fact.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-maxek-text">
                  {fact.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CTASection />
    </>
  );
}
