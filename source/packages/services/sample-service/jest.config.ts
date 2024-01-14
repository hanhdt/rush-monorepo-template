import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  roots: ['<rootDir>/test/jest'],
  setupFiles: ['<rootDir>/test/jest/setup.ts'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    "uuid": require.resolve('uuid'),
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/.+.(js|jsx)$"],
  verbose: true,
  globals: {
    jest: {
      testEnvironment: 'node',
      setupFiles: ['<rootDir>/test/jest/setup.ts'],
    }
  },
}

export default config;
