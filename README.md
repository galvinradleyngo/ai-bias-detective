# AI Bias Detective

This repository contains the AI Bias Detective mini-game and supporting automation scripts.

## Working with Codex-generated pull requests

If you see the message `Codex does not currently support updating PRs that are updated outside of Codex. For now, please create a new PR.`, it means that the original pull request was modified directly on GitHub (for example, by pushing new commits or editing files in the browser). Codex-managed workspaces cannot synchronize with those out-of-band edits, so the safest option is to open a brand-new pull request from the updated branch. Creating a fresh PR lets Codex continue managing the review without conflicting history.

## Project structure

- `ai-bias-detective-game/` – React client for the AI Bias Detective experience.
- `.github/workflows/` – Continuous deployment workflows for GitHub Pages.

For game-specific setup instructions, see [`ai-bias-detective-game/README.md`](ai-bias-detective-game/README.md).
