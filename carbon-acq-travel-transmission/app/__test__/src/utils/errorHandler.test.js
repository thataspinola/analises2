beforeAll(() => {})

afterEach(() => {
	jest.clearAllMocks()
})

describe('Scenario with Successful request test', () => {
	test('It should receive an Error message and throw it', async () => {
		const error = new UserDataValidationError('Mensagem de teste')

		expect(error.message).toEqual('Mensagem de teste')
		expect(error.code).toEqual(400)
		expect(error instanceof UserDataValidationError).toBe(true)
	})
})

describe('Scenario with Fail request test', () => {})
