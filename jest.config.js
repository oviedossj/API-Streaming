/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true,
    testMatch: ['**/tests/**/*.test.ts'],
    collectCoverageFrom: ['src/**/*.ts'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^@config(.*)$': '<rootDir>/src/config/$1',
      '^@middlewares(.*)$': '<rootDir>/src/middlewares/$1',
      '^@routes(.*)$': '<rootDir>/src/routes/$1',
      '^@controllers(.*)$': '<rootDir>/src/controllers/$1',
      '^@models(.*)$': '<rootDir>/src/models/$1',
      '^@repositories(.*)$': '<rootDir>/src/repositories/$1',
      '^@services(.*)$': '<rootDir>/src/services/$1',
      '^@utils(.*)$': '<rootDir>/src/utils/$1',
      '^@tests(.*)$': '<rootDir>/tests/$1',
    },
    coveragePathIgnorePatterns: ['/node_modules/', '/config/', '.*/index.ts$', '.*/app.ts$', '/models/', '/routes/'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  };