import { calculateRiskScore, riskLevel } from "./risk.mjs";

export function createSummary(releases, generatedAt = new Date()) {
  const lines = [
    "# Release Readiness Summary",
    "",
    `Generated: ${generatedAt.toISOString()}`,
    "",
    "| Release | Status | Score | Risk level | Open risks |",
    "| --- | --- | ---: | --- | ---: |"
  ];

  for (const release of releases) {
    const score = calculateRiskScore(release);
    lines.push(
      `| ${escapeTableCell(release.name)} | ${release.status} | ${score} | ${riskLevel(score)} | ${release.risks.length} |`
    );
  }

  const blocked = releases.filter((release) => release.status === "blocked");
  lines.push("", "## Decision", "");
  if (blocked.length) {
    lines.push(`Deployment is not ready. ${blocked.length} blocked release${blocked.length === 1 ? "" : "s"} require action.`);
  } else {
    lines.push("No release is blocked. Complete pending checks before deployment.");
  }
  return `${lines.join("\n")}\n`;
}

function escapeTableCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

