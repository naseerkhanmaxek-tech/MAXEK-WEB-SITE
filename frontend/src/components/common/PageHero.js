import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Inner-page hero: static image band with dark overlay, or optionally a
 * looping background video (poster falls back to `image`). The full-screen
 * homepage hero (DatumHero) is separate and untouched by this component.
 */
export default function PageHero({
  kicker,
  title,
  support,
  image,
  imageAlt,
  imagePosition = "center",
  video,
  overlay = "bottom",
  breadcrumbs = [],
  logo,
  children,
  align = "left",
  compact = false,
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-maxek-ink",
        compact ? "pt-32 pb-16 md:pt-40 md:pb-20" : "pt-36 pb-20 md:pt-44 md:pb-28"
      )}
    >
      {image ? (
        <>
          <img
            src={image}
            alt={imageAlt || title}
            title={imageAlt || title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: imagePosition }}
            loading="eager"
            decoding="async"
          />
          {video ? (
            <video
              className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
              style={{ objectPosition: imagePosition }}
              src={video}
              poster={image}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          ) : null}
          {overlay === "left" ? (
            <>
              {/* Desktop (lg+): text occupies roughly the left half, so a
                  left-anchored fade keeps the image's right side clear. */}
              <div
                className="absolute inset-0 hidden lg:block"
                style={{
                  background:
                    "linear-gradient(to right, rgba(11,13,18,0.94) 0%, rgba(11,13,18,0.85) 32%, rgba(11,13,18,0.68) 55%, rgba(11,13,18,0.28) 72%, rgba(11,13,18,0) 86%)",
                }}
                aria-hidden="true"
              />
              {/* Below lg: the text column spans most of the viewport width
                  (there is no meaningful "right side" left to preserve), so
                  fall back to the full-coverage treatment for guaranteed
                  contrast rather than a gradient tuned for a wide desktop. */}
              <div
                className="absolute inset-0 lg:hidden"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(11,13,18,0.95) 0%, rgba(11,13,18,0.9) 45%, rgba(11,13,18,0.97) 100%)",
                }}
                aria-hidden="true"
              />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(11,13,18,0.88) 0%, rgba(11,13,18,0.74) 45%, rgba(11,13,18,0.94) 100%)",
              }}
              aria-hidden="true"
            />
          )}
          {video ? (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px]"
              style={{ background: "linear-gradient(to bottom, rgba(11,13,18,0) 0%, #0B0D12 100%)" }}
              aria-hidden="true"
            />
          ) : null}
        </>
      ) : (
        <div className="absolute inset-0 bg-maxek-ink" aria-hidden="true" />
      )}

      <div className="shell relative">
        {breadcrumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-[13px] text-white/55">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.to} className="flex items-center gap-1">
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-white/30" aria-hidden="true" />
                  )}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-white/85" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.to}
                      className="transition-colors hover:text-white"
                      data-testid={`breadcrumb-${crumb.label.toLowerCase().replace(/\s+/g, "-")}-link`}
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
          {logo ? (
            <motion.img
              src={logo}
              alt={`${title} logo`}
              title={`${title} logo`}
              className="mb-8 h-20 w-auto brightness-0 invert md:h-24"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          ) : null}

          {kicker ? (
            <motion.p
              className="kicker mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {kicker}
            </motion.p>
          ) : null}

          <motion.h1
            className="text-display-1 text-white text-balance"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            {title}
          </motion.h1>

          {support ? (
            <motion.p
              className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 text-pretty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            >
              {support}
            </motion.p>
          ) : null}

          {children ? (
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
            >
              {children}
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
