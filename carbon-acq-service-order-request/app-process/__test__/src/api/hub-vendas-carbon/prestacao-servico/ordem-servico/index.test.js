const MOCKS = require('../../../../../mocks/index.mock')
const axios = require('axios')
const api = require('../../../../../../src/api')
const service = require('../../../../../../src/service')
const CONSTANT = require('../../../../../../src/property')

jest.mock('../../../../../../src/service')
jest.mock('axios')

beforeEach(function () {
	service.logger.info.mockImplementation((message) => {})
	service.logger.error.mockImplementation((message) => {})
	service.logger.warn.mockImplementation((message) => {})
	service.logger.debug.mockImplementation((message) => {})
	axios.mockImplementation(async (params) => {
		if (params.url.search(CONSTANT.API_PATH) !== -1) {
			return {
				status: 200,
				data: MOCKS.API_HUBVENDASCARBON_CREATE_SERVICE_ORDER.SUCCESS_RESPONSE_DATA(),
			}
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

describe('Given a postServiceProvisionPaymentCheckout call', () => {
	test('It should return expected value and do not get an exception', async () => {
		await expect(
			api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrder(
				MOCKS.API_HUBVENDASCARBON_CREATE_SERVICE_ORDER.VALID_PAYLOAD()
			)
		).resolves.toEqual(
			MOCKS.API_HUBVENDASCARBON_CREATE_SERVICE_ORDER.VALID_RETURN()
		)
	})
	test('It should return expected value and do not get an exception sending carbon-trace-id header', async () => {
		await expect(
			api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrder(
				MOCKS.API_HUBVENDASCARBON_CREATE_SERVICE_ORDER.VALID_PAYLOAD(),
				MOCKS.SENSEDIA_HUB_TOKEN(),
				MOCKS.IMPERSONAL_USER_CARBON(),
				MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.VALID_PARSEDJSONQUEUEMESSAGE_INPUT_PAYLOAD_CARBONTRACEID()
			)
		).resolves.toEqual(
			MOCKS.API_HUBVENDASCARBON_CREATE_SERVICE_ORDER.VALID_RETURN()
		)

		expect(axios).toHaveBeenCalledWith(
			expect.objectContaining({
				headers: expect.objectContaining({
					'carbon-trace-id': `${MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.VALID_PARSEDJSONQUEUEMESSAGE_INPUT_PAYLOAD_CARBONTRACEID()}`,
				}),
			})
		)
	})
	test('It should get an exception when receive an http response with status code different then 200', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (params.url.search(CONSTANT.API_PATH) !== -1) {
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
			await api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrder(
				MOCKS.API_HUBVENDASCARBON_CREATE_SERVICE_ORDER.VALID_PAYLOAD()
			)
		}).rejects.toThrow(
			`Erro recebido da chamada da API: código '500' dados: '{"message":"Testing expected error"}'`
		)
	})
	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(async () => {
			await api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrder(
				MOCKS.API_HUBVENDASCARBON_CREATE_SERVICE_ORDER.VALID_PAYLOAD()
			)
		}).rejects.toThrow(
			'Erro inesperado recebido da chamada da API: Unexpected error'
		)
	})
	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		await expect(async () => {
			await api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrder(
				MOCKS.API_HUBVENDASCARBON_CREATE_SERVICE_ORDER.VALID_PAYLOAD()
			)
		}).rejects.toThrow(
			'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
		)
	})
	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		await expect(async () => {
			await api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrder(
				MOCKS.API_HUBVENDASCARBON_CREATE_SERVICE_ORDER.VALID_PAYLOAD()
			)
		}).rejects.toThrow(
			'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
		)
	})
	test('It should get an exception when the API does not give a response', async () => {
		axios.mockImplementationOnce(async () => {
			const requestError = new Error('Request made but no response received')
			requestError.request = {}
			throw requestError
		})

		await expect(async () => {
			await api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrder(
				MOCKS.API_HUBVENDASCARBON_CREATE_SERVICE_ORDER.VALID_PAYLOAD()
			)
		}).rejects.toThrow('API não respondeu à chamada')
	})
})
