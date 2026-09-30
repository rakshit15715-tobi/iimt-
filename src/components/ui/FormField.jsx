import { AlertCircle } from "lucide-react";

/**
 * Data-driven form control. Field metadata comes from `src/data/formOptions.js`, so the enquiry
 * form, its validation and its accessibility wiring all read from one description.
 *
 * Errors are announced by association: `aria-invalid` on the control plus `aria-describedby`
 * pointing at the message element, which is the pattern screen readers expect.
 */
export function FormField({ field, value, error = "", onChange, onBlur = null, disabled = false }) {
  const { name, label, type, required = false, placeholder = "", options = null, autoComplete, column = "full" } = field;

  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const showSelectHint = type === "select" && !required;
  const controlClasses = `field-control ${error ? "field-control--invalid" : ""} ${
    type === "select" ? "appearance-none pr-10" : ""
  }`;
  const shared = {
    id: name,
    name,
    value,
    disabled,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": [error ? errorId : null, showSelectHint ? hintId : null].filter(Boolean).join(" ") || undefined,
    onChange: (event) => onChange(name, event.target.value),
    onBlur: onBlur ? (event) => onBlur(name, event.target.value) : undefined,
  };

  return (
    <div className={column === "half" ? "sm:col-span-1" : "sm:col-span-2"}>
      <label htmlFor={name} className="field-label">
        {label}
        {required ? (
          <span className="text-brand-bright" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-[0.65rem] font-medium uppercase tracking-wider text-muted">optional</span>
        )}
      </label>

      {type === "select" ? (
        <div className="relative">
          <select {...shared} className={controlClasses}>
            <option value="" disabled>
              {placeholder || "Select an option"}
            </option>
            {options.map((option) => (
              <option key={option} value={option} className="bg-surface text-content">
                {option}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">
            ▾
          </span>
        </div>
      ) : (
        <input
          {...shared}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={controlClasses}
        />
      )}

      {showSelectHint ? (
        <p id={hintId} className="mt-1.5 text-[0.7rem] text-muted">
          Optional - helps us tailor the counselling call.
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="field-error">
          <AlertCircle size={13} aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Consent checkbox with its own error slot (a boolean field needs different wiring). */
export function ConsentField({ name = "consent", checked, error = "", onChange, children }) {
  const errorId = `${name}-error`;
  return (
    <div className="sm:col-span-2">
      <label htmlFor={name} className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(name, event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-white/20 bg-white/5 transition checked:border-brand checked:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p id={errorId} className="field-error">
          <AlertCircle size={13} aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
