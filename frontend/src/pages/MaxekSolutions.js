import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import SEO, { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/common/SEO";
import PageHero from "@/components/common/PageHero";
import Section, { Kicker, Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/common/Section";
import { Icon, ProjectCard, StatBlock } from "@/components/common/Cards";
import Btn from "@/components/common/Btn";

import {
  FAQAccordion,
  IndustryStrip,
  ItemGrid,
  VerticalContact,
} from "@/components/verticals/VerticalParts";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { fetchProjects } from "@/lib/api";
import { STOCK } from "@/lib/images";
import { FAQS, VERTICALS } from "@/lib/site";

const VERTICAL = VERTICALS[1];

const CRUMBS = [
  { label: "Home", to: "/" },
  { label: "Business Verticals", to: "/verticals" },
  { label: "MAXEK TECHNOLOGIES", to: "/verticals/maxek-solutions" },
];

const SOLUTIONS = [
  {
    name: "ERP",
    icon: "Database",
    description:
      "Procurement, stores, production, quality and finance unified on one governed platform with a single reporting layer.",
  },
  {
    name: "SmartQTO",
    icon: "Calculator",
    description:
      "Standardised quantity take-off with a governed rate library, versioning and approval gates for consistent tender pricing.",
  },
  {
    name: "AI Solutions",
    icon: "BrainCircuit",
    description:
      "Applied AI for variance early-warning, quality classification, forecasting and interrogating large document sets.",
  },
  {
    name: "Business Automation",
    icon: "Workflow",
    description:
      "Automation of high-volume administrative workflows to release skilled capacity for work that needs judgement.",
  },
  {
    name: "Digital Engineering",
    icon: "Boxes",
    description:
      "Coordinated models and structured asset data that resolve clashes at the desk instead of on site.",
  },
  {
    name: "Cloud Solutions",
    icon: "Cloud",
    description:
      "Cloud-native architecture that extends across sites, business units and geographies without re-platforming.",
  },
  {
    name: "Project Monitoring",
    icon: "Activity",
    description:
      "Digital progress capture with baseline variance analytics and threshold-based early-warning alerts.",
  },
  {
    name: "Data Analytics",
    icon: "BarChart3",
    description:
      "Operational and commercial reporting that turns captured data into decisions leadership can act on.",
  },
];

const PRODUCTS = [
  {
    name: "SmartQTO",
    tag: "Estimation platform",
    description:
      "Quantity take-off and tender estimation with standardised templates, a maintained rate library, structured versioning and an approval gate before submission.",
    points: [
      "Drawing-to-take-off workflow",
      "Governed central rate library",
      "Version history for every tender",
      "Consistent pricing across estimators",
    ],
    image: STOCK.dashboard,
  },
  {
    name: "Project Monitoring Platform",
    tag: "Delivery visibility",
    description:
      "Cloud platform that captures site progress digitally, compares it against baseline and surfaces slippage before it reaches the critical path.",
    points: [
      "Structured activity-linked progress capture",
      "Offline-tolerant site reporting",
      "Automated variance alerts",
      "Executive dashboards with drill-down",
    ],
    image: STOCK.analytics,
  },
  {
    name: "Business Intelligence Layer",
    tag: "Reporting",
    description:
      "A unified reporting layer across ERP, shop-floor and project data, replacing manual consolidation with live management reporting.",
    points: [
      "Single source of operational truth",
      "Automated management reporting",
      "Role-based access and governance",
      "Quality and downtime traceability",
    ],
    image: STOCK.dataCenterRacks,
  },
];

const TECH_STACK = [
  { group: "Cloud & Infrastructure", icon: "Cloud", items: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD pipelines"] },
  { group: "Data & Analytics", icon: "Database", items: ["PostgreSQL", "MongoDB", "Data warehousing", "ETL pipelines", "BI dashboards", "Data governance"] },
  { group: "AI & Automation", icon: "BrainCircuit", items: ["Applied machine learning", "Forecasting models", "Document intelligence", "Workflow automation", "Anomaly detection"] },
  { group: "Applications & Integration", icon: "Code2", items: ["Web applications", "Mobile capture", "REST APIs", "ERP integration", "Industrial data interfaces"] },
];

export default function MaxekSolutions() {
  const { openEnquiry } = useEnquiry();
  const { data: projects = [] } = useQuery({
    queryKey: ["projects", "maxek-solutions"],
    queryFn: () => fetchProjects("maxek-solutions"),
  });

  return (
    <>
      <SEO
        title="Digital Engineering, ERP & AI Solutions | MAXEK TECHNOLOGIES"
        description="ERP implementation, SmartQTO, AI solutions, cloud, automation and project monitoring for manufacturing and engineering businesses. Talk to MAXEK TECHNOLOGIES."
        path="/verticals/maxek-solutions"
        keywords="ERP, Digital Engineering, AI Solutions, Cloud Solutions, Business Automation, Digital Transformation, Project Monitoring, Business Intelligence, SmartQTO, Engineering Software"
        schemas={[
          breadcrumbSchema(CRUMBS),
          serviceSchema({
            name: "MAXEK TECHNOLOGIES — Technology & Digital Engineering",
            description: VERTICAL.description,
            path: "/verticals/maxek-solutions",
            items: VERTICAL.items,
          }),
          faqSchema(FAQS["maxek-solutions"]),
        ]}
      />

      <PageHero
        kicker="Technology & Digital Engineering"
        title="Digital Engineering, ERP & AI Solutions"
        support="Providing ERP solutions, SmartQTO, AI solutions, cloud technologies, automation, project monitoring, digital engineering, and business intelligence."
        image={STOCK.robotArm}
        imageAlt="Industrial robotics and automation representing MAXEK TECHNOLOGIES digital engineering"
        breadcrumbs={CRUMBS}
      >
        <Btn
          variant="onDark"
          size="lg"
          onClick={() => openEnquiry({ business_vertical: VERTICAL.name })}
          data-testid="solutions-hero-enquiry-button"
        >
          Business Enquiry
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Btn>
        <Btn variant="outlineLight" size="lg" to="/projects">
          Case Studies
        </Btn>
      </PageHero>

      {/* About */}
      <Section id="about">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Kicker className="mb-7">About</Kicker>
            <h2 className="text-display-2 text-balance text-maxek-navy">
              Technology that improves an outcome, not a slide
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="text-lg leading-relaxed text-maxek-text text-pretty">
              MAXEK TECHNOLOGIES is the technology and digital engineering vertical
              of the group. Because we also build and operate industrial
              facilities, we start from operational reality rather than from a
              product catalogue.
            </p>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-maxek-text">
              Most technology programmes are not undone by software limitations.
              They are undone by master data, process ambiguity and adoption. We
              cleanse master data before configuration, document the process you
              actually run before designing the one you intend to run, and treat
              adoption as the deliverable rather than the afterthought.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-maxek-border pt-10 sm:grid-cols-4">
              <StatBlock value="08" label="Solution areas" />
              <StatBlock value="03" label="Core products" />
              <StatBlock value="Cloud" label="Native architecture" />
              <StatBlock value="24x7" label="Platform operations" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Digital Solutions */}
      <Section dark id="digital-solutions">
        <SectionHeader
          light
          kicker="Digital Solutions"
          title="What MAXEK TECHNOLOGIES delivers"
          support="Engaged as a full transformation programme or as a single focused capability."
        />
        <div className="mt-14">
          <ItemGrid items={SOLUTIONS} testIdPrefix="solutions-item" />
        </div>
      </Section>

      {/* Products */}
      <Section id="products">
        <SectionHeader
          kicker="Products"
          title="MAXEK platforms"
          support="Purpose-built products developed from our own engineering delivery experience."
        />
        <div className="mt-14 space-y-6 lg:space-y-8">
          {PRODUCTS.map((product, i) => (
            <Reveal
              key={product.name}
              className="grid items-stretch overflow-hidden rounded-card border border-maxek-border bg-maxek-surface shadow-card lg:grid-cols-2"
            >
              <div className={`p-8 lg:p-12 ${i % 2 ? "lg:order-2" : ""}`}>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-maxek-blue">
                  {product.tag}
                </p>
                <h3 className="mt-4 text-display-3 text-maxek-navy">{product.name}</h3>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-maxek-text">
                  {product.description}
                </p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {product.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[0.9375rem] text-maxek-navy">
                      <Icon name="Check" className="mt-1 h-4 w-4 shrink-0 text-maxek-blue" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative min-h-[300px] lg:min-h-0 ${i % 2 ? "lg:order-1" : ""}`}>
                <img
                  src={product.image}
                  alt={`${product.name} — MAXEK TECHNOLOGIES platform`}
                  title={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Technology stack */}
      <section className="grain relative isolate overflow-hidden bg-maxek-ink" id="technology-stack">
        <img
          src={STOCK.dataCenter}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
          loading="lazy"
        />
        {/* Subtle data-grid line motif — restrained, no glow/neon */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="shell relative py-20 md:py-24 lg:py-28">
          <SectionHeader
            light
            kicker="Technology Stack"
            title="Platform-pragmatic, engineering-grade"
            support="We select technology against your requirements, scale and budget — not against a partner agreement."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {TECH_STACK.map((group) => (
              <StaggerItem key={group.group} className="h-full">
                <article className="group h-full rounded-card border border-white/12 bg-white/[0.04] p-7 transition-colors duration-500 ease-premium hover:border-maxek-blue/40">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.07] text-maxek-blue">
                    <Icon name={group.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-[1.0625rem] font-semibold text-white">{group.group}</h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-[0.875rem] text-white/60">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Industries */}
      <IndustryStrip
        names={["Manufacturing", "Technology", "Industrial", "Logistics", "Healthcare", "Education"]}
        title="Industries served by MAXEK TECHNOLOGIES"
        support="Digital engineering and applied technology for sectors where operational data drives commercial performance."
      />

      {/* Case studies */}
      <Section dark id="case-studies">
        <SectionHeader
          light
          kicker="Case Studies"
          title="Technology delivered in production"
          support="ERP, estimation, monitoring and integration programmes delivered for engineering and manufacturing clients."
          actions={
            <Btn to="/projects" variant="primary" data-testid="solutions-all-projects-button">
              View All Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Btn>
          }
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {projects.slice(0, 4).map((project, index) => (
            <StaggerItem key={project.slug} className="h-full">
              <ProjectCard project={project} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* FAQs */}
      <Section id="faqs">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Kicker className="mb-7">FAQs</Kicker>
            <h2 className="text-display-2 text-balance text-maxek-navy">Frequently asked questions</h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-maxek-text">
              Looking for something specific? Read our{" "}
              <Link to="/knowledge-center" className="link-underline">
                technology insights
              </Link>{" "}
              or submit a business enquiry.
            </p>
          </Reveal>
          <div className="lg:col-span-8">
            <FAQAccordion faqs={FAQS["maxek-solutions"]} testIdPrefix="solutions-faq" dark={false} />
          </div>
        </div>
      </Section>

      <VerticalContact
        dark
        vertical={VERTICAL}
        relatedLinks={[
          { label: "Projects", to: "/projects", description: "ERP, monitoring and integration case studies" },
          { label: "Industries", to: "/industries", description: "The sectors MAXEK serves" },
          { label: "MAXEK INFRA", to: "/verticals/maxek-infra", description: "Engineering and industrial execution" },
          { label: "MAXEK BUSINESS HUB", to: "/verticals/maxek-business-hub", description: "Brand, growth, people and technology support" },
          { label: "Knowledge Center", to: "/knowledge-center", description: "Technology updates and industry insights" },
        ]}
      />
    </>
  );
}
