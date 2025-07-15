# 🎬 Video 2: Core Concepts & Workflow Basics

Building on our introduction, this video dives deep into GitHub Actions core concepts and advanced workflow features.

## 📋 What You'll Learn

- Advanced workflow syntax and structure
- Job dependencies and conditional execution
- Matrix builds for testing multiple configurations
- Environment variables and secrets management
- Context expressions and functions

## 🎯 Video Objectives

By the end of this video, you'll be able to:
- ✅ Create complex workflows with multiple jobs
- ✅ Use job dependencies and conditions
- ✅ Implement matrix builds for comprehensive testing
- ✅ Work with environment variables and secrets
- ✅ Use GitHub context expressions

## 📁 Files in This Section

- `basic-workflow.yml` - Simple workflow structure
- `job-dependencies.yml` - Jobs with dependencies and conditions
- `matrix-builds.yml` - Matrix strategy examples
- `environment-variables.yml` - Working with env vars and secrets
- `context-expressions.yml` - Using GitHub context data

## 🔧 Key Concepts Deep Dive

### Job Dependencies

Jobs run in parallel by default, but you can create dependencies:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building..."
  
  test:
    needs: build  # Wait for build to complete
    runs-on: ubuntu-latest
    steps:
      - run: echo "Testing..."
  
  deploy:
    needs: [build, test]  # Wait for both jobs
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying..."
```

### Matrix Builds

Test across multiple configurations simultaneously:

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node-version: [16, 18, 20]
    include:
      - os: ubuntu-latest
        node-version: 21
        experimental: true
```

### Conditional Execution

Control when jobs and steps run:

```yaml
jobs:
  deploy:
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        if: success() && !cancelled()
        run: echo "Deploying..."
```

## 🎥 Video Timestamps

- 00:00 - Recap and overview
- 02:00 - Job structure and dependencies
- 06:30 - Conditional execution
- 10:15 - Matrix builds explained
- 15:00 - Environment variables and secrets
- 20:30 - Context expressions
- 25:00 - Best practices
- 28:00 - Next video preview

## 🔗 Advanced Features

### Environment Variables
- Repository secrets for sensitive data
- Environment-specific variables
- Dynamic variable assignment

### Context Expressions
- `${{ github.* }}` - Repository and event information
- `${{ runner.* }}` - Runner environment details
- `${{ steps.* }}` - Step outputs and status

## 🛠️ Hands-On Exercise

Create a workflow that:
1. Builds a project on multiple OS/Node.js combinations
2. Only deploys if tests pass on all combinations
3. Uses different deployment targets based on branch
4. Includes proper error handling and notifications

## ➡️ What's Next?

In [Video 3: CI Pipelines](../03-ci-pipelines/), we'll build real CI pipelines for:
- Node.js applications
- Python projects
- React applications
- Django backends

---

**Ready to build some CI pipelines? Let's go to [Video 3](../03-ci-pipelines/)! 🚀**