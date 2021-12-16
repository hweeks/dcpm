/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  "globalSetup": "<rootDir>/setup/global-setup.ts",
  "globalTeardown": "<rootDir>/setup/global-teardown.ts",
  "setupFilesAfterEnv": [
    "<rootDir>/setup/setup-file.ts"
  ],
  "transform": {
    "\\.ts$": "ts-jest"
  },
};
