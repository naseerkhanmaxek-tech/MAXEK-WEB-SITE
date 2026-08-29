import React, { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import Btn from "@/components/common/Btn";
import {
  COMPANY,
  ERROR_MESSAGE,
  SERVICE_OPTIONS,
  SUCCESS_MESSAGE,
  VERTICAL_OPTIONS,
} from "@/lib/site";
import { submitContact, submitEnquiry } from "@/lib/api";
import { cn } from "@/lib/utils";

const EMPTY = {
  full_name: "",
  company_name: "",
  email: "",
  phone: "",
  business_vertical: "",
  service_required: "",
  project_details: "",
};

const fieldClass = (dark) =>
  cn(
    "w-full rounded-btn border px-4 py-3 text-[0.9375rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maxek-red focus-visible:ring-offset-1 [transition:border-color_.2s_ease,box-shadow_.2s_ease]",
    dark
      ? "border-white/20 bg-white/5 text-white placeholder:text-white/40"
      : "border-maxek-border bg-white text-maxek-navy placeholder:text-maxek-muted"
  );

const Field = ({ id, label, required, error, children, hint, dark }) => (
  <div>
    <label
      htmlFor={id}
      className={cn("mb-2 block text-[13px] font-medium", dark ? "text-white/90" : "text-maxek-navy")}
    >
      {label}
      {required ? <span className="ml-1 text-maxek-red">*</span> : null}
    </label>
    {children}
    {hint && !error ? (
      <p className={cn("mt-1.5 text-xs", dark ? "text-white/50" : "text-maxek-muted")}>{hint}</p>
    ) : null}
    {error ? (
      <p
        className="mt-1.5 flex items-center gap-1.5 text-xs text-maxek-red"
        role="alert"
        data-testid={`enquiry-error-${id}`}
      >
        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
        {error}
      </p>
    ) : null}
  </div>
);

function validate(values) {
  const errors = {};
  if (!values.full_name.trim() || values.full_name.trim().length < 2)
    errors.full_name = "Please enter your full name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (values.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Please enter a valid phone number.";
  return errors;
}

/**
 * The single reusable enquiry system.
 * Used by the header Business Enquiry modal AND the Contact page form.
 */
export default function EnquiryForm({
  variant = "enquiry",
  prefill = {},
  onSuccess,
  idPrefix = "enquiry",
  autoFocus = false,
  compact = false,
  dark = true,
}) {
  const [values, setValues] = useState({ ...EMPTY, ...prefill });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");
  const firstRef = useRef(null);

  useEffect(() => {
    setValues((v) => ({ ...v, ...prefill }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(prefill)]);

  useEffect(() => {
    if (autoFocus && firstRef.current) {
      const t = setTimeout(() => firstRef.current?.focus(), 160);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [autoFocus]);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus("idle");
      setMessage("");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const payload = {
        ...values,
        source: variant === "contact" ? "contact-page" : "business-enquiry-modal",
      };
      const res =
        variant === "contact"
          ? await submitContact(payload)
          : await submitEnquiry(payload);
      setStatus("success");
      setMessage(res?.message || SUCCESS_MESSAGE);
      setValues({ ...EMPTY });
      onSuccess?.(res);
    } catch (err) {
      setStatus("error");
      setMessage(ERROR_MESSAGE);
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-card border p-8 text-center",
          dark ? "border-white/10 bg-white/5" : "border-maxek-border bg-maxek-surface"
        )}
        role="status"
        aria-live="polite"
        data-testid={`${idPrefix}-success-message`}
      >
        <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-maxek-red text-white shadow-card">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className={cn("text-xl font-semibold", dark ? "text-white" : "text-maxek-navy")}>Thank you!</h3>
        <p className={cn("mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed", dark ? "text-white/80" : "text-maxek-text")}>
          Your enquiry has been submitted successfully. Our team will contact you
          shortly.
        </p>
        <Btn
          variant={dark ? "outline" : "outlineDark"}
          size="sm"
          className="mt-7"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
          data-testid={`${idPrefix}-submit-another-button`}
        >
          Submit another enquiry
        </Btn>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      data-testid={`${idPrefix}-form`}
    >
      <div className={cn("grid gap-5", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        <Field
          id={`${idPrefix}-full-name`}
          label="Full Name"
          required
          error={errors.full_name}
          dark={dark}
        >
          <input
            ref={firstRef}
            id={`${idPrefix}-full-name`}
            name="full_name"
            type="text"
            autoComplete="name"
            required
            className={cn(fieldClass(dark), errors.full_name && "border-maxek-red")}
            placeholder="Your full name"
            value={values.full_name}
            onChange={set("full_name")}
            aria-invalid={Boolean(errors.full_name)}
            data-testid={`${idPrefix}-full-name-input`}
          />
        </Field>

        <Field id={`${idPrefix}-company`} label="Company Name" dark={dark}>
          <input
            id={`${idPrefix}-company`}
            name="company_name"
            type="text"
            autoComplete="organization"
            className={fieldClass(dark)}
            placeholder="Your organisation"
            value={values.company_name}
            onChange={set("company_name")}
            data-testid={`${idPrefix}-company-input`}
          />
        </Field>

        <Field
          id={`${idPrefix}-email`}
          label="Email"
          required
          error={errors.email}
          dark={dark}
        >
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            className={cn(fieldClass(dark), errors.email && "border-maxek-red")}
            placeholder="name@company.com"
            value={values.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            data-testid={`${idPrefix}-email-input`}
          />
        </Field>

        <Field
          id={`${idPrefix}-phone`}
          label="Phone"
          required
          error={errors.phone}
          dark={dark}
        >
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className={cn(fieldClass(dark), errors.phone && "border-maxek-red")}
            placeholder="+91 00000 00000"
            value={values.phone}
            onChange={set("phone")}
            aria-invalid={Boolean(errors.phone)}
            data-testid={`${idPrefix}-phone-input`}
          />
        </Field>

        <Field id={`${idPrefix}-vertical`} label="Business Vertical" dark={dark}>
          <select
            id={`${idPrefix}-vertical`}
            name="business_vertical"
            className={cn(fieldClass(dark), "appearance-none bg-maxek-navy pr-10 text-white")}
            value={values.business_vertical}
            onChange={set("business_vertical")}
            data-testid={`${idPrefix}-vertical-select`}
          >
            <option value="">Select a vertical</option>
            {VERTICAL_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </Field>

        <Field id={`${idPrefix}-service`} label="Service Required" dark={dark}>
          <select
            id={`${idPrefix}-service`}
            name="service_required"
            className={cn(fieldClass(dark), "appearance-none bg-maxek-navy pr-10 text-white")}
            value={values.service_required}
            onChange={set("service_required")}
            data-testid={`${idPrefix}-service-select`}
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id={`${idPrefix}-details`} label="Project Details" dark={dark}>
        <textarea
          id={`${idPrefix}-details`}
          name="project_details"
          rows={compact ? 4 : 5}
          className={cn(fieldClass(dark), "resize-y")}
          placeholder="Tell us about your project, scope, location and timeline."
          value={values.project_details}
          onChange={set("project_details")}
          data-testid={`${idPrefix}-details-textarea`}
        />
      </Field>

      {status === "error" ? (
        <div
          className="flex items-start gap-2.5 rounded-btn border border-maxek-red/30 bg-maxek-red/5 px-4 py-3 text-[0.875rem] text-maxek-red"
          role="alert"
          data-testid={`${idPrefix}-error-message`}
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            {message} You can also reach us at{" "}
            <a href={`mailto:${COMPANY.businessEmail}`} className="underline">
              {COMPANY.businessEmail}
            </a>
            .
          </span>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className={cn("text-xs leading-relaxed", dark ? "text-white/50" : "text-maxek-muted")}>
          Fields marked <span className="text-maxek-red">*</span> are required. We
          respond to every enquiry.
        </p>
        <Btn
          type="submit"
          variant="red"
          size="md"
          disabled={status === "loading"}
          className="w-full sm:w-auto"
          data-testid={`${idPrefix}-submit-button`}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            <>
              Submit
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Btn>
      </div>
    </form>
  );
}
