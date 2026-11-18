const axios = require('axios')
const api = require('../../../../../src/api')
const CONSTANT = require('../../../../../src/property')
const MOCKS = require('../../../../mocks/index.mock')

jest.mock('axios')

beforeEach(function () {
	axios.mockImplementation(async (params) => {
		if (
			params.url.search(
				CONSTANT.AUTOMOVEL_PROPOSTA_CRITICAS_PAGAMENTO_CHECKOUT_API_PATH
			) !== -1
		) {
			return MOCKS.API_AUTOMOVEL_PROPOSTACRITICAS_PAGAMENTOCHECKOUT.POSTPAGAMENTOCHECKOUT_AXIOS_CREATED_RESPONSE()
		}
		const responseError = new Error()
		responseError.response = {
			status: 404,
			data: {},
		}

		throw responseError
	})
})

afterEach(function () {
	jest.clearAllMocks()
	jest.restoreAllMocks()
})

describe('postPagamentoCheckout', () => {
	test('should successfully make a POST request and return the response data', async () => {
		const result = await api.automovel.propostaCriticas.postPagamentoCheckout(
			MOCKS.API_AUTOMOVEL_PROPOSTACRITICAS_PAGAMENTOCHECKOUT.POSTPAGAMENTOCHECKOUT_PAYLOAD_INPUT(),
			MOCKS.SENSEDIA_CARBON_CLOUD()
		)

		expect(result).toEqual(
			MOCKS.API_AUTOMOVEL_PROPOSTACRITICAS_PAGAMENTOCHECKOUT.POSTPAGAMENTOCHECKOUT_VALID_RETURN()
		)
	})
	test('It should get an exception when receive an http response with status code different then 200', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.AUTOMOVEL_PROPOSTA_CRITICAS_PAGAMENTO_CHECKOUT_API_PATH
				) !== -1
			) {
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

		await expect(
			api.automovel.propostaCriticas.postPagamentoCheckout(
				MOCKS.API_AUTOMOVEL_PROPOSTACRITICAS_PAGAMENTOCHECKOUT.POSTPAGAMENTOCHECKOUT_PAYLOAD_INPUT(),
				MOCKS.SENSEDIA_CARBON_CLOUD()
			)
		).rejects.toThrow(
			`API error: code '500' data: '{"message":"Testing expected error"}`
		)
	})
	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(
			api.automovel.propostaCriticas.postPagamentoCheckout(
				MOCKS.API_AUTOMOVEL_PROPOSTACRITICAS_PAGAMENTOCHECKOUT.POSTPAGAMENTOCHECKOUT_PAYLOAD_INPUT(),
				MOCKS.SENSEDIA_CARBON_CLOUD()
			)
		).rejects.toThrow('API unexpected error: Unexpected error')
	})
	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		await expect(
			api.automovel.propostaCriticas.postPagamentoCheckout(
				MOCKS.API_AUTOMOVEL_PROPOSTACRITICAS_PAGAMENTOCHECKOUT.POSTPAGAMENTOCHECKOUT_PAYLOAD_INPUT(),
				MOCKS.SENSEDIA_CARBON_CLOUD()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		await expect(
			api.automovel.propostaCriticas.postPagamentoCheckout(
				MOCKS.API_AUTOMOVEL_PROPOSTACRITICAS_PAGAMENTOCHECKOUT.POSTPAGAMENTOCHECKOUT_PAYLOAD_INPUT(),
				MOCKS.SENSEDIA_CARBON_CLOUD()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when API did not give response', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.AUTOMOVEL_PROPOSTA_CRITICAS_PAGAMENTO_CHECKOUT_API_PATH
				) !== -1
			) {
				responseError.request = params
			} else {
				responseError.response = {
					status: 404,
					data: {},
				}
			}

			throw responseError
		})

		await expect(
			api.automovel.propostaCriticas.postPagamentoCheckout(
				MOCKS.API_AUTOMOVEL_PROPOSTACRITICAS_PAGAMENTOCHECKOUT.POSTPAGAMENTOCHECKOUT_PAYLOAD_INPUT(),
				MOCKS.SENSEDIA_CARBON_CLOUD()
			)
		).rejects.toThrow('API did not give response')
	})
})
