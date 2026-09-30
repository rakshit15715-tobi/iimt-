/**
 * Pure formatting helpers. React-free so they can be unit tested with `node --test`.
 *
 * All date maths happens in UTC on purpose: `new Date("2026-10-05")` is parsed as UTC midnight
 * but rendered in local time, which silently shifts the day for IST-negative offsets. Splitting
 * the ISO string and rebuilding with Date.UTC keeps the rendered date identical everywhere.
 */

/** "0120-2322655" -> "tel:01202322655"; keeps a leading + for international numbers. */
export function telHref(phone) {
  const cleaned = String(phone ?? "").replace(/[^\d+]/g, "");
  return `tel:${cleaned}`;
}

export function mailtoHref(email) {
  return `mailto:${String(email ?? "").trim()}`;
}

/** ISO "YYYY-MM-DD" -> UTC Date at midnight (never shifts across timezones). */
export function toUtcDate(iso) {
  const [year, month, day] = String(iso ?? "")
    .split("-")
    .map(Number);
  return new Date(Date.UTC(year || 1970, (month || 1) - 1, day || 1));
}

/** ISO "YYYY-MM-DD" -> "05 Oct 2026". */
export function formatEventDate(iso) {
  return toUtcDate(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** ISO "YYYY-MM-DD" -> the three pieces the event date badge draws. */
export function eventDateParts(iso) {
  const date = toUtcDate(iso);
  return {
    day: String(date.getUTCDate()).padStart(2, "0"),
    month: date.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" }).toUpperCase(),
    year: String(date.getUTCFullYear()),
    iso,
  };
}

/** Sorts events by date ascending without mutating the source array. */
export function byDateAscending(items = []) {
  return [...items].sort((a, b) => toUtcDate(a.date) - toUtcDate(b.date));
}

/** "Mr. Rishabh Virmani" -> "RV"; "Ms. Ruchi" -> "R". */
export function initials(name) {
  const words = String(name ?? "")
    .replace(/\b(mr|mrs|ms|dr|prof)\.?\s/gi, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/** 1200 -> "1,200" (used for the live counter's accessible text and static fallback). */
export function groupDigits(value) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
