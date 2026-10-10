"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState, type ReactNode } from "react";
import { T } from "@/components/i18n";
import { useLang } from "@/components/lang-toggle";
import { enquiryMessagesHi, enquirySchema } from "@/lib/enquiry-schema";

type Props = {
  school: "aryavart" | "aadharshila" | "aesri";
  kind: "admission" | "general";
  /** Classes a parent can choose from; free text if omitted. */
  classes?: string[];
  schoolName?: string;
};

type Errors = Partial<Record<string, string>>;

export function EnquiryForm({ school, kind, classes, schoolName }: Props) {
  const lang = useLang();
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [reference, setReference] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");

  const msg = (m?: string) => (m ? (lang === "hi" ? enquiryMessagesHi[m] ?? m : m) : undefined);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      school,
      kind,
      parentName: String(fd.get("parentName") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      childName: String(fd.get("childName") ?? ""),
      classSought: String(fd.get("classSought") ?? ""),
      replyLanguage: (fd.get("replyLanguage") === "hi" ? "hi" : "en") as "en" | "hi",
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
    };

    const check = enquirySchema.safeParse(payload);
    const next: Errors = {};
    if (!check.success) for (const issue of check.error.issues) next[String(issue.path[0])] ??= issue.message;
    // Show the child fields' errors together with the rest (the schema checks them in a second pass).
    if (kind === "admission") {
      if (payload.childName.trim().length < 2) next.childName ??= "Please enter the child's name.";
      if (!payload.classSought) next.classSought ??= "Please choose a class.";
    }
    if (Object.keys(next).length) {
      setErrors(next);
      const order = ["parentName", "phone", "childName", "classSought", "email", "message", "consent"];
      const first = order.find((k) => next[k]) ?? Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setReference(data.reference);
        setStatus("done");
      } else if (data.fieldErrors) {
        setErrors(data.fieldErrors);
        setStatus("idle");
      } else {
        setServerError(data.error ?? "Something went wrong.");
        setStatus("failed");
      }
    } catch {
      setServerError("You seem to be offline. Please try again, or call the school office.");
      setStatus("failed");
    }
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[1.75rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.08] sm:p-10"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-10 w-10 text-forest-600" aria-hidden />
        <h3 className="mt-5 font-display text-3xl text-forest-900">
          <T en="Thank you — we've received your enquiry." hi="धन्यवाद — आपकी पूछताछ हमें मिल गई है।" />
        </h3>
        <p className="mt-4 text-muted">
          <T
            en={`${schoolName ?? "The school office"} will get back to you. Your reference number is`}
            hi={`${schoolName ?? "विद्यालय कार्यालय"} आपसे संपर्क करेगा। आपका संदर्भ क्रमांक है`}
          />{" "}
          <strong className="font-mono text-forest-900">{reference}</strong>.
        </p>
        {kind === "admission" ? (
          <p className="mt-3 text-sm text-muted">
            <T
              en="This is an enquiry, not an admission or RTE application."
              hi="यह एक पूछताछ है, प्रवेश या RTE आवेदन नहीं।"
            />
          </p>
        ) : null}
      </motion.div>
    );
  }

  const fieldIds = (name: string) => ({ id: `${formId}-${name}`, errorId: `${formId}-${name}-error` });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-[1.75rem] bg-cream-50 p-6 ring-1 ring-forest-900/[0.08] sm:p-10" aria-describedby={`${formId}-note`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="parentName" label={<T en="Parent / guardian name" hi="माता-पिता / अभिभावक का नाम" />} required error={msg(errors.parentName)} {...fieldIds("parentName")}>
          {(p) => <input {...p} type="text" autoComplete="name" />}
        </Field>
        <Field name="phone" label={<T en="Mobile number" hi="मोबाइल नंबर" />} required error={msg(errors.phone)} {...fieldIds("phone")}>
          {(p) => <input {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" />}
        </Field>
        {kind === "admission" ? (
          <>
            <Field name="childName" label={<T en="Child's name" hi="बच्चे का नाम" />} required error={msg(errors.childName)} {...fieldIds("childName")}>
              {(p) => <input {...p} type="text" autoComplete="off" />}
            </Field>
            <Field name="classSought" label={<T en="Class sought" hi="इच्छित कक्षा" />} required error={msg(errors.classSought)} {...fieldIds("classSought")}>
              {(p) =>
                classes && classes.length ? (
                  <select {...p} defaultValue="">
                    <option value="" disabled>
                      {lang === "hi" ? "कक्षा चुनें" : "Choose a class"}
                    </option>
                    {classes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input {...p} type="text" placeholder={lang === "hi" ? "जैसे — कक्षा 3" : "e.g. Class 3"} />
                )
              }
            </Field>
          </>
        ) : null}
        <Field name="email" label={<T en="Email (optional)" hi="ईमेल (वैकल्पिक)" />} error={msg(errors.email)} {...fieldIds("email")}>
          {(p) => <input {...p} type="email" autoComplete="email" />}
        </Field>
        <fieldset className="flex flex-col gap-2">
          <legend className="text-[0.9rem] font-semibold text-forest-900">
            <T en="Reply in" hi="उत्तर की भाषा" />
          </legend>
          <div className="mt-2 flex gap-2">
            {[
              ["en", "English"],
              ["hi", "हिंदी"],
            ].map(([v, l]) => (
              <label key={v} className="relative flex-1 cursor-pointer">
                <input type="radio" name="replyLanguage" value={v} defaultChecked={v === (lang === "hi" ? "hi" : "en")} className="peer sr-only" />
                <span className="flex h-12 items-center justify-center rounded-xl border border-forest-900/15 text-sm font-semibold text-forest-900/80 transition peer-checked:border-forest-700 peer-checked:bg-forest-800 peer-checked:text-cream-50 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ochre-500">
                  {l}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="sm:col-span-2">
          <Field name="message" label={<T en="Your message (optional)" hi="आपका संदेश (वैकल्पिक)" />} error={msg(errors.message)} {...fieldIds("message")}>
            {(p) => <textarea {...p} rows={4} />}
          </Field>
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-[0.92rem] text-muted">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 h-6 w-6 shrink-0 rounded border-forest-900/30 accent-forest-700"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
          />
          <span>
            <T
              en="I agree that the school may contact me about this enquiry. My details are used only for this and are not shared."
              hi="मैं सहमत हूँ कि विद्यालय इस पूछताछ के बारे में मुझसे संपर्क कर सकता है। मेरी जानकारी केवल इसी के लिए उपयोग होगी और साझा नहीं की जाएगी।"
            />{" "}
            <Link href="/policies/privacy-policy" className="font-semibold text-forest-800 underline underline-offset-2">
              <T en="Privacy policy" hi="गोपनीयता नीति" />
            </Link>
          </span>
        </label>
        {errors.consent ? <ErrorText id={`${formId}-consent-error`}>{msg(errors.consent)}</ErrorText> : null}
      </div>

      <p id={`${formId}-note`} className="mt-5 rounded-xl bg-sage-50 px-4 py-3 text-[0.85rem] text-forest-800">
        {kind === "admission" ? (
          <T
            en="This is an enquiry, not an admission or RTE application. RTE seats are allotted only through the Government of Rajasthan's process."
            hi="यह एक पूछताछ है, प्रवेश या RTE आवेदन नहीं। RTE सीटें केवल राजस्थान सरकार की प्रक्रिया से आवंटित होती हैं।"
          />
        ) : (
          <T en="For anything urgent, please call the school office." hi="किसी भी तात्कालिक विषय के लिए कृपया विद्यालय कार्यालय को फ़ोन करें।" />
        )}
      </p>

      <AnimatePresence>
        {status === "failed" && serverError ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-xl bg-clay-500/10 px-4 py-3 text-sm text-clay-600"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {serverError}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-7 inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-forest-800 px-7 py-3.5 font-semibold text-cream-50 transition-colors hover:bg-forest-700 disabled:opacity-70"
      >
        {status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Send className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden />}
        {status === "sending" ? <T en="Sending…" hi="भेजा जा रहा है…" /> : <T en="Send enquiry" hi="पूछताछ भेजें" />}
      </button>
    </form>
  );
}

type FieldProps = {
  id: string;
  name: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
  required?: boolean;
  className: string;
};

function Field({
  name,
  label,
  required,
  error,
  id,
  errorId,
  children,
}: {
  name: string;
  label: ReactNode;
  required?: boolean;
  error?: string;
  id: string;
  errorId: string;
  children: (p: FieldProps) => ReactNode;
}) {
  const props: FieldProps = {
    id,
    name,
    "aria-invalid": !!error,
    "aria-describedby": error ? errorId : undefined,
    "aria-required": required || undefined,
    className: clsx(
      "mt-2 block w-full rounded-xl border bg-cream-100/60 px-4 py-3 text-[0.98rem] text-forest-900 outline-none transition placeholder:text-muted/60 focus:border-forest-600 focus:bg-cream-50 focus:ring-4 focus:ring-forest-600/10",
      error ? "border-clay-600" : "border-forest-900/15",
    ),
  };
  return (
    <div>
      <label htmlFor={id} className="text-[0.9rem] font-semibold text-forest-900">
        {label}
        {required ? (
          <span className="text-clay-600" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children(props)}
      {error ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-[0.85rem] font-medium text-clay-600">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {children}
    </p>
  );
}
