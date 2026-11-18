const api = require('../../../../../../src/api')
const CONSTANT = require('../../../../../../src/property')
const MOCKS = require('../../../../../mocks/index.mock')
const axios = require('axios')

jest.mock('axios')

beforeEach(function () {
	axios.mockImplementation(async (params) => {
		if (
			params.url.search(CONSTANT.PORTAIS_MSUSUARIOS_USERS_STATUS_API_PATH) !==
			-1
		) {
			return MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_AXIOS_SUCCESS_RESPONSE()
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

describe('Given a postStatus call', () => {
	test('It should return expected value and do not get an exception', async () => {
		await expect(
			api.portais.msUsuarios.users.postStatus(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_VALID_CPFCNPJ_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).resolves.toEqual(
			MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_VALID_RETURN()
		)
	})
	test('It should return not throw exception when receive an http response with status code 404', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(CONSTANT.PORTAIS_MSUSUARIOS_USERS_STATUS_API_PATH) !==
				-1
			) {
				responseError.response =
					MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_AXIOS_NOTFOUND_RESPONSE()
			}

			throw responseError
		})
		await expect(
			api.portais.msUsuarios.users.postStatus(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_VALID_CPFCNPJ_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).resolves.toEqual(
			MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_NOTFOUND_RETURN()
		)
	})
	test('It should get an exception when receive an http response with status code 400 when CPF is invalid', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(CONSTANT.PORTAIS_MSUSUARIOS_USERS_STATUS_API_PATH) !==
				-1
			) {
				responseError.response =
					MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_AXIOS_BADREQUEST_INVALIDCPF_RESPONSE()
			} else {
				responseError.response = {
					status: 404,
					data: {},
				}
			}

			throw responseError
		})

		await expect(
			api.portais.msUsuarios.users.postStatus(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_INVALID_CPFCNPJ_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow(
			`API error: code '400' data: '"Revise os números digitados do CPF/CNPJ e tente de novo."'`
		)
	})
	test('It should get an exception when receive an http response with status code 400 when payload is invalid (just if MS-USUARIOS API changes and this code was not updated)', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(CONSTANT.PORTAIS_MSUSUARIOS_USERS_STATUS_API_PATH) !==
				-1
			) {
				responseError.response =
					MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_AXIOS_BADREQUEST_INVALIDPAYLOAD_RESPONSE()
			} else {
				responseError.response = {
					status: 404,
					data: {},
				}
			}

			throw responseError
		})

		await expect(
			api.portais.msUsuarios.users.postStatus(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_VALID_CPFCNPJ_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow(`API error: code '400' data: '"cpfcnpj not found!"'`)
	})
	test('It should get an exception when receive an http response with status code different then 200 or 404', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(CONSTANT.PORTAIS_MSUSUARIOS_USERS_STATUS_API_PATH) !==
				-1
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
			api.portais.msUsuarios.users.postStatus(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_VALID_CPFCNPJ_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow(
			`API error: code '500' data: '{"message":"Testing expected error"}`
		)
	})
	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(
			api.portais.msUsuarios.users.postStatus(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_VALID_CPFCNPJ_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow('API unexpected error: Unexpected error')
	})
	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		await expect(
			api.portais.msUsuarios.users.postStatus(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_VALID_CPFCNPJ_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		await expect(
			api.portais.msUsuarios.users.postStatus(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_VALID_CPFCNPJ_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when API did not give response', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(CONSTANT.PORTAIS_MSUSUARIOS_USERS_STATUS_API_PATH) !==
				-1
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
			api.portais.msUsuarios.users.postStatus(
				MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_VALID_CPFCNPJ_INPUT(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow('API did not give response')
	})
})
