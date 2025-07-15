# 🎬 Video 6: AWS Deployment Strategies

Master AWS deployments with GitHub Actions! Learn to deploy to EC2, S3, EKS, and other AWS services with proper security and automation.

## 📋 What You'll Learn

- AWS service integrations with GitHub Actions
- EC2 deployment automation
- S3 static website hosting
- EKS (Kubernetes) deployments
- AWS security best practices
- Infrastructure as Code with CloudFormation/Terraform

## 🎯 Video Objectives

By the end of this video, you'll be able to:
- ✅ Deploy applications to AWS EC2 instances
- ✅ Host static sites on S3 with CloudFront
- ✅ Deploy containerized apps to EKS
- ✅ Manage AWS credentials securely
- ✅ Implement AWS-specific CI/CD patterns

## 📁 AWS Deployment Examples

### 🖥️ EC2 Deployment (`deploy-to-ec2/`)
- Application deployment to EC2
- Auto Scaling Group integration
- Load balancer configuration
- Blue-green deployment setup

### 🪣 S3 Static Hosting (`deploy-static-s3/`)
- React/Vue.js app deployment
- CloudFront CDN setup
- Cache invalidation
- Custom domain configuration

### ☸️ EKS Deployment (`deploy-kubernetes/`)
- EKS cluster setup
- Application deployment
- Service mesh integration
- Monitoring and logging

## 🔐 AWS Security Setup

### 1. IAM Role Configuration
```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsRole
    role-session-name: GitHubActions
    aws-region: us-east-1
```

### 2. OIDC Provider Setup
```yaml
# No long-lived access keys needed!
permissions:
  id-token: write
  contents: read
```

## 🖥️ EC2 Deployment Patterns

### 1. Direct EC2 Deployment
```yaml
- name: Deploy to EC2
  run: |
    aws ssm send-command \
      --instance-ids ${{ secrets.EC2_INSTANCE_ID }} \
      --document-name "AWS-RunShellScript" \
      --parameters 'commands=["cd /app && git pull && npm install && pm2 restart app"]'
```

### 2. Auto Scaling Group Deployment
```yaml
- name: Update Launch Template
  run: |
    aws ec2 create-launch-template-version \
      --launch-template-id ${{ secrets.LAUNCH_TEMPLATE_ID }} \
      --version-description "Deploy ${{ github.sha }}" \
      --source-version '$Latest' \
      --launch-template-data '{"ImageId":"${{ steps.build-ami.outputs.ami-id }}"}'
```

## 🪣 S3 Static Site Deployment

### 1. Build and Deploy
```yaml
- name: Build React app
  run: npm run build

- name: Deploy to S3
  run: |
    aws s3 sync build/ s3://${{ secrets.S3_BUCKET }} --delete

- name: Invalidate CloudFront
  run: |
    aws cloudfront create-invalidation \
      --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
      --paths "/*"
```

### 2. Environment-Specific Deployments
```yaml
strategy:
  matrix:
    environment: [staging, production]
    include:
      - environment: staging
        bucket: my-app-staging
        distribution: E1234567890ABC
      - environment: production
        bucket: my-app-production
        distribution: E0987654321XYZ
```

## ☸️ EKS Deployment Patterns

### 1. EKS Cluster Access
```yaml
- name: Update kubeconfig
  run: |
    aws eks update-kubeconfig \
      --region ${{ env.AWS_REGION }} \
      --name ${{ secrets.EKS_CLUSTER_NAME }}

- name: Deploy to EKS
  run: |
    kubectl apply -f k8s/
    kubectl rollout status deployment/myapp
```

### 2. Helm with EKS
```yaml
- name: Deploy with Helm
  run: |
    helm repo add stable https://charts.helm.sh/stable
    helm upgrade --install myapp ./helm-chart \
      --set image.repository=${{ env.ECR_REGISTRY }}/myapp \
      --set image.tag=${{ github.sha }}
```

## 🎥 Video Timestamps

- 00:00 - AWS + GitHub Actions overview
- 04:00 - Setting up AWS credentials (OIDC)
- 09:30 - EC2 deployment strategies
- 16:00 - S3 static site hosting
- 22:30 - EKS container deployments
- 29:00 - Infrastructure as Code
- 35:00 - Monitoring and cost optimization
- 40:00 - Security best practices

## 🏗️ Infrastructure as Code

### CloudFormation Integration
```yaml
- name: Deploy CloudFormation stack
  uses: aws-actions/aws-cloudformation-github-deploy@v1
  with:
    name: my-app-infrastructure
    template: infrastructure/template.yaml
    parameter-overrides: |
      Environment=${{ github.ref_name }}
      ImageTag=${{ github.sha }}
```

### Terraform Integration
```yaml
- name: Terraform Plan
  run: |
    terraform init
    terraform plan -var="image_tag=${{ github.sha }}"

- name: Terraform Apply
  if: github.ref == 'refs/heads/main'
  run: terraform apply -auto-approve
```

## 💰 Cost Optimization

### Resource Management
- Automatic scaling based on demand
- Spot instances for non-critical workloads
- Resource tagging for cost tracking
- Scheduled start/stop for development environments

### Monitoring and Alerts
- CloudWatch cost alerts
- Resource utilization monitoring
- Automated cleanup of unused resources
- Budget notifications

## 🛠️ Hands-On Exercise

1. Set up AWS OIDC provider for GitHub Actions
2. Create a simple web application
3. Build deployment workflows for:
   - S3 static hosting (staging)
   - EC2 deployment (production)
4. Implement proper security and monitoring

## ➡️ What's Next?

In [Video 7: Advanced Automation](../07-advanced-automation/), we'll explore scheduled workflows, automated releases, and advanced GitHub Actions features.

---

**Ready for advanced automation? Let's go to [Video 7](../07-advanced-automation/)! 🤖**