const { abandonedQuotationController } = require('../src/controller')
const { logger } = require('../src/service')
const { handler } = require('..')

const {
	CONTROLLER_SUCCESS_RESPONSE,
	VALID_INPUT_DATA,
} = require('./mocks/index.mock')

jest.mock('../src/controller')
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

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de teste de index.test.js', () => {
	describe('Quando sucesso', () => {
		test('Deve invocar o controller somente uma vez e com as informações informadas na entrada', async () => {
			const spyController = jest
				.spyOn(abandonedQuotationController, 'process')
				.mockReturnValue(CONTROLLER_SUCCESS_RESPONSE)

			await handler(VALID_INPUT_DATA)

			expect(spyController).toHaveBeenCalled()
			expect(spyController).toHaveBeenCalledTimes(1)
			expect(spyController).toHaveBeenCalledWith(VALID_INPUT_DATA)
		})

		test('Deve retornar um objeto de resposta no padrão esperado', async () => {
			const response = await handler(VALID_INPUT_DATA)

			expect(response).toHaveProperty('isBase64Encoded')
			expect(typeof response.isBase64Encoded).toBe('boolean')
			expect(response).toHaveProperty('headers')
			expect(typeof response.headers).toBe('object')
			expect(response).toHaveProperty('statusCode')
			expect(typeof response.statusCode).toBe('number')
			expect(response).toHaveProperty('body')
			expect(typeof response.body).toBe('string')

			const body = JSON.parse(response.body)[0]

			expect(body).toHaveProperty('statusCode')
			expect(typeof body.statusCode).toBe('number')
			expect(body).toHaveProperty('statusMessage')
			expect(typeof body.statusMessage).toBe('string')
		})
	})

	describe('Quando falha', () => {
		test('Deve invocar o controller somente uma vez e com as informações informadas na entrada', async () => {
			const spyController = jest
				.spyOn(abandonedQuotationController, 'process')
				.mockImplementation(() => {
					throw new Error()
				})

			await handler(VALID_INPUT_DATA)

			expect(spyController).toHaveBeenCalled()
			expect(spyController).toHaveBeenCalledTimes(1)
			expect(spyController).toHaveBeenCalledWith(VALID_INPUT_DATA)
		})

		test('Deve retornar um objeto de resposta de erro no padrão esperado', async () => {
			jest
				.spyOn(abandonedQuotationController, 'process')
				.mockImplementation(() => {
					throw new Error()
				})

			const response = await handler(VALID_INPUT_DATA)

			expect(response).toHaveProperty('isBase64Encoded')
			expect(typeof response.isBase64Encoded).toBe('boolean')
			expect(response).toHaveProperty('headers')
			expect(typeof response.headers).toBe('object')
			expect(response).toHaveProperty('statusCode')
			expect(typeof response.statusCode).toBe('number')
			expect(response.statusCode).toBe(500)
			expect(response).toHaveProperty('body')
			expect(typeof response.body).toBe('string')
			const errorBody = JSON.parse(response.body)
			expect(errorBody).toHaveProperty('status')
			expect(errorBody.status).toBe('error')
			expect(errorBody).toHaveProperty('message')
			expect(errorBody.message).toBe('Unknown Server Error')
		})

		test('Deve retornar um objeto de resposta de erro ao não enviar o body', async () => {
			const response = await handler({})

			expect(response).toHaveProperty('isBase64Encoded')
			expect(typeof response.isBase64Encoded).toBe('boolean')
			expect(response).toHaveProperty('headers')
			expect(typeof response.headers).toBe('object')
			expect(response).toHaveProperty('statusCode')
			expect(typeof response.statusCode).toBe('number')
			expect(response.statusCode).toBe(400)
			expect(response).toHaveProperty('body')
			expect(typeof response.body).toBe('string')
			const errorBody = JSON.parse(response.body)
			expect(errorBody).toHaveProperty('status')
			expect(errorBody.status).toBe('error')
			expect(errorBody).toHaveProperty('message')
			expect(errorBody.message).toBe('The request Records is required')
		})

		it('Deve logar um erro', async () => {
			const spyLogger = jest.spyOn(logger, 'error')

			jest
				.spyOn(abandonedQuotationController, 'process')
				.mockImplementationOnce(() => {
					throw new Error()
				})

			await handler(VALID_INPUT_DATA)

			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})
	})
})
