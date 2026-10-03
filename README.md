# AI Release Readiness Dashboard

This personal demonstration project tracks release risks, verification status, and deployment readiness without using company source code or data. It is designed to produce auditable evidence for AI-assisted software-development workflows.

## Project goals

- Convert release information into a clear readiness decision.
- Validate structured data before it is published.
- Automate summaries and repeatable record creation.
- Exercise pull-request review, CI, GitHub integration, and deployment workflows.
- Preserve evidence that identifies the AI tool, human verification, and activity date.

## Local commands

```text
npm run validate
npm test
npm run summary
npm run new-release -- --id release-004 --name "Example release"
npm run check
```

The project uses only Node.js built-in modules. It does not require third-party runtime dependencies.

## Evidence policy

Every evidence record must use the actual activity date and tool name. A prepared template is not a completed activity. Pull requests, reviews, MCP operations, deployments, and sharing events count only after their corresponding external records exist.

See `docs/EVIDENCE_REGISTER.md` for the evidence checklist and `docs/BEST_PRACTICES_GUIDE.md` for the reusable guide.

