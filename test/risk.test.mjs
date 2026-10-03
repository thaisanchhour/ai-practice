import assert from "node:assert/strict";
import test from "node:test";
import { calculateRiskScore, riskLevel } from "../lib/risk.mjs";

test("returns zero when every check passes and no risks exist", () => {
  const score = calculateRiskScore({
    checks: { tests: true, security: true },
    risks: []
  });
  assert.equal(score, 0);
});

test("adds points for missing checks and risk severity", () => {
  const score = calculateRiskScore({
    checks: { tests: true, security: false, rollback: false },
    risks: [{ severity: "medium" }, { severity: "high" }]
  });
  assert.equal(score, 13);
  assert.equal(riskLevel(score), "high");
});

test("ignores unknown severity values instead of inflating the score", () => {
  const score = calculateRiskScore({
    checks: { tests: true },
    risks: [{ severity: "unknown" }]
  });
  assert.equal(score, 0);
});

test("rejects malformed release input", () => {
  assert.throws(() => calculateRiskScore(null), /release must be an object/);
  assert.throws(() => calculateRiskScore({ checks: {}, risks: null }), /risks must be an array/);
});

