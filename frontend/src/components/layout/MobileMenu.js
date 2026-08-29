import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, X } from "lucide-react";
import * as Icons from "lucide-react";
import Btn from "@/components/common/Btn";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { COMPANY, LOGOS, NAV_LINKS, VERTICALS } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { setScrollLocked } from "@/hooks/useLenis";

const panel = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.32, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: EASE } },
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

/** Premium full-screen mobile navigation (designed independently of desktop). */
export default function MobileMenu({ open, onClose }) {
  const { openEnquiry } = useEnquiry();
  const projectsLink = NAV_LINKS.find((link) => link.to === "/projects");

  useEffect(() => {
    if (!open) return undefined;
    setScrollLocked(true);
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      setScrollLocked(false);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[130] flex flex-col overflow-y-auto bg-maxek-navy xl:hidden"
          variants={panel}
          initial="hidden"
          animate="show"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          data-testid="mobile-menu-panel"
        >
          <div className="shell flex h-[72px] shrink-0 items-center justify-between border-b border-white/10">
            <Link to="/" onClick={onClose} aria-label="MAXEK home">
              <img
                src={LOGOS.dark}
                alt="MAXEK India Private Limited logo"
                className="h-9 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-white/10 text-white [transition:background-color_.2s_ease,color_.2s_ease] hover:bg-maxek-navy hover:text-white"
              data-testid="mobile-menu-close-button"
            >
              <X className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>

          <motion.nav
            className="shell flex-1 py-8"
            variants={list}
            initial="hidden"
            animate="show"
            aria-label="Mobile primary"
          >
            <motion.ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <motion.li key={link.to} variants={item}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b border-white/10 py-4 font-heading text-[1.5rem] font-semibold tracking-tight [transition:color_.2s_ease] ${
                        isActive ? "text-maxek-red" : "text-white"
                      }`
                    }
                    data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}-link`}
                  >
                    {link.label}
                    <ArrowUpRight className="h-5 w-5 text-white/50" aria-hidden="true" />
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="mt-8">
              <p className="kicker mb-4">Business Verticals</p>
              <ul className="space-y-2">
                {VERTICALS.map((v) => (
                  <li key={v.slug}>
                    <Link
                      to={`/verticals/${v.slug}`}
                      onClick={onClose}
                      className="flex flex-col rounded-card border border-white/10 bg-white/5 p-3.5"
                      data-testid={`mobile-nav-${v.slug}-link`}
                    >
                      <span className="block text-[0.9375rem] font-semibold text-white">
                        {v.name}
                      </span>
                      <span className="block text-[0.8125rem] text-white/50 mt-1">
                        {v.subtitle}
                      </span>

                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {projectsLink?.children ? (
              <motion.div variants={item} className="mt-8">
                <p className="kicker mb-4">Projects</p>
                <ul className="space-y-2">
                  {projectsLink.children.map((child) => (
                    <li key={child.to}>
                      <Link
                        to={child.to}
                        onClick={onClose}
                        className="flex items-center justify-between rounded-card border border-white/10 bg-white/5 p-3.5 text-[0.9375rem] font-medium text-white"
                        data-testid={`mobile-nav-${child.slug}-link`}
                      >
                        {child.label}
                        <ArrowUpRight className="h-4 w-4 text-white/50" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}

            <motion.div variants={item} className="mt-8 space-y-3">
              <Btn
                variant="red"
                size="lg"
                className="w-full"
                onClick={() => {
                  onClose();
                  setTimeout(() => openEnquiry(), 260);
                }}
                data-testid="mobile-menu-business-enquiry-button"
              >
                Business Enquiry
              </Btn>
              <Btn variant="outline" size="lg" to="/contact" onClick={onClose} className="w-full">
                Contact Us
              </Btn>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-9 space-y-3 border-t border-white/10 pt-7 text-[0.9375rem]"
            >
              <a href={COMPANY.phoneHref} className="flex items-center gap-3 text-white">
                <Phone className="h-4 w-4 text-maxek-red" aria-hidden="true" />
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.businessEmail}`} className="flex items-center gap-3 text-white">
                <Mail className="h-4 w-4 text-maxek-red" aria-hidden="true" />
                {COMPANY.businessEmail}
              </a>
              <ul className="flex items-center gap-3 pt-3">
                {COMPANY.social.map((s) => {
                  const Ico = Icons[s.icon] || Icons.Link;
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={s.label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
                      >
                        <Ico className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}