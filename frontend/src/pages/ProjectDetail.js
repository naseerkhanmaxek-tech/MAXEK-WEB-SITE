import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Building2, CalendarDays, Layers, MapPin, Tag } from "lucide-react";
import SEO, { breadcrumbSchema, imageObjectSchema } from "@/components/common/SEO";
import PageHero from "@/components/common/PageHero";
import Section, { Kicker, Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/common/Section";
import { Icon, ProjectCard } from "@/components/common/Cards";
import Btn from "@/components/common/Btn";
import CTASection from "@/components/common/CTASection";
import { fetchProject, fetchProjects } from "@/lib/api";
import { VERTICALS } from "@/lib/site";
import { cn } from "@/lib/utils";

const NARRATIVE = [
  { key: "challenges", label: "Challenges", icon: "AlertTriangle" },
  { key: "solutions", label: "Solutions", icon: "Lightbulb" },
  { key: "results", label: "Results", icon: "TrendingUp" },
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: project, isLoading, isError } = useQuery({
    queryKey: ["project", slug],
    queryFn: () => fetchProject(slug),
    retry: false,
  });
  const { data: all = [] } = useQuery({
    queryKey: ["projects", "all"],
    queryFn: () => fetchProjects(),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-maxek-red" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <>
        <SEO title="Project not found | MAXEK India" description="The requested project could not be found." path={`/projects/${slug}`} noindex />
        <Section className="pt-40">
          <h1 className="text-display-1">Project not found</h1>
          <p className="mt-5 text-lg text-maxek-text">
            The project you are looking for is not available.
          </p>
          <Btn to="/projects" variant="primary" className="mt-9 border border-maxek-border">
            View all projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Btn>
        </Section>
      </>
    );
  }

  const vertical = VERTICALS.find((v) => v.slug === project.vertical_slug);
  const crumbs = [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: project.title, to: `/projects/${project.slug}` },
  ];
  const related = all
    .filter((p) => p.slug !== project.slug && p.vertical_slug === project.vertical_slug)
    .slice(0, 3);

  const META = [
    { label: "Industry", value: project.industry, icon: Tag },
    { label: "Business Vertical", value: project.vertical, icon: Layers },
    { label: "Location", value: project.location, icon: MapPin },
    { label: "Year", value: project.year, icon: CalendarDays },
    { label: "Status", value: project.status, icon: Building2 },
  ];

  const isSolutions = project.vertical_slug === "maxek-solutions";

  return (
    <>
      <SEO
        title={`${project.title} | MAXEK India Projects`}
        description={project.summary}
        path={`/projects/${project.slug}`}
        type="article"
        image={project.image?.startsWith("http") ? project.image : `https://www.maxekindia.com${project.image}`}
        keywords={`${project.industry || project.sector}, ${project.vertical || project.vertical_slug}, ${project.location || 'India'}, Engineering Projects, MAXEK`}
        schemas={[breadcrumbSchema(crumbs), imageObjectSchema([project])]}
      />

      <PageHero
        kicker={isSolutions ? "PROJECT / MAXEK TECHNOLOGIES" : project.vertical || "MAXEK INFRA"}
        title={project.title}
        support={isSolutions ? project.core_purpose : project.summary}
        image={project.image}
        imageAlt={`${project.title} project`}
        breadcrumbs={crumbs}
      />

      {isSolutions ? (
        <>
          {/* SOLUTIONS LAYOUT */}
          <Section id="overview">
            {project.videos?.length ? (
              <Reveal className="mb-14 lg:mb-16">
                <Kicker className="mb-4">Project Videos</Kicker>
                <h2 className="text-display-2 text-maxek-navy">See {project.title} in action</h2>
                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  {project.videos.map((video, index) => (
                    <figure
                      key={video.src}
                      className="overflow-hidden rounded-card border border-white/10 bg-maxek-navy shadow-card"
                    >
                      <figcaption className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                        <span className="flex gap-1.5" aria-hidden="true">
                          <span className="h-2.5 w-2.5 rounded-full bg-maxek-red" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        </span>
                        <span className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-white/65">
                          {video.title}
                        </span>
                      </figcaption>
                      <video
                        className="aspect-video w-full bg-black object-contain"
                        controls
                        playsInline
                        preload="metadata"
                        poster={project.image}
                        data-testid={`project-video-${index + 1}`}
                        aria-label={video.title}
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support HTML video.
                      </video>
                    </figure>
                  ))}
                </div>
              </Reveal>
            ) : null}

            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-8">
                <Kicker className="mb-7">Overview</Kicker>
                <p className="text-xl font-medium leading-relaxed text-maxek-navy text-pretty">
                  {project.summary}
                </p>
                
                <div className="mt-12">
                  <h2 className="text-display-3 text-maxek-navy">ABOUT THE PLATFORM</h2>
                  <p className="mt-6 text-[0.9375rem] leading-relaxed text-maxek-text">
                    {project.about_platform}
                  </p>
                </div>

                <div className="mt-12">
                  <h2 className="text-display-3 text-maxek-navy mb-6">PLATFORM CAPABILITIES</h2>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {project.features?.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.875rem] font-mono tracking-wide text-maxek-text">
                        <Icon name="Check" className="mt-1 h-4 w-4 shrink-0 text-maxek-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal className="lg:col-span-4" delay={0.1}>
                <dl
                  className="divide-y divide-white/10 overflow-hidden rounded-card border border-white/10 bg-maxek-navy"
                  data-testid="project-meta-table-solutions"
                >
                  <div className="flex flex-col gap-1 px-6 py-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">DEVELOPED BY</dt>
                    <dd className="mt-1 text-[0.9375rem] font-medium text-white">{project.developed_by}</dd>
                  </div>
                  <div className="flex flex-col gap-1 px-6 py-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">ROLE</dt>
                    <dd className="mt-1 text-[0.9375rem] font-medium text-white">{project.role}</dd>
                  </div>
                  <div className="flex flex-col gap-1 px-6 py-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">CLIENT</dt>
                    <dd className="mt-1 text-[0.9375rem] font-medium text-white">{project.client}</dd>
                  </div>
                </dl>

                {project.who_it_serves && (
                  <div className="mt-8 rounded-card border border-maxek-border bg-maxek-surface p-6">
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-maxek-red mb-4">WHO IT SERVES</h3>
                    <ul className="space-y-3">
                      {project.who_it_serves.map((item) => (
                        <li key={item} className="text-[0.875rem] text-maxek-navy flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-maxek-navy opacity-50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
            </div>
          </Section>
        </>
      ) : (
        <>
          {/* INFRA LAYOUT */}
          {/* Overview + metadata */}
          <Section id="overview">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-7">
                <Kicker className="mb-7">Overview</Kicker>
                <p className="text-lg leading-relaxed text-maxek-text text-pretty">
                  {project.overview}
                </p>

                <h2 className="mt-12 text-display-3 text-maxek-navy">Scope</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {(project.scope || []).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-maxek-text">
                      <Icon name="Check" className="mt-1 h-4 w-4 shrink-0 text-maxek-red" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="lg:col-span-5" delay={0.1}>
                <dl
                  className="divide-y divide-white/10 overflow-hidden rounded-card border border-white/10 bg-maxek-navy"
                  data-testid="project-meta-table"
                >
                  {META.filter((row) => row.value).map((row) => (
                    <div key={row.label} className="flex items-start gap-4 px-6 py-5">
                      <row.icon className="mt-0.5 h-4 w-4 shrink-0 text-maxek-red" strokeWidth={1.6} aria-hidden="true" />
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                          {row.label}
                        </dt>
                        <dd className="mt-1 text-[0.9375rem] font-medium text-white">{row.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>

                {vertical ? (
                  <Link
                    to={`/verticals/${vertical.slug}`}
                    className="mt-6 flex items-center justify-between rounded-card border border-maxek-border bg-maxek-surface p-5 [transition:border-color_.25s_ease] hover:border-maxek-red/40"
                    data-testid="project-vertical-link"
                  >
                    <span>
                      <span className="block text-[0.9375rem] font-semibold text-maxek-navy">
                        {vertical.name}
                      </span>
                      <span className="block text-[0.8125rem] text-maxek-muted mt-1">{vertical.subtitle}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-maxek-red shrink-0" aria-hidden="true" />
                  </Link>
                ) : null}
              </Reveal>
            </div>
          </Section>

          {/* Gallery */}
          {project.gallery?.length ? (
            <Section dark id="gallery">
              <SectionHeader light kicker="Gallery" title="Project gallery" />
              <Stagger
                className={cn(
                  "mt-12 grid gap-5",
                  project.gallery.length > 1 ? "md:grid-cols-3" : "grid-cols-1"
                )}
              >
                {project.gallery.map((src, i) => (
                  <StaggerItem key={`${src}-${i}`}>
                    <figure className="group overflow-hidden rounded-card border border-white/10 bg-maxek-navy shadow-card">
                      <img
                        src={src}
                        alt={`${project.title} — gallery image ${i + 1}`}
                        title={project.title}
                        className={cn(
                          "image-zoom w-full object-cover",
                          project.gallery.length > 1 ? "aspect-[4/3]" : "aspect-[16/9] md:aspect-[21/9]"
                        )}
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                  </StaggerItem>
                ))}
              </Stagger>
            </Section>
          ) : null}

          {/* Challenges / Solutions / Results */}
          <Section id="narrative">
            <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
              {NARRATIVE.map((block, i) => (
                <Reveal key={block.key} delay={i * 0.08} className="card-surface h-full lg:p-9 border border-maxek-border bg-maxek-surface transition-colors duration-300 hover:bg-white">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-maxek-red border border-maxek-border shadow-sm">
                      <Icon name={block.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-maxek-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-6 text-display-3 text-maxek-navy">{block.label}</h2>
                  <ul className="mt-6 space-y-4">
                    {(project[block.key] || []).map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-maxek-text">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-maxek-red" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* Related projects */}
      {related.length ? (
        <Section dark>
          <SectionHeader
            light
            kicker="Related"
            title={`More from ${project.vertical || project.vertical_slug}`}
            actions={
              <Btn to="/projects" variant="outline">
                View All Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Btn>
            }
          />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-7">
            {related.map((p, index) => (
              <StaggerItem key={p.slug} className="h-full">
                <ProjectCard project={p} index={index} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      ) : null}

      <CTASection prefill={{ business_vertical: project.vertical || project.vertical_slug, service_required: project.industry || project.sector }} />
    </>
  );
}
