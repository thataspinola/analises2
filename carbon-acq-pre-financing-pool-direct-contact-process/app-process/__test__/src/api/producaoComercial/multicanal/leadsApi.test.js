const api = require('../../../../../src/api')
const CONSTANT = require('../../../../../src/property')
const MOCKS = require('../../../../mocks/index.mock')
const axios = require('axios')
const errors = require('../../../../../src/error')
const factory = require('../../../../../src/factory')

jest.mock('axios')
jest.mock('../../../../../src/factory/api/httpsAgentFactory.js')

beforeEach(function () {
	axios.mockImplementation(async (params) => {
		if (
			params.url.search(
				CONSTANT.PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_XML_API_PATH
			) !== -1
		) {
			return {
				status: 200,
				data: MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_WITH_WHATSAPP_CHANNEL_SUCCESS_RESPONSE_DATA(),
			}
		}
		const responseError = new Error()
		responseError.response = {
			status: 404,
			data: {},
		}

		throw responseError
	})

	factory.api.httpsAgent.createHttpsAgent.mockImplementation(() => MOCKS.FACTORY_API_HTTPS_AGENT.CERTIFICATE())
})

afterEach(function () {
	jest.clearAllMocks()
})

describe('Given a postSemSeguro call', () => {
	test('It should return expected value and do not get an exception', (done) => {
		expect(async () => {
			const postSemSeguroReturn =
				await api.producaoComercial.multicanal.leads.postSemSeguro(
					MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_VALID_PAYLOAD_WITH_WHATSAPP_CHANNEL(),
					MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
				)
			try {
				expect(postSemSeguroReturn).toEqual(
					MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_VALID_RETURN_WITH_WHATSAPP_CHANNEL()
				)
				done()
			} catch (testError) {
				done(testError)
			}
		}).not.toThrow()
	})
	test('It should get an exception when receive an http response with status code different then 200', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_XML_API_PATH
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

		await expect(async () => {
			await api.producaoComercial.multicanal.leads.postSemSeguro(
				MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_VALID_PAYLOAD_WITH_WHATSAPP_CHANNEL(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		}).rejects.toThrow(
			'API error: code \'500\' data: \'{"message":"Testing expected error"}'
		)
	})
	test('It should get a blockListError exception when receive an http response with status description', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_XML_API_PATH
				) !== -1
			) {
				responseError.response = {
					status: 200,
					data: {
						sistema: { descricao: 'Blocklist - Rejeitado por políticas do programa. '}
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
			await api.producaoComercial.multicanal.leads.postSemSeguro(
				MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_VALID_PAYLOAD_WITH_WHATSAPP_CHANNEL(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		}).rejects.toThrow(errors.BlockListError)
	})
	test('It should get a duplicatedLeadError exception when receive an http response with status code 209', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()
			if (
				params.url.search(
					CONSTANT.PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_XML_API_PATH
				) !== -1
			) {
				responseError.response = {
					status: 209,
					data: {
						sistema: { descricao: 'Testing' },
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
			await api.producaoComercial.multicanal.leads.postSemSeguro(
				MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_VALID_PAYLOAD_WITH_WHATSAPP_CHANNEL(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		}).rejects.toThrow(errors.DuplicatedLeadError)
	})
	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(async () => {
			await api.producaoComercial.multicanal.leads.postSemSeguro(
				MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_VALID_PAYLOAD_WITH_WHATSAPP_CHANNEL(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		}).rejects.toThrow('API unexpected error: Unexpected error')
	})
	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		await expect(async () => {
			await api.producaoComercial.multicanal.leads.postSemSeguro(
				MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_VALID_PAYLOAD_WITH_WHATSAPP_CHANNEL(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		}).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		await expect(async () => {
			await api.producaoComercial.multicanal.leads.postSemSeguro(
				MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_VALID_PAYLOAD_WITH_WHATSAPP_CHANNEL(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		}).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should throw an Error with descricao when API response success is false', async () => {
		const mockResponse = {
			data: {
				sistema: {
					success: false,
					status: 400,
					descricao: 'Invalid data provided',
					stackTrace: 'Error stack trace',
				},
			},
		}
		axios.mockResolvedValueOnce(mockResponse)

		await expect(async () => {
			await api.producaoComercial.multicanal.leads.postSemSeguro(
				MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_VALID_PAYLOAD_WITH_WHATSAPP_CHANNEL(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		}).rejects.toThrow('API unexpected error: Empty or invalid response')
	})

	test('It should throw an Error with API error descricao when error response has sistema descricao', async () => {
		const responseError = new Error()
		responseError.response = {
			status: 400,
			data: {
				sistema: {
					descricao: 'API unexpected error: Empty or invalid response',
				},
			},
		}
		axios.mockRejectedValueOnce(responseError)

		await expect(async () => {
			await api.producaoComercial.multicanal.leads.postSemSeguro(
				MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_VALID_PAYLOAD_WITH_WHATSAPP_CHANNEL(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		}).rejects.toThrow(
			"API error: code '400' description: 'API unexpected error: Empty or invalid response'"
		)
	})

	test('It should throw an Error when API did not give response', async () => {
		const responseError = new Error()
		responseError.request = {}
		axios.mockRejectedValueOnce(responseError)

		await expect(async () => {
			await api.producaoComercial.multicanal.leads.postSemSeguro(
				MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_VALID_PAYLOAD_WITH_WHATSAPP_CHANNEL(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		}).rejects.toThrow('API did not give response')
	})
	test('It should throw an Error when API response success is false', async () => {
		const mockResponse = {
			data: {
				sistema: {
					successo: false,
					status: 400,
					descricao: 'Invalid data provided',
					stackTrace: 'Error stack trace',
				},
				lead: {},
			},
		}
		axios.mockResolvedValueOnce(mockResponse)
	
		await expect(async () => {
			await api.producaoComercial.multicanal.leads.postSemSeguro(
				MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_VALID_PAYLOAD_WITH_WHATSAPP_CHANNEL(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		}).rejects.toThrow('Invalid data provided')
	})
})

//TODO: Cobrir com testes unitários os caminhos não felizes
