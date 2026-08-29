import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, Briefcase, CheckCircle2, Clock, Loader2, MapPin, X } from "lucide-react";
import SEO, { breadcrumbSchema, jobPostingSchema } from "@/components/common/SEO";
import PageHero from "@/components/common/PageHero";
import Section, { Kicker, Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/common/Section";
import { FeatureCard, Icon } from "@/components/common/Cards";
import Btn from "@/components/common/Btn";
import CTASection from "@/components/common/CTASection";
import { fetchJobs, submitApplication } from "@/lib/api";
import { CAREER_BENEFITS, COMPANY, ERROR_MESSAGE, LIFE_AT_MAXEK } from "@/lib/site";
import { OFFICIAL } from "@/lib/images";
import { overlayVariants, panelVariants } from "@/lib/motion";
import { setScrollLocked } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { label: "Home", to: "/" },
  { label: "Careers", to: "/careers" },
];

const fieldClass =
  "w-full rounded-btn border border-white/10 bg-maxek-navy px-4 py-3 text-[0.9375rem] text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maxek-red focus-visible:ring-offset-1";

const EMPTY = {
  full_name: "",
  email: "",
  phone: "",
  experience_years: "",
  current_location: "",
  portfolio_url: "",
  cover_note: "",
};

function ApplyModal({ job, onClose }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  React.useEffect(() => {
    setScrollLocked(true);
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      setScrollLocked(false);
    };
  }, [onClose]);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((p) => (p[key] ? { ...p, [key]: undefined } : p));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!values.full_name.trim()) found.full_name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      found.email = "Please enter a valid email address.";
    if (values.phone.replace(/\D/g, "").length < 7)
      found.phone = "Please enter a valid phone number.";
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("loading");
    try {
      await submitApplication({ ...values, job_id: job.id });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 py-8 sm:items-center">
      <motion.div
        className="fixed inset-0 bg-maxek-ink/70 backdrop-blur-sm"
        variants={overlayVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-card bg-maxek-navy shadow-modal"
        variants={panelVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        data-testid="careers-apply-modal"
      >
        <div className="relative border-b border-white/10 bg-white/5 px-6 py-6 sm:px-8">
          <p className="kicker">Apply Now</p>
          <h2 id="apply-modal-title" className="mt-3 text-xl font-semibold text-white sm:text-2xl">
            {job.title}
          </h2>
          <p className="mt-1.5 text-[0.875rem] text-white/50">
            {job.vertical} &middot; {job.location}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close application form"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-maxek-navy text-white hover:bg-maxek-navy hover:text-white sm:right-6"
            data-testid="careers-apply-close-button"
          >
            <X className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto px-6 py-7 sm:px-8">
          {status === "success" ? (
            <div className="text-center" role="status" data-testid="careers-apply-success-message">
              <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-maxek-red">
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-semibold text-white">Thank you!</h3>
              <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-white/80">
                Your application has been submitted successfully. Our team will
                contact you shortly.
              </p>
              <Btn variant="outline" size="sm" className="mt-7" onClick={onClose}>
                Close
              </Btn>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5" data-testid="careers-apply-form">
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { key: "full_name", label: "Full Name", required: true, type: "text", placeholder: "Your full name" },
                  { key: "email", label: "Email", required: true, type: "email", placeholder: "name@example.com" },
                  { key: "phone", label: "Phone", required: true, type: "tel", placeholder: "+91 00000 00000" },
                  { key: "experience_years", label: "Total Experience", type: "text", placeholder: "e.g. 6 years" },
                  { key: "current_location", label: "Current Location", type: "text", placeholder: "City, State" },
                  { key: "portfolio_url", label: "LinkedIn / Portfolio", type: "url", placeholder: "https://" },
                ].map((f) => (
                  <div key={f.key}>
                    <label htmlFor={`apply-${f.key}`} className="mb-2 block text-[13px] font-medium text-white">
                      {f.label}
                      {f.required ? <span className="ml-1 text-maxek-red">*</span> : null}
                    </label>
                    <input
                      id={`apply-${f.key}`}
                      type={f.type}
                      className={cn(fieldClass, errors[f.key] && "border-maxek-red")}
                      placeholder={f.placeholder}
                      value={values[f.key]}
                      onChange={set(f.key)}
                      aria-invalid={Boolean(errors[f.key])}
                      data-testid={`careers-apply-${f.key.replace(/_/g, "-")}-input`}
                    />
                    {errors[f.key] ? (
                      <p className="mt-1.5 text-xs text-maxek-red" role="alert">
                        {errors[f.key]}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div>
                <label htmlFor="apply-cover-note" className="mb-2 block text-[13px] font-medium text-white">
                  Cover Note
                </label>
                <textarea
                  id="apply-cover-note"
                  rows={4}
                  className={cn(fieldClass, "resize-y")}
                  placeholder="Briefly tell us why this role fits your experience."
                  value={values.cover_note}
                  onChange={set("cover_note")}
                  data-testid="careers-apply-cover-note-textarea"
                />
              </div>

              {status === "error" ? (
                <p className="flex items-start gap-2 rounded-btn border border-maxek-red/30 bg-maxek-red/5 px-4 py-3 text-[0.875rem] text-maxek-red" role="alert">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {ERROR_MESSAGE} You can also email {COMPANY.hrEmail}.
                </p>
              ) : null}

              <Btn
                type="submit"
                variant="red"
                className="w-full"
                disabled={status === "loading"}
                data-testid="careers-apply-submit-button"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting&hellip;
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Btn>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

const JobCard = ({ job, onApply }) => (
  <article className="card-surface flex h-full flex-col" data-testid={`job-card-${job.id}`}>
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-maxek-muted">
      <span className="text-maxek-red">{job.vertical}</span>
      <span className="h-3 w-px bg-maxek-border" aria-hidden="true" />
      <span>{job.department}</span>
    </div>
    <h3 className="mt-4 text-display-3 leading-snug text-maxek-navy">{job.title}</h3>
    <p className="mt-4 text-[0.9375rem] leading-relaxed text-maxek-text">{job.summary}</p>

    <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-maxek-text">
      <div className="inline-flex items-center gap-2">
        <MapPin className="h-3.5 w-3.5 text-maxek-red" aria-hidden="true" />
        <dt className="sr-only">Location</dt>
        <dd>{job.location}</dd>
      </div>
      {job.employment_type && (
        <div className="inline-flex items-center gap-2">
          <Briefcase className="h-3.5 w-3.5 text-maxek-red" aria-hidden="true" />
          <dt className="sr-only">Employment type</dt>
          <dd>{job.employment_type}</dd>
        </div>
      )}
      {job.experience && (
        <div className="inline-flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-maxek-red" aria-hidden="true" />
          <dt className="sr-only">Experience</dt>
          <dd>{job.experience}</dd>
        </div>
      )}
    </dl>

    {(job.responsibilities?.length > 0 || job.requirements?.length > 0) && (
      <div className="mt-6 grid gap-6 border-t border-maxek-border pt-6 sm:grid-cols-2">
        {job.responsibilities?.length > 0 && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-maxek-muted">Responsibilities</p>
            <ul className="mt-3 space-y-2">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2 text-[0.875rem] leading-relaxed text-maxek-text">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-maxek-red" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
        {job.requirements?.length > 0 && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-maxek-muted">Requirements</p>
            <ul className="mt-3 space-y-2">
              {job.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2 text-[0.875rem] leading-relaxed text-maxek-text">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-maxek-red" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )}

    <Btn
      variant="primary"
      size="sm"
      className="mt-8 self-start border border-maxek-border"
      onClick={() => onApply(job)}
      data-testid={`careers-apply-now-button-${job.id}`}
    >
      Apply Now
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Btn>
  </article>
);

export default function Careers() {
  const [activeJob, setActiveJob] = useState(null);
  const { data: jobs = [], isLoading } = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });

  const openings = jobs.filter((j) => !j.is_internship);

  return (
    <>
      <SEO
        title="Careers at MAXEK India"
        description="Join MAXEK and build your career with an innovative engineering company. Explore current openings and employee benefits across our verticals."
        path="/careers"
        keywords="Engineering Careers, Construction Jobs, Technology Careers, Engineering Opportunities, Work at MAXEK, Engineering Company Careers"
        schemas={[breadcrumbSchema(CRUMBS), ...jobs.map((j) => jobPostingSchema(j))]}
      />

      <PageHero
        kicker="Careers"
        title="Build Your Career With MAXEK"
        support="Join a team driven by innovation, collaboration, and engineering excellence."
        image={OFFICIAL.careers}
        imageAlt="MAXEK INFRA, MAXEK TECHNOLOGIES and MAXEK BUSINESS HUB — engineering, technology and business teams across the group"
        imagePosition="center 38%"
        breadcrumbs={CRUMBS}
      >
        <Btn variant="onDark" size="lg" href="#current-openings" data-testid="careers-view-openings-button">
          View Careers
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Btn>
        <Btn variant="outlineLight" size="lg" href={`mailto:${COMPANY.hrEmail}`}>
          {COMPANY.hrEmail}
        </Btn>
      </PageHero>

      {/* Life at MAXEK */}
      <Section id="life-at-maxek">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Kicker className="mb-7">Life at MAXEK</Kicker>
            <h2 className="text-display-2 text-balance">
              What working here actually looks like
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-maxek-text text-pretty">
              We are an engineering group, and the culture reflects that. Evidence
              carries more weight than hierarchy, and people who are capable are
              given responsibility early.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <dl className="divide-y divide-maxek-border border-y border-maxek-border">
              {LIFE_AT_MAXEK.map((item) => (
                <div key={item.title} className="py-6">
                  <dt className="text-[1.0625rem] font-semibold text-maxek-navy">{item.title}</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-maxek-text">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* Why work with us */}
      <Section dark id="why-work-with-us">
        <SectionHeader
          light
          kicker="Why Work With Us"
          title="Reasons engineers stay"
          support="Cross-vertical exposure, genuine ownership and a group that invests in capability rather than only in headcount."
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {[
            { icon: "Layers", title: "Integrated group exposure", description: "Work across engineering execution, digital engineering and business growth on the same programme." },
            { icon: "Ruler", title: "Technical depth", description: "Real engineering problems with real constraints, reviewed by people who have solved them before." },
            { icon: "GraduationCap", title: "Capability investment", description: "MAXEK EDU certification, AI learning and corporate training available to every employee." },
            { icon: "ShieldCheck", title: "Protected safety culture", description: "Stop-work authority at every level, genuinely supported by leadership." },
            { icon: "TrendingUp", title: "Transparent progression", description: "Defined competency levels with published criteria rather than informal judgement." },
            { icon: "Globe2", title: "Scalable ambition", description: "A group structured for international delivery, with the opportunities that follow." },
          ].map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <FeatureCard icon={item.icon} title={item.title} description={item.description} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Current openings */}
      <Section id="current-openings">
        <SectionHeader
          kicker="Current Openings"
          title={`${openings.length} open ${openings.length === 1 ? "role" : "roles"} across the group`}
          support="Apply directly below. Every application is reviewed by our team."
        />
        {isLoading ? (
          <div className="mt-14 space-y-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-72 animate-pulse rounded-card border border-maxek-border bg-maxek-surface" />
            ))}
          </div>
        ) : (
          <Stagger className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-7">
            {openings.map((job) => (
              <StaggerItem key={job.id} className="h-full">
                <JobCard job={job} onApply={setActiveJob} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Section>

      {/* MAXEK EDU Upcoming */}
      <Section dark id="maxek-edu">
        <Reveal className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Kicker light className="mb-7">Future Initiative</Kicker>
            <h2 className="text-display-2 text-balance text-white">MAXEK EDU</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70 text-pretty">
              An upcoming learning and professional development initiative from MAXEK.
              We are not currently offering internships. More details will be announced as the initiative develops.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-maxek-red opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-maxek-red"></span>
              </span>
              <span className="text-[0.8125rem] font-semibold tracking-wide text-white uppercase">Coming Soon</span>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Benefits */}
      <Section id="employee-benefits">
        <SectionHeader
          kicker="Employee Benefits"
          title="What we provide"
          support="Practical benefits that support health, capability and long-term career growth."
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {CAREER_BENEFITS.map((b) => (
            <StaggerItem key={b.title} className="h-full">
              <FeatureCard icon={b.icon} title={b.title} description={b.description} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Speculative applications */}
      <Section dark id="apply-now">
        <div className="rounded-card border border-transparent bg-maxek-red p-9 shadow-card lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Kicker light tone="white" className="mb-7">Apply Now</Kicker>
              <h2 className="text-display-2 text-balance text-white">Nothing quite right today?</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/90 text-pretty">
                Send your profile to our HR team. We keep strong applications on
                file and contact candidates when a suitable role opens.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Btn variant="primary" size="lg" href={`mailto:${COMPANY.hrEmail}`} data-testid="careers-hr-email-button" className="text-maxek-navy hover:text-maxek-navy">
                Email {COMPANY.hrEmail}
                <Icon name="Mail" className="h-4 w-4" />
              </Btn>
              <Btn variant="outline" size="lg" to="/contact" className="border-white text-white hover:bg-white hover:text-maxek-navy">
                Contact Us
              </Btn>
            </div>
          </div>
        </div>
      </Section>

      <CTASection />

      <AnimatePresence>
        {activeJob ? <ApplyModal job={activeJob} onClose={() => setActiveJob(null)} /> : null}
      </AnimatePresence>
    </>
  );
}
