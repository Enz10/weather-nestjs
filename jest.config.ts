import {Config} from '@jest/types'

const config: Config.InitialOptions = {
  rootDir: '.',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.(test|e2e-test|spec|e2e-spec).ts$',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/e2e/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.module.ts',
    '!<rootDir>/src/**/index.ts'
  ],
  globalSetup: './jest-global-setup.ts',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  }
}

export default config
