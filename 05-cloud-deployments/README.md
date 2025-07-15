# 🎬 Video 5: Cloud Deployments

Take your applications to the cloud! Learn how to deploy containerized applications to Kubernetes, set up automated cloud deployments, and manage infrastructure as code.

## 📋 What You'll Learn

- Kubernetes deployment automation
- Cloud provider integrations
- Infrastructure as Code with GitHub Actions
- Blue-green and rolling deployments
- Environment management and promotion
- Monitoring and rollback strategies

## 🎯 Video Objectives

By the end of this video, you'll be able to:
- ✅ Deploy applications to Kubernetes clusters
- ✅ Set up automated cloud deployments
- ✅ Implement deployment strategies (blue-green, rolling)
- ✅ Manage multiple environments (dev, staging, prod)
- ✅ Monitor deployments and handle rollbacks

## 📁 Deployment Examples

### ☸️ Kubernetes Deployment (`kubernetes-deploy/`)
- Complete Kubernetes manifests
- Helm chart integration
- Multi-environment setup
- Ingress and service configuration

### 🌐 Static Site Deployment (`static-site-deploy/`)
- React/Vue.js application deployment
- CDN integration
- Cache invalidation
- Performance optimization

## ☸️ Kubernetes Deployment Patterns

### 1. Basic Kubernetes Deployment
```yaml
- name: Deploy to Kubernetes
  uses: azure/k8s-deploy@v1
  with:
    manifests: |
      k8s/deployment.yaml
      k8s/service.yaml
    images: |
      myapp:${{ github.sha }}
    kubectl-version: 'latest'
```

### 2. Helm Chart Deployment
```yaml
- name: Deploy with Helm
  run: |
    helm upgrade --install myapp ./helm-chart \
      --set image.tag=${{ github.sha }} \
      --set environment=${{ github.ref_name }} \
      --namespace ${{ github.ref_name }} \
      --create-namespace
```

### 3. Multi-Environment Strategy
```yaml
deploy:
  strategy:
    matrix:
      environment: [development, staging, production]
  environment: ${{ matrix.environment }}
  steps:
    - name: Deploy to ${{ matrix.environment }}
      run: |
        kubectl config use-context ${{ matrix.environment }}
        kubectl apply -f k8s/${{ matrix.environment }}/
```

## 🎥 Video Timestamps

- 00:00 - Cloud deployment overview
- 03:00 - Kubernetes fundamentals
- 08:30 - Setting up cluster access
- 13:00 - Basic deployment workflow
- 18:30 - Helm charts and templating
- 24:00 - Multi-environment strategies
- 29:30 - Monitoring and rollbacks
- 34:00 - Best practices and security

## 🔧 Deployment Strategies

### Rolling Deployment
- Zero-downtime updates
- Gradual instance replacement
- Automatic rollback on failure
- Health check integration

### Blue-Green Deployment
- Complete environment switching
- Instant rollback capability
- Full testing before switch
- Resource duplication required

### Canary Deployment
- Gradual traffic shifting
- Risk mitigation
- A/B testing capabilities
- Monitoring-driven decisions

## 🛡️ Security Considerations

### Cluster Security
- RBAC configuration
- Network policies
- Pod security standards
- Secret management

### Access Control
- Service account permissions
- Namespace isolation
- Image pull secrets
- Audit logging

## 📊 Monitoring & Observability

### Deployment Monitoring
- Health checks and readiness probes
- Metrics collection
- Log aggregation
- Alert configuration

### Rollback Strategies
- Automated rollback triggers
- Manual rollback procedures
- Database migration handling
- Traffic routing during rollbacks

## 🛠️ Hands-On Exercise

1. Set up a local Kubernetes cluster (minikube/kind)
2. Create deployment manifests for a sample application
3. Build a GitHub Actions workflow that:
   - Builds and pushes Docker image
   - Deploys to development environment
   - Promotes to staging after tests pass
   - Requires manual approval for production

## ➡️ What's Next?

In [Video 6: AWS Deployment Strategies](../06-aws-deployments/), we'll focus specifically on AWS services and deployment patterns.

---

**Ready to dive into AWS? Let's move to [Video 6](../06-aws-deployments/)! 🚀**