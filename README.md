# AI Bias Detective

This repository contains the AI Bias Detective mini-game and supporting automation scripts.

## Working with Codex-generated pull requests

If you see the message `Codex does not currently support updating PRs that are updated outside of Codex. For now, please create a new PR.`, it means that the original pull request was modified directly on GitHub (for example, by pushing new commits or editing files in the browser). Codex-managed workspaces cannot synchronize with those out-of-band edits, so the safest option is to open a brand-new pull request from the updated branch. Creating a fresh PR lets Codex continue managing the review without conflicting history.

When this happens:

1. Pull the latest changes locally so your branch contains the manual edits.
2. Create a new branch (or reuse the existing feature branch) and commit any additional Codex-generated updates there.
3. Open a new pull request that supersedes the original one and close the outdated PR.

These steps ensure the Codex session has a clean, predictable history to work with while preserving the manual fixes you made on GitHub.

## Project structure

- `ai-bias-detective-game/` – React client for the AI Bias Detective experience.
- `.github/workflows/` – Continuous deployment workflows for GitHub Pages.

For game-specific setup instructions, see [`ai-bias-detective-game/README.md`](ai-bias-detective-game/README.md).

## Deployment notes

- The GitHub Pages workflow now watches pushes to both the `main` and `work` branches. Make sure the branch you merge into is on
  that list so the site build runs automatically.
- In the repository settings, set GitHub Pages to deploy from the `gh-pages` branch (created by the workflow) with the root folder
  option.
