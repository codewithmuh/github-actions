# 🐋 Section 5: Docker + GitHub Actions

This section contains real-world examples of integrating Docker workflows with GitHub Actions.

## 📂 Subfolders

- `docker-node-app/`: Build & push a Node.js Docker image to DockerHub.
- `docker-django-app/`: Scan a Django app Docker image for security vulnerabilities.
- `docker-compose-demo/`: Run `docker-compose` in a CI job.

## 🔧 Requirements

- DockerHub credentials for image push.
- GitHub secrets: `DOCKER_USERNAME`, `DOCKER_PASSWORD`.

## ✅ Covered Concepts

- Docker build & push
- Docker Compose in CI
- Image vulnerability scanning (Trivy)
