import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  verbose: true,
  rootDir: '.',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  testMatch: ['**/spec/*.(spec|test).(j|t)s?(x)'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^@app-common(|/.*)$': '<rootDir>/src/common/$1',
  },
};

export default config;
