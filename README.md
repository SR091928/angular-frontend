# Angular Frontend

## 📦 Application Tools

![Angular](https://img.shields.io/badge/Angular-17-red)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Jest](https://img.shields.io/badge/Jest-29-brightgreen)
![Nx](https://img.shields.io/badge/Nx-17-blue)

---

## 🌐 Application URLs

- **ENG:** [https://nbshankar-angular-ui-eng.github.io](https://nbshankar-angular-ui-eng.github.io)
- **PROD:** [https://nbshankar-angular-ui-prod.github.io](https://nbshankar-angular-ui-prod.github.io)

---

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Repository Structure](#-repository-structure)
- [Environments](#-environments)
- [Backend API Integration](#-backend-api-integration)
- [CI/CD Workflow](#-cicd-workflow)
- [Application URLs](#-application-urls)
- [Local Development Notes](#-local-development-notes)

---

### 🚀 Project Overview

- **Framework:** Angular (managed with Nx workspace).
- **Build Outputs:**
  - Local Development → `dist/local`
  - ENG Environment → `dist/eng`
  - PROD Environment → `dist/prod`
- **Deployment Strategy:** GitHub Actions CI/CD
  - On push to `master`, ENG and PROD builds are generated and deployed to GitHub Pages.
  - Each environment is served under a different GitHub Pages URL.
  - The difference in URLs is achieved by deploying builds into environment-specific repositories, which GitHub Pages then serves.

---

### 📂 Repository Structure

```
angular-frontend/
├── src/
│   ├── app/                 # Angular components and modules
│   ├── assets/              # Static assets
│   ├── environments/        # Environment configs (local/eng/prod)
│   └── index.html
├── project.json             # Nx project config
├── package.json             # Dependencies
├── tsconfig.*.json          # TypeScript configs
└── .github/workflows/ci.yml # CI/CD pipeline
```

---

### 🌍 Environments

#### Local Development

- Runs against the ENG backend.
- Environment file: `src/environments/environment.ts` (points to `environment.eng.ts`).
- Serve locally with: `nx serve angular-frontend`
- Output path: `dist/local`

#### ENG

- Uses the ENG backend.
- Environment file: `src/environments/environment.eng.ts`
- Build with:  
  `nx build angular-frontend --configuration eng`
- Output path: `dist/eng`
- Deployment handled through GitHub Pages.

#### PROD

- Uses the PROD backend.
- Environment file: `src/environments/environment.prod.ts`
- Build with:  
  `nx build angular-frontend --configuration production`
- Output path: `dist/prod`
- Deployment handled through GitHub Pages.

---

### 🔗 Backend API Integration

The Angular app integrates with both **Node.js** and **Python** backend APIs hosted on Render.  
Each environment points to the correct backend URL via `environment.ts` files.

- **ENG**
  - Node.js API: `https://shankar-node Nodejs-backend (TBD)-eng.onrender.com`
  - Python API: `https://shankar-python Python-backend (TBD)-eng.onrender.com`
- **PROD**
  - Node.js API: `https://shankar-node Nodejs-backend (TBD)-prod.onrender.com`
  - Python API: `https://shankar-python Python-backend (TBD)-prod.onrender.com`

Angular services dynamically use these endpoints based on environment:

```ts
import { environment } from "../environments/environment";

this.http.get(`${environment.api (TBD)Url}/users`); // Example API call
```

---

### ⚙️ CI/CD Workflow

- Workflow file: `.github/workflows/ci.yml`
- Jobs:
  1. **Build:** runs `nx build angular-frontend`
  2. **Lint:** runs `nx lint angular-frontend`
  3. **Unit Test:** runs `nx test angular-frontend`
  4. **Deploy-ENG:** builds and deploys to ENG GitHub Pages
  5. **Deploy-PROD:** builds and deploys to PROD GitHub Pages
- Only `master` branch triggers deployment.

---

### 🛠️ Local Development Notes

- Run lint: `npx nx lint angular-frontend`
- Run tests: `npx nx test angular-frontend`
- Run dev build: `npx nx build angular-frontend --configuration development`


---

## 🚀 Deployment (Vercel)

Two separate Vercel projects are maintained for this repository:

| Environment | Project | Config File | Command |
|--------------|----------|--------------|----------|
| ENG | `angular-frontend-eng` | `vercel.eng.json` | `vercel -A vercel.eng.json` |
| PROD | `angular-frontend-prod` | `vercel.prod.json` | `vercel --prod -A vercel.prod.json` |

### 🔑 Environment Variables

| Variable | Example | Description |
|-----------|----------|-------------|
| `ENV` | `eng` / `prod` | Active deployment environment |
| `API_BASE_URL` | TBD | API URL placeholder for NodeJS/Python services |

---

## 🧾 Ownership

This project is now maintained under the **SR091928 Organization**.
