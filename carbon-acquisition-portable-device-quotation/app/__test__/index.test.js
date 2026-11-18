const { quotationController } = require('../src/controller')
const { logger } = require('../src/service')
const { handler } = require('..')

const MOCKS = require('./mocks/index.mock')

jest.mock('../src/controller')
jest.mock('../src/service', () => ({
	logger: {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	},
	validation: {},
	dynamoDB: {},
}))

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de teste de index.test.js', () => {
	describe('Quando sucesso', () => {
		test('Deve invocar o controller somente uma vez e com as informações informadas na entrada', async () => {
			const spyController = jest
				.spyOn(quotationController, 'process')
				.mockReturnValue(MOCKS.CONTROLLER_SUCCESS_RESPONSE)

			await handler(MOCKS.VALID_HANDLER_POST_INPUT_REQUEST_DATA())

			expect(spyController).toHaveBeenCalled()
			expect(spyController).toHaveBeenCalledTimes(1)
			expect(spyController).toHaveBeenCalledWith(MOCKS.VALID_INPUT_DATA)
		})

		// 	test('Deve retornar um objeto de resposta no padrão esperado', async () => {
		// 		jest
		// 			.spyOn(quotationController, 'process')
		// 			.mockReturnValue(
		// 				MOCKS.CONTROLLER_SUCCESS_RESPONSE,
		// 				MOCKS.GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE,
		// 				MOCKS.RESPONSE_FACTORY_QUOTATIONS
		// 			)

		// 		const response = await handler(
		// 			MOCKS.VALID_HANDLER_POST_INPUT_REQUEST_DATA()
		// 		)

		// 		expect(response).toHaveProperty('statusCode')
		// 		expect(typeof response.statusCode).toBe('number')
		// 		expect(response.statusCode).toBe(201)
		// 		expect(response).toHaveProperty('body')
		// 		expect(typeof response.body).toBe('object')
		// 		expect(response.body).toHaveProperty('susepCode')
		// 		expect(typeof response.body.susepCode).toBe('string')
		// 		expect(response.body).toHaveProperty('brokerName')
		// 		expect(typeof response.body.brokerName).toBe('string')
		// 		expect(response.body).toHaveProperty('brokerEmail')
		// 		expect(typeof response.body.brokerEmail).toBe('string')
		// 		expect(response.body).toHaveProperty('brokerPhone')
		// 		expect(typeof response.body.brokerPhone).toBe('string')
		// 		expect(response.body).toHaveProperty('idLead')
		// 		expect(typeof response.body.idLead).toBe('string')
		// 		expect(response.body).toHaveProperty('pescod')
		// 		expect(typeof response.body.pescod).toBe('string')
		// 		expect(response.body).toHaveProperty('quotation_data')
		// 		expect(response.body.quotation_data).toEqual(
		// 			MOCKS.GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE
		// 		)
		// 		expect(response.body).toHaveProperty('quotations')
		// 		expect(Array.isArray(response.body.quotations)).toBeTruthy()
		// 		expect(response.body.quotations).toEqual(
		// 			MOCKS.RESPONSE_FACTORY_QUOTATIONS
		// 		)
		// 	})
		// })

		// describe('Quando falha', () => {
		// 	test.skip('Deve invocar o controller somente uma vez e com as informações informadas na entrada', async () => {
		// 		const spyController = jest
		// 			.spyOn(quotationController, 'process')
		// 			.mockImplementation(() => {
		// 				throw new Error()
		// 			})

		// 		await handler(MOCKS.VALID_HANDLER_POST_INPUT_REQUEST_DATA())

		// 		expect(spyController).toHaveBeenCalled()
		// 		expect(spyController).toHaveBeenCalledTimes(1)
		// 		expect(spyController).toHaveBeenCalledWith(MOCKS.VALID_INPUT_DATA)
		// 	})

		// 	test.skip('Deve retornar um objeto de resposta de erro no padrão esperado', async () => {
		// 		jest.spyOn(quotationController, 'process').mockImplementation(() => {
		// 			throw new Error()
		// 		})

		// 		const response = await handler(
		// 			MOCKS.VALID_HANDLER_POST_INPUT_REQUEST_DATA()
		// 		)

		// 		expect(response).toHaveProperty('statusCode')
		// 		expect(typeof response.statusCode).toBe('number')
		// 		expect(response.statusCode).toBe(500)
		// 		expect(response).toHaveProperty('body')
		// 		expect(typeof response.body).toBe('object')
		// 		expect(response.body).toHaveProperty('status')
		// 		expect(response.body.status).toBe('error')
		// 		expect(response.body).toHaveProperty('message')
		// 		expect(response.body.message).toBe('Unknown Server Error')
		// 	})

		// 	test.skip('Deve retornar um objeto de resposta de erro ao não enviar o event', async () => {
		// 		const response = await handler(MOCKS.INVALID_NULL_DATA)

		// 		expect(response).toHaveProperty('statusCode')
		// 		expect(typeof response.statusCode).toBe('number')
		// 		expect(response.statusCode).toBe(500)
		// 		expect(response).toHaveProperty('body')
		// 		expect(typeof response.body).toBe('object')
		// 		expect(response.body).toHaveProperty('status')
		// 		expect(response.body.status).toBe('error')
		// 		expect(response.body).toHaveProperty('message')
		// 		expect(response.body.message).toBe('Input must be a string')
		// 	})

		// 	it.skip('Deve logar um erro', async () => {
		// 		const spyLogger = jest.spyOn(logger, 'error')

		// 		jest.spyOn(quotationController, 'process').mockImplementationOnce(() => {
		// 			throw new Error()
		// 		})

		// 		await handler(MOCKS.VALID_INPUT_DATA)

		// 		expect(spyLogger).toHaveBeenCalled()
		// 		expect(spyLogger).toHaveBeenCalledTimes(1)
		// 	})
	})
})
