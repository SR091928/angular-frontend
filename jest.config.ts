import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage/angular-frontend',
  coverageReporters: ['html', 'text', 'lcov'],
  collectCoverageFrom: [
    "src/app/**/*.component.ts",
    "src/app/**/*.service.ts",
    "!src/app/**/*.spec.ts",
    "!src/main.ts",
    "!src/polyfills.ts",
    "!src/environments/**"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  testMatch: ['**/+(*.)+(spec).+(ts)']
};

export default config;
