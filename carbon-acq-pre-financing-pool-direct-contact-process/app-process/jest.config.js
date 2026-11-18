/** @type {import('jest').Config} */
const config = {
	verbose: true,
	testEnvironment: 'node',
	collectCoverage: false,
	coverageThreshold: {
		global: {
			branches: 84,
			functions: 90,
			lines: 90,
			statements: 90,
		},
	},
	coverageReporters: ['text', 'lcov'],
	collectCoverageFrom: [
		'**/*.{js,jsx}',
		'!**/localRunner.js',
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
		'<rootDir>/__test__/utils',
	],
	testMatch: [
		'**/__tests__/**/*.(mjs|js|ts)?',
		'**/?(*.)+(spec|test).(mjs|js|ts)?',
	],
}

module.exports = config
