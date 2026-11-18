const CONSTANT = require('../../../../../src/property')
const MOCKS = require('../../../../mocks/index.mock')
const api = require('../../../../../src/api')
const service = require('../../../../../src/service')
const axios = require('axios')

jest.mock('../../../../../src/service')
jest.mock('axios')

beforeEach(function () {
	service.logger.info.mockImplementation((message) => {})
	service.logger.error.mockImplementation((message) => {})
	service.logger.warn.mockImplementation((message) => {})
	service.logger.debug.mockImplementation((message) => {})
	axios.mockImplementation(async (params) => {
		if (
			params.url.search(CONSTANT.HUB_VENDAS_CARBON_SERVICES_PRICING_API) !== -1
		) {
			return MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_PRICING.AXIOS_SUCCESS_RESPONSE_DATA()
		}
		const responseError = new Error()
		responseError.response = {
			status: 404,
			data: {},
		}

		throw responseError
	})
})

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a postPricing call', () => {
	test('It should return expected value and do not get an exception', async () => {
		await expect(
			api.hubVendasCarbon.prestacaoServico.pricing.postPricing(
				MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_PRICING.VALID_PAYLOAD_INPUT()
			)
		).resolves.toEqual(
			MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_PRICING.VALID_RETURN()
		)
	})
	test('It should get an exception when receive an http response with status code different then 200', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(CONSTANT.HUB_VENDAS_CARBON_SERVICES_PRICING_API) !==
				-1
			) {
				responseError.response = {
					status: 500,
					data: {
						message: 'Testing expected error',
					},
				}
			} else {
				responseError.response = {
					status: 404,
					data: {},
				}
			}

			throw responseError
		})

		await expect(async () => {
			await api.hubVendasCarbon.prestacaoServico.pricing.postPricing(
				MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_PRICING.VALID_PAYLOAD_INPUT()
			)
		}).rejects.toThrow(
			`Erro recebido da chamada da API PRODUTO - PRECIFICAÇÃO: código '500' dados: '{"message":"Testing expected error"}'`
		)
	})
	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(async () => {
			await api.hubVendasCarbon.prestacaoServico.pricing.postPricing(
				MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_PRICING.VALID_PAYLOAD_INPUT()
			)
		}).rejects.toThrow(
			'Erro inesperado recebido da chamada da API: Unexpected error'
		)
	})
	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		await expect(async () => {
			await api.hubVendasCarbon.prestacaoServico.pricing.postPricing(
				MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_PRICING.VALID_PAYLOAD_INPUT()
			)
		}).rejects.toThrow(
			`Erro inesperado recebido da chamada da API: Erro inesperado recebido da chamada da API Pricing lambda: null`
		)
	})
	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		await expect(async () => {
			await api.hubVendasCarbon.prestacaoServico.pricing.postPricing(
				MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_PRICING.VALID_PAYLOAD_INPUT()
			)
		}).rejects.toThrow(
			`Erro inesperado recebido da chamada da API: Erro inesperado recebido da chamada da API Pricing lambda: {\"unexpectedKey\":\"unexpected value\"}`
		)
	})
	test('It should get an exception when the API does not give a response', async () => {
		axios.mockImplementationOnce(async () => {
			const requestError = new Error('Request made but no response received')
			requestError.request = {}
			throw requestError
		})

		await expect(async () => {
			await api.hubVendasCarbon.prestacaoServico.pricing.postPricing(
				MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_PRICING.VALID_PAYLOAD_INPUT()
			)
		}).rejects.toThrow('API não respondeu à chamada')
	})
})
