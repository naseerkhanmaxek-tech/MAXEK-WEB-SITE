import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/common/SEO";
import Btn from "@/components/common/Btn";
import { NAV_LINKS } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page not found | MAXEK India Private Limited"
        description="The page you are looking for is not available. Explore MAXEK's business verticals, projects and services."
        path="/404"
        noindex
      />
      <section className="flex min-h-[85vh] items-center bg-maxek-navy pt-32">
        <div className="shell">
          <p className="kicker">Error 404</p>
          <h1 className="mt-6 text-display-1 text-balance">This page could not be found</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            The page you requested may have been moved or is no longer available.
            Use the links below to continue.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Btn to="/" variant="primary" size="lg" data-testid="notfound-home-button">
              Back to Home
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Btn>
            <Btn to="/contact" variant="outline" size="lg">
              Contact Us
            </Btn>
          </div>

          <nav className="mt-14 border-t border-white/10 pt-10" aria-label="Site sections">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
              Explore
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="link-underline text-[0.9375rem]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
