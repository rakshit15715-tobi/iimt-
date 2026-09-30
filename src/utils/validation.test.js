import test from "node:test";
import assert from "node:assert/strict";

import {
  EMPTY_ENQUIRY,
  firstErrorField,
  isFullName,
  isValidEmail,
  isValidPhone,
  normalisePhone,
  validateEnquiry,
} from "./validation.js";

/** A payload that must always pass - every negative case is derived from it. */
const VALID_ENQUIRY = {
  ...EMPTY_ENQUIRY,
  fullName: "Rakshit Sharma",
  email: "rakshit.sharma@gmail.com",
  phone: "9876543210",
  category: "Undergraduate (UG)",
  program: "School of Engineering & Technology (B.Tech / M.Tech)",
  qualification: "Class 12 (Passed)",
  consent: true,
};

test("a complete enquiry passes with no errors", () => {
  const { valid, errors } = validateEnquiry(VALID_ENQUIRY);
  assert.equal(valid, true);
  assert.deepEqual(errors, {});
});

test("optional fields may be omitted entirely", () => {
  const { valid } = validateEnquiry({ ...VALID_ENQUIRY, stream: "", state: "", city: "" });
  assert.equal(valid, true);
});

test("every required field reports exactly one error when blank", () => {
  const { valid, errors } = validateEnquiry(EMPTY_ENQUIRY);
  assert.equal(valid, false);
  assert.deepEqual(Object.keys(errors).sort(), [
    "category",
    "consent",
    "email",
    "fullName",
    "phone",
    "program",
    "qualification",
  ]);
});

test("full name must be at least three characters", () => {
  assert.equal(isFullName("Om"), false);
  assert.equal(isFullName("  Om  "), false);
  assert.equal(isFullName("Om S"), true);
  assert.match(validateEnquiry({ ...VALID_ENQUIRY, fullName: "Om" }).errors.fullName, /3 characters/);
});

test("email validation accepts real addresses and rejects malformed ones", () => {
  for (const good of ["a@b.co", "first.last+tag@sub.domain.edu", "RAKSHIT@GMAIL.COM"]) {
    assert.equal(isValidEmail(good), true, `${good} should be valid`);
  }
  for (const bad of ["", "plain", "a@b", "a@b.c", "a b@c.com", "@b.com", "a@.com"]) {
    assert.equal(isValidEmail(bad), false, `${bad} should be invalid`);
  }
});

test("phone numbers normalise to ten digits", () => {
  assert.equal(normalisePhone("+91 98765 43210"), "9876543210");
  assert.equal(normalisePhone("098765-43210"), "9876543210");
  assert.equal(normalisePhone("91 9876543210"), "9876543210");
  assert.equal(normalisePhone("9876543210"), "9876543210");
});

test("phone validation enforces an Indian mobile shape", () => {
  assert.equal(isValidPhone("+91 98765 43210"), true);
  assert.equal(isValidPhone("098765-43210"), true);
  assert.equal(isValidPhone("5876543210"), false, "must start with 6-9");
  assert.equal(isValidPhone("987654321"), false, "nine digits");
  assert.equal(isValidPhone("98765432101"), false, "eleven digits");
  assert.equal(isValidPhone("98765abc10"), false);
});

test("consent checkbox is required", () => {
  const { errors } = validateEnquiry({ ...VALID_ENQUIRY, consent: false });
  assert.match(errors.consent, /accept the terms/);
});

test("city is optional but cannot be a single character", () => {
  assert.equal(validateEnquiry({ ...VALID_ENQUIRY, city: "Noida" }).valid, true);
  assert.match(validateEnquiry({ ...VALID_ENQUIRY, city: "N" }).errors.city, /too short/);
});

test("firstErrorField returns DOM order, not object insertion order", () => {
  const { errors } = validateEnquiry({ ...EMPTY_ENQUIRY, email: "bad" });
  assert.equal(firstErrorField(errors), "fullName");
  assert.equal(firstErrorField(validateEnquiry(VALID_ENQUIRY).errors), null);
});
