# Angular Frontend

![Angular](https://img.shields.io/badge/Angular-17-red)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Jest](https://img.shields.io/badge/Jest-29-brightgreen)
![Nx](https://img.shields.io/badge/Nx-Monorepo-blue)

---

## ✅ Testing Support (Jest)

This project uses **Jest** for Angular unit testing:

- Fast TS unit tests
- Snapshot testing support
- Coverage reporting

Run tests:

```bash
npm run test
```

---

## 📑 Table of Contents

1️⃣ [About the Project](#about-the-project)  
2️⃣ [Application URLs](#application-urls)  
3️⃣ [API Integration](#api-integration)  
4️⃣ [Environments](#environments)  
5️⃣ [Testing](#testing)  
6️⃣ [Project Structure](#project-structure)  
7️⃣ [Maintainers](#maintainers)

---

## 📌 About the Project

This is the frontend application built using Angular + Nx.  
UI is delivered as static assets — **no cold starts**.

The application interacts with backend microservices hosted on Render.

---

## 🌍 Application URLs

| Environment | URL |
|------------|-----|
| **Staging (ENG)** | https://sr-angular-frontend-staging.vercel.app/home |
| **Production** | https://sr-angular-frontend-prod.vercel.app/home |

> UI hosted on Vercel for performance and always-on experience.

---

## 🔌 API Integration

| Service | ENG URL | PROD URL |
|--------|---------|----------|
| Node Backend | https://shankar-nodejs-backend-eng.onrender.com | https://shankar-nodejs-backend-prod.onrender.com |
| Python Backend | https://shankar-python-backend-eng.onrender.com | https://shankar-python-backend-prod.onrender.com |

APIs are configured using environment-specific variables.

---

## 🛠 Environments

| File | Mode | Backend Target |
|------|------|----------------|
| `environment.ts` | Dev / Local / Staging | ENG Backends |
| `environment.staging.ts` | Staging | ENG Backends |
| `environment.prod.ts` | Production | PROD Backends |

✅ No standalone local backend — ENG used by default

---

## 🧪 Testing

| Command | Description |
|--------|-------------|
| `npm test` | Run Jest tests |

---

## 📂 Project Structure

```
src/
 ├─ app/
 ├─ home/
 ├─ contact-us/
 ├─ not-found/
 ├─ environments/
 │   ├─ environment.ts
 │   ├─ environment.staging.ts
 │   └─ environment.prod.ts
 ├─ styles.scss
 └─ main.ts
```

---

## 👥 Maintainers

| Name | Role |
|------|-----|
| Shankar | Developer |

---

✅ Developer guide → See `GUIDE.md`
