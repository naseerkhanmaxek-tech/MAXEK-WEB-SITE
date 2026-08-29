import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import SEO, { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/common/SEO";
import PageHero from "@/components/common/PageHero";
import Section, { Kicker, Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/common/Section";
import { Icon, StatBlock } from "@/components/common/Cards";
import Btn from "@/components/common/Btn";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import { FAQAccordion } from "@/components/verticals/VerticalParts";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { fetchProjects } from "@/lib/api";
import { STOCK } from "@/lib/images";
import { BUSINESS_PILLARS, FAQS, MAXEK_EDU, VERTICALS } from "@/lib/site";
import { EASE } from "@/lib/motion";

const VERTICAL = VERTICALS[2];

const CRUMBS = [
  { label: "Home", to: "/" },
  { label: "Business Verticals", to: "/verticals" },
  { label: "MAXEK BUSINESS HUB", to: "/verticals/maxek-business-hub" },
];

export default function MaxekBusinessHub() {
  const { openEnquiry } = useEnquiry();
  const [active, setActive] = useState(BUSINESS_PILLARS[0].id);
  const activePillar = BUSINESS_PILLARS.find((p) => p.id === active);

  const { data: projects = [] } = useQuery({
    queryKey: ["projects", "maxek-business-hub"],
    queryFn: () => fetchProjects("maxek-business-hub"),
  });

  return (
    <>
      <SEO
        title="Business Growth & Digital Transformation | MAXEK BUSINESS HUB"
        description="Brand, growth, people and technology solutions plus MAXEK EDU corporate learning. A business growth ecosystem for SMEs and enterprises across India."
        path="/verticals/maxek-business-hub"
        keywords="Business Growth, Brand Consulting, Corporate Strategy, Business Transformation, Recruitment Partner, People Excellence, Growth Accelerator, Lead Generation, Business Systems, Corporate Learning, MAXEK EDU"
        schemas={[
          breadcrumbSchema(CRUMBS),
          serviceSchema({
            name: "MAXEK BUSINESS HUB — Business Growth Ecosystem",
            description: VERTICAL.description,
            path: "/verticals/maxek-business-hub",
            items: BUSINESS_PILLARS.flatMap((p) => p.offerings.map((o) => o.name)),
          }),
          faqSchema(FAQS["maxek-business-hub"]),
        ]}
      />

      <PageHero
        kicker="Business Growth Ecosystem"
        title="Business Growth & Digital Transformation"
        support="Supporting organizations with branding, digital transformation, recruitment, automation, strategic growth, and corporate learning through MAXEK EDU."
        image={STOCK.boardroom}
        imageAlt="Corporate leadership team collaborating with MAXEK BUSINESS HUB"
        breadcrumbs={CRUMBS}
      >
        <Btn
          variant="onDark"
          size="lg"
          onClick={() => openEnquiry({ business_vertical: VERTICAL.name })}
          data-testid="hub-hero-enquiry-button"
        >
          Business Enquiry
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Btn>
      </PageHero>

      {/* Introduction */}
      <Section id="introduction">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Kicker className="mb-7">Introduction</Kicker>
            <h2 className="text-display-2 text-balance">
              An ecosystem, not a list of consulting services
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="text-lg leading-relaxed text-maxek-text text-pretty">
              MAXEK BUSINESS HUB exists because growth constraints are rarely
              isolated. Positioning, demand, capability and systems are connected
              — improving one while ignoring the others produces temporary gains.
            </p>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-maxek-text">
              The Hub brings four solution pillars together so that brand,
              growth, people and technology reinforce each other. Each solution
              can be engaged on its own. Engaged together, they compound.
              Alongside them, MAXEK EDU builds the internal capability required to
              sustain the change after we step back.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-maxek-border pt-10 sm:grid-cols-4">
              <StatBlock value="04" label="Solution pillars" />
              <StatBlock value="12" label="Named solutions" />
              <StatBlock value="05" label="MAXEK EDU tracks" />
              <StatBlock value="SME→" label="Enterprise scale" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Business Solutions — interactive pillars (never a flowchart) */}
      <Section dark id="business-solutions">
        <SectionHeader
          light
          kicker="Business Solutions"
          title="Four pillars, twelve solutions"
          support="Select a pillar to explore the solutions within it."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Pillar selector */}
          <div
            className="min-w-0 lg:col-span-4"
            role="tablist"
            aria-label="Business solution pillars"
            aria-orientation="vertical"
          >
            <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {BUSINESS_PILLARS.map((pillar) => {
                const isActive = pillar.id === active;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`pillar-panel-${pillar.id}`}
                    id={`pillar-tab-${pillar.id}`}
                    onClick={() => setActive(pillar.id)}
                    className={`group relative shrink-0 overflow-hidden rounded-card border p-5 text-left [transition:background-color_.3s_ease,border-color_.3s_ease,box-shadow_.3s_ease] lg:w-full lg:p-6 ${
                      isActive
                        ? "border-maxek-red/40 bg-maxek-navy shadow-card"
                        : "border-white/10 bg-white/60 hover:border-maxek-red/25 hover:bg-maxek-navy"
                    }`}
                    data-testid={`hub-pillar-tab-${pillar.id}`}
                  >
                    <span
                      className={`absolute inset-y-0 left-0 w-[3px] bg-maxek-red [transition:transform_.35s_cubic-bezier(.22,1,.36,1)] ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="flex items-center gap-3">
                      <Icon
                        name={pillar.icon}
                        className={isActive ? "h-5 w-5 text-maxek-red" : "h-5 w-5 text-maxek-muted group-hover:text-white/70"}
                      />
                      <span
                        className={`font-heading text-[1.0625rem] font-semibold ${
                          isActive ? "text-white" : "text-maxek-navy group-hover:text-white"
                        }`}
                      >
                        {pillar.name}
                      </span>
                    </span>
                    <span
                      className={`mt-2.5 hidden text-[0.875rem] leading-relaxed lg:block ${
                        isActive ? "text-white/80" : "text-maxek-text group-hover:text-white/80"
                      }`}
                    >
                      {pillar.intent}
                    </span>
                    <span
                      className={`mt-3 hidden font-mono text-[10px] uppercase tracking-[0.16em] lg:block ${
                        isActive ? "text-white/50" : "text-maxek-muted group-hover:text-white/50"
                      }`}
                    >
                      {pillar.offerings.length} solutions
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active pillar panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                id={`pillar-panel-${active}`}
                role="tabpanel"
                aria-labelledby={`pillar-tab-${active}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: EASE }}
                data-testid={`hub-pillar-panel-${active}`}
              >
                <p className="lg:hidden text-[0.9375rem] leading-relaxed text-white/80">
                  {activePillar.intent}
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {activePillar.offerings.map((offering, i) => (
                    <article
                      key={offering.name}
                      className="card-surface h-full"
                      data-testid={`hub-offering-${offering.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-[1.0625rem] font-semibold text-maxek-navy">
                          {offering.name}
                        </h3>
                        <span className="font-mono text-[11px] tracking-[0.18em] text-maxek-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-4 text-[0.9375rem] leading-relaxed text-maxek-text">
                        {offering.description}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          openEnquiry({
                            business_vertical: VERTICAL.name,
                            service_required: activePillar.name,
                            project_details: `I would like to know more about ${offering.name}.`,
                          })
                        }
                        className="link-underline mt-6 text-sm text-maxek-navy"
                        data-testid={`hub-offering-enquire-${offering.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      >
                        Enquire
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </article>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* MAXEK EDU */}
      <section className="grain relative isolate overflow-hidden bg-white" id="maxek-edu">
        <img
          src={STOCK.presenting}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.05]"
          loading="lazy"
        />
        <div className="shell relative py-20 md:py-24 lg:py-28">
          <SectionHeader
            kicker="MAXEK EDU"
            title="Capability that stays after we step back"
            support="Corporate learning designed around your operating model and delivery calendar — assessed, certified and measurable."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {MAXEK_EDU.map((track) => (
              <StaggerItem key={track.name} className="h-full">
                <article
                  className="h-full rounded-card border border-maxek-border bg-maxek-surface p-6"
                  data-testid={`edu-card-${track.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-maxek-red border border-maxek-border">
                    <Icon name={track.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-[1.0625rem] font-semibold text-maxek-navy">{track.name}</h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-maxek-text">
                    {track.description}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Success stories */}
      <Section dark id="success-stories">
        <SectionHeader
          light
          kicker="Success Stories"
          title="Engagements and outcomes"
          support="Selected MAXEK BUSINESS HUB engagements across brand, growth, people and technology solutions."
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {projects.map((project) => (
            <StaggerItem key={project.slug} className="h-full">
              <article
                className="card-surface flex h-full flex-col"
                data-testid={`hub-story-${project.slug}`}
              >
                <Quote className="h-6 w-6 text-maxek-red" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-6 text-[1.0625rem] font-semibold text-maxek-navy">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-maxek-text">
                  {project.summary}
                </p>
                <ul className="mt-6 space-y-2 border-t border-maxek-border pt-5">
                  {project.results.slice(0, 2).map((result) => (
                    <li key={result} className="flex items-start gap-2.5 text-[0.875rem] text-maxek-navy">
                      <Icon name="Check" className="mt-0.5 h-4 w-4 shrink-0 text-maxek-red" />
                      {result}
                    </li>
                  ))}
                </ul>
                <Btn
                  to={`/projects/${project.slug}`}
                  variant="ghostDark"
                  size="sm"
                  className="mt-6 self-start px-0 hover:bg-transparent hover:text-maxek-red"
                  data-testid={`hub-story-${project.slug}-link`}
                >
                  Read the full story
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Btn>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* FAQs */}
      <Section id="faqs">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Kicker className="mb-7">FAQs</Kicker>
            <h2 className="text-display-2 text-balance">Frequently asked questions</h2>
          </Reveal>
          <div className="lg:col-span-8">
            <FAQAccordion faqs={FAQS["maxek-business-hub"]} testIdPrefix="hub-faq" dark={false} />
          </div>
        </div>
      </Section>

      {/* Business Enquiry (inline, per PRD section list) */}
      <Section dark id="business-enquiry">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Kicker light className="mb-7">Business Enquiry</Kicker>
            <h2 className="text-display-2 text-balance text-white">
              Start with a scoping conversation
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80 text-pretty">
              Tell us where growth is currently constrained. Our team will
              respond to arrange a scoping conversation and outline which
              solutions apply.
            </p>
            <ul className="mt-9 space-y-3">
              {BUSINESS_PILLARS.map((p) => (
                <li key={p.id} className="flex items-center gap-3 text-[0.9375rem] text-white">
                  <Icon name={p.icon} className="h-4 w-4 text-maxek-red" />
                  {p.name}
                </li>
              ))}
            </ul>

            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
              Explore related
            </p>
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {[
                { label: "MAXEK INFRA", to: "/verticals/maxek-infra", description: "Engineering and industrial execution" },
                { label: "MAXEK TECHNOLOGIES", to: "/verticals/maxek-solutions", description: "ERP, AI and digital engineering" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center justify-between gap-6 py-4"
                    data-testid={`hub-related-${link.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  >
                    <span>
                      <span className="block text-[0.9375rem] font-semibold text-white transition-colors duration-200 ease-premium group-hover:text-maxek-red">
                        {link.label}
                      </span>
                      <span className="mt-1 block text-[0.8125rem] text-white/50">{link.description}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-maxek-red transition-transform duration-300 ease-premium group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="rounded-card border border-white/10 bg-maxek-navy p-7 shadow-card lg:p-9">
              <EnquiryForm
                variant="enquiry"
                idPrefix="hub-enquiry"
                prefill={{ business_vertical: VERTICAL.name }}
                compact
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
