import { readFile } from "node:fs/promises";
import { validateReleases } from "../lib/validate.mjs";

const file = new URL("../data/releases.json", import.meta.url);

try {
  const releases = JSON.parse(await readFile(file, "utf8"));
  const errors = validateReleases(releases);
  if (errors.length) {
    console.error(`Release data failed validation with ${errors.length} error(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log(`Release data is valid (${releases.length} records).`);
  }
} catch (error) {
  console.error(`Unable to validate release data: ${error.message}`);
  process.exitCode = 1;
}

