import { calculateRiskScore } from "../lib/risk.mjs";

const statusLabels = {
  ready: "Ready",
  review: "Needs review",
  blocked: "Blocked"
};

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

function renderSummary(releases) {
  const container = document.querySelector("#summary-cards");
  const counts = releases.reduce(
    (result, release) => ({ ...result, [release.status]: result[release.status] + 1 }),
    { ready: 0, review: 0, blocked: 0 }
  );
  container.replaceChildren(
    ...Object.entries(counts).map(([status, count]) => {
      const card = document.createElement("div");
      card.className = `summary-card summary-card--${status}`;
      card.innerHTML = `<span>${statusLabels[status]}</span><strong>${count}</strong>`;
      return card;
    })
  );
}

function renderReleases(releases, filter = "all") {
  const container = document.querySelector("#release-list");
  const template = document.querySelector("#release-template");
  const visible = filter === "all" ? releases : releases.filter((item) => item.status === filter);

  container.replaceChildren(
    ...visible.map((release) => {
      const card = template.content.firstElementChild.cloneNode(true);
      card.querySelector(".release-id").textContent = release.id;
      card.querySelector(".release-name").textContent = release.name;
      card.querySelector(".target-date").textContent = formatDate(release.targetDate);
      card.querySelector(".owner").textContent = release.owner;
      card.querySelector(".risk-score").textContent = String(calculateRiskScore(release));

      const pill = card.querySelector(".status-pill");
      pill.textContent = statusLabels[release.status];
      pill.classList.add(`status-pill--${release.status}`);

      const checkList = card.querySelector(".check-list");
      Object.entries(release.checks).forEach(([name, passed]) => {
        const item = document.createElement("li");
        item.className = passed ? "check-passed" : "check-pending";
        item.textContent = `${name}: ${passed ? "passed" : "pending"}`;
        checkList.append(item);
      });

      const riskList = card.querySelector(".risk-list");
      const risks = release.risks.length
        ? release.risks
        : [{ severity: "none", description: "No open risks" }];
      risks.forEach((risk) => {
        const item = document.createElement("li");
        item.textContent = `${risk.severity}: ${risk.description}`;
        riskList.append(item);
      });
      return card;
    })
  );

  document.querySelector("#result-count").textContent = `${visible.length} release${visible.length === 1 ? "" : "s"}`;
}

async function start() {
  const response = await fetch("data/releases.json");
  if (!response.ok) throw new Error(`Release data request failed with ${response.status}`);
  const releases = await response.json();
  renderSummary(releases);
  renderReleases(releases);
  document.querySelector("#status-filter").addEventListener("change", (event) => {
    renderReleases(releases, event.target.value);
  });
}

start().catch((error) => {
  document.querySelector("#release-list").textContent = `Unable to load releases: ${error.message}`;
  document.querySelector("#result-count").textContent = "Release data unavailable";
});

