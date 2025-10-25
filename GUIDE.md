# Developer Guide

A dedicated guide for setting up, running, testing, and deploying the Angular Frontend.

---

## 📑 Table of Contents

1️⃣ [Prerequisites](#prerequisites)  
2️⃣ [Installation](#installation)  
3️⃣ [Run Application](#run-application)  
4️⃣ [Run Tests](#run-tests)  
5️⃣ [Build for Production](#build-for-production)  
6️⃣ [Environment Configuration](#environment-configuration)  
7️⃣ [Deployment Notes](#deployment-notes)

---

## ✅ Prerequisites

Ensure you have the required versions:

| Tool | Required Version |
|------|-----------------|
| Node.js | 20+ |
| npm | 10+ |
| Angular CLI | Auto-installed via Nx |
| Git | Latest |

Check versions:

```bash
node -v
npm -v
```

---

## 📦 Installation

Install dependencies:

```bash
npm install
```

This will install Angular, Nx toolchain, and all UI libraries.

---

## ▶️ Run Application (Dev / Staging Mode)

Runs using **ENG backend APIs** by default:

```bash
npm start
```

This loads:

```
src/environments/environment.ts
```

App URL:
```
http://localhost:4200
```

---

## 🧪 Run Tests

Jest is used for unit testing:

```bash
npm test
```

Generate coverage report:

```bash
npm run test:coverage
```

Coverage output location:
```
coverage/
```

---

## 🏗 Build for Production

```bash
npm run build:prod
```

This uses:

```
src/environments/environment.prod.ts
```

and outputs **static files** to:

```
dist/
```

These files can be deployed to:
- ✅ Vercel
- ✅ Any static hosting provider

---

## 🌍 Environment Configuration

No local dev backend required.  
Frontend always uses service URLs from:

| File | Target Environment |
|------|------------------|
| `environment.ts` | ENG |
| `environment.staging.ts` | ENG |
| `environment.prod.ts` | PROD |

Backend API endpoints can be modified ONLY in these files.

---

## 🚀 Deployment Notes

- UI uses **static hosting** → No cold starts
- Hidden or admin pages also work static
- Backend warm-up handled by separate GitHub ping repo

✅ Lightweight UI  
✅ Fast global access  
✅ Secure when combined with backend auth

---

### 🔄 CI/CD

Future enhancements:
- Auto-build & deploy on PR merge
- Add test validations in GitHub Actions

---

If any issues occur, verify:
- npm modules installed correctly
- environment config URLs are valid
- backend availability (healthcheck endpoints)
