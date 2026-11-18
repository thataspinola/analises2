const api = require('../../../src/api')
const { ExternalApiError } = require('../../../src/error')
const CONSTANT = require('../../../src/property')
const MOCKS = require('../../mocks/index.mock')
const axios = require('axios')

jest.mock('axios')

beforeEach(function () {
	axios.mockImplementation(async (params) => {
		if (
			params.url.search(
				CONSTANT.AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH
			) !== -1
		) {
			return MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_ABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE()
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
})

describe('Given a getProtocolos call', () => {
	test('It should return expected value and do not get an exception', async () => {
		await expect(
			api.autoQuotations.getProtocols(
				MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_VALID_QUOTATIONNUMBER_INPUT(),
				MOCKS.CONTROLLER.SENSEDIA_HUB_TOKEN()
			)
		).resolves.toEqual(
			MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_JUSTSETOFFEEDBACKS_VALID_RETURN()
		)
	})

	test('It should return expected value when receives an unable to pay pending response and do not get an exception', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH
				) !== -1
			) {
				return MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_UNABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE()
			} else {
				responseError.response = {
					status: 404,
					data: {},
				}
			}

			throw responseError
		})
		await expect(
			api.autoQuotations.getProtocols(
				MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_UNABLETOPAY_VALID_QUOTATIONNUMBER_INPUT(),
				MOCKS.CONTROLLER.SENSEDIA_HUB_TOKEN()
			)
		).resolves.toEqual(
			MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_UNABLETOPAY_JUSTSETOFFEEDBACKS_VALID_RETURN()
		)
	})

	test('It should return expected value when receives an refused response and do not get an exception', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH
				) !== -1
			) {
				return MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_REFUSED_SUCCESS_RESPONSE()
			} else {
				responseError.response = {
					status: 404,
					data: {},
				}
			}

			throw responseError
		})
		await expect(
			api.autoQuotations.getProtocols(
				MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_REFUSED_VALID_QUOTATIONNUMBER_INPUT(),
				MOCKS.CONTROLLER.SENSEDIA_HUB_TOKEN()
			)
		).resolves.toEqual(
			MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_REFUSED_VALID_RETURN()
		)
	})

	test('It should get an exception when receive an http response with status code different then 200', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH
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
			api.autoQuotations.getProtocols(
				MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_VALID_QUOTATIONNUMBER_INPUT(),
				MOCKS.CONTROLLER.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow('{"message":"Testing expected error"}')
	})

	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(
			api.autoQuotations.getProtocols(
				MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_VALID_QUOTATIONNUMBER_INPUT(),
				MOCKS.CONTROLLER.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow('Unexpected error')
	})

	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		await expect(
			api.autoQuotations.getProtocols(
				MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_VALID_QUOTATIONNUMBER_INPUT(),
				MOCKS.CONTROLLER.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})

	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		await expect(
			api.autoQuotations.getProtocols(
				MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_VALID_QUOTATIONNUMBER_INPUT(),
				MOCKS.CONTROLLER.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')

		axios.mockResolvedValueOnce(MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_ABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE_WITHOUT_ORIGEM())

		await expect(
			api.autoQuotations.getProtocols(
				MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_VALID_QUOTATIONNUMBER_INPUT(),
				MOCKS.CONTROLLER.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow('API unexpected error: missing proposta.origem')

		axios.mockResolvedValueOnce(MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_ABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE_WITHOUT_NUMERO())

		await expect(
			api.autoQuotations.getProtocols(
				MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_VALID_QUOTATIONNUMBER_INPUT(),
				MOCKS.CONTROLLER.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow('API unexpected error: missing proposta.numero')
	})

	test('It should get an exception when API did not give response', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH
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
			api.autoQuotations.getProtocols(
				MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_VALID_QUOTATIONNUMBER_INPUT(),
				MOCKS.CONTROLLER.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow('500 - Houve um erro inesperado ao invocar a API')
	})

	test('It should get an exception when receives an http response with status code 400 related with quotation not found', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH
				) !== -1
			) {
				responseError.response =
					MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_NOTFOUND_RESPONSE()
			} else {
				responseError.response = {
					status: 404,
					data: {},
				}
			}

			throw responseError
		})

		await expect(
			api.autoQuotations.getProtocols(
				MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_NOTFOUND_VALID_QUOTATIONNUMBER_INPUT(),
				MOCKS.CONTROLLER.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow(MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_NOTFOUND_RESPONSE().data.message)
	})
})
