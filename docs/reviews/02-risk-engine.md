# Pull Request Review 2 Risk Engine

- Pull request URL: https://github.com/thaisanchhour/ai-practice/pull/2
- Review date: 2026-10-03
- AI tool and version: Codex (GPT-5)
- Command or review workflow: Diff inspection plus `node --test test/risk.test.mjs`
- Commit range: `feature/01-dashboard-ui...feature/02-risk-engine`

## Scope

Review scoring correctness, invalid input, boundary values, test coverage, and maintainability.

## Findings

| Finding | Evidence | Decision | Verification |
| --- | --- | --- | --- |
| Unknown severities contribute zero points | `severityPoints[risk.severity] ?? 0` prevents score inflation but could hide bad input | Accepted only with boundary validation in the next stacked PR | Risk tests pass; PR 3 rejects unknown severities before data is published |
| Malformed release objects must fail clearly | Guard clauses reject missing `checks` or `risks` collections | Accepted | Four risk tests passed, including malformed input and score boundaries |

