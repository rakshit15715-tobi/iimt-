import test from "node:test";
import assert from "node:assert/strict";

import {
  byDateAscending,
  eventDateParts,
  formatEventDate,
  groupDigits,
  initials,
  mailtoHref,
  telHref,
  toUtcDate,
} from "./format.js";

test("telHref strips formatting but keeps an international plus", () => {
  assert.equal(telHref("0120-2322655"), "tel:01202322655");
  assert.equal(telHref("+91 9717015300"), "tel:+919717015300");
  assert.equal(telHref("(0120) 2475000"), "tel:01202475000");
});

test("mailtoHref trims surrounding whitespace", () => {
  assert.equal(mailtoHref("  enquires@iimtindia.net "), "mailto:enquires@iimtindia.net");
});

test("toUtcDate parses the ISO date instead of the local timezone", () => {
  const date = toUtcDate("2026-11-14");
  assert.equal(date.getUTCFullYear(), 2026);
  assert.equal(date.getUTCMonth(), 10, "November is month index 10");
  assert.equal(date.getUTCDate(), 14);
  assert.equal(date.getUTCHours(), 0);
});

test("formatEventDate renders a stable, timezone-proof label", () => {
  assert.equal(formatEventDate("2026-10-05"), "05 Oct 2026");
  assert.equal(formatEventDate("2026-11-14"), "14 Nov 2026");
  assert.equal(formatEventDate("2026-01-01"), "01 Jan 2026");
});

test("eventDateParts feeds the date badge", () => {
  assert.deepEqual(eventDateParts("2026-10-05"), {
    day: "05",
    month: "OCT",
    year: "2026",
    iso: "2026-10-05",
  });
});

test("byDateAscending sorts without mutating the input", () => {
  const events = [
    { id: "c", date: "2026-11-14" },
    { id: "a", date: "2026-10-05" },
    { id: "b", date: "2026-10-18" },
  ];
  const sorted = byDateAscending(events);
  assert.deepEqual(
    sorted.map((event) => event.id),
    ["a", "b", "c"],
  );
  assert.equal(events[0].id, "c", "original array must be untouched");
});

test("initials drop honorifics and stop at two letters", () => {
  assert.equal(initials("Mr. Rishabh Virmani"), "RV");
  assert.equal(initials("Ms. Ruchi"), "R");
  assert.equal(initials("Dr. Abdul Kalam"), "AK");
  assert.equal(initials("A. P. J. Abdul Kalam"), "AP", "only the first two words are used");
  assert.equal(initials("Sakshi Goyal Sharma"), "SG");
  assert.equal(initials(""), "");
});

test("groupDigits inserts Indian-style thousand separators", () => {
  assert.equal(groupDigits(1200), "1,200");
  assert.equal(groupDigits(25000), "25,000");
  assert.equal(groupDigits(45), "45");
  assert.equal(groupDigits(100), "100");
});
