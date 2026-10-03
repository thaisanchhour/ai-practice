export function createReleaseRecord({ id, name, targetDate }) {
  if (!/^release-[a-z0-9-]+$/.test(id ?? "")) {
    throw new Error("id must match release-[a-z0-9-]+");
  }
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("name is required");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate ?? "")) {
    throw new Error("targetDate must use YYYY-MM-DD");
  }
  return {
    id,
    name: name.trim(),
    owner: "Personal project",
    targetDate,
    status: "review",
    checks: {
      tests: false,
      security: false,
      accessibility: false,
      rollback: false
    },
    risks: []
  };
}

