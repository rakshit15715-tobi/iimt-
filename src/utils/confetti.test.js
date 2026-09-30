import test from "node:test";
import assert from "node:assert/strict";

import { CONFETTI_COLORS, prefersReducedMotion } from "./confetti.js";

test("prefersReducedMotion is safe outside a browser", () => {
  // Node has no window.matchMedia - importing this module in a test run must not throw.
  assert.equal(typeof window, "undefined");
  assert.equal(prefersReducedMotion(), false);
});

test("the celebration palette uses the brand tokens", () => {
  assert.deepEqual(CONFETTI_COLORS, ["#e11d2e", "#ff3b52", "#ffffff", "#00f2fe", "#ff9900"]);
});
