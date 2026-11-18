/** @type {import('jest').Config} */
const config = {
	verbose: true,
	testEnvironment: 'node',
	collectCoverage: false,
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
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
		'!**/mocks.js',
		'!**/GraphQLError.js',
		'!**/searchProductsController.js',
	],
	coveragePathIgnorePatterns: [
		'<rootDir>/__test__/',
		'<rootDir>/.*.config.js$',
		'<rootDir>/app/src/api/commercePlatform/',
		'<rootDir>/.*.graphQlQuery.js$',
	],
	testPathIgnorePatterns: [
		'<rootDir>/__test__/mocks',
		'<rootDir>/__test__/utils',
		'<rootDir>/app/src/api/commercePlatform/',
		'<rootDir>/.*.graphQlQuery.js.js$',
	],
	testMatch: [
		'**/__tests__/**/*.(mjs|js|ts)?',
		'**/?(*.)+(spec|test).(mjs|js|ts)?',
	],
}

module.exports = config
