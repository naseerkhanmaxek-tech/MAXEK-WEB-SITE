import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { scrollToId } from "@/hooks/useLenis";

export default function DatumHero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const maxekRef = useRef(null);

  return (
    <>
      <section 
        ref={heroRef}
        className="relative z-10 flex min-h-[100svh] w-full flex-col bg-[#0B1221] text-white font-sans selection:bg-maxek-red/20 selection:text-white"
        aria-label="MAXEK India — Integrated Engineering Group"
        data-testid="hero-section"
      >
      <style>{`
        /* Hero Entrance Keyframes */
        @keyframes hero-line-reveal {
          0% { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0% 0 0); }
        }
        @keyframes hero-fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* Video Atmosphere Layer (Hidden on mobile and prefers-reduced-motion) */}
      <div className="absolute inset-0 z-0 motion-reduce:hidden overflow-hidden pointer-events-none">
        <video
          className="absolute left-0 top-0 h-full w-full object-cover"
          src="/assets/video/maxek-hero-engineering-ecosystem-desktop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          style={{
            opacity: 0.35,
            filter: "blur(0.5px) brightness(1.0) saturate(0.90)",
            objectPosition: "left center"
          }}
        />
        
        {/* Navy Masking: Fade to right (protects business message) */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, transparent 0%, transparent 42%, #0B1221 68%, #0B1221 100%)"
          }}
        />

        {/* Navy Masking: Fade top and bottom */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #0B1221 0%, transparent 15%, transparent 85%, #0B1221 100%)"
          }}
        />
      </div>

      {/* ZONE B — PRIMARY HERO CONTENT */}
      <main className="flex-1 flex flex-col justify-center px-6 md:px-8 xl:px-10 pt-28 md:pt-32 pb-8 md:pb-10 xl:pb-12">
        <div className="flex flex-col xl:grid xl:w-full xl:grid-cols-12 xl:gap-10">
          
          <div className="xl:col-span-7 flex flex-col justify-center xl:pr-12 relative xl:top-10">
            
            {/* Visible Top Text */}
            <div className="relative z-10 mb-2 md:mb-4 xl:mb-5 flex items-center gap-3 xl:gap-4">
              <span className="relative h-[1px] w-8 md:w-10 xl:w-12">
                <span className="absolute inset-0 bg-white/20 motion-safe:animate-[hero-line-reveal_0.35s_cubic-bezier(0.16,1,0.3,1)_0s_both]" />
              </span>
              <span className="font-mono text-[8px] md:text-[9px] xl:text-[10px] uppercase tracking-[0.3em] text-white/60 motion-safe:animate-[hero-fade-in_0.35s_ease-out_0.15s_both]">
                Integrated Engineering Group
              </span>
            </div>

            {/* Sticky stage: lets MAXEK freeze at the header boundary and travel
                extra scroll distance before being released, without changing
                the layout height siblings (PRIVATE LIMITED, business index) see. */}
            <div className="relative" style={{ marginBottom: "calc(-1 * var(--maxek-travel, 42vh))" }}>
              {/* Giant Masthead Typography - Responsive Fluidity */}
              <h1
                ref={maxekRef}
                className="sticky top-[calc(72px-1.575vw)] md:top-[calc(72px-1.125vw)] lg:top-[62.25px] xl:top-[57.75px] font-heading text-[21vw] md:text-[15vw] lg:text-[130px] xl:text-[190px] font-bold leading-[0.85] tracking-[-0.04em] text-white select-none"
              >
                MA<span className="text-maxek-red">X</span>EK
              </h1>
              <div style={{ height: "var(--maxek-travel, 42vh)" }} aria-hidden="true" />
            </div>

            {/* Visible Bottom Text */}
            {/* Margin here is intentionally paired with the business-index
                margin below: this gains breathing room from MAXEK while the
                other loses the same amount, so the flex column's total
                height — and therefore MAXEK's centered resting position —
                is mathematically unchanged. */}
            <span className="relative z-10 font-heading text-xs md:text-sm lg:text-lg xl:text-xl font-medium tracking-[0.25em] text-white/40 mt-0 md:-mt-1 xl:-mt-2 block pl-1 xl:left-[10px]">
              PRIVATE LIMITED
            </span>

            {/* Visible Business Index */}
            <div className="relative z-10 mt-5 md:mt-6 xl:mt-3 flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-6 xl:gap-5">
              
              <div className="flex flex-col border-t border-white/5 md:border-transparent hover:border-white/10 transition-colors pt-3">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="font-mono text-[10px] font-medium text-maxek-red/80">01</span>
                  <span className="font-mono text-[8px] md:text-[9px] xl:text-[8px] tracking-[0.2em] text-white/30">MXK-I</span>
                </div>
                <h3 className="font-heading text-lg xl:text-[17px] tracking-[0.1em] text-white mb-2">INFRA</h3>
                <p className="font-sans text-xs md:text-[13px] xl:text-[12px] leading-relaxed md:leading-[1.7] xl:leading-relaxed text-white/60 md:w-[90%] xl:w-[95%]">
                  Structural engineering, civil works and industrial execution at scale.
                </p>
              </div>

              <div className="flex flex-col border-t border-white/5 md:border-l md:border-white/5 md:pl-5 xl:pl-6 md:border-t-transparent hover:border-white/10 transition-colors pt-3">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="font-mono text-[10px] font-medium text-maxek-red/80">02</span>
                  <span className="font-mono text-[8px] md:text-[9px] xl:text-[8px] tracking-[0.2em] text-white/30">MXK-S</span>
                </div>
                <h3 className="font-heading text-lg xl:text-[17px] tracking-[0.1em] text-white mb-2">SOLUTIONS</h3>
                <p className="font-sans text-xs md:text-[13px] xl:text-[12px] leading-relaxed md:leading-[1.7] xl:leading-relaxed text-white/60 md:w-[90%] xl:w-[95%]">
                  Enterprise software, digital systems and business automation.
                </p>
              </div>

              <div className="flex flex-col border-t border-white/5 md:border-l md:border-white/5 md:pl-5 xl:pl-6 md:border-t-transparent hover:border-white/10 transition-colors pt-3">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="font-mono text-[10px] font-medium text-maxek-red/80">03</span>
                  <span className="font-mono text-[8px] md:text-[9px] xl:text-[8px] tracking-[0.2em] text-white/30">MXK-B</span>
                </div>
                <h3 className="font-heading text-lg xl:text-[17px] tracking-[0.1em] text-white mb-2">BUSINESS HUB</h3>
                <p className="font-sans text-xs md:text-[13px] xl:text-[12px] leading-relaxed md:leading-[1.7] xl:leading-relaxed text-white/60 md:w-[90%] xl:w-[95%]">
                  Advisory, recruitment and strategic corporate services.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: Corporate Proposition */}
          <div className="relative z-10 xl:col-span-5 flex flex-col justify-start xl:pl-10 xl:border-l xl:border-white/10 mt-8 md:mt-10 xl:mt-0 xl:pt-14 pointer-events-auto">


            <h2 className="font-heading text-3xl md:text-[42px] xl:text-[50px] font-semibold leading-[1.1] md:leading-[1.05] tracking-[-0.02em] text-white">
              Engineering Tomorrow.
              <br />
              <span className="text-[0.85em] md:text-[0.9em] font-medium md:font-semibold text-white/80">Building Sustainable Growth.</span>
            </h2>

            <p className="mt-4 md:mt-5 max-w-[260px] md:max-w-[320px] xl:max-w-[340px] text-[16px] md:text-[17px] xl:text-[18px] leading-relaxed text-white/50">
              Creating value through engineering, technology, and innovation.
            </p>

          </div>

        </div>
      </main>

      {/* FOOTER WRAPPER FOR CTA */}
      <footer className="relative z-10 w-full px-6 md:px-8 xl:px-10 pb-6 md:pb-8 xl:pb-6 mt-auto flex flex-col">

        {/* =========================================
            FULL-WIDTH BOTTOM CTA RAIL 
            ========================================= */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-5">
          <button 
            className="group flex w-full md:w-[280px] xl:w-[240px] items-center justify-center gap-4 border border-white/10 px-8 py-3.5 md:py-3 transition-colors duration-300 ease-out hover:border-white/30 hover:bg-maxek-red/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maxek-red/50 active:translate-y-[1px]"
            onClick={() => scrollToId("business-verticals", -60)}
          >
            <span className="font-mono text-[11px] md:text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors duration-300">
              Explore MAXEK
            </span>
            <ArrowRight className="h-4 w-4 md:h-3.5 md:w-3.5 text-maxek-red transition-transform duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[4px] motion-reduce:transition-none" />
          </button>
          
          <button 
            className="group flex w-full md:w-auto items-center justify-center border-t md:border-t-0 border-white/5 md:border-transparent py-3.5 md:py-3 text-white/50 transition-colors duration-300 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maxek-red/50 focus-visible:px-4 active:translate-y-[1px]"
            onClick={() => navigate("/contact")}
          >
            <span className="relative flex items-center font-mono text-[11px] md:text-[10px] font-medium uppercase tracking-[0.2em]">
              <span>Contact</span>
              <ArrowUpRight className="h-4 w-4 md:h-3.5 md:w-3.5 ml-1.5 transition-transform duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] motion-reduce:transition-none" />
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-maxek-red origin-left scale-x-0 transition-transform duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:transition-none" />
            </span>
          </button>
        </div>
      </footer>
    </section>
    </>
  );
}
