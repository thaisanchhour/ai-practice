import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createSummary, resolveGeneratedAt } from "../lib/summary.mjs";
import { validateReleases } from "../lib/validate.mjs";

const dataFile = new URL("../data/releases.json", import.meta.url);
const outputDir = new URL("../dist/", import.meta.url);
const outputFile = new URL("release-summary.md", outputDir);

try {
  const releases = JSON.parse(await readFile(dataFile, "utf8"));
  const errors = validateReleases(releases);
  if (errors.length) throw new Error(`data validation failed: ${errors.join("; ")}`);
  await mkdir(outputDir, { recursive: true });
  const generatedAt = resolveGeneratedAt(process.env.SUMMARY_GENERATED_AT);
  await writeFile(outputFile, createSummary(releases, generatedAt), "utf8");
  console.log(`Generated ${outputFile.pathname}`);
} catch (error) {
  console.error(`Unable to generate release summary: ${error.message}`);
  process.exitCode = 1;
}

