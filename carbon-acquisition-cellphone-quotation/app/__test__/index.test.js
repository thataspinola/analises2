const { quotationController } = require('../src/controller')
const { logger } = require('../src/service')
const { handler } = require('..')

const {
	CONTROLLER_SUCCESS_RESPONSE,
	GET_CELLPHONE_API_SUCCESS_RESPONSE,
	RESPONSE_FACTORY_QUOTATIONS,
	VALID_INPUT_DATA,
	INVALID_NULL_DATA,
} = require('./mocks/index.mock')

jest.mock('../src/controller')
jest.mock('../src/service', () => ({
	logger: {
		error: jest.fn(),
		info: jest.fn(),
	},
	xss: {
		sanitizeInput: jest.fn((input) => input),
	},
}))

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de teste de index.test.js', () => {
	describe('Quando sucesso', () => {
		test('Deve invocar o controller somente uma vez e com as informações informadas na entrada', async () => {
			const spyController = jest
				.spyOn(quotationController, 'process')
				.mockReturnValue(CONTROLLER_SUCCESS_RESPONSE)

			await handler(VALID_INPUT_DATA)

			expect(spyController).toHaveBeenCalled()
			expect(spyController).toHaveBeenCalledTimes(1)
			expect(spyController).toHaveBeenCalledWith(VALID_INPUT_DATA)
		})

		test('Deve retornar um objeto de resposta no padrão esperado', async () => {
			jest
				.spyOn(quotationController, 'process')
				.mockReturnValue(
					CONTROLLER_SUCCESS_RESPONSE,
					GET_CELLPHONE_API_SUCCESS_RESPONSE,
					RESPONSE_FACTORY_QUOTATIONS
				)

			const response = await handler(VALID_INPUT_DATA)

			expect(response).toHaveProperty('statusCode')
			expect(typeof response.statusCode).toBe('number')
			expect(response.statusCode).toBe(201)
			expect(response).toHaveProperty('body')
			expect(typeof response.body).toBe('object')
			expect(response.body).toHaveProperty('susepCode')
			expect(typeof response.body.susepCode).toBe('string')
			expect(response.body).toHaveProperty('brokerName')
			expect(typeof response.body.brokerName).toBe('string')
			expect(response.body).toHaveProperty('brokerEmail')
			expect(typeof response.body.brokerEmail).toBe('string')
			expect(response.body).toHaveProperty('brokerPhone')
			expect(typeof response.body.brokerPhone).toBe('string')
			expect(response.body).toHaveProperty('idLead')
			expect(typeof response.body.idLead).toBe('string')
			expect(response.body).toHaveProperty('pescod')
			expect(typeof response.body.pescod).toBe('string')
			expect(response.body).toHaveProperty('quotation_data')
			expect(response.body.quotation_data).toEqual(
				GET_CELLPHONE_API_SUCCESS_RESPONSE
			)
			expect(response.body).toHaveProperty('quotations')
			expect(Array.isArray(response.body.quotations)).toBeTruthy()
			expect(response.body.quotations).toEqual(RESPONSE_FACTORY_QUOTATIONS)
		})
	})

	describe('Quando falha', () => {
		test('Deve invocar o controller somente uma vez e com as informações informadas na entrada', async () => {
			const spyController = jest
				.spyOn(quotationController, 'process')
				.mockImplementation(() => {
					throw new Error()
				})

			await handler(VALID_INPUT_DATA)

			expect(spyController).toHaveBeenCalled()
			expect(spyController).toHaveBeenCalledTimes(1)
			expect(spyController).toHaveBeenCalledWith(VALID_INPUT_DATA)
		})

		test('Deve retornar um objeto de resposta de erro no padrão esperado', async () => {
			jest.spyOn(quotationController, 'process').mockImplementation(() => {
				throw new Error()
			})

			const response = await handler(VALID_INPUT_DATA)

			expect(response).toHaveProperty('statusCode')
			expect(typeof response.statusCode).toBe('number')
			expect(response.statusCode).toBe(500)
			expect(response).toHaveProperty('body')
			expect(typeof response.body).toBe('object')
			expect(response.body).toHaveProperty('status')
			expect(response.body.status).toBe('error')
			expect(response.body).toHaveProperty('message')
			expect(response.body.message).toBe('Unknown Server Error')
		})

		test('Deve retornar um objeto de resposta de erro ao não enviar o event', async () => {
			const response = await handler(INVALID_NULL_DATA)

			expect(response).toHaveProperty('statusCode')
			expect(typeof response.statusCode).toBe('number')
			expect(response.statusCode).toBe(400)
			expect(response).toHaveProperty('body')
			expect(typeof response.body).toBe('object')
			expect(response.body).toHaveProperty('status')
			expect(response.body.status).toBe('error')
			expect(response.body).toHaveProperty('message')
			expect(response.body.message).toBe('A requisição está vazia, envie uma válida')
		})

		it('Deve logar um erro', async () => {
			const spyLogger = jest.spyOn(logger, 'error')

			jest.spyOn(quotationController, 'process').mockImplementationOnce(() => {
				throw new Error()
			})

			await handler(VALID_INPUT_DATA)

			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})
	})
})
