import assert from "node:assert/strict";
import test from "node:test";
import { validateReleases } from "../lib/validate.mjs";

const validRelease = {
  id: "release-test",
  name: "Test release",
  owner: "Personal project",
  targetDate: "2026-10-20",
  status: "review",
  checks: { tests: true },
  risks: [{ severity: "low", description: "Example risk" }]
};

test("accepts a well-formed release record", () => {
  assert.deepEqual(validateReleases([validRelease]), []);
});

test("reports duplicate identifiers", () => {
  const errors = validateReleases([validRelease, { ...validRelease }]);
  assert.ok(errors.some((error) => error.includes("id must be unique")));
});

test("reports invalid status, checks, and risks", () => {
  const errors = validateReleases([
    {
      ...validRelease,
      status: "done",
      checks: { tests: "yes" },
      risks: [{ severity: "urgent", description: "" }]
    }
  ]);
  assert.equal(errors.length, 4);
});

test("rejects an impossible calendar date", () => {
  const errors = validateReleases([{ ...validRelease, targetDate: "2026-02-30" }]);
  assert.ok(errors.some((error) => error.includes("valid calendar date")));
});

test("rejects a non-array root", () => {
  assert.deepEqual(validateReleases({}), ["root must be an array"]);
});

