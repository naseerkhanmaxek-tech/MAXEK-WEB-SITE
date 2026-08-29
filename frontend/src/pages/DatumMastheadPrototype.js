import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { NAV_LINKS, LOGOS } from "@/lib/site";

// ZONE A — HEADER (Minimal local header for the prototype)
function PrototypeHeader() {
  const { openEnquiry } = require("@/components/enquiry/EnquiryContext").useEnquiry();

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 md:px-8 xl:px-10 pt-6 md:pt-8 xl:pt-9 pb-4 md:pb-6 border-b border-white/5 pointer-events-auto">
      {/* Small Left Logo Area - Official Logo */}
      <div className="flex shrink-0 items-center">
        <Link to="/" aria-label="Home">
          <img 
            src={LOGOS.light} 
            alt="MAXEK" 
            className="w-[75px] md:w-[80px] xl:w-[85px] object-contain opacity-90 transition-opacity hover:opacity-100" 
          />
        </Link>
      </div>

      {/* MOBILE & TABLET: Menu Trigger */}
      <div className="flex xl:hidden items-center">
        <button 
          aria-label="Open Menu"
          className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center border border-white/20 text-white/90 transition-colors hover:bg-white/5"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* DESKTOP: Center Navigation */}
      <nav className="hidden items-center gap-10 xl:flex" aria-label="Primary">
        {NAV_LINKS.map((link) => {
          const isActive = link.label === "Home";
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`group relative flex items-center gap-1.5 text-[13.5px] font-mono font-medium uppercase tracking-[0.1em] transition-colors
                ${isActive ? "text-white" : "text-white/70 hover:text-white"}
              `}
            >
              {isActive && (
                <span className="h-1 w-1 rounded-full bg-maxek-red opacity-80" />
              )}
              {link.label}
              {link.children && <ChevronDown className="h-3 w-3 opacity-40 transition-opacity group-hover:opacity-100" />}
            </Link>
          );
        })}
      </nav>

      {/* DESKTOP: Right Actions - Architectural Restraint */}
      <div className="hidden xl:flex items-center">
        <button
          onClick={() => openEnquiry()}
          className="group relative flex items-center gap-3 border border-white/15 bg-transparent px-6 py-2.5 transition-colors hover:border-white/30"
        >
          <span className="h-1 w-1 bg-maxek-red/80" />
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors">
            Business Enquiry
          </span>
        </button>
      </div>
    </header>
  );
}

export default function DatumMastheadPrototype() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[100svh] w-full flex-col bg-[#0B1221] text-white font-sans selection:bg-maxek-red/20 selection:text-white">
      <PrototypeHeader />

      {/* ZONE B — PRIMARY HERO CONTENT */}
      {/* Increased md:pb-20 to push the datum further down and balance the 1024px vertical height */}
      <main className="flex-1 flex flex-col justify-center px-6 md:px-8 xl:px-10 pt-28 md:pt-32 pb-10 md:pb-20 xl:pb-24">
        {/* Single column on mobile/tablet, grid on desktop */}
        <div className="flex flex-col xl:grid xl:w-full xl:grid-cols-12 xl:gap-10">
          
          {/* LEFT: Dominant Brand Territory */}
          <div className="xl:col-span-7 flex flex-col justify-center xl:pr-12">
            
            <div className="mb-4 md:mb-5 xl:mb-6 flex items-center gap-3 xl:gap-4">
              <span className="h-[1px] w-8 md:w-10 xl:w-12 bg-maxek-red" />
              <span className="font-mono text-[8px] md:text-[9px] xl:text-[10px] uppercase tracking-[0.3em] text-white/60">
                Integrated Engineering Group
              </span>
            </div>

            {/* Giant Masthead Typography - Responsive Fluidity */}
            <h1 className="font-heading text-[21vw] md:text-[15vw] lg:text-[130px] xl:text-[190px] font-bold leading-[0.85] tracking-[-0.04em] text-white">
              MA<span className="text-maxek-red">X</span>EK
            </h1>
            
            <span className="font-heading text-xs md:text-sm lg:text-lg xl:text-xl font-medium tracking-[0.25em] text-white/40 mt-3 md:mt-4 xl:mt-6 block pl-1">
              PRIVATE LIMITED
            </span>
          </div>

          {/* RIGHT: Business Message */}
          <div className="xl:col-span-5 flex flex-col justify-center xl:pl-10 xl:border-l xl:border-white/10 mt-6 md:mt-8 xl:mt-10">
            
            <h2 className="font-heading text-3xl md:text-[36px] xl:text-[40px] font-semibold leading-[1.2] md:leading-[1.15] tracking-[-0.02em] text-white">
              Engineering Tomorrow.
              <br />
              <span className="text-[0.9em] md:text-[1em] font-medium md:font-semibold text-white/80">Building Sustainable Growth.</span>
            </h2>

            <p className="mt-5 md:mt-6 max-w-[260px] md:max-w-[400px] xl:max-w-md text-[16px] md:text-[17px] leading-relaxed text-white/50">
              Creating value through engineering, technology, and innovation.
            </p>

            {/* CTAs return to horizontal on md (tablet) */}
            <div className="mt-8 md:mt-10 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 w-full xl:w-auto">
              <button 
                className="group flex w-full md:w-auto items-center justify-center gap-4 border border-white/10 px-8 py-4 md:py-3.5 transition-colors hover:bg-white/5"
                onClick={() => {}}
              >
                <span className="font-mono text-[11px] md:text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 group-hover:text-maxek-red transition-colors">
                  Explore MAXEK
                </span>
                <ArrowRight className="h-4 w-4 md:h-3.5 md:w-3.5 text-maxek-red" />
              </button>
              <button 
                className="group flex w-full md:w-auto items-center justify-center gap-2 border-t md:border-t-0 md:border-b border-white/5 md:border-transparent py-4 md:py-3.5 text-white/50 transition-all hover:border-white/30 hover:text-white"
                onClick={() => navigate("/contact")}
              >
                <span className="font-mono text-[11px] md:text-[10px] font-medium uppercase tracking-[0.2em]">
                  Contact ↗
                </span>
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER WRAPPER FOR ZONE C & D */}
      <footer className="w-full px-6 md:px-8 xl:px-10 pb-10 md:pb-12 xl:pb-8 mt-auto">
        
        {/* =========================================
            ZONE C — DATUM SYSTEM 
            ========================================= */}
            
        {/* DESKTOP & TABLET DATUM (Hidden on mobile) */}
        <div className="hidden md:block w-full mb-8">
          <div className="flex items-end justify-between pb-2">
            <span className="font-mono text-[9px] md:text-[10px] xl:text-[9px] tracking-[0.25em] text-white/30">00 &nbsp;&nbsp;&nbsp; DATUM 00</span>
            <span className="font-mono text-[9px] md:text-[10px] xl:text-[9px] tracking-[0.25em] text-white/30">01 / 03</span>
          </div>
          
          <div className="relative flex h-[1px] w-full items-center bg-white/10">
            {[0, 10, 20, 30, 40, 60, 70, 80, 90, 100].map((pos) => (
              <span key={pos} className="absolute h-1 w-px bg-white/20" style={{ left: `${pos}%` }} />
            ))}
            <div className="absolute left-1/2 flex flex-col items-center -translate-x-1/2">
              <div className="h-1 w-1 rounded-full bg-maxek-red/80" />
              <span className="absolute top-2.5 font-mono text-[8px] md:text-[9px] xl:text-[8px] tracking-[0.2em] text-maxek-red/70 whitespace-nowrap">
                +000 / CAL
              </span>
            </div>
          </div>
        </div>

        {/* MOBILE DATUM (Hidden on desktop & tablet) */}
        <div className="block md:hidden w-full mb-8 pt-6">
          <div className="flex flex-col items-center justify-center">
            <span className="font-mono text-[8px] tracking-[0.25em] text-white/30 mb-3 uppercase">
              00 / Datum
            </span>
            <div className="relative flex h-[1px] w-full max-w-[200px] items-center bg-white/10">
              <div className="absolute left-1/2 flex flex-col items-center -translate-x-1/2">
                <div className="h-1.5 w-1.5 rounded-full bg-maxek-red/80" />
              </div>
            </div>
            <span className="font-mono text-[8px] tracking-[0.2em] text-maxek-red/70 mt-3">
              +000 / CAL
            </span>
          </div>
        </div>

        {/* =========================================
            ZONE D — BUSINESS INDEX 
            ========================================= */}
            
        {/* On mobile: vertical stack. On tablet/desktop: 3-column grid. */}
        {/* Increased md:gap-10 to give tablet columns more breathing room */}
        <div className="flex flex-col md:grid md:w-full md:grid-cols-3 gap-6 md:gap-10 xl:gap-8">
          
          <div className="flex flex-col border-t border-white/5 md:border-transparent hover:border-white/10 transition-colors pt-3 md:pt-4 xl:pt-2">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[10px] font-medium text-maxek-red/80">01</span>
              <span className="font-mono text-[8px] md:text-[9px] xl:text-[8px] tracking-[0.2em] text-white/20">MXK-I</span>
            </div>
            <h3 className="font-heading text-lg tracking-[0.1em] text-white/90 mb-2">INFRA</h3>
            <p className="font-sans text-xs md:text-[13px] xl:text-xs leading-relaxed md:leading-[1.7] xl:leading-relaxed text-white/40 md:w-[90%] xl:w-[85%]">
              Structural engineering, civil works and industrial execution at scale.
            </p>
          </div>

          <div className="flex flex-col border-t border-white/5 md:border-l md:border-white/5 md:pl-6 xl:pl-8 md:border-t-transparent hover:border-white/10 transition-colors pt-3 md:pt-4 xl:pt-2">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[10px] font-medium text-maxek-red/80">02</span>
              <span className="font-mono text-[8px] md:text-[9px] xl:text-[8px] tracking-[0.2em] text-white/20">MXK-S</span>
            </div>
            <h3 className="font-heading text-lg tracking-[0.1em] text-white/90 mb-2">SOLUTIONS</h3>
            <p className="font-sans text-xs md:text-[13px] xl:text-xs leading-relaxed md:leading-[1.7] xl:leading-relaxed text-white/40 md:w-[90%] xl:w-[85%]">
              Enterprise software, digital systems and business automation.
            </p>
          </div>

          <div className="flex flex-col border-t border-white/5 md:border-l md:border-white/5 md:pl-6 xl:pl-8 md:border-t-transparent hover:border-white/10 transition-colors pt-3 md:pt-4 xl:pt-2">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[10px] font-medium text-maxek-red/80">03</span>
              <span className="font-mono text-[8px] md:text-[9px] xl:text-[8px] tracking-[0.2em] text-white/20">MXK-B</span>
            </div>
            <h3 className="font-heading text-lg tracking-[0.1em] text-white/90 mb-2">BUSINESS HUB</h3>
            <p className="font-sans text-xs md:text-[13px] xl:text-xs leading-relaxed md:leading-[1.7] xl:leading-relaxed text-white/40 md:w-[90%] xl:w-[85%]">
              Advisory, recruitment and strategic corporate services.
            </p>
          </div>
        </div>

        {/* Absolute Bottom Micro Typography - Restrained horizontal tablet arrangement */}
        <div className="mt-12 md:mt-10 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center md:items-start border-t border-white/5 pt-6 md:pt-5 text-center md:text-left">
          <span className="font-mono text-[8px] md:text-[9px] xl:text-[8px] tracking-[0.2em] text-white/20">
            MAXEK PRIVATE LIMITED <span className="hidden md:inline">&nbsp;&nbsp;/&nbsp;&nbsp;</span><br className="md:hidden" /> INTEGRATED GROUP
          </span>
          <span className="font-mono text-[8px] md:text-[9px] xl:text-[8px] tracking-[0.2em] text-white/20">
            PRECISION <span className="hidden md:inline">&nbsp;·&nbsp; INTEGRATION &nbsp;·&nbsp;</span><br className="md:hidden" /> <span className="md:hidden">INT &nbsp;·&nbsp; </span>PERFORMANCE
          </span>
          <span className="font-mono text-[8px] md:text-[9px] xl:text-[8px] tracking-[0.2em] text-white/20">
            MXK / 001 <span className="hidden md:inline">&nbsp;&nbsp;/&nbsp;&nbsp;</span><br className="md:hidden" /> EST. INDIA
          </span>
        </div>
      </footer>
    </div>
  );
}
