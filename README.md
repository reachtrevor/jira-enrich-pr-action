# Jira Enrich PR Action

[![GitHub Super-Linter](https://github.com/actions/hello-world-javascript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/hello-world-javascript-action/actions/workflows/ci.yml/badge.svg)

This action searches for a Jira issue key in the branch name, fetches information about issue. The action will update the title of your Pull Request and the description of the Pull Request.

![image](https://github.com/user-attachments/assets/38493ab3-1afb-4c9f-85cb-9b116e13f9cb)

### Motivation

Get context about the change instantly and save you and your peers hours of copy-pasting and describing Pull Requests. 

## Usage

Here's an example of how to use this action in a workflow file:

```yaml
name: Example PR Workflow

on:
  pull_request:
    types:
      - opened

permissions:
  actions: read
  contents: read
  pull-requests: write

jobs:
  enrich-pr-with-jira:
    name: Enrich PR with Jira
    runs-on: ubuntu-latest

    steps:
      - name: Print to Log
        id: print-to-log
        uses: reachtrevor/jira-enrich-pr-action@v1.1.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          jira-base-url: ${{ secrets.JIRA_BASE_URL }}
          jira-api-key: ${{ secrets.JIRA_API_KEY }}
          jira-user-email: ${{ secrets.JIRA_USER_EMAIL }}
```

## Inputs

| Input        | Default | Description                     |
| ----------------- | ------- | --------------------------------------- |
| `github-token`    | -    | Github token provided by Github Actions |
| `jira-api-key`    | -    | User API key from Jira Cloud |
| `jira-base-url`   | -    | Organization base url for Jira Cloud |
| `jira-user-email` | -    | User email tied to API key from Jira Cloud |
| `fail-when-jira-issue-not-found` | false | Enabled to enforce a Jira key in the branch name |
