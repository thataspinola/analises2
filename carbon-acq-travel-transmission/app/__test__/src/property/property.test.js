const originalEnv = process.env

beforeAll(() => {})

beforeEach(() => {
	jest.resetModules()
})

afterEach(() => {
	jest.clearAllMocks()
})

afterAll(() => {
	process.env = originalEnv
})

describe('Scenario with Successful request test', () => {
	test('It should return local token layer', async () => {
		process.env = {
			...originalEnv,
			NODE_ENV: undefined,
		}

		const CONSTANTS = require('../../../src/property')
		const response = CONSTANTS.TOKEN_LIBRARY_LOCATION

		expect(response).toEqual('@porto-seguro/hub-vendas.carbon-token')
	})

	test('It should return cloud token layer', async () => {
		process.env = {
			...originalEnv,
			NODE_ENV: 'homolog',
		}

		const CONSTANTS = require('../../../src/property')
		const response = CONSTANTS.TOKEN_LIBRARY_LOCATION

		expect(response).toEqual('/opt/nodejs/carbon-token/')
	})
})
