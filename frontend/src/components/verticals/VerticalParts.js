import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { Icon } from "@/components/common/Cards";
import Btn from "@/components/common/Btn";
import Section, { Kicker, Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/common/Section";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { cn } from "@/lib/utils";
import { INDUSTRIES } from "@/lib/site";
import { INDUSTRY_IMAGES } from "@/lib/images";

/** Premium minimal FAQ accordion with plus/minus affordance.
 * `dark` must match the background it's rendered on — it has no background
 * of its own, so its text colors are hardcoded per context rather than
 * inherited. */
export const FAQAccordion = ({ faqs, testIdPrefix = "faq", dark = true }) => (
  <Accordion.Root
    type="single"
    collapsible
    className={cn("divide-y border-y", dark ? "divide-white/10 border-white/10" : "divide-maxek-border border-maxek-border")}
  >
    {faqs.map((faq, i) => (
      <Accordion.Item key={faq.q} value={`item-${i}`} className="group">
        <Accordion.Header>
          <Accordion.Trigger
            className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maxek-red focus-visible:ring-offset-2"
            data-testid={`${testIdPrefix}-trigger-${i}`}
          >
            <span
              className={cn(
                "font-heading text-[1.0625rem] font-semibold [transition:color_.2s_ease] group-hover:text-maxek-red",
                dark ? "text-white" : "text-maxek-navy"
              )}
            >
              {faq.q}
            </span>
            <span
              className={cn(
                "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                dark ? "border-white/10 text-white" : "border-maxek-border text-maxek-navy"
              )}
            >
              <Plus className="h-4 w-4 group-data-[state=open]:hidden" strokeWidth={1.7} aria-hidden="true" />
              <Minus className="hidden h-4 w-4 group-data-[state=open]:block" strokeWidth={1.7} aria-hidden="true" />
            </span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <p className="max-w-3xl pb-7 pr-12 text-[0.9375rem] leading-relaxed opacity-80">
            {faq.a}
          </p>
        </Accordion.Content>
      </Accordion.Item>
    ))}
  </Accordion.Root>
);

/** Services / solutions grid used across vertical pages. */
export const ItemGrid = ({ items, testIdPrefix = "item" }) => (
  <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
    {items.map((item, i) => (
      <StaggerItem key={item.name} className="h-full">
        <article
          className="card-surface h-full"
          data-testid={`${testIdPrefix}-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-maxek-navy/5 text-maxek-red">
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] text-maxek-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-6 text-[1.0625rem] font-semibold text-maxek-navy">{item.name}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-maxek-text">
            {item.description}
          </p>
        </article>
      </StaggerItem>
    ))}
  </Stagger>
);

/** Numbered process stepper. */
export const ProcessStepper = ({ steps, light = false }) => (
  <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
    {steps.map((step, i) => (
      <StaggerItem key={step.name}>
        <div className={`relative border-t pt-7 ${light ? "border-white/12" : "border-white/10"}`}>
          <span className="absolute -top-px left-0 h-px w-12 bg-maxek-red" aria-hidden="true" />
          <div className="flex items-center gap-4">
            <span className={`font-mono text-[11px] tracking-[0.2em] ${light ? "text-white/40" : "text-white/50"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <Icon name={step.icon} className="h-5 w-5 text-maxek-red" />
          </div>
          <h3 className={`mt-5 text-xl font-semibold ${light ? "text-white" : "text-white"}`}>
            {step.name}
          </h3>
          <p className={`mt-3 text-[0.9375rem] leading-relaxed ${light ? "text-white/60" : "text-white/80"}`}>
            {step.description}
          </p>
        </div>
      </StaggerItem>
    ))}
  </Stagger>
);

/** Industries relevant to a vertical, linking to the Industries page. */
export const IndustryStrip = ({ names, title = "Industries we serve", support, dark }) => {
  const list = INDUSTRIES.filter((i) => names.includes(i.name));
  return (
    <Section dark={dark}>
      <SectionHeader light={dark} align="split" kicker="Industries" title={title} support={support} />
      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {list.map((industry) => (
          <StaggerItem key={industry.name} className="h-full">
            <Link
              to="/industries"
              className="group flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-maxek-navy shadow-card [transition:box-shadow_.3s_ease,transform_.3s_ease] hover:-translate-y-1 hover:shadow-card-hover"
              data-testid={`vertical-industry-${industry.name.toLowerCase()}`}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={INDUSTRY_IMAGES[industry.name]}
                  alt={`${industry.name} sector served by MAXEK`}
                  title={industry.name}
                  className="image-zoom h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[1.0625rem] font-semibold text-white">{industry.name}</h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-white/80">
                  {industry.description}
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
};

/** Vertical page contact block — internal linking + enquiry entry point. */
export const VerticalContact = ({ vertical, relatedLinks = [], dark }) => {
  const { openEnquiry } = useEnquiry();
  return (
    <Section dark={dark}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-2">
          <Kicker light={dark}>Contact</Kicker>
        </Reveal>

        <div className="lg:col-span-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className={`text-display-2 text-balance ${dark ? "text-white" : "text-maxek-navy"}`}>
                Discuss your requirement with {vertical.name}
              </h2>
              <p className={`mt-6 text-lg leading-relaxed text-pretty ${dark ? "text-white/80" : "text-maxek-text"}`}>
                Tell us what you are planning and our {vertical.name} team will
                respond with a considered technical and commercial view.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Btn
                  variant="red"
                  size="lg"
                  onClick={() => openEnquiry({ business_vertical: vertical.name })}
                  data-testid={`${vertical.slug}-enquiry-button`}
                >
                  Business Enquiry
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Btn>
                <Btn variant={dark ? "outline" : "outlineDark"} size="lg" to="/contact">
                  Contact Us
                </Btn>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${dark ? "text-white/50" : "text-maxek-muted"}`}>
                Explore related
              </p>
              <ul className={`mt-6 divide-y border-y ${dark ? "divide-white/10 border-white/10" : "divide-maxek-border border-maxek-border"}`}>
                {relatedLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group flex items-center justify-between gap-6 py-5"
                      data-testid={`${vertical.slug}-related-${link.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    >
                      <span>
                        <span className={`block text-[1.0625rem] font-semibold [transition:color_.2s_ease] group-hover:text-maxek-red ${dark ? "text-white" : "text-maxek-navy"}`}>
                          {link.label}
                        </span>
                        <span className={`mt-1 block text-[0.875rem] ${dark ? "text-white/50" : "text-maxek-text"}`}>
                          {link.description}
                        </span>
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-maxek-red [transition:transform_.25s_ease] group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
};
