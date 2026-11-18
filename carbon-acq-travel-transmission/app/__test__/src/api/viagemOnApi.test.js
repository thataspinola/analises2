const api = require('../../../src/api')
const MOCKS = require('../../mocks/src/api/viagemOnApi.mock')
const axios = require('axios')
const CONSTANT = require('../../../src/property')
const factory = require('../../../src/factory')

jest.mock('axios')
jest.mock('../../../src/factory')

axios.mockImplementation(async (params) => {
	if (params.url.search(CONSTANT.API_VIAGEMON_PAGAMENTO_URL) !== -1) {
		return {
			status: 200,
			data: MOCKS.API_VIAGEMON_PAGAMENTO_SUCCESS_RESPONSE_BODY(),
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
	factory.httpsAgent.createHttpsAgent.mockImplementation(() => MOCKS.GET_HTTPS_AGENT())
	jest.clearAllMocks()
})

describe('Given an pagamento call', () => {
	test('It should return expected value and do not get an exception', (done) => {
		expect(async () => {
			const pagamentoReturn = await api.viagemOn.integration(
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE(),
				MOCKS.CERTIFICATE(),
				MOCKS.API_VIAGEMON_PAGAMENTO_VALID_PAYLOAD()
			)
			expect(pagamentoReturn).toEqual(
				MOCKS.API_VIAGEMON_PAGAMENTO_VALID_RETURN()
			)
			done()
		}).not.toThrow()
	})

	test('It should get an exception when receive an http response with status code different then 200', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (params.url.search(CONSTANT.API_VIAGEMON_PAGAMENTO_URL) !== -1) {
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
			await api.viagemOn.integration(
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE(),
				MOCKS.CERTIFICATE(),
				MOCKS.API_VIAGEMON_PAGAMENTO_VALID_PAYLOAD()
			)
		}).rejects.toThrow(
			'API error: code \'500\' data: \'{"message":"Testing expected error"}'
		)
	})
	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		expect(async () => {
			await api.viagemOn.integration(
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE(),
				MOCKS.CERTIFICATE(),
				MOCKS.API_VIAGEMON_PAGAMENTO_VALID_PAYLOAD()
			)
		}).rejects.toThrow('API unexpected error: Unexpected error')
	})
	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		expect(async () => {
			await api.viagemOn.integration(
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE(),
				MOCKS.CERTIFICATE(),
				MOCKS.API_VIAGEMON_PAGAMENTO_VALID_PAYLOAD()
			)
		}).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		expect(async () => {
			await api.viagemOn.integration(
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE(),
				MOCKS.CERTIFICATE(),
				MOCKS.API_VIAGEMON_PAGAMENTO_VALID_PAYLOAD()
			)
		}).rejects.toThrow('API unexpected error: Empty or invalid response')
	})

	test('It should get an exception when receive an http response with status 200 but without the expected structure', async () => {
		axios.mockImplementationOnce(async (params) => {
			if (params.url.search(CONSTANT.API_VIAGEMON_PAGAMENTO_URL) !== -1) {
				return {
					status: 200,
					data: '',
				}
			}
			const responseError = new Error()
			responseError.response = {
				status: 404,
				data: {},
			}

			throw responseError
		})

		expect(async () => {
			await api.viagemOn.integration(
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE(),
				MOCKS.CERTIFICATE(),
				MOCKS.API_VIAGEMON_PAGAMENTO_VALID_PAYLOAD()
			)
		}).rejects.toThrow('API unsuccessful response')

		axios.mockImplementationOnce(async (params) => {
			if (params.url.search(CONSTANT.API_VIAGEMON_PAGAMENTO_URL) !== -1) {
				return {
					status: 200,
					data: { banana: 'maçã' },
				}
			}
			const responseError = new Error()
			responseError.response = {
				status: 404,
				data: {},
			}

			throw responseError
		})

		expect(async () => {
			await api.viagemOn.integration(
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE(),
				MOCKS.CERTIFICATE(),
				MOCKS.API_VIAGEMON_PAGAMENTO_VALID_PAYLOAD()
			)
		}).rejects.toThrow('API unsuccessful response')
	})
	
	test("It should get an exception when receive an http response with status 200 but with data.sucesso equals 'false'", async () => {
		axios.mockImplementationOnce(async (params) => {
			if (params.url.search(CONSTANT.API_VIAGEMON_PAGAMENTO_URL) !== -1) {
				return {
					status: 200,
					data: { sucesso: false },
				}
			}
			const responseError = new Error()
			responseError.response = {
				status: 404,
				data: {},
			}

			throw responseError
		})

		expect(async () => {
			await api.viagemOn.integration(
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE(),
				MOCKS.CERTIFICATE(),
				MOCKS.API_VIAGEMON_PAGAMENTO_VALID_PAYLOAD()
			)
		}).rejects.toThrow('API unsuccessful response')
	})
})
