const { quotationController } = require('../src/controller')
const { logger } = require('../config')
const { handler } = require('..')

const {
	CONTROLLER_SUCCESS_RESPONSE,
	VALID_INPUT_DATA,
	VALID_INPUT_DATA_PARSED
} = require('./mocks/index.mock')

jest.mock('../src/controller')
jest.mock('../config/logger', () => ({
	info: jest.fn(),
	error: jest.fn(),
	warn: jest.fn(),
	debug: jest.fn(),
}))

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de teste de index.test.js', () => {
	describe('Quando sucesso', () => {
		test('Deve invocar o controller somente uma vez e com as informações informadas na entrada', async () => {
			const spyController = jest
				.spyOn(quotationController, 'process')
				.mockReturnValueOnce(CONTROLLER_SUCCESS_RESPONSE)

			await handler(VALID_INPUT_DATA)

			expect(spyController).toHaveBeenCalled()
			expect(spyController).toHaveBeenCalledTimes(1)
			expect(spyController).toHaveBeenCalledWith(VALID_INPUT_DATA_PARSED)
		})

		test('Deve retornar um objeto de resposta no padrão esperado', async () => {
			jest
				.spyOn(quotationController, 'process')
				.mockReturnValueOnce(CONTROLLER_SUCCESS_RESPONSE)

			const response = await handler(VALID_INPUT_DATA)
			const parsedResponseBody = JSON.parse(response.body)

			expect(response).toHaveProperty('statusCode')
			expect(typeof response.statusCode).toBe('number')
			expect(response.statusCode).toBe(201)
			expect(response).toHaveProperty('body')
			expect(typeof parsedResponseBody).toBe('object')
			expect(parsedResponseBody).toHaveProperty('susepCode')
			expect(typeof parsedResponseBody.susepCode).toBe('string')
			expect(parsedResponseBody).toHaveProperty('idLead')
			expect(typeof parsedResponseBody.idLead).toBe('string')
			expect(parsedResponseBody).toHaveProperty('pescod')
			expect(typeof parsedResponseBody.pescod).toBe('string')
			expect(parsedResponseBody).toHaveProperty('quotation_data')
			expect(typeof parsedResponseBody.quotation_data).toBe('object')
			expect(parsedResponseBody).toHaveProperty('quotations')
			expect(Array.isArray(parsedResponseBody.quotations)).toBeTruthy()

			for (const item of parsedResponseBody.quotations) {
				expect(item).toHaveProperty('porto_quotation_id')
				expect(typeof item.porto_quotation_id).toBe('number')
				expect(item).toHaveProperty('product_attributes')
				expect(typeof item.product_attributes).toBe('object')
				expect(item).toHaveProperty('quotation_date')
				expect(typeof item.quotation_date).toBe('string')
				expect(item).toHaveProperty('expiration_date')
				expect(typeof item.expiration_date).toBe('string')

				const product_attributes = item.product_attributes

				expect(product_attributes).toHaveProperty('budget_number')
				expect(typeof product_attributes.budget_number).toBe('string')
				expect(product_attributes).toHaveProperty('name')
				expect(typeof product_attributes.name).toBe('string')
				expect(product_attributes).toHaveProperty('start_date')
				expect(typeof product_attributes.start_date).toBe('string')
				expect(product_attributes).toHaveProperty('end_date')
				expect(typeof product_attributes.end_date).toBe('string')
				expect(product_attributes).toHaveProperty('amount')
				expect(typeof product_attributes.amount).toBe('number')
				expect(product_attributes).toHaveProperty('installments')
				expect(typeof product_attributes.installments).toBe('number')
				expect(product_attributes).toHaveProperty('porto_card_installments')
				expect(typeof product_attributes.porto_card_installments).toBe('number')
				expect(product_attributes).toHaveProperty('porto_card_amount')
				expect(typeof product_attributes.porto_card_amount).toBe('number')
				expect(product_attributes).toHaveProperty(
					'porto_card_discount_percentage'
				)
				expect(typeof product_attributes.porto_card_discount_percentage).toBe(
					'number'
				)
				expect(product_attributes).toHaveProperty('coverages')
				expect(typeof product_attributes.coverages).toBe('object')

				const coverages = product_attributes.coverages
				expect(coverages).toHaveProperty('description')
				expect(typeof coverages.description).toBe('string')
			}
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
			expect(spyController).toHaveBeenCalledWith(VALID_INPUT_DATA_PARSED)
		})

		test('Deve retornar um objeto de resposta de erro no padrão esperado', async () => {
			jest.spyOn(quotationController, 'process').mockImplementation(() => {
				throw new Error()
			})

			const response = await handler(VALID_INPUT_DATA)

			expect(response).toHaveProperty('statusCode')
			expect(typeof response.statusCode).toBe('number')
			expect(response.statusCode).toBe(500)
		})

		test('Deve retornar um objeto de resposta de erro ao não enviar o event', async () => {
			const response = await handler()

			const parsedBody = JSON.parse(response.body)

			expect(response).toHaveProperty('statusCode')
			expect(typeof response.statusCode).toBe('number')
			expect(response.statusCode).toBe(400)
			expect(parsedBody).toHaveProperty('message')
			expect(parsedBody.message).toBe('The request event is required')
		})

		test('Deve retornar um objeto de resposta de erro ao enviar um body sem ser string', async () => {
			const response = await handler(VALID_INPUT_DATA_PARSED)

			const parsedBody = JSON.parse(response.body)

			expect(response).toHaveProperty('statusCode')
			expect(typeof response.statusCode).toBe('number')
			expect(response.statusCode).toBe(400)
			expect(parsedBody).toHaveProperty('message')
			expect(parsedBody.message).toBe('Input must be a string')
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
