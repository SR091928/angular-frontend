# Angular Frontend

This project is an Angular frontend application with Jest configured for unit testing and Cypress configured for end-to-end (E2E) testing.

## Project Setup

### Prerequisites
- Node.js (v20 required)
- npm (v10 required)

### Install Dependencies
```
npm install
```

## Scripts

### Start the Application
```
npm start
```

### Unit Tests with Jest
Run unit tests using Jest:
```
npm run test
```

### End-to-End Tests with Cypress
Run E2E tests using Cypress:
```
npm run e2e
```

## Testing Configuration

### Jest (Unit Testing)
- Jest is used for unit testing Angular components and services.
- Configuration is typically found in `jest.config.js` or `jest.preset.js`.
- Test files are usually named `*.spec.ts`.

### Cypress (E2E Testing)
- Cypress is used for end-to-end testing.
- Configuration is typically found in `cypress.config.js` or `cypress.json`.
- E2E test files are usually located in the `cypress/e2e/` directory.

## Example Scripts in `package.json`

```
"scripts": {
	"start": "ng serve",
	"test": "jest",
	"e2e": "cypress open"
}
```

## Additional Resources
- [Angular Documentation](https://angular.io/docs)
- [Jest Documentation](https://jestjs.io/docs/en/getting-started)
- [Cypress Documentation](https://docs.cypress.io/)

---

Feel free to update this README with more project-specific details as needed.