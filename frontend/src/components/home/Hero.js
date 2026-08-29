import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Btn from "@/components/common/Btn";
import { scrollToId } from "@/hooks/useLenis";
import { heroCopyVariants } from "@/lib/motion";

export default function Hero() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 3) setReady(true);
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }
    const p = video.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  const navigate = useNavigate();

  return (
    <section
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-[#08132A]"
      aria-label="MAXEK India — Integrated Engineering Group"
      data-testid="hero-section"
    >
      {/* 1. Full-bleed cinematic video */}
      <div className="absolute inset-0 z-0 bg-[#08132A]">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          } object-[35%_center] lg:object-center`}
          src="/assets/video/maxek-hero-engineering-ecosystem-desktop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
        />
      </div>

      {/* 2. Content protection gradient */}
      {/* 
        Provides an atmospheric transition from the active engineering on the left (0-32%)
        to a calm content-safe environment on the right. 
      */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none hidden md:block" 
        style={{
          background: "linear-gradient(to right, transparent 0%, transparent 32%, rgba(8, 19, 42, 0.18) 40%, rgba(8, 19, 42, 0.58) 52%, rgba(8, 19, 42, 0.82) 65%, rgba(8, 19, 42, 0.94) 100%)"
        }}
      />
      
      {/* Mobile/Tablet Portrait Fallback: Since content stacks, we need a vertical/overall dampening */}
      <div className="absolute inset-0 z-0 bg-[#08132A]/40 pointer-events-none md:hidden" />

      {/* 3. Existing real HTML content */}
      <div className="shell relative z-10 w-full pt-32 pb-24 md:py-0 md:h-[100svh] flex flex-col md:flex-row md:items-center">
        {/* Left spacer to push content to the right on desktop, matching the video composition */}
        <div className="hidden md:block md:w-[45%]" />
        
        {/* Headline / supporting copy / CTAs */}
        <div className="md:w-[55%] md:pl-8 lg:pl-16 flex flex-col justify-center">
          <motion.p
            className="kicker text-white"
            variants={heroCopyVariants}
            initial="hidden"
            animate="show"
            custom={0}
          >
            <span className="mr-3 inline-block h-[2px] w-8 -translate-y-[3px] bg-maxek-red align-middle" />
            Integrated Engineering Group
          </motion.p>

          <motion.h1
            className="mt-6 font-heading text-[clamp(2.2rem,4vw+0.4rem,3.6rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-white"
            variants={heroCopyVariants}
            initial="hidden"
            animate="show"
            custom={1}
          >
            Engineering Tomorrow.
            <span className="block text-white/90">Building Sustainable Growth.</span>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            variants={heroCopyVariants}
            initial="hidden"
            animate="show"
            custom={2}
          >
            Creating value through engineering, technology, and innovation.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
            variants={heroCopyVariants}
            initial="hidden"
            animate="show"
            custom={3}
          >
            <Btn
              variant="onDark"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => scrollToId("business-verticals", -60)}
              data-testid="hero-explore-maxek-button"
            >
              Explore MAXEK
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Btn>
            <Btn
              variant="outlineLight"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigate("/contact")}
              data-testid="hero-contact-button"
            >
              Contact
            </Btn>
          </motion.div>
        </div>
      </div>

      {/* Subtle animated scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToId("about-maxek", -60)}
        aria-label="Scroll to About MAXEK"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/55 [transition:color_.25s_ease] hover:text-white md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        data-testid="hero-scroll-indicator"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em]">Scroll</span>
        <span className="relative flex h-9 w-[22px] items-start justify-center rounded-full border border-white/35 pt-1.5">
          <span className="h-1.5 w-1.5 animate-scroll-dot rounded-full bg-maxek-red" />
        </span>
        <ArrowDown className="h-3 w-3" aria-hidden="true" />
      </motion.button>

      {!ready ? (
        <span className="sr-only" role="status">
          Loading background video
        </span>
      ) : null}
    </section>
  );
}
