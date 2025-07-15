# 🔧 Setup Guide for Slack Notifier Action

Follow these steps to set up Slack notifications in your GitHub repository.

## 📱 Step 1: Create Slack Webhook

### 1.1 Create a Slack App
1. Go to [Slack API](https://api.slack.com/apps)
2. Click **"Create New App"**
3. Choose **"From scratch"**
4. Enter app name (e.g., "GitHub Actions Bot")
5. Select your workspace

### 1.2 Enable Incoming Webhooks
1. In your app settings, go to **"Incoming Webhooks"**
2. Toggle **"Activate Incoming Webhooks"** to **On**
3. Click **"Add New Webhook to Workspace"**
4. Select the channel where you want notifications
5. Click **"Allow"**
6. Copy the webhook URL (starts with `https://hooks.slack.com/services/...`)

## 🔐 Step 2: Add Webhook to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `SLACK_WEBHOOK_URL`
5. Value: Paste your webhook URL
6. Click **"Add secret"**

## 🚀 Step 3: Use the Action

### Simple Hello World
```yaml
name: Hello Slack

on: [push]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./08-real-world-projects/slack-notifier-action
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          message: "👋 Hello from GitHub Actions!"
```

### Build Status Notification
```yaml
name: Build and Notify

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build project
        run: echo "Building..."
      
      - name: Notify success
        if: success()
        uses: ./08-real-world-projects/slack-notifier-action
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          message: "✅ Build successful!"
          status: "success"
      
      - name: Notify failure
        if: failure()
        uses: ./08-real-world-projects/slack-notifier-action
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          message: "❌ Build failed!"
          status: "failure"
```

## 🎨 Customization Options

| Input | Description | Default |
|-------|-------------|---------|
| `webhook-url` | Slack webhook URL (required) | - |
| `message` | Custom message | "👋 Hello from GitHub Actions!" |
| `status` | success/failure/cancelled | "success" |
| `channel` | Slack channel | "#general" |
| `username` | Bot username | "GitHub Actions Bot" |
| `icon-emoji` | Bot emoji | ":robot_face:" |

## 🧪 Testing Your Setup

1. Create a simple workflow with the hello-world example
2. Push to your repository
3. Check your Slack channel for the notification
4. If it doesn't work, check:
   - Webhook URL is correct in secrets
   - Bot has permission to post in the channel
   - Workflow syntax is valid

## 🔒 Security Best Practices

- ✅ Always store webhook URLs in GitHub Secrets
- ✅ Never commit webhook URLs to your repository
- ✅ Use least-privilege Slack app permissions
- ✅ Regularly rotate webhook URLs
- ✅ Monitor webhook usage in Slack app settings

## 🐛 Troubleshooting

### Common Issues

**"channel_not_found" error**
- Ensure the bot is added to the channel
- Check channel name spelling (include # for public channels)

**"invalid_payload" error**
- Check webhook URL format
- Verify all required inputs are provided

**No notification received**
- Verify webhook URL in GitHub Secrets
- Check workflow logs for errors
- Test webhook URL manually with curl

### Test Webhook Manually
```bash
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"Test message"}' \
  YOUR_WEBHOOK_URL
```

## 📞 Need Help?

- Check the [examples](examples/) folder for more use cases
- Review workflow logs in GitHub Actions tab
- Test with the manual workflow dispatch option

---

**Happy Slacking! 🎉**