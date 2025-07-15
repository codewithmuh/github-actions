# 🎬 Video 1: Introduction to GitHub Actions

Welcome to the first video in our GitHub Actions Mastery series! In this video, we'll cover the fundamentals of GitHub Actions and create your very first workflow.

## 📋 What You'll Learn

- What are GitHub Actions and why use them?
- Key concepts: Workflows, Jobs, Steps, Actions
- GitHub Actions marketplace
- Creating your first "Hello World" workflow
- Understanding workflow triggers

## 🎯 Video Objectives

By the end of this video, you'll be able to:
- ✅ Explain what GitHub Actions are
- ✅ Create a basic workflow file
- ✅ Understand the YAML syntax for workflows
- ✅ Trigger workflows on different events

## 📁 Files in This Section

- `hello-world.yml` - Your first GitHub Actions workflow
- `basic-triggers.yml` - Examples of different workflow triggers
- `workflow-syntax.yml` - Complete workflow syntax example

## 🚀 Getting Started

### Step 1: Create Your First Workflow

1. In your GitHub repository, create the `.github/workflows/` directory
2. Add the `hello-world.yml` file from this folder
3. Commit and push to see your workflow in action!

### Step 2: Understanding the Workflow

```yaml
name: Hello World Workflow
on: push
jobs:
  say-hello:
    runs-on: ubuntu-latest
    steps:
      - name: Print greeting
        run: echo "👋 Hello, GitHub Actions!"
```

**Breakdown:**
- `name`: Workflow name (appears in GitHub UI)
- `on`: Event that triggers the workflow
- `jobs`: One or more jobs to run
- `runs-on`: Operating system for the job
- `steps`: Individual tasks within the job

## 🔧 Try It Yourself

1. Fork this repository
2. Enable GitHub Actions in your fork
3. Make a small change and push
4. Watch your workflow run in the "Actions" tab

## 📚 Key Concepts Covered

### Workflows
- YAML files in `.github/workflows/`
- Define automated processes
- Triggered by events

### Jobs
- Run in parallel by default
- Can have dependencies
- Run on virtual machines (runners)

### Steps
- Sequential tasks within a job
- Can run commands or use actions
- Share the same runner environment

### Actions
- Reusable units of code
- Available in GitHub Marketplace
- Can be custom or community-built

## 🎥 Video Timestamps

- 00:00 - Introduction and overview
- 02:30 - What are GitHub Actions?
- 05:15 - Key concepts explained
- 08:45 - Creating your first workflow
- 12:20 - Understanding triggers
- 15:30 - Testing your workflow
- 18:00 - Next steps and preview

## 🔗 Useful Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

## ➡️ What's Next?

In [Video 2: Core Concepts](../02-core-concepts/), we'll dive deeper into:
- Advanced workflow syntax
- Job dependencies and conditions
- Matrix builds
- Environment variables and secrets

---

**Ready to continue? Let's move to [Video 2](../02-core-concepts/)! 🚀**