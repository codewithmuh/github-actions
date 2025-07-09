# GitHub Actions Automation Projects

This repository contains multiple demo and production-ready projects showcasing how to automate CI/CD workflows using **GitHub Actions** across various tech stacks.

---

## 📁 Project Structure

```bash
.
├── docker-node-app/               # Node.js app with Docker build & push workflow
│   ├── Dockerfile
│   ├── app.js
│   ├── .github/workflows/docker-push.yml
│   └── README.md
│
├── docker-django-app/            # Django app with Docker scan workflow
│   ├── Dockerfile
│   ├── manage.py
│   ├── .github/workflows/docker-scan.yml
│   └── README.md
│
├── docker-compose-demo/          # Docker Compose app with CI test workflow
│   ├── docker-compose.yml
│   └── .github/workflows/docker-compose-test.yml
│
├── nodejs-app/                   # Node.js CI example
│   ├── .github/workflows/node-ci.yml
│   ├── package.json
│   └── index.js
│
├── python-app/                   # Python app with CI workflow
│   ├── .github/workflows/python-ci.yml
│   ├── requirements.txt
│   └── app.py
│
├── react-app/                    # React app with CI workflow
│   ├── .github/workflows/react-ci.yml
│   └── src/
│
├── django-app/                   # Django app with GitHub Actions CI
│   ├── .github/workflows/django-ci.yml
│   ├── manage.py
│   └── mysite/
└── README.md                     # This file
```

---

## 🛆 Technologies Covered

* Docker
* Docker Compose
* Node.js
* Python
* React
* Django
* GitHub Actions (CI/CD)

---

## 🚀 GitHub Actions Highlights

Each subproject demonstrates best practices using GitHub Actions:

* **CI Workflows**: Automated testing for Node, Python, Django, and React
* **Docker Workflows**: Image build, scan, and push
* **Compose Testing**: End-to-end testing with services via `docker-compose`

---

## 🧹 How to Use

Each project has its own `README.md` with setup instructions. You can start with any folder and explore the workflows defined in `.github/workflows/`.

To run or test any workflow:

1. Clone the repo
2. Navigate to the specific project
3. Follow setup instructions (e.g., install dependencies)
4. Push to a GitHub repo to trigger the Actions

---

## 📄 License

MIT – feel free to use, adapt, and contribute.
