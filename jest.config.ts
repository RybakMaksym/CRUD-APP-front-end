import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config = {
  clearMocks: true,
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/types.ts',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/app/.*layout\\.tsx',
    '<rootDir>/src/app/.*not-found\\.tsx',
    '<rootDir>/src/app/.*page\\.tsx',
    '<rootDir>/src/providers/ClientProviders\\.tsx',
    '<rootDir>/src/redux/store\\.ts',
    '<rootDir>/src/enums',
    '<rootDir>/src/types',
    '<rootDir>/src/styles',
    '<rootDir>/src/lib/constants',
    '<rootDir>/src/hooks/use-app-dispatch\\.ts',
    '<rootDir>/src/hooks/use-app-selector\\.ts',
    '<rootDir>/src/redux/queries',
    '<rootDir>/src/redux/auth',
    '<rootDir>/src/redux/user',
    '<rootDir>/src/redux/profile',
  ],
};

export default createJestConfig(customJestConfig);
