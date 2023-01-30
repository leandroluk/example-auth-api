import config from './jest.config';

config.collectCoverageFrom = [
  '<rootDir>/src/data/**/*.ts',
  '<rootDir>/src/infra/**/*.ts',
  '<rootDir>/src/presentation/**/*.ts',
];
config.testMatch = ['**/*.spec.ts'];

export default config;