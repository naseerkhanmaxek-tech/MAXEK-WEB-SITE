import React from "react";
import { motion } from "framer-motion";
import { revealVariants, staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Fade + rise on scroll into view (once). */
export const Reveal = ({ children, className, delay = 0, as = "div" }) => {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
};

/** Staggered group — wrap children in <StaggerItem>. */
export const Stagger = ({ children, className }) => (
  <motion.div
    className={className}
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-70px" }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }) => (
  <motion.div variants={staggerItem} className={className}>
    {children}
  </motion.div>
);

/** Standard vertical section rhythm + optional surface alternation. */
export const Section = ({
  id,
  children,
  className,
  surface = false,
  dark = false,
  as: Tag = "section",
  ...rest
}) => (
  <Tag
    id={id}
    className={cn(
      "section-y relative overflow-hidden",
      dark ? "bg-maxek-ink text-white" : "bg-white text-maxek-navy",
      className
    )}
    {...rest}
  >
    <div className="shell">{children}</div>
  </Tag>
);

/** Kicker + rule — the MAXEK “precision rule” signature detail.
 * `tone="white"` is an escape hatch for the rare case where the kicker sits
 * directly on a maxek-red surface (its default red text would be invisible
 * there) — every other context keeps the standard red kicker. */
export const Kicker = ({ children, light = false, tone = "red", className }) => (
  <div className={cn("rule-label", className)}>
    <span
      className={cn(
        "kicker whitespace-nowrap",
        tone === "white" ? "text-white" : "text-maxek-red"
      )}
    >
      {children}
    </span>
    <span className={cn("rule-line", light ? "bg-white/20" : "bg-maxek-border")} />
  </div>
);

export const SectionHeader = ({
  kicker,
  title,
  support,
  align = "left",
  light = false,
  className,
  headingLevel: H = "h2",
  actions,
}) => {
  if (align === "split") {
    return (
      <div className={cn("grid gap-12 lg:grid-cols-12 lg:gap-16", className)}>
        {kicker ? (
          <div className="lg:col-span-2">
            <Kicker light={light}>{kicker}</Kicker>
          </div>
        ) : null}
        <div className={kicker ? "lg:col-span-10" : "lg:col-span-12"}>
          <H className={cn("text-display-2 text-balance", light ? "text-white" : "text-maxek-navy")}>
            {title}
          </H>
          {support ? (
            <p
              className={cn(
                "mt-6 text-[1.0625rem] leading-relaxed text-pretty",
                light ? "text-white/80" : "text-maxek-text"
              )}
            >
              {support}
            </p>
          ) : null}
          {actions ? (
            <div className="mt-8 flex flex-wrap gap-4">{actions}</div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      {kicker ? (
        align === "center" ? (
          <p className="kicker mb-5">{kicker}</p>
        ) : (
          <Kicker light={light} className="mb-6">
            {kicker}
          </Kicker>
        )
      ) : null}
      <H
        className={cn(
          "text-display-2 text-balance",
          light ? "text-white" : "text-maxek-navy"
        )}
      >
        {title}
      </H>
      {support ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed text-pretty",
            light ? "text-white/80" : "text-maxek-text"
          )}
        >
          {support}
        </p>
      ) : null}
      {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
    </div>
  );
};

export default Section;
