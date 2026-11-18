const { abandonedQuotationController } = require('../../../src/controller')
const { updateLeadFactory } = require('../../../src/factory')
const {
	VALID_INPUT_DATA,
	CONTROLLER_SUCCESS_RESPONSE,
	FACTORY_SUCCESS_RESPONSE,
	API_SUCCESS_RESPONSE,
} = require('../../mocks/index.mock')
jest.mock('../../../src/service')
jest.mock('pino', () => {
	const info = jest.fn()
	const error = jest.fn()
	const warn = jest.fn()
	const debug = jest.fn()
	const silent = jest.fn() // 'silent' log level is also a method in newer versions
	const child = jest.fn(() => ({ info, error, warn, debug, silent, child })) // child returns a logger instance

	return () => ({
		info,
		error,
		warn,
		debug,
		silent,
		child,
	})
})
jest.mock('../../../src/factory')
const api = require('../../../src/api')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de abandonedQuotationController.js', () => {
	test('Deve retornar um objeto de resposta de sucesso no padrão esperado', async () => {
		jest
			.spyOn(updateLeadFactory, 'makeUpdateLeadPayload')
			.mockReturnValueOnce(FACTORY_SUCCESS_RESPONSE)

		api.carbonUpdateLeadApi.updateLead = jest
			.fn()
			.mockResolvedValueOnce(API_SUCCESS_RESPONSE)

		const response =
			await abandonedQuotationController.process(VALID_INPUT_DATA)

		expect(response[0]).toHaveProperty('statusCode')
		expect(response[0]).toHaveProperty('statusMessage')
	})
})
