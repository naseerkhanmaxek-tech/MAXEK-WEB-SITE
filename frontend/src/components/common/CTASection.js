import React from "react";
import { ArrowRight } from "lucide-react";
import Btn from "@/components/common/Btn";
import { Kicker, Reveal } from "@/components/common/Section";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { STOCK } from "@/lib/images";

/** Global “Let's Build Something Great Together” CTA band. */
export default function CTASection({
  kicker = "Get in touch",
  title = "Let’s Build Something Great Together",
  support = "Whether you’re planning a new project or seeking a trusted engineering partner, we’re ready to help.",
  image = STOCK.steelFrameSunset,
  prefill,
}) {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="bg-maxek-ink" data-testid="contact-cta-section">
      <div className="shell relative py-20 md:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-8">
          <Kicker light className="mb-6">
            {kicker}
          </Kicker>
          <h2 className="text-display-2 text-white text-balance">{title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70 text-pretty">{support}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Btn
              variant="red"
              size="lg"
              onClick={() => openEnquiry(prefill)}
              data-testid="cta-business-enquiry-button"
            >
              Business Enquiry
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Btn>
            <Btn
              variant="outlineLight"
              size="lg"
              to="/contact"
              data-testid="cta-contact-us-button"
            >
              Contact Us
            </Btn>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
