const allowedStatuses = new Set(["ready", "review", "blocked"]);
const allowedSeverities = new Set(["low", "medium", "high"]);

export function validateReleases(value) {
  const errors = [];
  if (!Array.isArray(value)) return ["root must be an array"];

  const ids = new Set();
  value.forEach((release, index) => {
    const path = `release[${index}]`;
    if (!release || typeof release !== "object" || Array.isArray(release)) {
      errors.push(`${path} must be an object`);
      return;
    }

    for (const field of ["id", "name", "owner", "targetDate", "status"]) {
      if (typeof release[field] !== "string" || release[field].trim() === "") {
        errors.push(`${path}.${field} must be a non-empty string`);
      }
    }

    if (typeof release.id === "string") {
      if (ids.has(release.id)) errors.push(`${path}.id must be unique`);
      ids.add(release.id);
    }
    if (typeof release.targetDate === "string" && !/^\d{4}-\d{2}-\d{2}$/.test(release.targetDate)) {
      errors.push(`${path}.targetDate must use YYYY-MM-DD`);
    }
    if (!allowedStatuses.has(release.status)) {
      errors.push(`${path}.status must be ready, review, or blocked`);
    }
    if (!release.checks || typeof release.checks !== "object" || Array.isArray(release.checks)) {
      errors.push(`${path}.checks must be an object`);
    } else {
      for (const [name, result] of Object.entries(release.checks)) {
        if (!name || typeof result !== "boolean") errors.push(`${path}.checks values must be boolean`);
      }
    }
    if (!Array.isArray(release.risks)) {
      errors.push(`${path}.risks must be an array`);
    } else {
      release.risks.forEach((risk, riskIndex) => {
        if (!risk || typeof risk !== "object") {
          errors.push(`${path}.risks[${riskIndex}] must be an object`);
          return;
        }
        if (!allowedSeverities.has(risk.severity)) {
          errors.push(`${path}.risks[${riskIndex}].severity is invalid`);
        }
        if (typeof risk.description !== "string" || risk.description.trim() === "") {
          errors.push(`${path}.risks[${riskIndex}].description must be a non-empty string`);
        }
      });
    }
  });

  return errors;
}

