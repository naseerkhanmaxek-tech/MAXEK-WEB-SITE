import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import SEO, { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/common/SEO";
import PageHero from "@/components/common/PageHero";
import Section, { Kicker, Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/common/Section";
import { FeatureCard, ProjectCard, StatBlock } from "@/components/common/Cards";
import Btn from "@/components/common/Btn";

import {
  FAQAccordion,
  IndustryStrip,
  ItemGrid,
  ProcessStepper,
  VerticalContact,
} from "@/components/verticals/VerticalParts";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { fetchProjects } from "@/lib/api";
import { OFFICIAL, STOCK } from "@/lib/images";
import { APPROACH_STEPS, FAQS, VERTICALS } from "@/lib/site";

const VERTICAL = VERTICALS[0];

const CRUMBS = [
  { label: "Home", to: "/" },
  { label: "Business Verticals", to: "/verticals" },
  { label: "MAXEK INFRA", to: "/verticals/maxek-infra" },
];

const SERVICES = [
  {
    name: "Industrial Construction",
    icon: "Factory",
    description:
      "Ground-up industrial facilities delivered from site development through structural completion and handover.",
  },
  {
    name: "Civil Engineering",
    icon: "Construction",
    description:
      "Foundations, earthworks, external works, drainage and utility corridors engineered for industrial loads.",
  },
  {
    name: "Structural Engineering",
    icon: "Ruler",
    description:
      "Analysis, design and detailing of steel and reinforced concrete structures with constructability built in.",
  },
  {
    name: "Steel Fabrication",
    icon: "Wrench",
    description:
      "Shop fabrication of portal frames, gantry girders and assemblies, sequenced to the erection programme.",
  },
  {
    name: "Plant Construction",
    icon: "Boxes",
    description:
      "Plant civils, equipment plinths and process interfaces coordinated against equipment delivery dates.",
  },
  {
    name: "Factory Infrastructure",
    icon: "Warehouse",
    description:
      "Industrial flooring, crane systems, utility distribution, firefighting and safety infrastructure.",
  },
  {
    name: "Engineering Support",
    icon: "LifeBuoy",
    description:
      "Design coordination, value engineering, technical review and site engineering support for client teams.",
  },
  {
    name: "Project Management",
    icon: "ClipboardList",
    description:
      "Programme, cost, quality and safety management across concurrent work fronts and contractor interfaces.",
  },
];

const SAFETY = [
  {
    title: "Method statements before mobilisation",
    icon: "FileCheck",
    description:
      "Every activity has an approved method statement and risk assessment before a crew steps on site.",
  },
  {
    title: "Daily toolbox briefings",
    icon: "Users",
    description:
      "Work fronts brief daily on the day's hazards, interfaces and exclusion zones — not weekly.",
  },
  {
    title: "Stop-work authority",
    icon: "OctagonAlert",
    description:
      "Any person at any level may stop unsafe work. That authority is protected, not merely stated.",
  },
  {
    title: "Inspection & test plans",
    icon: "ScanLine",
    description:
      "Hold points and witness points are defined up front, with records retained against each element.",
  },
  {
    title: "Material traceability",
    icon: "Boxes",
    description:
      "Mill certificates, batch records and test results follow material from procurement to installation.",
  },
  {
    title: "Handover assurance",
    icon: "ClipboardCheck",
    description:
      "As-built records, asset data and compliance documentation issued as a structured handover package.",
  },
];

export default function MaxekInfra() {
  const { openEnquiry } = useEnquiry();
  const { data: projects = [] } = useQuery({
    queryKey: ["projects", "maxek-infra"],
    queryFn: () => fetchProjects("maxek-infra"),
  });

  return (
    <>
      <SEO
        title="Industrial Construction & Engineering Services | MAXEK INFRA"
        description="Delivering industrial construction, structural engineering, steel fabrication and factory infrastructure solutions across India. Contact MAXEK INFRA today."
        path="/verticals/maxek-infra"
        keywords="Industrial Construction, Civil Engineering, Structural Engineering, Steel Fabrication, Factory Infrastructure, Plant Construction, Industrial Projects, Engineering Execution, Project Management"
        image="https://www.maxekindia.com/assets/projects/industrial-plant-construction-maxek.webp"
        schemas={[
          breadcrumbSchema(CRUMBS),
          serviceSchema({
            name: "MAXEK INFRA — Engineering & Industrial Execution",
            description: VERTICAL.description,
            path: "/verticals/maxek-infra",
            items: VERTICAL.items,
          }),
          faqSchema(FAQS["maxek-infra"]),
        ]}
      />

      <PageHero
        kicker="Engineering & Industrial Execution"
        title="Industrial Construction & Engineering Execution"
        support="Delivering industrial construction, civil engineering, structural engineering, steel fabrication, plant construction, factory infrastructure, engineering support, and project management services."
        image={OFFICIAL.projects.industrialPlant}
        imageAlt="MAXEK INFRA industrial plant construction project"
        breadcrumbs={CRUMBS}
      >
        <Btn
          variant="onDark"
          size="lg"
          onClick={() => openEnquiry({ business_vertical: VERTICAL.name })}
          data-testid="infra-hero-enquiry-button"
        >
          Business Enquiry
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Btn>
        <Btn variant="outlineLight" size="lg" to="/projects">
          View Projects
        </Btn>
      </PageHero>

      {/* Overview */}
      <Section id="overview">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <Kicker>Overview</Kicker>
          </Reveal>
          <div className="lg:col-span-10">
            <Reveal delay={0.1}>
              <h2 className="text-display-2 text-balance text-maxek-navy">
                Engineering execution measured against the date that matters
              </h2>
              <div className="mt-6 space-y-6">
                <p className="text-lg leading-relaxed text-maxek-text text-pretty">
                  Industrial projects are judged on a single question: was the
                  facility ready when production needed it. MAXEK INFRA is built
                  around that reality.
                </p>
                <p className="text-[1.0625rem] leading-relaxed text-maxek-text">
                  We fix interface points early, move weather-sensitive activity off
                  the critical path through off-site fabrication, sequence work into
                  independent zones so trades work concurrently rather than queue,
                  and run one interface review with every contractor against a shared
                  look-ahead. Certainty is designed into a programme before
                  mobilisation — it cannot be recovered afterwards through effort
                  alone.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.2}>
          <div className="mt-14 border-t border-maxek-border pt-10">
            <div className="mx-auto max-w-[900px]">
              <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4 lg:gap-12">
                <StatBlock value="08" label="Core services" />
                <StatBlock value="06" label="Step process" />
                <StatBlock value="Zero" label="Harm target" />
                <StatBlock value="India" label="Delivery footprint" />
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Services */}
      <Section dark id="services">
        <SectionHeader
          light
          align="split"
          kicker="Services"
          title="What MAXEK INFRA delivers"
          support="Engaged either as a complete execution package or as a defined scope within a larger EPC programme."
        />
        <div className="mt-14">
          <ItemGrid items={SERVICES} testIdPrefix="infra-service" />
        </div>
      </Section>

      {/* Industries */}
      <IndustryStrip
        names={["Manufacturing", "Infrastructure", "Industrial", "Commercial", "Energy", "Government"]}
        title="Industries served by MAXEK INFRA"
        support="Industrial and infrastructure execution across the sectors where programme certainty and safety governance matter most."
      />

      {/* Engineering process */}
      <Section dark id="engineering-process">
        <SectionHeader
          light
          align="split"
          kicker="Engineering Process"
          title="How a MAXEK INFRA project is delivered"
          support="Every project is delivered through a structured process focused on quality, efficiency, safety, and continuous improvement."
        />
        <div className="mt-16">
          <ProcessStepper steps={APPROACH_STEPS} light />
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects">
        <SectionHeader
          align="split"
          kicker="Projects"
          title="MAXEK INFRA project experience"
          support="Selected industrial, infrastructure and commercial projects delivered by our engineering and execution teams."
          actions={
            <Btn to="/projects" variant="primary" className="border border-maxek-border" data-testid="infra-all-projects-button">
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

      {/* Safety & quality */}
      <section className="grain relative isolate overflow-hidden bg-white" id="safety-quality">
        <img
          src={STOCK.welder}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.05]"
          loading="lazy"
        />
        <div className="shell relative py-20 md:py-24 lg:py-28">
          <SectionHeader
            align="split"
            kicker="Safety & Quality"
            title="Safety governs every decision on our sites"
            support="No programme, cost or commercial pressure justifies compromising the safety of anyone on a MAXEK site."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {SAFETY.map((item) => (
              <StaggerItem key={item.title} className="h-full">
                <article className="h-full rounded-card border border-maxek-border bg-maxek-surface p-7">
                  <h3 className="text-[1.0625rem] font-semibold text-maxek-navy">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-maxek-text">
                    {item.description}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQs */}
      <Section dark id="faqs">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <Kicker light>FAQs</Kicker>
          </Reveal>
          <div className="lg:col-span-10">
            <Reveal delay={0.1}>
              <h2 className="text-display-2 text-balance text-white">Frequently asked questions</h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-white/80">
                If your question is not answered here, submit a business enquiry and
                our team will respond directly.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-12">
              <FAQAccordion faqs={FAQS["maxek-infra"]} testIdPrefix="infra-faq" />
            </Reveal>
          </div>
        </div>
      </Section>

      <VerticalContact
        vertical={VERTICAL}
        relatedLinks={[
          { label: "Projects", to: "/projects", description: "Industrial, infrastructure and commercial project experience" },
          { label: "Industries", to: "/industries", description: "The sectors MAXEK serves" },
          { label: "MAXEK TECHNOLOGIES", to: "/verticals/maxek-solutions", description: "Digitise the operation inside the facility" },
          { label: "MAXEK BUSINESS HUB", to: "/verticals/maxek-business-hub", description: "Brand, growth, people and technology support" },
          { label: "Knowledge Center", to: "/knowledge-center", description: "Engineering insights and case studies" },
        ]}
      />
    </>
  );
}
