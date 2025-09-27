import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],

  globals: {
    'ts-jest':{
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },

  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|@angular|rxjs|jest-preset-angular|@ngrx|@ngneat)',
  ],

  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
  },

  moduleFileExtensions: ['ts', 'js', 'html'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],

  coverageDirectory: 'coverage/unit-test-reports',
  coverageReporters: ['html', 'text', 'lcov'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/main.ts',
    'src/polyfills.ts',
    'src/environments/',
  ],

  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};

export default config;
