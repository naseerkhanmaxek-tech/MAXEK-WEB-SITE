// src/pages/Home.js
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Globe2, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import SEO, {
  imageObjectSchema,
  localBusinessSchema,
  videoSchema,
} from "@/components/common/SEO";
import DatumHero from "@/components/home/DatumHero";
import Section, {
  Kicker,
  Reveal,
  SectionHeader,
  Stagger,
  StaggerItem,
} from "@/components/common/Section";
import {
  Icon,
  ProjectCard,
  StatBlock,
} from "@/components/common/Cards";
import Btn from "@/components/common/Btn";
import CTASection from "@/components/common/CTASection";
import { fetchArticles, fetchProjects } from "@/lib/api";
import { STOCK, OFFICIAL } from "@/lib/images";
import {
  APPROACH_STEPS,
  GLOBAL_CAPABILITIES,
  INDUSTRIES,
  VERTICALS,
  WHY_MAXEK,
} from "@/lib/site";

/** Editorial row for the navy "Three Verticals. One MAXEK." section — deliberately
 * NOT a card grid, per the brief's direction. Large index numeral + typographic
 * hierarchy, divided like an index/list rather than boxed. */
const VerticalRow = ({ vertical, index }) => (
  <Link
    to={`/verticals/${vertical.slug}`}
    className="group grid grid-cols-1 gap-6 border-t border-maxek-border py-10 transition-colors duration-500 ease-premium hover:bg-maxek-surface focus-visible:bg-maxek-surface focus-visible:outline-none md:grid-cols-12 md:items-center md:gap-8 md:py-12 lg:py-14"
    data-testid={`home-vertical-row-${vertical.slug}`}
  >
    <span
      className="font-heading text-[3.5rem] font-semibold leading-none text-maxek-navy/10 transition-colors duration-500 ease-premium group-hover:text-maxek-red/40 md:col-span-2 md:text-[4.5rem]"
      aria-hidden="true"
    >
      {String(index + 1).padStart(2, "0")}
    </span>

    <div className="md:col-span-7">
      <h3 className="text-display-2 text-balance text-maxek-navy">{vertical.name}</h3>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-maxek-red">
        {vertical.subtitle}
      </p>
      <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-maxek-text">
        {vertical.description}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {vertical.items.slice(0, 3).map((item) => (
          <li
            key={item}
            className="rounded-full border border-maxek-border px-3 py-1 text-[12px] text-maxek-text"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>

    <div className="flex items-center gap-2 text-sm font-medium text-maxek-navy/80 transition-colors duration-300 ease-premium group-hover:text-maxek-navy md:col-span-3 md:justify-end">
      {vertical.cta}
      <ArrowRight
        className="h-4 w-4 text-maxek-red transition-transform duration-300 ease-premium group-hover:translate-x-1.5"
        aria-hidden="true"
      />
    </div>
  </Link>
);


/**
 * Guaranteed-visible fallback so the featured slot never renders blank.
 * Unchanged from the last approved revision.
 */
const FALLBACK_INSIGHT = {
  slug: null,
  image: STOCK.blueprints,
  title: "Where Engineering Meets Smarter Execution",
  category: "Engineering",
  read_minutes: 5,
};

/**
 * Editorial topic list — fills the lower-left column functionally.
 * Unchanged from the last approved revision.
 */
const KNOWLEDGE_TOPICS = ["Engineering", "Construction", "Technology", "Project Management"];

export default function Home() {
  const statsRef = useRef(null);
  const shouldAnimateStats = useInView(statsRef, { once: true, amount: 0.35 });

  const { data: projects = [] } = useQuery({
    queryKey: ["projects", "all"],
    queryFn: () => fetchProjects(),
  });
  const { data: articles = [] } = useQuery({
    queryKey: ["articles", "All"],
    queryFn: () => fetchArticles(),
  });

  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const displayArticle = articles[0] ?? FALLBACK_INSIGHT;
  const isFallback = displayArticle.slug === null;
  const insightHref = displayArticle.slug
    ? `/knowledge-center/${displayArticle.slug}`
    : "/knowledge-center";
  const insightMeta = displayArticle.read_minutes
    ? `${displayArticle.category} • ${displayArticle.read_minutes} min read`
    : displayArticle.category;

  return (
    <>
      <SEO
        title="MAXEK India Private Limited | Integrated Engineering Group"
        description="MAXEK India Private Limited is an Integrated Engineering Group delivering engineering execution, technology solutions, and business growth services."
        path="/"
        keywords="Integrated Engineering Group, Engineering Company India, Engineering Company Kerala, Industrial Construction, Digital Engineering, ERP Solutions, AI Solutions, Business Growth"
        schemas={[
          localBusinessSchema,
          videoSchema,
          ...(featured.length ? [imageObjectSchema(featured)] : []),
        ]}
      />

      <DatumHero />

      {/* ---------------- About MAXEK ---------------- */}
      <Section id="about-maxek" data-testid="about-section" className="relative z-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Kicker className="mb-7">About MAXEK</Kicker>
            <h2 className="text-display-2 text-balance leading-tight text-maxek-navy">
              <span className="block font-medium text-maxek-muted text-[1.125rem] leading-snug md:text-xl lg:text-2xl mb-2 lg:mb-3">
                Building the Future Through
              </span>
              Engineering, Technology &amp; Business Excellence
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="text-lg leading-relaxed text-maxek-text text-pretty">
              MAXEK India Private Limited is an <span className="font-semibold text-maxek-navy">Integrated Engineering Group</span>
              delivering engineering execution, digital transformation, and
              strategic business growth solutions. Through our specialized
              business verticals, we help organizations improve efficiency,
              accelerate innovation, and achieve sustainable growth.
            </p>

            <div
              ref={statsRef}
              className="mt-12 w-full grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-maxek-border border-y border-white/10"
            >
              <div className="bg-maxek-navy py-6 pl-2 pr-4 sm:pr-6 lg:py-8 lg:pr-8">
                <StatBlock
                  animated
                  value={0}
                  target={30}
                  prefix="₹"
                  suffix=" CR"
                  label="Ongoing projects"
                  formatValue={(nextValue) => `${nextValue}+`}
                  shouldAnimate={shouldAnimateStats}
                />
              </div>
              <div className="bg-maxek-navy py-6 pl-5 sm:pl-7 pr-0 lg:px-8 lg:py-8">
                <StatBlock
                  animated
                  value={0}
                  target={3}
                  label="Business verticals"
                  formatValue={(nextValue) => String(nextValue).padStart(2, "0")}
                  shouldAnimate={shouldAnimateStats}
                />
              </div>
              <div className="bg-maxek-navy py-6 pr-4 sm:pr-6 pl-0 lg:px-8 lg:py-8">
                <StatBlock
                  animated
                  value={0}
                  target={INDUSTRIES.length}
                  label="Industries served"
                  formatValue={(nextValue) => String(nextValue).padStart(2, "0")}
                  shouldAnimate={shouldAnimateStats}
                />
              </div>
              <div className="bg-maxek-navy py-6 pl-5 sm:pl-7 pr-0 lg:py-8 lg:pl-8">
                <StatBlock
                  animated
                  value={0}
                  target={2}
                  label="Countries of operation"
                  formatValue={(nextValue) => String(nextValue).padStart(2, "0")}
                  shouldAnimate={shouldAnimateStats}
                />
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Btn to="/about" variant="primary" className="border border-maxek-border" data-testid="about-learn-more-button">
                Learn More
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Btn>
              <Btn to="/verticals" variant="outlineDark">
                View Business Verticals
              </Btn>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Business Verticals ---------------- */}
      {/* Moved directly after "About MAXEK" — per the brief, this is the highest-
          emphasis section on the page and should land right after the introduction,
          not several sections later. A connective spine + closing statement panel
          reinforce "one ecosystem, three capabilities" rather than three independent
          rows that happen to be stacked. */}
      <Section
        id="business-verticals"
        data-testid="business-verticals-section"
        className="-mt-20 md:-mt-24 lg:-mt-28"
      >
        <SectionHeader
          kicker="Business Verticals"
          title="Three verticals. One MAXEK."
          support="Engineering, technology and business capability held inside a single integrated group — not stitched together from separate suppliers."
        />
        <div className="relative mt-6">
          <div
            className="pointer-events-none absolute left-0 top-3 hidden h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-maxek-red via-maxek-border to-maxek-border md:block"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -left-[3px] top-3 hidden h-[7px] w-[7px] rounded-full bg-maxek-red md:block"
            aria-hidden="true"
          />
          <Stagger className="md:pl-9">
            {VERTICALS.map((vertical, i) => (
              <StaggerItem key={vertical.slug}>
                <VerticalRow vertical={vertical} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.15} className="border-t border-maxek-border py-10 md:py-12 md:pl-9">
            <p className="max-w-2xl text-lg font-medium leading-relaxed text-maxek-navy text-balance">
              Three capabilities. <span className="text-maxek-red">One accountable delivery.</span>{" "}
              <span className="font-normal text-maxek-text">
                Engage one vertical or all three — the same governance, quality standards and single
                point of accountability apply either way.
              </span>
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Why MAXEK ---------------- */}
      {/* Editorial capability index — deliberately NOT a card grid. Large muted
          numerals, thin horizontal rules and a red accent line on hover read as
          one connected system rather than six independent boxes. */}
      <Section dark data-testid="why-maxek-section">
        <SectionHeader
          light
          kicker="Why MAXEK"
          title="Why Organizations Choose MAXEK"
          support="An integrated group structure means engineering, technology and business capability arrive together — not stitched together from separate suppliers."
        />
        <Stagger className="mt-4 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-16">
          {WHY_MAXEK.map((card, idx) => (
            <StaggerItem
              key={card.title}
              className={cn(
                "border-t border-white/10 first:border-t-0 sm:[&:nth-child(2)]:border-t-0",
                idx % 2 === 0 ? "sm:pr-8" : "sm:pl-8 sm:border-l sm:border-white/10"
              )}
            >
              <div
                className="group relative flex items-start gap-5 py-8 lg:gap-6 lg:py-9"
                data-testid={`why-maxek-item-${idx}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-px top-0 h-full w-[2px] origin-top scale-y-0 bg-maxek-red transition-transform duration-500 ease-premium group-hover:scale-y-100"
                />
                <span className="shrink-0 font-heading text-[2.5rem] leading-none text-white/15 transition-colors duration-500 ease-premium group-hover:text-maxek-red lg:text-[3rem]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 pt-1">
                  <h3 className="text-xl font-semibold leading-tight text-white transition-transform duration-500 ease-premium lg:text-[1.375rem] md:[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1.5">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-white/60 transition-colors duration-500 ease-premium group-hover:text-white/85">
                    {card.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ---------------- Engineering Approach ---------------- */}
      <section className="grain relative isolate overflow-hidden bg-maxek-ink" data-testid="approach-section">
        <img
          src={STOCK.blueprints}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
          loading="lazy"
        />
        <div className="shell relative py-20 md:py-24 lg:py-28">
          <SectionHeader
            light
            kicker="Our Approach"
            title="Our Engineering Approach"
            support="Every project is delivered through a structured process focused on quality, efficiency, safety, and continuous improvement."
          />

          <Stagger className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-card border border-white/10 bg-white/10">
            {APPROACH_STEPS.map((step, i) => (
              <StaggerItem key={step.name} className="h-full">
                <div className="group relative flex h-full flex-col bg-maxek-ink p-8 transition-colors duration-500 hover:bg-white/5 lg:p-10">
                  <span className="font-mono text-[0.875rem] font-medium tracking-widest text-maxek-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                      {step.name}
                    </h3>
                    {i < 5 && (
                      <ArrowRight
                        className={cn(
                          "h-5 w-5 text-white/15 transition-colors duration-500 group-hover:text-maxek-red rotate-90 sm:rotate-0",
                          (i === 1 || i === 3) && "sm:hidden lg:block",
                          i === 2 && "lg:hidden"
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/60 transition-colors duration-500 group-hover:text-white/80">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------- Industries ---------------- */}
      <Section data-testid="industries-section">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <Kicker className="mb-7">Industries</Kicker>
              <h2 className="text-display-2 text-balance">Industries We Serve</h2>
              <p className="mt-6 text-lg leading-relaxed text-maxek-text">
                Providing innovative engineering and business solutions across
                multiple industries.
              </p>
              <Btn to="/industries" variant="outlineDark" className="mt-9" data-testid="explore-industries-button">
                Explore All Industries
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Btn>
            </Reveal>

            <Stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-maxek-border bg-maxek-border min-[400px]:grid-cols-2 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
              {INDUSTRIES.map((industry) => (
                <StaggerItem key={industry.name} className="h-full">
                  <div
                    className="group relative flex h-full min-h-[116px] flex-col justify-center gap-3 bg-white p-6 transition-colors duration-300 ease-premium hover:bg-maxek-surface"
                    data-testid={`industry-tile-${industry.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Icon
                      name={industry.icon}
                      className="h-6 w-6 text-maxek-red transition-colors duration-300 ease-premium"
                    />
                    <span className="text-[0.9375rem] font-medium text-maxek-navy transition-colors duration-300 ease-premium group-hover:text-maxek-navy">
                      {industry.name}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Section>

      {/* ---------------- Project Portfolio ---------------- */}
      <Section dark data-testid="project-portfolio-section">
        <SectionHeader
          light
          kicker="Project Portfolio"
          title={
            <>
              Projects Across Engineering,{" "}
              <br className="hidden md:block" />
              Technology & Business
            </>
          }
          support="Explore MAXEK's project portfolio across engineering, technology, and business transformation."
        />
        <Stagger className="mt-14 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((project, i) => (
            <StaggerItem key={project.slug} className={cn("h-full", i === 2 && "md:col-span-2 lg:col-span-1")}>
              <ProjectCard project={project} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 flex justify-end">
          <Btn to="/projects" variant="primary" data-testid="view-all-projects-button">
            View All Projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Btn>
        </div>
      </Section>

      {/* ---------------- Global Presence ---------------- */}
      <Section data-testid="global-presence-section" className="overflow-hidden">
        <Reveal>
          <SectionHeader
            kicker="Global Presence"
            title="Supporting Businesses Beyond Boundaries"
            support="Our solutions are designed to support businesses locally and internationally through scalable engineering and technology services."
          />
        </Reveal>

        <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* LEFT SIDE: Global Visual + Headquarters */}
          <Reveal delay={0.1} className="flex flex-col justify-between overflow-hidden rounded-card border border-maxek-border bg-maxek-surface lg:col-span-5">
            <div className="group relative flex-1 aspect-square w-full overflow-hidden rounded-t-[inherit] rounded-b-none">
              <img
                src="/images/global/trivandrum-map.png"
                alt="MAXEK Headquarters - Thiruvananthapuram"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:brightness-105"
              />
            </div>

            {/* Headquarters Block */}
            <div className="border-t border-white/10 bg-maxek-navy p-6 sm:p-8">
              <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                Headquarters
              </p>
              <div className="mt-4 flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-maxek-red" />
                <div>
                  <p className="font-heading text-lg font-bold text-white">
                    Thiruvananthapuram
                  </p>
                  <p className="mt-1 text-[0.9375rem] text-white/80">
                    Kerala, India
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT SIDE: Capability Matrix */}
          <Reveal delay={0.2} className="lg:col-span-7">
            <div className="grid h-full grid-cols-1 gap-px overflow-hidden rounded-card border border-maxek-border bg-maxek-border sm:grid-cols-2">
              {GLOBAL_CAPABILITIES.map((cap, i) => (
                <div
                  key={cap.title}
                  className="group flex flex-col bg-maxek-navy p-8 transition-colors duration-500 ease-premium hover:bg-white lg:p-10"
                >
                  <span className="font-mono text-[0.875rem] font-medium tracking-widest text-maxek-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-lg font-bold uppercase tracking-wider text-white transition-colors duration-500 ease-premium group-hover:text-maxek-navy">
                    {cap.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80 transition-colors duration-500 ease-premium group-hover:text-maxek-text">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Knowledge Center ---------------- */}
      <Section dark data-testid="knowledge-center-section">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              light
              kicker="Knowledge Center"
              title={<>Insights That Drive<br className="hidden lg:block" />Better Decisions</>}
              support="Engineering perspectives, industry insights and technology shaping better decisions."
            />
            <Btn
              to="/knowledge-center"
              variant="primary"
              className="group hidden shrink-0 md:inline-flex"
              data-testid="explore-insights-button-desktop"
            >
              Explore Insights
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Btn>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 lg:mt-16">
          {/* Informational Topic Row */}
          <div className="flex flex-wrap items-center gap-6 border-b border-maxek-border pb-5">
            {KNOWLEDGE_TOPICS.map((topic) => (
              <span
                key={topic}
                className="font-mono text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-white/50 transition-colors duration-300 hover:text-white"
                data-testid={`knowledge-topic-${topic.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {topic}
              </span>
            ))}
          </div>
        </Reveal>

        <motion.div
          className="group mt-8 overflow-hidden rounded-card border border-transparent bg-maxek-red shadow-card transition-shadow duration-500 hover:shadow-card-hover lg:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to={insightHref}
            className="grid lg:grid-cols-2"
            data-testid="knowledge-center-featured-link"
          >
            {/* Editorial Image Side */}
            <div className="relative aspect-[4/3] h-full overflow-hidden border-b border-transparent lg:aspect-auto lg:border-b-0 lg:border-r">
              <img
                src={displayArticle.image}
                alt={displayArticle.title}
                title={displayArticle.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-center bg-maxek-red p-8 transition-colors duration-500 group-hover:bg-[#CC1A20] sm:p-12 lg:p-16">
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.15em] text-white/80 transition-colors duration-500 group-hover:text-white">
                {insightMeta}
              </p>
              <h3 className="mt-4 font-heading text-[1.75rem] font-bold leading-tight text-white sm:text-4xl lg:leading-[1.15]">
                {isFallback ? (
                  <>
                    Where Engineering Meets<br />Smarter Execution
                  </>
                ) : (
                  displayArticle.title
                )}
              </h3>

              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white">
                Read Article
                <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1.5" aria-hidden="true" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Mobile Button */}
        <Reveal delay={0.2} className="mt-10 flex md:hidden">
          <Btn
            to="/knowledge-center"
            variant="primary"
            className="group w-full justify-center"
            data-testid="explore-insights-button-mobile"
          >
            Explore Insights
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Btn>
        </Reveal>
      </Section>

      {/* ---------------- Careers ---------------- */}
      <Section data-testid="careers-teaser-section">
        <div className="grid items-stretch overflow-hidden rounded-card border border-transparent bg-maxek-red shadow-card lg:grid-cols-2">

          {/* Content Side */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <Kicker light tone="white" className="mb-6">Careers</Kicker>
            <h2 className="text-display-2 text-balance text-white">
              Build Your Career With MAXEK
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/90">
              Join a team driven by innovation, collaboration, and engineering
              excellence.
            </p>

            {/* Micro-value line derived directly from copy */}
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-white/90">
              <span>Innovation</span>
              <span className="h-1 w-1 rounded-full bg-white" aria-hidden="true" />
              <span>Collaboration</span>
              <span className="h-1 w-1 rounded-full bg-white" aria-hidden="true" />
              <span>Engineering Excellence</span>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Btn to="/careers" variant="primary" data-testid="view-careers-button" className="group w-full sm:w-auto text-maxek-navy hover:text-maxek-navy">
                View Careers
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Btn>
              <Btn to="/careers" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-maxek-navy">
                Internships
              </Btn>
            </div>
          </div>

          {/* Visual Fallback Side */}
          <div className="group relative min-h-[320px] w-full overflow-hidden border-t border-transparent bg-maxek-red lg:min-h-[480px] lg:border-t-0 lg:border-l">
            <img
              src={OFFICIAL.careers}
              alt="MAXEK Careers - Infra, Tech, and Business Hub"
              title="Careers at MAXEK"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            {/* Red panel → photograph blend, controlled to the edge where they meet —
                horizontal on desktop (panel sits left of the image), vertical on
                mobile/tablet (panel stacks above the image). The photograph itself
                stays at natural colour and opacity. */}
            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, rgba(227,30,36,0.38), rgba(227,30,36,0.14) 20%, rgba(227,30,36,0.04) 38%, transparent 55%)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 lg:hidden"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(227,30,36,0.34), rgba(227,30,36,0.12) 20%, rgba(227,30,36,0.04) 38%, transparent 55%)",
              }}
              aria-hidden="true"
            />

            {/* Subtle architectural overlay line */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-8 top-0 h-full w-px bg-white/5" />
              <div className="absolute left-0 top-8 h-px w-full bg-white/5" />
            </div>
          </div>

        </div>
      </Section>

      <CTASection />
    </>
  );
}
