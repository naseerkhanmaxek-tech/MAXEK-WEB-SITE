import React, { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import { useEnquiry } from "./EnquiryContext";
import { overlayVariants, panelVariants } from "@/lib/motion";
import { setScrollLocked } from "@/hooks/useLenis";
import { COMPANY } from "@/lib/site";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Premium Business Enquiry modal.
 * Fade + scale, dark blurred backdrop, click-outside + Escape to close,
 * focus trap, background scroll prevention, fully keyboard accessible.
 */
export default function EnquiryModal() {
  const { open, prefill, closeEnquiry } = useEnquiry();
  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeEnquiry();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll(FOCUSABLE));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [closeEnquiry]
  );

  useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement;
    setScrollLocked(true);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      setScrollLocked(false);
      if (returnFocusRef.current instanceof HTMLElement) {
        returnFocusRef.current.focus();
      }
    };
  }, [open, onKeyDown]);

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 py-8 sm:items-center sm:p-6"
          role="presentation"
        >
          <motion.div
            className="fixed inset-0 bg-maxek-ink/70 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={closeEnquiry}
            data-testid="business-enquiry-backdrop"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="business-enquiry-title"
            aria-describedby="business-enquiry-description"
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-card bg-maxek-navy border border-white/10 shadow-modal"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            data-testid="business-enquiry-modal"
          >
            <div className="relative border-b border-white/10 bg-white/5 px-6 py-7 sm:px-8">
              <p className="kicker">Business Enquiry</p>
              <h2
                id="business-enquiry-title"
                className="mt-3 text-2xl font-semibold text-white sm:text-[1.75rem]"
              >
                Let&rsquo;s discuss your requirement
              </h2>
              <p
                id="business-enquiry-description"
                className="mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-white/80"
              >
                Share a few details and our team will respond shortly. You can
                also write to us at{" "}
                <a
                  href={`mailto:${COMPANY.businessEmail}`}
                  className="font-medium text-white underline decoration-maxek-red/40 underline-offset-2 hover:decoration-maxek-red"
                >
                  {COMPANY.businessEmail}
                </a>
                .
              </p>

              <button
                type="button"
                onClick={closeEnquiry}
                aria-label="Close business enquiry form"
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-transparent text-white [transition:background-color_.2s_ease,color_.2s_ease,border-color_.2s_ease] hover:bg-white/10 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maxek-red focus-visible:ring-offset-2 sm:right-6 sm:top-6"
                data-testid="business-enquiry-close-button"
              >
                <X className="h-4.5 w-4.5" strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto px-6 py-7 sm:px-8">
              <EnquiryForm
                variant="enquiry"
                prefill={prefill}
                idPrefix="business-enquiry"
                autoFocus
                compact
              />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
