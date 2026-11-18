/** @type {import('jest').Config} */
const config = {
	verbose: true,
	testEnvironment: 'node',
	collectCoverage: false,
	coverageThreshold: {
		global: {
			branches: 88,
			functions: 95,
			lines: 95,
			statements: 95,
		},
	},
	coverageReporters: ['text', 'html', 'lcov'],
	collectCoverageFrom: [
		'**/*.{js,jsx}',
		'!**/node_modules/**',
		'!**/vendor/**',
		'!**/coverage/**',
	],
	coveragePathIgnorePatterns: [
		'<rootDir>/__test__/',
		'<rootDir>/.*.config.js$',
		'<rootDir>/config/',
		'<rootDir>/src/property',
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
}

module.exports = config
