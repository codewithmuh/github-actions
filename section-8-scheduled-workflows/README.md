# Scheduled Workflows

This folder contains GitHub Actions workflows that run on schedules:

- **cron-job-demo.yml**: Runs a simple script daily at midnight UTC.
- **auto-release-tag.yml**: Tags the latest commit weekly on Sundays.
- **auto-close-stale.yml**: Automatically closes stale issues and PRs after 30 days of inactivity, runs weekly.
- **cleanup-artifacts.yml**: Deletes build artifacts older than 7 days daily.

These workflows help automate routine maintenance tasks on this repository.
