/** @type {import('jest').Config} */
const config = {
	verbose: true,
	testEnvironment: 'node',
	collectCoverage: false,
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 50,
			statements: 50,
		},
	},
	coverageReporters: ['text', 'lcov'],
	collectCoverageFrom: [
		'**/*.{js,jsx}',
		'!**/node_modules/**',
		'!**/vendor/**',
		'!**/coverage/**',
	],
	coveragePathIgnorePatterns: [
		'<rootDir>/__test__/',
		'<rootDir>/.*.config.js$',
	],
	testPathIgnorePatterns: [
		'<rootDir>/__test__/mocks',
		'<rootDir>/__test__/localRunner',
		'<rootDir>/__test__/.jest',
	],
	testMatch: [
		'**/__tests__/**/*.(mjs|js|ts)?',
		'**/?(*.)+(spec|test).(mjs|js|ts)?',
	],
	setupFiles: ['<rootDir>/__test__/.jest/jest.setup.js'],
}

module.exports = config
