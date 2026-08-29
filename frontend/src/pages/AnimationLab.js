import React, { useRef, useLayoutEffect, useState, useEffect } from "react";

export default function AnimationLab() {
  const maxekRef = useRef(null);

  const [debug, setDebug] = useState({
    scrollY: 0,
    maxekY: 0,
    visibleMaxekTop: 0,
    headerBottom: 100,
    gap: 0,
  });

  // Passive debug monitor - strictly read-only, does not control layout
  useEffect(() => {
    let frameId;
    const monitor = () => {
      if (maxekRef.current) {
        const rect = maxekRef.current.getBoundingClientRect();
        
        const fontSize = parseFloat(window.getComputedStyle(maxekRef.current).fontSize) || 190;
        const GLYPH_TOP_OFFSET = fontSize * 0.075;
        
        const visibleTop = rect.top + GLYPH_TOP_OFFSET;
        const gap = visibleTop - 100; // Header is exactly 100px

        setDebug({
          scrollY: Math.round(window.scrollY),
          maxekY: Math.round(rect.top * 10) / 10,
          visibleMaxekTop: Math.round(visibleTop * 10) / 10,
          headerBottom: 100,
          gap: Math.round(gap * 10) / 10,
        });
      }
      frameId = requestAnimationFrame(monitor);
    };
    
    frameId = requestAnimationFrame(monitor);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Calculate explicit sticky top based on 190px font size glyph offset
  // Header = 100px
  // Glyph offset = 190 * 0.075 = 14.25px
  // Sticky Top = 100 - 14.25 = 85.75px
  const stickyTop = "85.75px";

  return (
    <div className="font-sans relative bg-white/5 text-white min-h-screen">
      {/* HEADER: Highest z-index with isolation and compositor mask */}
      <header 
        id="debug-header" 
        className="fixed top-0 inset-x-0 h-[100px] bg-maxek-navy z-[60] border-b-2 border-white/10 flex items-center px-10 shadow-sm pointer-events-none"
        style={{ isolation: 'isolate' }}
      >
        <h2 className="font-mono text-white font-bold text-xl">WHITE HEADER</h2>
        {/* 2px Opaque Paint Overlap to mask compositor leakage */}
        <div 
          className="absolute left-0 right-0 h-[2px] bg-maxek-navy pointer-events-none"
          style={{ bottom: '-2px' }}
        />
      </header>

      {/* CONTACT INDICATOR */}
      <div 
        className="fixed inset-x-0 border-b border-red-500 z-[60] pointer-events-none"
        style={{ top: '100px' }} // Matches header height
      />
      <div 
        className="fixed top-[102px] right-10 z-[60] text-red-500 font-mono text-[10px] pointer-events-none"
      >
        CONTACT BOUNDARY
      </div>

      {/* HERO: Contains the sticky element. Must be tall enough to allow travel. */}
      {/* Z-index lower than About to allow natural occlusion */}
      <section 
        className="relative w-full bg-[#0B1221] z-10"
        style={{ minHeight: "100svh" }}
      >
        {/* Spacer to push MAXEK down so it starts near center of the viewport */}
        <div style={{ height: "calc(50vh - 100px)" }} />
        
        {/* STICKY STAGE: Continues behind About without expanding Hero */}
        <div className="relative sticky-stage" style={{ marginBottom: "calc(-50vh - 140px)" }}>
          {/* STICKY MAXEK */}
          <h1 
            ref={maxekRef}
            className="sticky w-full text-center pointer-events-none select-none font-heading text-[130px] xl:text-[190px] font-bold leading-[0.85] tracking-[-0.04em] text-white"
            style={{ top: stickyTop }}
          >
            MA<span className="text-maxek-red">X</span>EK
          </h1>
          {/* Geometrically extends the sticky containing block into the About section space */}
          <div style={{ height: "calc(50vh + 140px)" }} />
        </div>
      </section>

      {/* ABOUT SECTION: Naturally covers MAXEK from below */}
      <section className="relative z-30 min-h-[100svh] bg-maxek-navy flex flex-col justify-center items-center px-10 shadow-[0_-20px_40px_rgba(0,0,0,0.3)]">
        <h2 className="text-4xl font-heading text-white font-bold mb-4">WHITE ABOUT SECTION</h2>
        <p className="font-mono text-white/60">This section occludes MAXEK from below.</p>
        <div className="h-[200vh]"></div> {/* Allow plenty of scrolling */}
      </section>

      {/* DEBUG PANEL */}
      <div className="fixed bottom-6 left-6 z-[100] bg-black/80 backdrop-blur-md text-green-400 p-5 rounded-lg border border-green-400/30 font-mono text-xs w-[280px] pointer-events-none">
        <h3 className="text-white font-bold mb-3 border-b border-white/20 pb-2">CSS STICKY DIAGNOSTICS</h3>
        <div className="flex justify-between mb-1">
          <span className="opacity-70">Scroll Y</span>
          <span>{debug.scrollY}px</span>
        </div>
        <div className="flex justify-between mb-1 mt-3">
          <span className="opacity-70 text-blue-400">MAXEK Bounding Top</span>
          <span className="text-blue-400">{debug.maxekY}px</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="opacity-70 text-purple-400">Vis. MAXEK Top</span>
          <span className="text-purple-400">{debug.visibleMaxekTop}px</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="opacity-70 text-purple-400">Header Bottom</span>
          <span className="text-purple-400">{debug.headerBottom}px</span>
        </div>
        <div className="flex justify-between mb-1 border-t border-white/20 pt-2 mt-2">
          <span className="opacity-70 text-red-400">GAP (Should snap to 0)</span>
          <span className={`font-bold ${Math.abs(debug.gap) <= 1 && debug.gap <= 0.5 ? 'text-green-400' : 'text-red-400'}`}>{debug.gap}px</span>
        </div>
      </div>
    </div>
  );
}
