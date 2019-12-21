module.exports = {
  testEnvironment: 'node',
  // globalSetup: './setup/setup.ts',
  // globalTeardown: './setup/teardown.ts',
  preset: "@shelf/jest-mongodb",
  "transform": {
    "\\.ts$": "ts-jest"
  },
};