const { updateLeadFactory } = require('../../../src/factory')
const {
	VALID_INPUT_DATA,
	FACTORY_SUCCESS_RESPONSE,
} = require('../../mocks/index.mock')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de updateLeadFactory.js', () => {
	describe('makeUpdateLeadPayload', () => {
		test('Deve retornar o payload corretamente', () => {
			const response = updateLeadFactory.makeUpdateLeadPayload(VALID_INPUT_DATA.Records[0].dynamodb.OldImage)

			expect(typeof response).toBe('object')
			expect(response).toEqual(FACTORY_SUCCESS_RESPONSE)
		})
	})
})
