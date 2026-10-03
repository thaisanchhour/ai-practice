import assert from "node:assert/strict";
import test from "node:test";
import { createReleaseRecord } from "../lib/release-template.mjs";

test("creates a safe pending release record", () => {
  const record = createReleaseRecord({
    id: "release-example",
    name: " Example ",
    targetDate: "2026-10-30"
  });
  assert.equal(record.name, "Example");
  assert.equal(record.status, "review");
  assert.ok(Object.values(record.checks).every((value) => value === false));
});

test("rejects invalid identifiers and dates", () => {
  assert.throws(() => createReleaseRecord({ id: "bad", name: "Example", targetDate: "2026-10-30" }), /id must match/);
  assert.throws(() => createReleaseRecord({ id: "release-ok", name: "Example", targetDate: "30-10-2026" }), /YYYY-MM-DD/);
});

