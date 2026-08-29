import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn text-sm font-medium tracking-tight whitespace-nowrap disabled:pointer-events-none disabled:opacity-55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maxek-red focus-visible:ring-offset-2 active:scale-[0.985] [transition:background-color_.25s_ease,color_.25s_ease,border-color_.25s_ease,box-shadow_.25s_ease,transform_.2s_ease]";

const variants = {
  primary:
    "bg-white text-maxek-navy shadow-sm hover:bg-white/90 hover:shadow-[0_10px_28px_rgba(255,255,255,0.15)]",
  red: "bg-maxek-red text-white shadow-sm hover:bg-maxek-red-dark hover:shadow-[0_10px_28px_rgba(227,30,36,0.28)]",
  onDark:
    "bg-white text-maxek-navy shadow-sm hover:bg-maxek-red hover:text-white hover:shadow-[0_10px_28px_rgba(227,30,36,0.3)]",
  outline:
    "border border-white/20 bg-transparent text-white hover:border-maxek-red/45 hover:bg-white/10",
  outlineLight:
    "border border-white/45 bg-transparent text-white hover:border-white hover:bg-white/10",
  outlineDark:
    "border border-maxek-border bg-transparent text-maxek-navy hover:border-maxek-red/45 hover:bg-maxek-surface",
  ghost: "text-white hover:bg-white/10",
  ghostDark: "text-maxek-navy hover:bg-maxek-surface",
};

const sizes = {
  sm: "h-10 px-4",
  md: "h-12 px-6",
  lg: "h-[52px] px-7 text-[0.9375rem]",
};

export const Btn = React.forwardRef(function Btn(
  { variant = "primary", size = "md", to, href, className, children, ...rest },
  ref
) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} type="button" className={classes} {...rest}>
      {children}
    </button>
  );
});

export default Btn;
