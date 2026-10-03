# Pull Request Review 3 Data Validation

- Pull request URL: https://github.com/thaisanchhour/ai-practice/pull/3
- Review date: 2026-10-03
- AI tool and version: Codex (GPT-5)
- Command or review workflow: Diff inspection, negative-case review, and full Node test suite
- Commit range: `feature/02-risk-engine...feature/03-data-validation`

## Scope

Review malformed input handling, duplicate detection, actionable errors, and negative tests.

## Findings

| Finding | Evidence | Decision | Verification |
| --- | --- | --- | --- |
| Date validation accepted impossible calendar dates such as `2026-02-30` | The original check validated only the `YYYY-MM-DD` shape | Accepted and fixed in commit `1bfed1b` | Added a negative test; nine tests passed and three production records validated |
| Duplicate IDs, invalid status, checks, and risks need actionable failures | Validator records field-specific messages without stopping at the first error | Accepted | Negative test returned all four expected errors and duplicate detection passed |

