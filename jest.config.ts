import { type Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src', '<rootDir>/mocks', '<rootDir>/tests'],
  setupFiles: ['<rootDir>/tests/setup.ts'],
  coverageDirectory: '.coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
  ],
  coverageReporters: [
    'json-summary',
    'text',
    'lcov',
  ],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    'mocks/(.*)': '<rootDir>/mocks/$1',
    '[$]/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/tests/$1',
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

export default config;