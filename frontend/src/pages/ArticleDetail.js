import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarDays, Clock, User } from "lucide-react";
import SEO, { articleSchema, breadcrumbSchema } from "@/components/common/SEO";
import PageHero from "@/components/common/PageHero";
import Section, { Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/common/Section";
import { ArticleCard, Icon } from "@/components/common/Cards";
import Btn from "@/components/common/Btn";
import CTASection from "@/components/common/CTASection";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { fetchArticle, fetchArticles } from "@/lib/api";
import { VERTICALS } from "@/lib/site";

const formatDate = (value) => {
  try {
    return new Date(value).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return value;
  }
};

export default function ArticleDetail() {
  const { slug } = useParams();
  const { openEnquiry } = useEnquiry();
  const { data: article, isLoading, isError } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchArticle(slug),
    retry: false,
  });
  const { data: all = [] } = useQuery({
    queryKey: ["articles", "All"],
    queryFn: () => fetchArticles(),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-maxek-red" />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <>
        <SEO title="Article not found | MAXEK India" description="The requested article could not be found." path={`/knowledge-center/${slug}`} noindex />
        <Section className="pt-40">
          <h1 className="text-display-1">Article not found</h1>
          <p className="mt-5 text-lg text-maxek-text">This resource is not available.</p>
          <Btn to="/knowledge-center" variant="primary" className="mt-9 border border-maxek-border">
            Explore Insights
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Btn>
        </Section>
      </>
    );
  }

  const crumbs = [
    { label: "Home", to: "/" },
    { label: "Knowledge Center", to: "/knowledge-center" },
    { label: article.title, to: `/knowledge-center/${article.slug}` },
  ];
  const relatedVertical = VERTICALS.find((v) => v.slug === article.related_vertical);
  const related = all.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <SEO
        title={`${article.title} | MAXEK Knowledge Center`}
        description={article.excerpt}
        path={`/knowledge-center/${article.slug}`}
        type="article"
        image={article.image}
        keywords={(article.tags || []).join(", ")}
        schemas={[breadcrumbSchema(crumbs), articleSchema(article)]}
      />

      <PageHero
        kicker={article.category}
        title={article.title}
        support={article.excerpt}
        image={article.image}
        imageAlt={article.title}
        breadcrumbs={crumbs}
        compact
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <article className="prose-maxek lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-maxek-border pb-6 font-mono text-[11px] uppercase tracking-[0.14em] text-maxek-muted">
              <span className="inline-flex items-center gap-2">
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                {article.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                {formatDate(article.published_on)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {article.read_minutes} min read
              </span>
            </div>

            {(article.body || []).map((block, i) => {
              if (block.type === "heading") {
                return <h2 key={i} className="text-display-3 text-maxek-navy mt-12 mb-6">{block.text}</h2>;
              }
              if (block.type === "list") {
                return (
                  <ul key={i}>
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-[1.75] text-maxek-text mb-2">
                        <Icon name="Check" className="mt-1.5 h-4 w-4 shrink-0 text-maxek-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="my-10 border-l-2 border-maxek-red pl-6 font-heading text-xl leading-snug text-maxek-navy"
                  >
                    {block.text}
                  </blockquote>
                );
              }
              return <p key={i} className="mb-6 text-[1.0625rem] leading-[1.75] text-maxek-text">{block.text}</p>;
            })}

            {article.tags?.length ? (
              <ul className="mt-12 flex flex-wrap gap-2 border-t border-maxek-border pt-8">
                {article.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-maxek-border bg-maxek-surface px-3 py-1 text-[12px] text-maxek-text"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}

            {article.download_url ? (
              <div className="mt-10 rounded-card border border-maxek-border bg-maxek-surface p-7">
                <h2 className="mt-0 text-display-3 text-maxek-navy">Request this document</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-maxek-text">
                  Submit an enquiry and our team will share the current edition
                  directly with you.
                </p>
                <Btn
                  variant="red"
                  className="mt-6"
                  onClick={() =>
                    openEnquiry({
                      service_required: "Other",
                      project_details: `Please send me the ${article.title}.`,
                    })
                  }
                  data-testid="article-download-request-button"
                >
                  Download Brochure
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Btn>
              </div>
            ) : null}
          </article>

          {/* Internal linking rail */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {relatedVertical ? (
                <Link
                  to={`/verticals/${relatedVertical.slug}`}
                  className="flex flex-col rounded-card border border-white/10 bg-maxek-navy p-5 shadow-card [transition:border-color_.25s_ease] hover:border-maxek-red/40"
                  data-testid="article-related-vertical-link"
                >
                  <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                    Relevant service
                  </span>
                  <span className="mt-1 block text-[0.9375rem] font-semibold text-white">
                    {relatedVertical.name}
                  </span>
                </Link>
              ) : null}

              <div className="rounded-card border border-maxek-border bg-maxek-surface p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-maxek-muted">
                  Explore further
                </p>
                <ul className="mt-4 space-y-3">
                  {article.related_industry ? (
                    <li>
                      <Link to="/industries" className="link-underline text-[0.9375rem] text-maxek-navy" data-testid="article-related-industry-link">
                        {article.related_industry} sector
                      </Link>
                    </li>
                  ) : null}
                  <li>
                    <Link to="/projects" className="link-underline text-[0.9375rem] text-maxek-navy">
                      Related case studies
                    </Link>
                  </li>
                  <li>
                    <Link to="/knowledge-center" className="link-underline text-[0.9375rem] text-maxek-navy">
                      All insights
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="link-underline text-[0.9375rem] text-maxek-navy">
                      Contact MAXEK
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {related.length ? (
        <Section dark>
          <SectionHeader light kicker="More insights" title="Continue reading" />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-7">
            {related.map((a) => (
              <StaggerItem key={a.slug} className="h-full">
                <ArticleCard article={a} compact />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      ) : null}

      <CTASection />
    </>
  );
}
