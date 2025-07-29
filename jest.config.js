import { TestEnvironment } from "jest-environment-jsdom";

export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '^react-dom$': 'react-dom',
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    },
};

