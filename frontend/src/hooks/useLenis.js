import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Global Lenis smooth-scroll instance.
 * Disabled entirely when the user prefers reduced motion.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.__lenis = null;
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

/** Smooth-scroll to an element id (works with or without Lenis). */
export function scrollToId(id, offset = -80) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset, duration: 1.2 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

/** Stop / start page scroll (used by the modal and mobile menu). */
export function setScrollLocked(locked) {
  if (window.__lenis) {
    locked ? window.__lenis.stop() : window.__lenis.start();
  }
  document.body.style.overflow = locked ? "hidden" : "";
}
