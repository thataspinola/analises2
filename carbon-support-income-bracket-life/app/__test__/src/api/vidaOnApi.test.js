const api = require('../../../src/api')
const MOCKS = require('../../mocks/index.mock')
const axios = require('axios')
const CONSTANT = require('../../../src/property')

jest.mock('axios')

axios.mockImplementation(async (params) => {
	if (params.url.search(CONSTANT.API_VIDAON_FAIXA_RENDA_URL) !== -1) {
		return {
			status: 200,
			data: MOCKS.API_VIDAON_INCOME_BRACKET_VALID_RETURN(),
		}
	}
	const responseError = new Error()
	responseError.response = {
		status: 404,
		data: {},
	}

	throw responseError
})

afterEach(function () {
	jest.clearAllMocks()
})

describe('Given an getIncomeBracket call', () => {
	test('It should return expected value and do not get an exception', async () => {
		const getIncomeBracketReturn = await api.vidaOn.getIncomeBracket(
			MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE().SENSEDIA_CADASTRO
		)

		expect(getIncomeBracketReturn).toEqual(
			MOCKS.API_VIDAON_INCOME_BRACKET_VALID_RETURN()
		)
	})

	test('It should get an exception when receive an http response with status code different then 200', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (params.url.search(CONSTANT.API_VIDAON_FAIXA_RENDA_URL) !== -1) {
				responseError.response = {
					status: 500,
					data: { message: 'Testing expected error' },
				}
			} else {
				responseError.response = {
					status: 404,
					data: {},
				}
			}

			throw responseError
		})

		expect(async () => {
			await api.vidaOn.getIncomeBracket(
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE().SENSEDIA_CADASTRO
			)
		}).rejects.toThrow(
			'API error: code \'500\' data: \'{"message":"Testing expected error"}'
		)
	})
	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		expect(async () => {
			await api.vidaOn.getIncomeBracket(
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE().SENSEDIA_CADASTRO
			)
		}).rejects.toThrow('API unexpected error: Unexpected error')
	})
	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		expect(async () => {
			await api.vidaOn.getIncomeBracket(
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE().SENSEDIA_CADASTRO
			)
		}).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		expect(async () => {
			await api.vidaOn.getIncomeBracket(
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE().SENSEDIA_CADASTRO
			)
		}).rejects.toThrow('API unexpected error: Empty or invalid response')
	})

	test('It should get an exception when receiving an unexpected error and the request happens', async () => {
		axios.mockImplementationOnce(() =>
			Promise.reject({ request: { config: {} } })
		)

		expect(async () => {
			await api.vidaOn.getIncomeBracket(
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE().SENSEDIA_CADASTRO
			)
		}).rejects.toThrow('API did not give response')
	})
})
