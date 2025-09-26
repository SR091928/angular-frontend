const config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],

  coverage: {
    provider: 'v8',
    collectCoverage: true,
    directory: 'coverage/unit-test-reports',
    reporters: ['html', 'text', 'lcov'],
    include: [
      'src/app/**/*.component.ts',
      'src/app/**/*.service.ts'
    ],
    exclude: [
      'src/app/**/*.spec.ts',
      'src/main.ts',
      'src/polyfills.ts',
      'src/environments/**'
    ],
    thresholds: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    }
  },

  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$'
      }
    ]
  },

  moduleFileExtensions: ['ts', 'js', 'html'],
  testMatch: ['**/+(*.)+(spec).+(ts)']
} as any;

export default config;
