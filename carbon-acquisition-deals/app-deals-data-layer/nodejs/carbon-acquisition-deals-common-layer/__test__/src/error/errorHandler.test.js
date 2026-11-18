const PersistenceError = require('../../../src/error/PersistenceError')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Scenario with Successful request test', () => {
	test('It should receive a PersistenceError Error message and throw it', async () => {
		const error = new PersistenceError('Mensagem de teste')

		expect(error.message).toEqual('Mensagem de teste')
		expect(error.name).toEqual('PersistenceError')
		expect(error.code).toEqual(500)
		expect(error instanceof PersistenceError).toBe(true)
	})
})
