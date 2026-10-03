# GitHub MCP Integration Record

The repository includes an example configuration based on GitHub's official MCP server. The example prompts for a token at runtime and keeps `.env` and `.mcp.json` out of version control.

Official reference: https://github.com/github/github-mcp-server

## Verification procedure

1. Copy `.vscode/mcp.json.example` to `.vscode/mcp.json`.
2. Start the supported MCP host and provide a least-privilege personal token when prompted.
3. Confirm that the GitHub server is listed and healthy.
4. Ask the AI tool to retrieve this repository's metadata and one pull request in read-only mode.
5. Compare the returned title, branch, changed files, and check status with GitHub.
6. Record the date, tool, request, result, and verification below.
7. Remove the local configuration or revoke the token when it is no longer needed.

## Completed workflow record

Status: Completed through the Codex GitHub MCP connector.

- Date: 2026-10-03
- AI tool and version: Codex (GPT-5) with the GitHub MCP connector
- Repository URL: https://github.com/thaisanchhour/ai-practice
- Pull request URL: https://github.com/thaisanchhour/ai-practice/pull/5
- Read-only request: Retrieve repository metadata, PR 5 metadata and diff, and the complete changed-file list.
- Returned result: Public repository `thaisanchhour/ai-practice`, default branch `main`; PR 5 was open, draft, mergeable, based on `feature/04-summary-automation`, with 17 changed files at the time of the query.
- Human verification: Repository owner/name, PR title, base/head branches, draft status, and the 17 filenames matched the GitHub PR page and local branch plan.
- Access limitation: Only read operations were used for this verification. No comment, review, merge, permission, or credential operation was requested.

