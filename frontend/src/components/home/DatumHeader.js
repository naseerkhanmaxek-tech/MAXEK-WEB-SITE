import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { LOGOS, NAV_LINKS } from "@/lib/site";

export default function DatumHeader() {
  const { openEnquiry } = useEnquiry();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        id="datum-header"
        className="fixed inset-x-0 top-0 h-[100px] z-[60] flex items-center justify-between px-6 md:px-8 xl:px-10 pt-6 md:pt-8 xl:pt-9 pb-4 md:pb-6 pointer-events-auto"
        style={{ isolation: 'isolate' }}
      >
        {/* Unified Background Layer (+2px bottom mask) */}
        <div 
          className={`absolute inset-x-0 top-0 z-[-1] pointer-events-none transition-colors duration-300 ease-out ${
            scrolled ? "bg-white border-b border-maxek-border" : "bg-transparent border-b border-transparent"
          }`}
          style={{ bottom: '-2px' }}
        />
        {/* Small Left Logo Area - Official Logo */}
        <div className="flex shrink-0 items-center">
          <Link to="/" aria-label="Home">
            <img 
              src={scrolled ? LOGOS.dark : LOGOS.light} 
              alt="MAXEK" 
              className={`w-[75px] md:w-[80px] xl:w-[85px] object-contain transition-opacity duration-300 hover:opacity-100 ${
                scrolled ? "opacity-100" : "opacity-90"
              }`}
            />
          </Link>
        </div>

        {/* MOBILE & TABLET: Menu Trigger */}
        <div className="flex xl:hidden items-center">
          <button 
            type="button"
            aria-label="Open Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className={`flex h-10 w-10 md:h-11 md:w-11 items-center justify-center border transition-colors duration-300 ease-out ${
              scrolled 
                ? "border-maxek-border text-maxek-navy hover:bg-maxek-surface" 
                : "border-white/20 text-white/90 hover:bg-white/5"
            }`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* DESKTOP: Center Navigation */}
        <nav className="hidden items-center gap-10 xl:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isActive = link.to === "/";
            
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`group relative flex items-center gap-1.5 text-[13.5px] font-mono font-medium uppercase tracking-[0.1em] transition-colors duration-300 ease-out
                  ${isActive 
                    ? (scrolled ? "text-maxek-navy" : "text-white") 
                    : (scrolled ? "text-maxek-navy/70 hover:text-maxek-red" : "text-white/70 hover:text-white")
                  }
                `}
              >
                {isActive && (
                  <span className="h-1 w-1 rounded-full bg-maxek-red opacity-80" />
                )}
                {link.label}
                {link.children && <ChevronDown className="h-3 w-3 opacity-40 transition-opacity duration-300 group-hover:opacity-100" />}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP: Right Actions - Architectural Restraint */}
        <div className="hidden xl:flex items-center">
          <button
            onClick={() => openEnquiry()}
            className={`group relative overflow-hidden flex items-center gap-3 border px-6 py-2.5 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:border-maxek-red/50 focus-visible:ring-1 focus-visible:ring-maxek-red/50 active:translate-y-[1px] ${
              scrolled
                ? "border-maxek-border bg-white hover:bg-maxek-red/5 text-maxek-navy"
                : "border-white/25 bg-transparent hover:bg-white/5 text-white/90 hover:text-white"
            }`}
          >
            <span className="relative z-10 h-1 w-1 bg-maxek-red/80 transition-transform duration-[400ms] group-hover:translate-x-[3px] motion-reduce:transition-none" />
            <span className="relative z-10 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ease-out">
              Business Enquiry
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
