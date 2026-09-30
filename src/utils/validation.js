/**
 * Pure, React-free validation for the admission enquiry form.
 *
 * Kept free of JSX and DOM access on purpose: `node --test` can then exercise it directly with
 * no test framework installed (same convention as the AcadMate app).
 */

/** Fields the form refuses to submit without. Optional fields are validated only if filled. */
export const REQUIRED_ENQUIRY_FIELDS = [
  "fullName",
  "email",
  "phone",
  "category",
  "program",
  "qualification",
  "consent",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const MOBILE_PATTERN = /^[6-9]\d{9}$/;

/** Empty object every field starts from, so React inputs are always controlled. */
export const EMPTY_ENQUIRY = {
  fullName: "",
  email: "",
  phone: "",
  category: "",
  program: "",
  qualification: "",
  stream: "",
  state: "",
  city: "",
  consent: false,
};

const trimmed = (value) => String(value ?? "").trim();

/**
 * Reduces an Indian mobile number to its 10 significant digits.
 * Accepts "+91 98765 43210", "098765-43210", "91 9876543210" and plain "9876543210".
 */
export function normalisePhone(value) {
  let digits = String(value ?? "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(trimmed(value));
}

export function isValidPhone(value) {
  return MOBILE_PATTERN.test(normalisePhone(value));
}

export function isFullName(value) {
  return trimmed(value).length >= 3;
}

/**
 * Validates one enquiry payload.
 * @param {object} values
 * @returns {{ valid: boolean, errors: Record<string, string> }}
 */
export function validateEnquiry(values = {}) {
  const errors = {};
  const name = trimmed(values.fullName);
  const city = trimmed(values.city);

  if (!name) errors.fullName = "Please enter your full name.";
  else if (!isFullName(name)) errors.fullName = "Use at least 3 characters, as printed on your marksheet.";

  if (!trimmed(values.email)) errors.email = "Please enter your email address.";
  else if (!isValidEmail(values.email)) errors.email = "That email does not look right - e.g. name@gmail.com.";

  if (!trimmed(values.phone)) errors.phone = "Please enter your phone number.";
  else if (!isValidPhone(values.phone))
    errors.phone = "Enter a 10-digit Indian mobile number starting with 6-9.";

  if (!trimmed(values.category)) errors.category = "Select an admission category.";
  if (!trimmed(values.program)) errors.program = "Select the programme you are interested in.";
  if (!trimmed(values.qualification)) errors.qualification = "Select your highest qualification.";
  if (!values.consent) errors.consent = "Please accept the terms to submit the enquiry.";

  if (city && city.length < 2) errors.city = "City name is too short.";

  return { valid: Object.keys(errors).length === 0, errors };
}

/** First invalid field in DOM order - used to move focus to the problem after a submit. */
export function firstErrorField(errors = {}) {
  return REQUIRED_ENQUIRY_FIELDS.find((field) => field in errors) ?? Object.keys(errors)[0] ?? null;
}
