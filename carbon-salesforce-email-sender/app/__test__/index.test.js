const controller = require('../src/controller')
const MOCKS = require('./mocks/index.mock')
const factory = require('../src/factory')
const service = require('../src/service')
const errors = require('../src/error')
const { handler } = require('../')

jest.mock('../src/controller')
jest.mock('../src/factory')
jest.mock('../src/service')

describe('Suite de testes de index.js', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Deve analisar o corpo da solicitação e processar a solicitação com sucesso', async () => {
		const expectedResponse = {
			body: 'response body',
			statusCode: 200,
		}

		controller.emailNotification.processRequest.mockResolvedValue(
			expectedResponse
		)

		const response = await handler({
			body: JSON.stringify(MOCKS.VALID_INPUT_DATA),
		})

		expect(response).toEqual({
			isBase64Encoded: false,
			headers: { 'Content-Type': 'application/json' },
			statusCode: 200,
			body: JSON.stringify(expectedResponse.body),
		})
		expect(controller.emailNotification.processRequest).toHaveBeenCalledWith(
			MOCKS.VALID_INPUT_DATA
		)
	})

	test('Deve retornar uma mensagem de erro caso o body não seja uma string', async () => {
		const event = { body: 12345 }

		factory.response.error.mockImplementationOnce((msg) => ({
			body: msg,
			statusCode: 400,
		}))

		const response = await handler(event)

		expect(response.statusCode).toBe(400)
		expect(response.body).toContain('Input must be a string')
		expect(service.logger.error).toHaveBeenCalledWith(
			`Error: Input must be a string`
		)
	})

	test('Deve retornar um erro caso o body não seja um JSON válido', async () => {
		const event = { body: 'invalid JSON' }

		factory.response.error.mockImplementationOnce((msg) => ({
			body: msg,
			statusCode: 400,
		}))

		const response = await handler(event)

		expect(response.statusCode).toBe(400)
		expect(response.body).toContain('Input must be a valid JSON')
		expect(service.logger.error).toHaveBeenCalledWith(
			`Error: Input must be a valid JSON`
		)
	})

	test('Deve lidar com erros de validação', async () => {
		const validationError = new errors.ValidationError(
			'Validation error message'
		)

		controller.emailNotification.processRequest.mockRejectedValue(
			validationError
		)

		const errorBody = { message: 'error body', status: 'ERROR' }
		factory.response.badRequestError.mockReturnValue({
			body: errorBody,
			statusCode: 400,
		})

		const response = await handler({
			body: JSON.stringify(MOCKS.VALID_INPUT_DATA),
		})

		expect(response.statusCode).toBe(400)
		expect(typeof response.body).toBe('string')
		expect(response.body).toBe(JSON.stringify(errorBody))
		expect(service.logger.error).toHaveBeenCalledWith(
			{ transactionId: '123456' },
			`Error processing request: Validation error message`
		)
	})

	test('Deve lidar com erros genéricos', async () => {
		const genericError = new Error('Generic error message')

		controller.emailNotification.processRequest.mockRejectedValue(genericError)

		const errorBody = { message: 'error body', status: 'ERROR' }
		factory.response.error.mockReturnValue({
			body: errorBody,
			statusCode: 500,
		})

		const response = await handler({
			body: JSON.stringify(MOCKS.VALID_INPUT_DATA),
		})

		expect(response.statusCode).toBe(500)
		expect(typeof response.body).toBe('string')
		expect(response.body).toBe(JSON.stringify(errorBody))
		expect(service.logger.error).toHaveBeenCalledWith(
			{ transactionId: '123456' },
			'Error processing request: Generic error message'
		)
	})
})
