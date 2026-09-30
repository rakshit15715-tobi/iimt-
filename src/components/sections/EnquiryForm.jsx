import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, RotateCcw, Send, ShieldCheck } from "lucide-react";

import { ENQUIRY_INTENTS } from "../../constants/enquiryIntents.js";
import { ENQUIRY_FIELDS } from "../../data/formOptions.js";
import { fireCelebration } from "../../utils/confetti.js";
import { firstErrorField, validateEnquiry, EMPTY_ENQUIRY } from "../../utils/validation.js";
import { Button } from "../ui/Button.jsx";
import { ConsentField, FormField } from "../ui/FormField.jsx";

/**
 * The admission enquiry form. One component serves both entry points - the "Get in touch"
 * section and the modal - so validation, ARIA wiring and the celebration can never diverge.
 *
 * NOTE: this is a frontend-only capstone build. There is no API: a passing submit validates,
 * fires the confetti burst and shows the confirmation state. Wire `POST /api/enquiry` into
 * `submit()` to go live; the dev-only notice below makes the simulation obvious while building.
 */
export function EnquiryForm({ intent = "enquiry", presetProgram = "", onSubmitted = null, className = "" }) {
  const config = ENQUIRY_INTENTS[intent] ?? ENQUIRY_INTENTS.enquiry;
  const [values, setValues] = useState(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | done

  // A programme card, an intent default or the footer can all pre-select the dropdown.
  const suggestedProgram = presetProgram || config.program || "";

  useEffect(() => {
    if (!suggestedProgram) return;
    setValues((previous) => ({ ...previous, program: suggestedProgram }));
  }, [suggestedProgram]);

  const fullName = useMemo(() => values.fullName.trim().split(/\s+/)[0] ?? "", [values.fullName]);

  const handleChange = (name, value) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    if (!touched[name]) return;
    // Re-validate only after a field has been touched, so errors appear on blur/submit rather
    // than while the visitor is still typing their name.
    const nextErrors = validateEnquiry({ ...values, [name]: value }).errors;
    setErrors((previous) => {
      const merged = { ...previous };
      if (nextErrors[name]) merged[name] = nextErrors[name];
      else delete merged[name];
      return merged;
    });
  };

  const handleBlur = (name) => setTouched((previous) => ({ ...previous, [name]: true }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = validateEnquiry(values);

    if (!result.valid) {
      setErrors(result.errors);
      setTouched(Object.fromEntries(Object.keys(result.errors).map((key) => [key, true])));
      const field = firstErrorField(result.errors);
      if (field) document.getElementById(field)?.focus();
      return;
    }

    setStatus("submitting");
    await fireCelebration();
    setStatus("done");
    onSubmitted?.(values);
  };

  if (status === "done") {
    return (
      <div className={`flex flex-col items-center gap-4 text-center ${className}`}>
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-success/30 bg-success/10 text-success">
          <CheckCircle2 size={26} aria-hidden="true" />
        </span>
        <h3 className="font-display text-xl font-bold text-content">
          Thank you{fullName ? `, ${fullName}` : ""}! Your enquiry is in.
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          A counsellor from the IIMT admission desk will call {values.phone} within one working day with
          fee details, scholarship options and the next steps for{" "}
          <span className="text-body">{values.program}</span>.
        </p>

        {import.meta.env.DEV ? (
          <p className="rounded-xl border border-gold/30 bg-gold-soft px-3 py-2 text-[0.7rem] text-gold-ink">
            Dev build notice: no API is connected, so nothing left the browser. This note is not part of
            the production build.
          </p>
        ) : null}

        <Button variant="secondary" size="sm" Icon={RotateCcw} onClick={() => {
          setValues(EMPTY_ENQUIRY);
          setErrors({});
          setTouched({});
          setStatus("idle");
        }}>
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={className}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ENQUIRY_FIELDS.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={values[field.name]}
            error={touched[field.name] ? errors[field.name] : ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ))}

        <ConsentField checked={values.consent} error={touched.consent ? errors.consent : ""} onChange={handleChange}>
          I agree that IIMT Group of Colleges may contact me on the number and e-mail above about
          admissions, scholarships and campus events, and I accept the privacy policy.
        </ConsentField>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" TrailingIcon={Send} disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : config.submitLabel}
        </Button>
        <p className="flex items-center gap-2 text-[0.7rem] leading-relaxed text-muted">
          <ShieldCheck size={14} className="shrink-0 text-success" aria-hidden="true" />
          Your details stay on this device in this build - no data is transmitted.
        </p>
      </div>
    </form>
  );
}
