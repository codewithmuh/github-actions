# 🔔 Slack Notifier Action

A powerful GitHub Action that sends rich notifications to Slack with workflow status, repository information, and custom messages.

## ✨ Features

- 📱 Rich Slack notifications with workflow details
- 🎨 Status-based color coding and emojis
- 🔗 Direct links to repository, commits, and workflow runs
- ⚙️ Highly customizable messages and formatting
- 🛡️ Error handling and validation
- 📊 Support for different build statuses

## 🚀 Quick Start

### 1. Set up Slack Webhook

1. Go to your Slack workspace
2. Create a new app or use existing one
3. Enable Incoming Webhooks
4. Create a webhook for your desired channel
5. Copy the webhook URL

### 2. Add to Your Workflow

```yaml
name: Notify Slack

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Notify Slack
        uses: ./08-real-world-projects/slack-notifier-action
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          message: "🚀 Deployment completed successfully!"
          status: "success"
          channel: "#deployments"
```

## 📋 Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `webhook-url` | Slack webhook URL | ✅ Yes | - |
| `message` | Custom message to send | ❌ No | `👋 Hello from GitHub Actions!` |
| `status` | Build status (`success`, `failure`, `cancelled`) | ❌ No | `success` |
| `channel` | Slack channel to send to | ❌ No | `#general` |
| `username` | Bot username | ❌ No | `GitHub Actions Bot` |
| `icon-emoji` | Bot icon emoji | ❌ No | `:robot_face:` |

## 📤 Outputs

| Output | Description |
|--------|-------------|
| `message-ts` | Timestamp of the sent message |

## 🎯 Usage Examples

### Basic Hello World
```yaml
- name: Say Hello to Slack
  uses: ./08-real-world-projects/slack-notifier-action
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: "👋 Hello World from GitHub Actions!"
```

### Build Status Notification
```yaml
- name: Notify Build Status
  if: always()
  uses: ./08-real-world-projects/slack-notifier-action
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: "Build completed"
    status: ${{ job.status }}
    channel: "#ci-cd"
```

### Deployment Notification
```yaml
- name: Deployment Success
  uses: ./08-real-world-projects/slack-notifier-action
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: "🚀 Production deployment successful!"
    status: "success"
    channel: "#deployments"
    username: "Deploy Bot"
    icon-emoji: ":rocket:"
```

### Conditional Notifications
```yaml
- name: Notify on Failure
  if: failure()
  uses: ./08-real-world-projects/slack-notifier-action
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    message: "❌ Build failed! Please check the logs."
    status: "failure"
    channel: "#alerts"
```

## 🔧 How It Works

This action uses a **composite action** approach, which means:
- ✅ No Node.js dependencies required
- ✅ Pure shell script implementation
- ✅ Easy to understand and modify
- ✅ Fast execution with minimal overhead

The action creates a JSON payload and sends it to Slack using `curl`, making it lightweight and reliable.

## 📊 Message Format

The action sends rich messages with the following information:

- **Repository**: Link to the GitHub repository
- **Workflow**: Name of the running workflow
- **Status**: Current build status with emoji
- **Actor**: User who triggered the workflow
- **Branch/Tag**: Git reference
- **Commit**: Link to the specific commit
- **Workflow Run**: Direct link to the workflow run

## 🎨 Status Colors and Emojis

| Status | Emoji | Color |
|--------|-------|-------|
| `success` | ✅ | Green |
| `failure` | ❌ | Red |
| `cancelled` | ⚠️ | Yellow |
| `skipped` | ⏭️ | Gray |

## 🔒 Security

- Store your Slack webhook URL in GitHub Secrets
- Never commit webhook URLs to your repository
- Use the least privileged Slack app permissions
- Regularly rotate webhook URLs

## 🐛 Troubleshooting

### Common Issues

**Webhook URL Invalid**
```
Error: Invalid Slack webhook URL. Must start with https://hooks.slack.com/
```
- Ensure you're using the correct Slack webhook URL format

**Permission Denied**
```
Error: Slack API error: 403 - channel_not_found
```
- Check if the bot has access to the specified channel
- Verify the channel name is correct (include # for public channels)

**Network Issues**
```
Error: No response received from Slack API
```
- Check your network connectivity
- Verify the webhook URL is accessible

## 📄 License

MIT License - see [LICENSE](../../../LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](../../../CONTRIBUTING.md) for guidelines.

---

**Made with ❤️ for the GitHub Actions community**