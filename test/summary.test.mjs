import assert from "node:assert/strict";
import test from "node:test";
import { createSummary } from "../lib/summary.mjs";

const generatedAt = new Date("2026-10-03T00:00:00.000Z");

test("creates a deterministic summary with a blocked decision", () => {
  const summary = createSummary([
    {
      name: "Candidate",
      status: "blocked",
      checks: { tests: true, security: false },
      risks: [{ severity: "high", description: "Permission missing" }]
    }
  ], generatedAt);

  assert.match(summary, /Generated: 2026-10-03T00:00:00.000Z/);
  assert.match(summary, /\| Candidate \| blocked \| 8 \| high \| 1 \|/);
  assert.match(summary, /Deployment is not ready/);
});

test("escapes Markdown table separators", () => {
  const summary = createSummary([
    {
      name: "One | Two",
      status: "ready",
      checks: { tests: true },
      risks: []
    }
  ], generatedAt);
  assert.match(summary, /One \\\| Two/);
});

