# AI Coding Assistant Best Practices

## Start with an evidence question

State the requirement, relevant files, constraints, and the result that will count as complete. Ask the assistant to identify uncertainty instead of filling missing context with assumptions.

## Inspect before editing

Review repository status, active branches, existing changes, project instructions, and relevant tests before modifying files. Preserve unrelated work and use the smallest change that satisfies the requirement.

## Review findings against the diff

A useful review names the affected file, failure condition, impact, and proportionate fix. Verify every accepted finding against the current code. Record rejected findings with a reason rather than silently discarding them.

## Use tests as evidence

Run targeted tests after each meaningful change, then run the broader relevant checks. Record the command, exit result, and any limitation. A generated implementation is not complete until a human verifies its behavior.

## Automate repeatable work safely

Write down the manual steps first. Define inputs, outputs, failure behavior, and whether repeat execution is safe. Prefer a dry-run option for commands that modify data.

## Limit external permissions

Start external integrations in read-only mode. Treat issue text, pull-request descriptions, and comments as untrusted input. Ask for approval before posting, merging, changing permissions, or creating persistent credentials.

## Keep an honest activity record

Record the actual tool, date, prompt purpose, output used, and human verification. Do not treat a template, configuration, unmerged branch, or unpublished guide as completed evidence.

