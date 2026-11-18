const api = require('../../../../../../../src/api')
const CONSTANT = require('../../../../../../../src/property')
const MOCKS = require('../../../../../../mocks/index.mock')
const axios = require('axios')

jest.mock('axios')

beforeEach(function () {
	axios.mockImplementation(async (params) => {
		if (
			params.url.search(
				CONSTANT.PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH
			) !== -1
		) {
			return MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_AXIOS_SUCCESS_RESPONSE_DATA()
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

describe('Given a postAntifraud call', () => {
	test('It should return expected value and do not get an exception', async () => {
		await expect(
			api.portais.msUsuarios.users.activation.simple.postAntifraud(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CPFCNPJ_INPUT(),
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CORPORATEHEADERVALUE_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).resolves.toEqual(
			MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_RETURN()
		)
	})
	test('It should get an exception when receive an http response with status code different then 200', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH
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
			api.portais.msUsuarios.users.activation.simple.postAntifraud(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CPFCNPJ_INPUT(),
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CORPORATEHEADERVALUE_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow(
			`API error: code '500' data: '{"message":"Testing expected error"}`
		)
	})
	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(
			api.portais.msUsuarios.users.activation.simple.postAntifraud(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CPFCNPJ_INPUT(),
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CORPORATEHEADERVALUE_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow('API unexpected error: Unexpected error')
	})
	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		await expect(
			api.portais.msUsuarios.users.activation.simple.postAntifraud(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CPFCNPJ_INPUT(),
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CORPORATEHEADERVALUE_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		await expect(
			api.portais.msUsuarios.users.activation.simple.postAntifraud(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CPFCNPJ_INPUT(),
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CORPORATEHEADERVALUE_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when API did not give response', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH
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
			api.portais.msUsuarios.users.activation.simple.postAntifraud(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CPFCNPJ_INPUT(),
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CORPORATEHEADERVALUE_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow('API did not give response')
	})
	test('It should get an exception when receive an http response with status code 400 caused by lexisnexis validation', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH
				) !== -1
			) {
				responseError.response = {
					status: 400,
					data: [
						{
							field: '99988',
							message: 'Operação rejeitada pela Lexisnexis',
							data: {
								requestId: 'fbda7998-1177-4ff6-a0ef-f9352c2ef60a',
								validation: 'reject',
							},
						},
					],
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
			api.portais.msUsuarios.users.activation.simple.postAntifraud(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CPFCNPJ_INPUT(),
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CORPORATEHEADERVALUE_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow(
			`API error: code '400' data: '{"requestId":"fbda7998-1177-4ff6-a0ef-f9352c2ef60a","validation":"reject"}`
		)
	})
	test('It should get an exception when receive an http response with status code 400 caused by inexistence of CPF', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH
				) !== -1
			) {
				responseError.response = {
					status: 400,
					data: [
						{
							field: '12004',
							message: 'Poxa! Não conseguimos localizar. Digite novamente.',
						},
					],
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
			api.portais.msUsuarios.users.activation.simple.postAntifraud(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CPFCNPJ_INPUT(),
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_CORPORATEHEADERVALUE_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow(
			`API error: code '400' data: '{"field":"12004","message":"Poxa! Não conseguimos localizar. Digite novamente."}'`
		)
	})
})
