"use strict";
module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    moduleFileExtensions: [
        'js',
        'json',
        'ts',
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: [
        '**/src/**/*.test.(ts|js)',
    ],
    testEnvironment: 'node',
    preset: 'ts-jest',
};
