import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SEO, { breadcrumbSchema, localBusinessSchema } from "@/components/common/SEO";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import Section, {
  Kicker,
  Reveal,
  SectionHeader,
  Stagger,
  StaggerItem,
} from "@/components/common/Section";
import { FeatureCard, Icon } from "@/components/common/Cards";
import Btn from "@/components/common/Btn";
import CTASection from "@/components/common/CTASection";
import { OFFICIAL, STOCK } from "@/lib/images";
import {
  CORE_VALUES,
  CORPORATE_PROFILE,
  GLOBAL_CAPABILITIES,
  QUALITY_COMMITMENTS,
  VERTICALS,
} from "@/lib/site";

const CRUMBS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
];



const AboutHero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-maxek-ink pt-36 pb-20 md:pt-44 md:pb-28">
      {/* Full-bleed image — the hero's visual foundation, not a separate card */}
      <img
        src={OFFICIAL.aboutIntegrated}
        alt="MAXEK engineering, technology and business teams collaborating across a digital dashboard, BIM model and construction site"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
      />

      {/* Cinematic left-to-right gradient (desktop/tablet) — merges the text zone into the photograph with no visible seam */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(to right, rgba(9,11,15,0.97) 0%, rgba(9,11,15,0.86) 26%, rgba(9,11,15,0.55) 48%, rgba(9,11,15,0.18) 68%, rgba(9,11,15,0) 86%)",
        }}
        aria-hidden="true"
      />
      {/* Stronger top-to-bottom gradient on mobile, where the image would otherwise read as visually busy behind the text */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(9,11,15,0.95) 0%, rgba(9,11,15,0.88) 40%, rgba(9,11,15,0.55) 68%, rgba(9,11,15,0.15) 88%, rgba(9,11,15,0) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle overall charcoal toning across the full photograph — independent of the
          text-legibility gradient above — so the image reads as part of the dark page
          rather than a bright photo pasted on top, even on its untinted right side. */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(8,10,14,0.25) 0%, rgba(8,10,14,0.15) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Background structural line */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-20" aria-hidden="true">
        <div className="absolute left-[15%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-5 sm:px-8 lg:pl-28 xl:pl-32">
        <div className="max-w-xl lg:max-w-2xl">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-[13px] text-white/55">
              {CRUMBS.map((crumb, i) => (
                <li key={crumb.to} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/30" aria-hidden="true" />}
                  {i === CRUMBS.length - 1 ? (
                    <span className="text-white/85" aria-current="page">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.to} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <motion.p
            className="kicker mb-3 text-white/80"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}
          >
            ABOUT MAXEK
          </motion.p>

          <motion.h1
            className="text-display-1 text-balance text-white"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            An Integrated Engineering Group Built for <span className="text-maxek-red">What Comes Next</span>
          </motion.h1>

          <motion.p
            className="mt-5 text-[1.125rem] leading-relaxed text-white/80 text-pretty"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
          >
            MAXEK India Private Limited brings engineering execution, digital transformation and business growth capability together under one organisation — so our clients solve problems once, not three times.
          </motion.p>
        </div>
      </div>

      {/* Editorial metadata — kept subtle, moved clear of the headline onto the more visible right side of the photograph */}
      <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-3 sm:flex md:bottom-10 md:right-10">
        <div className="flex h-8 items-center justify-center bg-maxek-red px-3">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">ABOUT / 01</span>
        </div>
        <div className="hidden h-8 items-center justify-center border border-white/20 bg-maxek-ink/80 px-3 backdrop-blur-sm lg:flex">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">INTEGRATED ENGINEERING GROUP</span>
        </div>
      </div>

      {/* Decorative engineering crosshair */}
      <div className="absolute top-24 right-8 z-10 hidden h-4 w-4 border-r border-t border-maxek-red/60 sm:block md:top-28 md:right-10" aria-hidden="true" />
    </section>
  );
};

export default function About() {
  return (
    <>
      <SEO
        title="About MAXEK | Engineering, Technology & Business Solutions"
        description="Learn about MAXEK India's vision, engineering expertise, and integrated business approach across engineering execution, technology and business growth."
        path="/about"
        keywords="About MAXEK, Engineering Excellence, Corporate Engineering Company, Engineering Expertise, Company Profile, Engineering Leadership"
        schemas={[localBusinessSchema, breadcrumbSchema(CRUMBS)]}
      />

      <AboutHero />

      {/* Company overview */}
      <Section id="company-overview" className="py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <Kicker className="mb-0">Company Overview</Kicker>
            </Reveal>
          </div>
          
          <div className="lg:col-span-10">
            <Reveal>
              <h2 className="text-display-2 text-balance">
                Engineering, technology and growth — <br className="hidden sm:block" />
                <span className="text-maxek-red">delivered as one organisation</span>
              </h2>
            </Reveal>
            
            <Reveal delay={0.1} className="mt-8 lg:mt-12">
              <p className="max-w-4xl text-lg leading-relaxed text-maxek-text text-pretty">
                MAXEK India Private Limited is an Integrated Engineering Group
                delivering engineering execution, digital transformation, and
                strategic business growth solutions. Through our specialized
                business verticals, we help organizations improve efficiency,
                accelerate innovation, and achieve sustainable growth.
              </p>
            </Reveal>
            
            <Reveal delay={0.2} className="mt-12 lg:mt-16">
              <div className="border-l-[3px] border-maxek-red bg-maxek-surface p-6 sm:p-8 rounded-r-2xl">
                <p className="text-[1.125rem] font-medium leading-relaxed text-maxek-navy text-pretty">
                  We are neither a construction contractor, nor a software house, nor
                  a recruitment firm. We are an engineering group with three
                  specialized divisions that regularly work on the same problem from
                  different directions — building the facility, digitising the
                  operation that runs inside it, and structuring the business that
                  depends on both.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.3} className="mt-20 lg:mt-28">
          <div className="grid grid-cols-2 gap-y-12 gap-x-8 border-t border-maxek-border pt-12 lg:grid-cols-4">
            {/* Metric 1 */}
            <div>
              <p className="font-heading text-4xl font-semibold tracking-tight text-maxek-navy lg:text-5xl">
                30+ CR
              </p>
              <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-maxek-text">
                Ongoing Projects
              </p>
            </div>
            {/* Metric 2 */}
            <div>
              <p className="font-heading text-4xl font-semibold tracking-tight text-maxek-navy lg:text-5xl">
                03
              </p>
              <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-maxek-text">
                Business Verticals
              </p>
            </div>
            {/* Metric 3 */}
            <div>
              <p className="font-heading text-4xl font-semibold tracking-tight text-maxek-navy lg:text-5xl">
                10
              </p>
              <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-maxek-text">
                Industries Served
              </p>
            </div>
            {/* Metric 4 */}
            <div>
              <p className="font-heading text-4xl font-semibold tracking-tight text-maxek-navy lg:text-5xl">
                02
              </p>
              <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-maxek-text">
                Countries of Operation
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Our story */}
      <Section dark id="our-story" className="py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <Kicker light className="mb-0">Our Story</Kicker>
            </Reveal>
          </div>
          
          <div className="lg:col-span-10">
            <Reveal>
              <h2 className="text-display-2 text-balance">
                Founded on a practical observation
              </h2>
            </Reveal>
  
            <div className="mt-10 lg:mt-14 space-y-8 max-w-4xl">
              <Reveal delay={0.1}>
                <p className="text-[1.125rem] leading-relaxed text-white/80 text-pretty">
                  Industrial clients were being asked to coordinate between a
                  contractor who built the facility, a vendor who supplied the
                  systems, and a consultant who advised on the business. Each was
                  competent.
                  <span className="mt-5 block border-l-[3px] border-maxek-red py-0.5 pl-6 font-medium text-white">
                    None was accountable for the outcome.
                  </span>
                </p>
              </Reveal>
              
              <Reveal delay={0.2}>
                <p className="text-[1.125rem] leading-relaxed text-white/80 text-pretty">
                  MAXEK was established to close that gap. By holding engineering
                  execution, digital engineering and business growth capability inside
                  one group, decisions that would otherwise cross three commercial
                  boundaries are made in a single conversation.
                </p>
              </Reveal>
              
              <Reveal delay={0.3}>
                <p className="text-[1.125rem] leading-relaxed text-white/80 text-pretty">
                  That structure now serves clients across manufacturing,
                  infrastructure, industrial, commercial and technology sectors —
                  from single-package works through to multi-year transformation
                  programmes.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section id="vision-mission" className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-maxek-border -translate-x-1/2" />
          <Reveal className="flex h-full flex-col lg:pr-12">
            <div className="mb-10 flex items-center justify-between">
              <Kicker className="mb-0">Vision</Kicker>
              <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-maxek-muted">
                01
              </span>
            </div>
            <h2 className="text-display-3 text-maxek-navy">
              To be the engineering group organisations trust with their most
              consequential projects.
            </h2>
            <p className="mt-6 text-[1.125rem] leading-relaxed text-maxek-text text-pretty">
              We intend for MAXEK to be recognised — in India and
              internationally — as the group that combines engineering rigour
              with technological capability and genuine commercial understanding.
            </p>
          </Reveal>

          <Reveal className="flex h-full flex-col lg:pl-12" delay={0.1}>
            <div className="mb-10 flex items-center justify-between">
              <Kicker className="mb-0">Mission</Kicker>
              <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-maxek-muted">
                02
              </span>
            </div>
            <h2 className="text-display-3 text-maxek-navy">
              To deliver engineering, technology and growth outcomes our clients
              can measure.
            </h2>
            <p className="mt-6 text-[1.125rem] leading-relaxed text-maxek-text text-pretty">
              We commit to sound engineering judgement, safe execution,
              transparent reporting and technology adopted only where it
              demonstrably improves the result — sustaining the partnership well
              beyond handover.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Core values */}
      <Section dark id="core-values" className="py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <Kicker light className="mb-0">Core Values</Kicker>
            </Reveal>
          </div>
          
          <div className="lg:col-span-10">
            <Reveal>
              <h2 className="text-display-2 text-balance">
                The standards we hold internally
              </h2>
            </Reveal>
            
            <Reveal delay={0.1} className="mt-8 lg:mt-12">
              <div className="border-l-[3px] border-maxek-red py-1 pl-6">
                <p className="text-[1.125rem] font-medium leading-relaxed text-white text-pretty">
                  These are not aspirations on a wall. They are the criteria we use when a decision is genuinely difficult.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
        
        <Stagger className="mt-16 lg:mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((value, index) => (
            <StaggerItem key={value.name} className="h-full">
              <div
                className={cn("group flex h-full flex-col rounded-card p-8 sm:p-10 border border-transparent shadow-sm [transition:all_.3s_ease] hover:-translate-y-1 hover:shadow-card", index === 0 ? "bg-maxek-red hover:bg-[#CC1A20]" : "bg-maxek-navy hover:border-maxek-red/20")}
                data-testid={`core-value-${value.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              >
                <div className="mb-8 flex items-center justify-between">
                  <Icon name={value.icon} className={cn("h-6 w-6 [transition:color_.3s_ease]", index === 0 ? "text-white group-hover:text-maxek-navy" : "text-white group-hover:text-maxek-red")} />
                  <span className={cn("font-mono text-[12px] font-bold uppercase tracking-widest", index === 0 ? "text-white/80" : "text-white/50")}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-[1.125rem] font-semibold text-white">
                  {value.name}
                </h3>
                <p className={cn("mt-4 flex-1 text-[1.0625rem] leading-relaxed", index === 0 ? "text-white/90" : "text-white/80")}>
                  {value.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Corporate profile */}
      <Section dark id="corporate-profile" className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5 lg:pr-8">
            <Kicker light className="mb-6 lg:mb-8">Corporate Profile</Kicker>
            <h2 className="text-display-2 text-balance">
              Company information at a glance
            </h2>
            <p className="mt-8 text-[1.0625rem] leading-relaxed text-white/80 lg:mt-12">
              Our full corporate profile document is available on request for
              evaluation and procurement teams.
            </p>
            <Btn
              to="/knowledge-center/maxek-corporate-profile-download"
              variant="primary"
              className="mt-12 lg:mt-16"
              data-testid="about-download-brochure-button"
            >
              Download Brochure
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Btn>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <dl className="divide-y divide-white/10 overflow-hidden rounded-card border border-white/10 bg-maxek-navy">
              {CORPORATE_PROFILE.map((row) => (
                <div key={row.label} className="grid gap-1 px-6 py-5 sm:grid-cols-5 sm:gap-6 sm:px-7">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 sm:col-span-2 sm:pt-1">
                    {row.label}
                  </dt>
                  <dd className="text-[0.9375rem] text-white sm:col-span-3">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {VERTICALS.map((v, index) => (
                <a
                  key={v.slug}
                  href={`/verticals/${v.slug}`}
                  className={cn("flex flex-col rounded-card border border-transparent p-4 [transition:border-color_.25s_ease,box-shadow_.25s_ease,background-color_.25s_ease] hover:shadow-card", index === 0 ? "bg-maxek-red hover:bg-[#CC1A20]" : "bg-maxek-navy border-white/10 hover:border-maxek-red/40")}
                >
                  <span className="text-[0.8125rem] font-semibold text-white text-center">{v.name}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Quality & compliance */}
      <Section id="quality-compliance" className="py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <Reveal>
              <Kicker className="mb-0">Quality & Compliance</Kicker>
            </Reveal>
          </div>
          
          <div className="lg:col-span-9">
            <Reveal>
              <h2 className="text-display-2 text-balance">
                Assurance built into the process, not added at the end
              </h2>
            </Reveal>
            
            <Reveal delay={0.1} className="mt-8 lg:mt-12">
              <p className="max-w-4xl text-lg leading-relaxed text-maxek-text text-pretty">
                Quality and safety governance is defined before mobilisation and evidenced throughout delivery.
              </p>
            </Reveal>
          </div>
        </div>
        
        <Stagger className="mt-16 lg:mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {QUALITY_COMMITMENTS.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <FeatureCard
                icon={item.icon}
                title={item.title}
                description={item.description}
                testId={`quality-card-${item.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Global presence */}
      <Section dark id="global-presence" className="py-20 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6 lg:pr-6">
            <Kicker light className="mb-6 lg:mb-8">Global Presence</Kicker>
            <h2 className="text-display-2 text-balance">
              Supporting Businesses Beyond Boundaries
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-white/80 text-pretty lg:mt-12">
              Our solutions are designed to support businesses locally and
              internationally through scalable engineering and technology
              services.
            </p>
            <dl className="mt-12 grid gap-7 sm:grid-cols-2 lg:mt-16">
              {GLOBAL_CAPABILITIES.map((cap) => (
                <div key={cap.title}>
                  <dt className="flex items-center gap-2.5 text-[0.9375rem] font-semibold text-white">
                    <Icon name={cap.icon} className="h-4 w-4 text-maxek-red" />
                    {cap.title}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-white/70">
                    {cap.description}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-6 overflow-hidden rounded-card border border-maxek-border shadow-card">
            <img
              src={STOCK.glassTowerUp}
              alt="Modern corporate architecture representing MAXEK's international outlook"
              title="Global presence"
              className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
