import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import SEO, { breadcrumbSchema } from "@/components/common/SEO";
import PageHero from "@/components/common/PageHero";
import Section, { Reveal, Stagger, StaggerItem } from "@/components/common/Section";
import { ArticleCard } from "@/components/common/Cards";
import CTASection from "@/components/common/CTASection";
import { fetchArticles } from "@/lib/api";
import { ARTICLE_CATEGORIES } from "@/lib/site";
import { STOCK } from "@/lib/images";

const CRUMBS = [
  { label: "Home", to: "/" },
  { label: "Knowledge Center", to: "/knowledge-center" },
];

export default function KnowledgeCenter() {
  const [category, setCategory] = useState("All");
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles", category],
    queryFn: () => fetchArticles(category),
  });

  return (
    <>
      <SEO
        title="Knowledge Center | Insights from MAXEK India"
        description="Articles, industry insights, case studies, technology updates and downloadable resources from MAXEK India's engineering and technology teams."
        path="/knowledge-center"
        keywords="Engineering Insights, Industry Insights, Case Studies, Technology Updates, Engineering Articles, MAXEK Knowledge Center"
        schemas={[breadcrumbSchema(CRUMBS)]}
      />

      <PageHero
        kicker="Knowledge Center"
        title="Insights That Drive Better Decisions"
        support="Stay informed with articles, industry insights, technology updates, case studies, and downloadable resources."
        image={STOCK.blueprints}
        imageAlt="Engineering drawings and technical review at MAXEK"
        breadcrumbs={CRUMBS}
      />

      <Section>
        <div
          className="flex flex-wrap items-center gap-2 border-b border-maxek-border pb-6"
          role="tablist"
          aria-label="Filter insights by category"
          data-testid="knowledge-center-category-filter"
        >
          {ARTICLE_CATEGORIES.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setCategory(cat)}
                className={`rounded-full border px-4 py-2 text-[0.875rem] font-medium [transition:background-color_.25s_ease,border-color_.25s_ease,color_.25s_ease] ${
                  isActive
                    ? "border-maxek-navy bg-maxek-navy text-white"
                    : "border-white/10 bg-maxek-navy text-white hover:border-maxek-red/40 hover:bg-maxek-navy-soft"
                }`}
                data-testid={`knowledge-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {isLoading ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[400px] animate-pulse rounded-card border border-maxek-border bg-maxek-surface" />
            ))}
          </div>
        ) : articles.length ? (
          <>
            {/* Featured — the most recent piece in the current filter, editorial split layout */}
            <Reveal key={`featured-${category}`} className="mt-14">
              <Link
                to={`/knowledge-center/${articles[0].slug}`}
                className="group grid overflow-hidden rounded-card border border-transparent bg-maxek-red shadow-card transition-[box-shadow,background-color] duration-500 hover:bg-[#CC1A20] hover:shadow-card-hover lg:grid-cols-2"
                data-testid="knowledge-center-featured-link"
              >
                <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
                  <img
                    src={articles[0].image}
                    alt={articles[0].title}
                    title={articles[0].title}
                    className="image-zoom h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                  <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.15em] text-white/90">
                    {articles[0].category} • {articles[0].read_minutes} min read
                  </p>
                  <h2 className="mt-4 text-display-2 leading-tight text-balance text-white">
                    {articles[0].title}
                  </h2>
                  <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-white/90">
                    {articles[0].excerpt}
                  </p>
                  <div className="mt-9 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300">
                    Read Insight
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </Reveal>

            {articles.length > 1 && (
              <Stagger key={category} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {articles.slice(1).map((article) => (
                  <StaggerItem key={article.slug} className="h-full">
                    <ArticleCard article={article} />
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </>
        ) : (
          <p className="mt-16 text-center text-maxek-text" data-testid="knowledge-empty-state">
            No resources published in this category yet.
          </p>
        )}
      </Section>

      <CTASection />
    </>
  );
}
