# 🌐 Deploy Static Website to AWS S3

This example demonstrates how to automatically deploy a static website to an AWS S3 bucket using GitHub Actions.

Whenever changes are pushed to the `main` branch, the contents of the `dist/` folder will be synced to the specified S3 bucket. Optionally, CloudFront cache can also be invalidated if a distribution ID is provided.

---

## 🛠️ Setup Instructions

### 🔐 GitHub Secrets Required

| Secret Name                | Description                        |
|---------------------------|------------------------------------|
| `AWS_ACCESS_KEY_ID`       | Your AWS Access Key ID             |
| `AWS_SECRET_ACCESS_KEY`   | Your AWS Secret Access Key         |
| `AWS_S3_BUCKET_NAME`      | Name of the S3 bucket              |
| `CLOUDFRONT_DISTRIBUTION_ID` | *(Optional)* CloudFront distribution ID for cache invalidation |

### ✅ AWS Requirements

- S3 bucket must exist and allow write access from your IAM user.
- (Optional) Enable static website hosting on the S3 bucket.
- (Optional) Setup CloudFront distribution for CDN + HTTPS.

---

## 📁 Folder Structure

```
deploy-static-s3/
├── dist/
│   └── index.html
├── .github/
│   └── workflows/
│       └── deploy-s3.yml
└── README.md
```

---

## 🚀 How It Works

1. GitHub Actions is triggered on any push to `main`.
2. AWS credentials are configured using the `aws-actions/configure-aws-credentials` action.
3. The contents of `dist/` are uploaded to the configured S3 bucket.
4. If `CLOUDFRONT_DISTRIBUTION_ID` is set, the CloudFront cache is invalidated.

---

## 🧪 Local Testing

To test manually before pushing:

```bash
aws s3 sync dist/ s3://your-bucket-name/ --delete --acl public-read
```

---

## 💡 Tips

- Use `npm run build` to generate your `dist/` folder if you're using a framework like React or Vite.
- Protect your `main` branch and enable required status checks for safe deployments.
- Set S3 bucket policy and CORS correctly for public access.

---

> 📘 Part of the **GitHub Actions Zero to Hero** course.
