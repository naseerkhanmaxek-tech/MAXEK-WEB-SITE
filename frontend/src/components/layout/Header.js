import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import Btn from "@/components/common/Btn";
import MobileMenu from "./MobileMenu";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { LOGOS, NAV_LINKS, VERTICALS } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const { pathname } = useLocation();
  const { openEnquiry } = useEnquiry();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  // Only the homepage has the full-viewport hero to sit over before scrolling.
  const overlayHero = pathname === "/";
  const solid = scrolled || !overlayHero;
  // The Home hero is white (matching the header), so nav colours never
  // switch to the light-on-dark variant used for a dark hero — only the
  // background/border/height keep the transparent, taller "chrome" state.

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdown(null);
  }, [pathname]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] [transition:background-color_.45s_cubic-bezier(.22,1,.36,1),box-shadow_.45s_ease,border-color_.45s_ease]",
          solid
            ? "border-b border-maxek-border bg-white shadow-header"
            : "bg-transparent bg-gradient-to-b from-[#08132A]/70 to-transparent"
        )}
        data-testid="site-header"
        data-state={solid ? "solid" : "transparent"}
      >
        {/* Full-width row (not the shared max-w-shell content container) so the
            header spans the entire viewport instead of sitting in a centered,
            boxed column — logo hugs the left edge, CTA hugs the right edge. */}
        <div className="w-full px-5 sm:px-8 lg:px-10">
          <div
            className={cn(
              "grid grid-cols-[auto_1fr_auto] items-center gap-6 [transition:height_.4s_cubic-bezier(.22,1,.36,1)]",
              solid ? "h-[72px]" : "h-[92px]"
            )}
          >
            {/* Logo */}
            <Link
              to="/"
              className="flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maxek-red focus-visible:ring-offset-4"
              aria-label="MAXEK India Private Limited — home"
              data-testid="header-logo-link"
            >
              <img
                src={solid ? LOGOS.dark : LOGOS.light}
                alt="MAXEK India Private Limited logo"
                title="MAXEK India Private Limited"
                className="h-9 w-auto md:h-10 lg:h-[50px]"
              />
            </Link>

            {/* Desktop navigation: centered in the middle grid column, so it
                sits in the header's central area independent of how wide the
                logo or CTA happen to be. */}
            <nav
              className="hidden items-center justify-self-center gap-3 xl:flex"
              aria-label="Primary"
              data-testid="header-desktop-nav"
            >
                {NAV_LINKS.map((link) =>
                  link.children ? (
                  <div
                    key={link.to}
                    className="relative"
                    onMouseEnter={() => setDropdown(link.to)}
                    onMouseLeave={() => setDropdown(null)}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        cn(
                          "group relative flex items-center gap-1.5 px-3.5 py-2 text-[0.875rem] font-medium [transition:color_.25s_ease]",
                          isActive
                            ? "text-maxek-red"
                            : solid
                            ? "text-maxek-navy hover:text-maxek-red"
                            : "text-white/80 hover:text-white"
                        )
                      }
                      onFocus={() => setDropdown(link.to)}
                      data-testid={`header-nav-${link.to.replace(/^\//, "")}-link`}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 [transition:transform_.3s_ease]",
                          dropdown === link.to && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </NavLink>

                    <AnimatePresence>
                      {dropdown === link.to ? (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.2, ease: EASE }}
                          className={cn(
                            "absolute left-0 top-full pt-3",
                            link.to === "/verticals" ? "w-[360px]" : "w-[240px]"
                          )}
                        >
                          {link.to === "/verticals" ? (
                            <div className="overflow-hidden rounded-card border border-maxek-border bg-white p-2 shadow-card-hover">
                              {link.children.map((child, i) => {
                                const vertical = VERTICALS.find((v) => v.slug === child.slug);
                                return (
                                  <Link
                                    key={child.to}
                                    to={child.to}
                                    className="group flex items-start gap-3 rounded-xl px-3 py-3 [transition:background-color_.2s_ease] hover:bg-maxek-surface"
                                    data-testid={`header-nav-${child.slug ?? child.to.split("/").pop()}-link`}
                                  >
                                    <span className="mt-0.5 font-mono text-[11px] tracking-[0.14em] text-maxek-red">
                                      {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="flex flex-col">
                                      <span className="text-[0.875rem] font-medium text-maxek-navy transition-colors duration-200 ease-premium group-hover:text-maxek-red">
                                        {child.label}
                                      </span>
                                      {vertical ? (
                                        <span className="mt-0.5 text-[0.8125rem] text-maxek-muted">
                                          {vertical.subtitle}
                                        </span>
                                      ) : null}
                                    </span>
                                  </Link>
                                );
                              })}
                              <Link
                                to="/verticals"
                                className="mt-1 flex items-center justify-between rounded-xl border-t border-maxek-border px-3 pt-3 pb-1.5 text-[0.8125rem] font-medium text-maxek-navy [transition:color_.2s_ease] hover:text-maxek-red"
                                data-testid="header-nav-view-all-verticals-link"
                              >
                                View all verticals
                                <ChevronDown className="h-3.5 w-3.5 -rotate-90" aria-hidden="true" />
                              </Link>
                            </div>
                          ) : (
                            <div className="overflow-hidden rounded-card border border-maxek-border bg-white p-2 shadow-card-hover">
                              {link.children.map((child) => (
                                  <Link
                                    key={child.to}
                                    to={child.to}
                                    className="block rounded-xl px-3 py-2.5 text-[0.875rem] font-medium text-maxek-navy [transition:background-color_.2s_ease,color_.2s_ease] hover:bg-maxek-surface hover:text-maxek-red"
                                    data-testid={`header-nav-${child.slug ?? child.to.split("/").pop()}-link`}
                                  >
                                    {child.label}
                                  </Link>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      cn(
                        "relative px-3.5 py-2 text-[0.875rem] font-medium [transition:color_.25s_ease]",
                        isActive
                          ? "text-maxek-red"
                          : solid
                          ? "text-maxek-navy hover:text-maxek-red"
                          : "text-white/80 hover:text-white"
                      )
                    }
                    data-testid={`header-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}-link`}
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Btn
                variant={solid ? "outline" : "outlineLight"}
                size="sm"
                onClick={() => openEnquiry()}
                className="hidden sm:inline-flex"
                data-testid="header-business-enquiry-button"
              >
                Business Enquiry
              </Btn>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-btn border [transition:background-color_.25s_ease,border-color_.25s_ease,color_.25s_ease] xl:hidden",
                  solid
                    ? "border-maxek-border text-maxek-navy hover:bg-maxek-surface"
                    : "border-white/30 text-white hover:bg-white/10"
                )}
                data-testid="mobile-menu-open-button"
              >
                <Menu className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}