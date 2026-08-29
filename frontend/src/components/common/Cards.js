// src/components/common/Cards.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import * as Icons from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { VERTICALS } from "@/lib/site";

const VERTICAL_LABELS = Object.fromEntries(
  VERTICALS.map((v) => [v.slug, v.name.replace(/^MAXEK\s+/, "")])
);

/** Resolve a Lucide icon by name with a safe fallback. */
export const Icon = ({ name, className, ...rest }) => {
  const Cmp = Icons[name] || Icons.Circle;
  return <Cmp className={className} strokeWidth={1.6} aria-hidden="true" {...rest} />;
};

/** Icon + title + description card (Why MAXEK, values, benefits, industries). */
export const FeatureCard = ({
  icon,
  title,
  description,
  className,
  testId,
  premiumHover = false,
}) => (
  <article
    className={cn(
      "card-surface group h-full",
      premiumHover &&
        "border-maxek-border bg-white transition-colors duration-400 ease-premium hover:border-white/10 hover:bg-[#0B1C38]",
      className
    )}
    data-testid={testId}
  >
    {icon ? (
      <span
        className={cn(
          "mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-maxek-surface text-maxek-red transition-colors duration-400 ease-premium",
          premiumHover && "group-hover:bg-white/[0.08]"
        )}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>
    ) : null}
    <h3
      className={cn(
        "text-lg font-semibold text-maxek-navy transition-colors duration-400 ease-premium",
        premiumHover && "group-hover:text-white"
      )}
    >
      {title}
    </h3>
    <p
      className={cn(
        "mt-3 text-[0.9375rem] leading-relaxed text-maxek-text transition-colors duration-400 ease-premium",
        premiumHover && "group-hover:text-white/85"
      )}
    >
      {description}
    </p>
  </article>
);

/** Project card used on Home, Projects and vertical pages — editorial, image-led. */
export const ProjectCard = ({ project, index, compact = false }) => {
  const category = project.category || project.industry || project.type || project.sector;
  const excerpt = project.excerpt || project.overview || project.summary;
  const verticalLabel = VERTICAL_LABELS[project.vertical_slug];

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-maxek-navy shadow-card transition-[box-shadow,transform] duration-300 ease-premium hover:-translate-y-1 hover:shadow-card-hover"
      data-testid={`project-card-${project.slug}`}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maxek-red focus-visible:ring-offset-2"
        aria-label={`Open project: ${project.title}`}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            compact ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-square md:aspect-[4/3]"
          )}
        >
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-maxek-navy/20 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0" />
          {typeof index === "number" ? (
            <span className="absolute left-5 top-5 font-mono text-[11px] tracking-[0.2em] text-white/80">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
          {verticalLabel ? (
            <span className="absolute right-5 top-5 rounded-full bg-white/95 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-maxek-navy">
              {verticalLabel}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-6 lg:p-7">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white">
            <span className="text-maxek-red">{category}</span>
            <span className="text-white/30" aria-hidden="true">&bull;</span>
            <span>{project.location}</span>
          </div>

          <h3 className="mt-4 text-xl leading-snug text-white">{project.title}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/80">
            {excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
};

/** Knowledge Center article card — self-contained navy card (like ProjectCard)
 * so it renders correctly regardless of whether its parent Section is light
 * or dark. */
export const ArticleCard = ({ article, compact = false }) => {
  const publishedDate = article.published_on || article.date;

  return (
  <article
    className="group relative flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-maxek-navy shadow-card transition-[box-shadow,transform] duration-300 ease-premium hover:-translate-y-1 hover:shadow-card-hover"
    data-testid={`article-card-${article.slug}`}
  >
    <Link to={`/knowledge-center/${article.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${article.title}`} />

    <div className={cn("overflow-hidden bg-white/5", compact ? "aspect-[16/9]" : "aspect-[16/10]")}>
      <img
        src={article.image}
        alt=""
        className="h-full w-full object-cover transition-[transform,filter] duration-700 ease-premium group-hover:scale-105 group-hover:brightness-110"
        loading="lazy"
        aria-hidden="true"
      />
    </div>

    <div className="flex flex-1 flex-col p-6 lg:p-7">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-maxek-red">
          {article.category}
        </span>
        <time dateTime={publishedDate} className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/50">
          {new Date(publishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </time>
        {article.readTime && (
          <span className="ml-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white">
            {article.readTime}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-xl leading-snug text-white group-hover:underline group-hover:underline-offset-4">{article.title}</h3>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-white/80">
        {article.excerpt}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
        Read more
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </div>
  </article>
  );
};

/** Business vertical card — typographic overview. */
export const VerticalCard = ({
  vertical,
  index = 0,
  heroCard = false,
  isHero = false,
  isReceded = false,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <article
      className={cn(
        "group relative isolate flex h-full flex-col overflow-visible rounded-card border border-white/10 bg-maxek-navy p-8 shadow-card transition-[transform,box-shadow,opacity,filter] duration-700 ease-premium lg:p-9",
        heroCard && isHero && "z-30 -translate-y-6 scale-[1.11] shadow-[0_30px_70px_rgba(11,28,56,0.22),0_14px_32px_rgba(11,28,56,0.16),0_4px_12px_rgba(11,28,56,0.08)]",
        heroCard && isReceded && "scale-[0.97] opacity-60",
        !heroCard && "hover:-translate-y-1.5 hover:shadow-card-hover hover:border-white/20",
        heroCard && !shouldReduceMotion && "md:[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-6 md:[@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.11] md:[@media(hover:hover)_and_(pointer:fine)]:hover:z-30 md:[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_30px_70px_rgba(11,28,56,0.22),0_14px_32px_rgba(11,28,56,0.16),0_4px_12px_rgba(11,28,56,0.08)]"
      )}
      data-testid={`vertical-card-${vertical.slug}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={heroCard ? 0 : undefined}
    >
      {!heroCard ? (
        <span
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-maxek-red transition-transform duration-500 ease-premium group-hover:scale-x-100"
          aria-hidden="true"
        />
      ) : null}

      <span className="font-mono text-[12px] tracking-[0.2em] text-white/50">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="mt-4 text-display-3 leading-snug">{vertical.name}</h3>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-maxek-red">
        {vertical.subtitle}
      </p>
      <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/80">
        {vertical.description}
      </p>

      <ul className="mt-7 flex flex-wrap gap-2">
        {vertical.items.slice(0, 5).map((item) => (
          <li
            key={item}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/80"
          >
            {item}
          </li>
        ))}
      </ul>

      <Link
        to={`/verticals/${vertical.slug}`}
        className="link-underline mt-8 self-start text-sm"
        data-testid={`vertical-card-${vertical.slug}-cta`}
      >
        {vertical.cta}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </article>
  );
};

const PROJECT_COLLECTION_TITLES = {
  "maxek-infra": "ENGINEERING &\nINDUSTRIAL PROJECTS",
  "maxek-solutions": "TECHNOLOGY &\nDIGITAL PROJECTS",
  "maxek-business-hub": "BUSINESS TRANSFORMATION\nPROJECTS",
};

/** Project portfolio gateway card — navigates into a vertical's Projects section. */
export const ProjectGatewayCard = ({ vertical, index = 0 }) => {
  const isHighlight = index === 0;
  return (
  <Link
    to={`/projects#${vertical.slug}`}
    className={cn(
      "group relative isolate flex h-full flex-col overflow-hidden rounded-card border p-8 shadow-card transition-[transform,box-shadow,background-color] duration-500 ease-premium hover:-translate-y-2 hover:scale-[1.018] hover:shadow-[0_20px_45px_rgba(0,0,0,0.4),0_8px_20px_rgba(0,0,0,0.3)] focus-visible:-translate-y-2 focus-visible:scale-[1.018] focus-visible:shadow-[0_20px_45px_rgba(0,0,0,0.4),0_8px_20px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maxek-red focus-visible:ring-offset-2 lg:p-9",
      isHighlight ? "bg-maxek-red border-transparent hover:bg-[#CC1A20]" : "bg-maxek-navy border-white/10"
    )}
    data-testid={`project-gateway-${vertical.slug}`}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 origin-bottom scale-y-0 bg-white/5 transition-transform duration-500 ease-premium group-hover:scale-y-100 group-focus:scale-y-100"
    />

    <span className="relative z-10 flex h-full flex-col">
      <span className={cn("font-mono text-[11px] tracking-[0.2em]", isHighlight ? "text-white" : "text-maxek-red")}>
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
        {vertical.name}
      </span>
      <span className="mt-2 block text-display-3 whitespace-pre-line text-white">
        {PROJECT_COLLECTION_TITLES[vertical.slug]}
      </span>

      <span className="mt-auto flex flex-col pt-12">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors duration-300 ease-premium">
          Explore Projects
          <ArrowRight
            className={cn("h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1.5 group-focus:translate-x-1.5", isHighlight ? "text-white" : "text-maxek-red")}
            aria-hidden="true"
          />
        </span>
        <span
          aria-hidden="true"
          className={cn("mt-6 block h-[2px] w-[15%] transition-[width] duration-500 ease-premium group-hover:w-full group-focus:w-full", isHighlight ? "bg-white" : "bg-maxek-red")}
        />
      </span>
    </span>
  </Link>
  );
};

/** Compact stat block used on hero bands and about page. */
export const StatBlock = ({
  value,
  label,
  light = false,
  animated = false,
  target = value,
  prefix = "",
  suffix = "",
  formatValue = (nextValue) => String(nextValue),
  shouldAnimate = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);

  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      return undefined;
    }

    if (shouldReduceMotion) {
      setDisplayValue(target);
      return undefined;
    }

    if (!shouldAnimate) {
      return undefined;
    }

    let frameId = 0;
    const duration = 1400;
    const start = performance.now();
    const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      setDisplayValue(Math.round(target * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [animated, shouldAnimate, shouldReduceMotion, target, value]);

  const visibleValue = animated ? formatValue(displayValue) : value;
  const finalValue = animated ? formatValue(target) : value;

  return (
    <div className="min-w-0">
      <p
        aria-hidden="true"
        className={cn(
          "font-heading text-3xl font-semibold tracking-tight whitespace-nowrap md:text-4xl",
          light ? "text-maxek-navy" : "text-white"
        )}
      >
        {prefix}
        {visibleValue}
        {suffix}
      </p>
      <span className="sr-only">{label}: {finalValue}</span>
      <p
        className={cn(
          "mt-2 font-mono text-[11px] uppercase tracking-[0.14em]",
          light ? "text-maxek-muted" : "text-white/55"
        )}
      >
        {label}
      </p>
    </div>
  );
};
