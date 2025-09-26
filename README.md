# Angular Frontend (Nx Standalone)

This is a standalone Angular application powered by [Nx](https://nx.dev).  
We use Nx for task running, caching, and modern development workflows, while keeping a **single Angular app** (not a monorepo).

---

## 📑 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [Prerequisites](#prerequisites)
- [Install dependencies](#install-dependencies)
- [Development server](#development-server)
- [Build](#build)
- [Lint](#lint)
- [Test](#test)
- [⚡ Nx Features in Use](#-nx-features-in-use)
- [🛠️ CI/CD (GitHub Actions)](#️-cicd-github-actions)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20
- npm (or pnpm / yarn)
- Nx CLI (optional, but useful):

  ```bash
  npm install -g nx
  ```

---

### Install dependencies

```bash
npm ci
```

---

### Development server

Start the app in development mode:

```bash
npm start
# or
nx serve
```

App runs at [http://localhost:4200](http://localhost:4200).

---

### Build

Build the Angular app (default = development):

```bash
npm run build
# or
nx build
```

For production:

```bash
nx build --configuration=production
```

---

### Lint

Run ESLint:

```bash
npm run lint
# or
nx lint
```

---

### Test

Run unit tests with [Jest](https://jestjs.io/):

```bash
npm test
# or
nx test
```

Jest is configured to:

- Run tests in `*.spec.ts` files
- Enforce **80% minimum coverage**
- Collect coverage **only for components and services** (`src/app/**/*.component.ts` and `src/app/**/*.service.ts`)

Coverage reports are generated in:

```text
coverage/angular-frontend/
```

Open `index.html` inside that folder to view the detailed report.

---

## ⚡ Nx Features in Use

- **Standalone mode**: single Angular app, no monorepo structure
- **`project.json`**: project configuration instead of `angular.json`
- **Task runner & caching**: faster builds and tests
- **Jest**: modern testing framework with coverage enforcement
- **ESLint**: linting with Nx integration

---

## 🛠️ CI/CD (GitHub Actions)

We use **GitHub Actions** for continuous integration.  

On **all branches** (push + PR), the workflow runs the following **in parallel**:

- `lint`
- `build`
- `test`

Each job installs dependencies in isolation using `npm ci`.

You can find the workflow at:

```txt
.github/workflows/ci.yml
```
