const severityPoints = Object.freeze({ low: 1, medium: 3, high: 6 });

export function calculateRiskScore(release) {
  if (!release || typeof release !== "object") {
    throw new TypeError("release must be an object");
  }
  if (!release.checks || typeof release.checks !== "object") {
    throw new TypeError("release.checks must be an object");
  }
  if (!Array.isArray(release.risks)) {
    throw new TypeError("release.risks must be an array");
  }

  const missingChecks = Object.values(release.checks).filter((value) => value !== true).length;
  const riskPoints = release.risks.reduce((total, risk) => {
    return total + (severityPoints[risk.severity] ?? 0);
  }, 0);
  return missingChecks * 2 + riskPoints;
}

export function riskLevel(score) {
  if (!Number.isFinite(score) || score < 0) {
    throw new TypeError("score must be a non-negative number");
  }
  if (score >= 8) return "high";
  if (score >= 3) return "medium";
  return "low";
}

