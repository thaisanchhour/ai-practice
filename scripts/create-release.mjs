import { readFile, writeFile } from "node:fs/promises";
import { createReleaseRecord } from "../lib/release-template.mjs";
import { validateReleases } from "../lib/validate.mjs";

function parseArguments(args) {
  const values = { dryRun: false };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--dry-run") {
      values.dryRun = true;
      continue;
    }
    if (["--id", "--name", "--target-date"].includes(argument)) {
      const value = args[index + 1];
      if (!value || value.startsWith("--")) throw new Error(`${argument} requires a value`);
      values[argument.slice(2).replace("target-date", "targetDate")] = value;
      index += 1;
      continue;
    }
    throw new Error(`unknown argument: ${argument}`);
  }
  return values;
}

const dataFile = new URL("../data/releases.json", import.meta.url);

try {
  const options = parseArguments(process.argv.slice(2));
  const existing = JSON.parse(await readFile(dataFile, "utf8"));
  const next = [...existing, createReleaseRecord(options)];
  const errors = validateReleases(next);
  if (errors.length) throw new Error(errors.join("; "));
  if (options.dryRun) {
    console.log(JSON.stringify(next.at(-1), null, 2));
  } else {
    await writeFile(dataFile, `${JSON.stringify(next, null, 2)}\n`, "utf8");
    console.log(`Added ${next.at(-1).id} to data/releases.json`);
  }
} catch (error) {
  console.error(`Unable to create release record: ${error.message}`);
  process.exitCode = 1;
}

