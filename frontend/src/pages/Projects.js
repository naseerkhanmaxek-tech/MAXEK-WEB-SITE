import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import SEO, { breadcrumbSchema, imageObjectSchema } from "@/components/common/SEO";
import PageHero from "@/components/common/PageHero";
import Section, { SectionHeader, Stagger, StaggerItem } from "@/components/common/Section";
import { ProjectCard } from "@/components/common/Cards";
import CTASection from "@/components/common/CTASection";
import { fetchProjects } from "@/lib/api";
import { OFFICIAL } from "@/lib/images";

const CRUMBS = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
];

const VERTICAL_TABS = [
  { id: "maxek-infra", label: "MAXEK INFRA" },
  { id: "maxek-solutions", label: "MAXEK TECHNOLOGIES" },
  { id: "maxek-business-hub", label: "MAXEK BUSINESS HUB" },
];

const INFRA_SECTORS = [
  { id: "industrial", label: "Industrial" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
];

const SOLUTIONS_CATEGORIES = [
  { id: "digital-platforms", label: "Digital Platforms" },
];

const VERTICAL_IDS = VERTICAL_TABS.map((tab) => tab.id);

const initialVerticalFromHash = () => {
  const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
  return VERTICAL_IDS.includes(hash) ? hash : "maxek-infra";
};

export default function Projects() {
  const [activeVertical, setActiveVertical] = useState(initialVerticalFromHash);
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects", "all"],
    queryFn: () => fetchProjects(),
  });

  // Handle switching vertical tabs
  const handleVerticalChange = (verticalId) => {
    setActiveVertical(verticalId);
    setActiveFilter("all");
  };

  // Filter projects by active vertical
  const verticalProjects = useMemo(() => {
    return projects.filter((p) => p.vertical_slug === activeVertical);
  }, [projects, activeVertical]);

  // Apply sub-filter
  const displayProjects = useMemo(() => {
    if (activeFilter === "all") return verticalProjects;
    
    return verticalProjects.filter((p) => {
      if (activeVertical === "maxek-infra") {
        return p.sector?.toLowerCase() === activeFilter;
      }
      if (activeVertical === "maxek-solutions") {
        return p.sector?.toLowerCase().replace(/\s+/g, '-') === activeFilter;
      }
      return true;
    });
  }, [verticalProjects, activeFilter, activeVertical]);

  // Determine sub-filters to show based on vertical
  const subFilters = activeVertical === "maxek-infra" 
    ? INFRA_SECTORS 
    : activeVertical === "maxek-solutions" 
      ? SOLUTIONS_CATEGORIES 
      : [];

  return (
    <>
      <SEO
        title="Project Portfolio | MAXEK India"
        description="Discover engineering, digital transformation, and business growth projects delivered by MAXEK."
        path="/projects"
        keywords="Engineering Projects, Industrial Projects, Construction Portfolio, Case Studies, Digital Platforms, MAXEK Technologies"
        schemas={[
          breadcrumbSchema(CRUMBS),
          ...(projects.length ? [imageObjectSchema(projects)] : []),
        ]}
      />

      <PageHero
        kicker="Projects"
        title="Our Portfolio"
        support="Explore selected projects demonstrating our expertise across engineering execution, digital solutions, and business transformation."
        image={OFFICIAL.projects.heroDiagram}
        imageAlt="Isometric diagram of MAXEK's project ecosystem across industrial infrastructure, commercial buildings, and technology operations"
        overlay="left"
        breadcrumbs={CRUMBS}
      />

      <Section id="portfolio">
        <SectionHeader
          kicker="Portfolio"
          title="Selected work across the group"
          support="Every project below is delivered by one of MAXEK's three business verticals — filter by division to see engineering execution, digital platforms, and business transformation work side by side."
          align="split"
          className="mb-14 md:mb-16"
        />

        {/* Top Level Vertical Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 md:mb-10">
          {VERTICAL_TABS.map((tab) => {
            const isActive = activeVertical === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleVerticalChange(tab.id)}
                className={`rounded-full px-5 py-2.5 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-premium ${
                  isActive
                    ? "bg-maxek-navy text-white shadow-md"
                    : "bg-maxek-navy border border-white/10 text-white hover:border-maxek-red/40 hover:text-maxek-red"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Sub-Filters (only if vertical has projects) */}
        {activeVertical !== "maxek-business-hub" && (
          <div className="flex flex-wrap items-center gap-2 border-b border-maxek-border pb-6 mb-10">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.75rem] font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${
                activeFilter === "all"
                  ? "border-maxek-red bg-maxek-navy text-maxek-red"
                  : "border-transparent bg-maxek-border text-maxek-navy hover:border-maxek-red/40 hover:text-maxek-red"
              }`}
            >
              All
              <span className="text-[10px] opacity-70">({verticalProjects.length})</span>
            </button>
            {subFilters.map((filter) => {
              const count = verticalProjects.filter(p => {
                if (activeVertical === "maxek-infra") return p.sector?.toLowerCase() === filter.id;
                if (activeVertical === "maxek-solutions") return p.sector?.toLowerCase().replace(/\s+/g, '-') === filter.id;
                return false;
              }).length;

              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.75rem] font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${
                    isActive
                      ? "border-maxek-red bg-maxek-navy text-maxek-red"
                      : "border-transparent bg-maxek-border text-maxek-navy hover:border-maxek-red/40 hover:text-maxek-red"
                  }`}
                >
                  {filter.label}
                  <span className="text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] rounded-card bg-maxek-surface" />
                <div className="mt-5 h-6 w-3/4 rounded bg-maxek-surface" />
              </div>
            ))}
          </div>
        ) : displayProjects.length > 0 ? (
          <Stagger key={`${activeVertical}-${activeFilter}`} className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project, index) => (
              <StaggerItem key={project.slug} className="h-full">
                <ProjectCard project={project} index={index} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <div className="py-12 text-center text-maxek-text">
            No projects found for the selected category.
          </div>
        )}
      </Section>

      <CTASection />
    </>
  );
}