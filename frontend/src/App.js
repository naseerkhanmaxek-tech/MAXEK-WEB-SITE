// src/App.js
import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import "@/App.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { EnquiryProvider } from "@/components/enquiry/EnquiryContext";
import EnquiryModal from "@/components/enquiry/EnquiryModal";
import { useLenis } from "@/hooks/useLenis";
import { pageVariants } from "@/lib/motion";

import Home from "@/pages/Home";

const About = lazy(() => import("@/pages/About"));
const Verticals = lazy(() => import("@/pages/Verticals"));
const MaxekInfra = lazy(() => import("@/pages/MaxekInfra"));
const MaxekSolutions = lazy(() => import("@/pages/MaxekSolutions"));
const MaxekBusinessHub = lazy(() => import("@/pages/MaxekBusinessHub"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const Industries = lazy(() => import("@/pages/Industries"));
const KnowledgeCenter = lazy(() => import("@/pages/KnowledgeCenter"));
const ArticleDetail = lazy(() => import("@/pages/ArticleDetail"));
const Careers = lazy(() => import("@/pages/Careers"));
const Contact = lazy(() => import("@/pages/Contact"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const Terms = lazy(() => import("@/pages/Terms"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// --- PROTOTYPE ROUTES (Do not expose to production users) ---
const Prototype = lazy(() => import("@/pages/Prototype"));
const DatumMastheadPrototype = lazy(() => import("@/pages/DatumMastheadPrototype"));
const AnimationLab = lazy(() => import("@/pages/AnimationLab"));

const RouteFallback = () => (
  <div className="flex min-h-[70vh] items-center justify-center bg-white">
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-maxek-border border-t-maxek-red" />
  </div>
);

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // If the destination URL includes a hash, let that page's own
    // hash-scroll effect handle positioning instead of snapping to top.
    if (hash) return;
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

const Page = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/verticals" element={<Page><Verticals /></Page>} />
          <Route path="/verticals/maxek-infra" element={<Page><MaxekInfra /></Page>} />
          <Route path="/verticals/maxek-solutions" element={<Page><MaxekSolutions /></Page>} />
          <Route path="/verticals/maxek-business-hub" element={<Page><MaxekBusinessHub /></Page>} />
          <Route path="/projects" element={<Page><Projects /></Page>} />
          <Route path="/projects/:slug" element={<Page><ProjectDetail /></Page>} />
          <Route path="/industries" element={<Page><Industries /></Page>} />
          <Route path="/knowledge-center" element={<Page><KnowledgeCenter /></Page>} />
          <Route path="/knowledge-center/:slug" element={<Page><ArticleDetail /></Page>} />
          <Route path="/careers" element={<Page><Careers /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="/privacy-policy" element={<Page><PrivacyPolicy /></Page>} />
          <Route path="/terms-and-conditions" element={<Page><Terms /></Page>} />
          
          {/* Prototype Routes */}
          <Route path="/experimental-webgl-hero" element={<Page><Prototype /></Page>} />
          <Route path="/experimental-datum-masthead" element={<Page><DatumMastheadPrototype /></Page>} />
          <Route path="/animation-lab" element={<Page><AnimationLab /></Page>} />

          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function Shell() {
  useLenis();
  const location = useLocation();
  
  // Isolate prototype routes so the global Header/Footer don't interfere
  const isExperimental = location.pathname.startsWith("/experimental-");
  const hideHeader = isExperimental;

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollToTop />
      {!hideHeader && <Header />}
      <main id="main-content">
        <AnimatedRoutes />
      </main>
      {!isExperimental && <Footer />}
      <EnquiryModal />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL || "/"}>
        <EnquiryProvider>
          <Shell />
        </EnquiryProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
