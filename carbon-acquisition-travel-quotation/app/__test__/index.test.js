const MAIN = require('../')
const MOCKS = require('./mocks/index.mock')
const API = require('./../src/controller')


jest.mock('./../src/controller', () => ({
	quotation: { create: jest.fn() },
}))

jest.mock('../logger')
jest.mock('node:crypto')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Tests for index.js', () => {
	test('It should return success with correlationId', async () => {
		const spyController = jest
			.spyOn(API.quotation, 'create')
			.mockReturnValue(MOCKS.API_DATA_QUOTACAO)

		const input = {body: JSON.stringify(MOCKS.VALID_INPUT_DATA)}
		input.headers = MOCKS.TRACE_HEADER_ID.headers
		
		const response = await MAIN.handler(input)

		expect(response).toEqual(MOCKS.HANDLER_SUCCESS_RESPONSE)
		expect(spyController).toHaveBeenCalledTimes(1)
	})

	test('Deve repassar o context da lambda para o controller', async () => {
		const spyController = jest
			.spyOn(API.quotation, 'create')
			.mockReturnValue(MOCKS.API_DATA_QUOTACAO)

		const input = { body: JSON.stringify(MOCKS.VALID_INPUT_DATA) }
		input.headers = MOCKS.TRACE_HEADER_ID.headers

		const context = { getRemainingTimeInMillis: () => 25000 }

		await MAIN.handler(input, context)

		expect(spyController).toHaveBeenCalledWith(
			expect.anything(),
			expect.any(String),
			context
		)
	})

	test('Deve retornar 500 quando o erro lancado for nulo', async () => {
		jest.spyOn(API.quotation, 'create').mockImplementation(() => {
			throw null
		})

		const input = { body: JSON.stringify(MOCKS.VALID_INPUT_DATA) }
		const response = await MAIN.handler(input)

		expect(response.statusCode).toBe(500)
		expect(JSON.parse(response.body).status).toBe('error')
	})

	test('It should return error 500 when the create quotation method gives an error', async () => {
		jest.spyOn(API.quotation, 'create').mockImplementation(() => {
			throw new Error("Error")
		})
		
		const input = {body: JSON.stringify(MOCKS.VALID_INPUT_DATA)}
		const response = await MAIN.handler(input)

		expect(response).toEqual(MOCKS.HANDLER_ERROR_RESPONSE)
	})
})

