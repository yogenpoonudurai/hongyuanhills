"use client";

import {
  useCallback,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";
import { formCopy } from "@/content/forms";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/content/types";
import { contact, telHref, waLink } from "@/lib/contact";
import { fieldErrors, leadSchema } from "@/lib/lead-schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

function readUtm() {
  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
    term: params.get("utm_term") ?? undefined,
    content: params.get("utm_content") ?? undefined,
  };
  return Object.values(utm).some(Boolean) ? utm : undefined;
}

function Field({
  id,
  label,
  required,
  optionalLabel,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-ink"
      >
        {label}
        {required ? (
          <span className="ml-1 text-gold-dark" aria-hidden="true">
            *
          </span>
        ) : optionalLabel ? (
          <span className="ml-1 text-xs font-normal text-stone">
            ({optionalLabel})
          </span>
        ) : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function LeadForm({ locale }: { locale: Locale }) {
  const copy = formCopy[locale];
  const ui = siteCopy[locale];
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrorsState, setFieldErrorsState] = useState<
    Record<string, string>
  >({});
  const [formError, setFormError] = useState("");
  const [token, setToken] = useState("");
  const [widgetKey, setWidgetKey] = useState(0);

  const handleToken = useCallback((value: string) => setToken(value), []);

  const inputClass = (hasError: boolean) =>
    cn(
      "min-h-12 w-full rounded-none border bg-paper px-3 text-base text-ink outline-none transition placeholder:text-stone/70 focus:border-gold",
      hasError ? "border-red-600" : "border-line",
    );

  function localizeFields(fields: Record<string, string>) {
    const map: Record<string, string> = {
      name: copy.errors.name,
      phone: copy.errors.phone,
      email: copy.errors.email,
      preferredDate: copy.errors.date,
      consent: copy.errors.consent,
      turnstile: copy.errors.turnstile,
    };
    const localized: Record<string, string> = {};
    for (const key of Object.keys(fields)) {
      localized[key] = map[key] ?? copy.errors.generic;
    }
    return localized;
  }

  function focusFirstError(fields: Record<string, string>) {
    const first = Object.keys(fields)[0];
    if (!first) return;
    const element = formRef.current?.querySelector<HTMLElement>(
      `[name="${first}"]`,
    );
    element?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = new FormData(event.currentTarget);
    const payload = {
      type: "visit" as const,
      locale,
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      interest: String(form.get("interest") ?? ""),
      preferredDate: String(form.get("preferredDate") ?? ""),
      preferredTime: String(form.get("preferredTime") ?? ""),
      message: String(form.get("message") ?? ""),
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
      turnstileToken: token,
    };

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const errors = fieldErrors(parsed.error.issues);
      setFieldErrorsState(localizeFields(errors));
      setFormError(copy.errors.generic);
      focusFirstError(errors);
      return;
    }

    if (siteKey && !token) {
      setFieldErrorsState({ turnstile: copy.errors.turnstile });
      setFormError(copy.errors.turnstile);
      return;
    }

    setStatus("submitting");
    setFormError("");
    setFieldErrorsState({});

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          page: window.location.pathname,
          utm: readUtm(),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: Record<string, string>;
      };

      if (response.ok && result.ok) {
        formRef.current?.reset();
        setToken("");
        setWidgetKey((key) => key + 1);
        setStatus("success");
        return;
      }

      if (response.status === 400 && result.fields) {
        setFieldErrorsState(localizeFields(result.fields));
        setFormError(copy.errors.generic);
        setStatus("error");
        focusFirstError(result.fields);
        return;
      }

      if (response.status === 403 && result.error === "turnstile") {
        setToken("");
        setWidgetKey((key) => key + 1);
        setFormError(copy.errors.turnstile);
        setStatus("error");
        return;
      }

      if (response.status === 429) {
        setFormError(copy.errors.rateLimited);
        setStatus("error");
        return;
      }

      setFormError(copy.errors.unavailable);
      setStatus("error");
    } catch {
      setFormError(copy.errors.network);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-64 flex-col items-start justify-center border border-gold/40 bg-ivory p-6 sm:p-8"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-jade text-ivory">
          <CheckIcon className="h-5 w-5" />
        </span>
        <h3 className="mt-5 font-display text-2xl text-ink">
          {copy.success.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-ink/75">
          {copy.success.body}
        </p>
        <a
          href={waLink(ui.whatsapp.booking, contact.whatsappBooking)}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-jade px-5 text-sm font-semibold text-jade transition hover:bg-jade hover:text-ivory"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {copy.success.whatsapp}
        </a>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      {formError ? (
        <div
          role="alert"
          className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <p>{formError}</p>
          <p className="mt-2 text-xs text-red-700">
            {copy.errors.fallback}{" "}
            <a
              href={waLink(ui.whatsapp.general, contact.whatsappGeneral)}
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline"
            >
              WhatsApp
            </a>{" "}
            ·{" "}
            <a href={telHref(contact.phone24h)} className="font-semibold underline">
              {contact.phone24hDisplay}
            </a>
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="name"
          label={copy.fields.name}
          required
          error={fieldErrorsState.name}
        >
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(fieldErrorsState.name)}
            aria-describedby={
              fieldErrorsState.name ? "name-error" : undefined
            }
            className={inputClass(Boolean(fieldErrorsState.name))}
          />
        </Field>

        <Field
          id="phone"
          label={copy.fields.phone}
          required
          error={fieldErrorsState.phone}
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={Boolean(fieldErrorsState.phone)}
            aria-describedby={
              fieldErrorsState.phone ? "phone-error" : undefined
            }
            className={inputClass(Boolean(fieldErrorsState.phone))}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="email"
          label={copy.fields.email}
          optionalLabel={copy.fields.optional}
          error={fieldErrorsState.email}
        >
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={Boolean(fieldErrorsState.email)}
            aria-describedby={
              fieldErrorsState.email ? "email-error" : undefined
            }
            className={inputClass(Boolean(fieldErrorsState.email))}
          />
        </Field>

        <Field id="interest" label={copy.fields.interest}>
          <select
            id="interest"
            name="interest"
            className={inputClass(false)}
            defaultValue=""
          >
            <option value="">{copy.fields.optional}</option>
            {copy.interests.map((interest) => (
              <option key={interest.value} value={interest.value}>
                {interest.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="preferredDate"
          label={copy.fields.date}
          optionalLabel={copy.fields.optional}
          error={fieldErrorsState.preferredDate}
        >
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            aria-invalid={Boolean(fieldErrorsState.preferredDate)}
            aria-describedby={
              fieldErrorsState.preferredDate
                ? "preferredDate-error"
                : undefined
            }
            className={inputClass(Boolean(fieldErrorsState.preferredDate))}
          />
        </Field>

        <Field id="preferredTime" label={copy.fields.time}>
          <select
            id="preferredTime"
            name="preferredTime"
            className={inputClass(false)}
            defaultValue="any"
          >
            {copy.times.map((time) => (
              <option key={time.value} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id="message"
        label={copy.fields.message}
        optionalLabel={copy.fields.optional}
      >
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputClass(false)}
        />
      </Field>

      <div>
        <label className="flex items-start gap-3 text-sm leading-6 text-ink/80">
          <input
            type="checkbox"
            name="consent"
            required
            aria-required="true"
            aria-invalid={Boolean(fieldErrorsState.consent)}
            aria-describedby={
              fieldErrorsState.consent ? "consent-error" : undefined
            }
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-jade)]"
          />
          <span>{copy.fields.consent}</span>
        </label>
        {fieldErrorsState.consent ? (
          <p id="consent-error" className="mt-1.5 text-xs text-red-700">
            {fieldErrorsState.consent}
          </p>
        ) : null}
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <TurnstileWidget
        key={widgetKey}
        siteKey={siteKey}
        onToken={handleToken}
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-ink transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? copy.submitting : copy.submit}
      </button>

      <p className="text-xs leading-6 text-stone">{copy.privacy}</p>
      <p className="text-xs leading-6 text-stone">
        {copy.urgent}{" "}
        <a
          href={telHref(contact.phone24h)}
          className="inline-flex items-center gap-1 font-semibold text-jade"
        >
          <PhoneIcon className="h-3.5 w-3.5" />
          {contact.phone24hDisplay}
        </a>
      </p>
    </form>
  );
}
