const api = require('../../../../../src/api')
const CONSTANT = require('../../../../../src/property')
const MOCKS = require('../../../../mocks/index.mock')
const axios = require('axios')

jest.mock('axios')

beforeEach(function () {
	axios.mockImplementation(async (params) => {
		if (
			params.url.search(CONSTANT.PORTAIS_MSUSUARIOS_USUARIO_API_PATH) !== -1
		) {
			return MOCKS.API_PORTAIS_MSUSUARIOS_USUARIO_GETCONTATOS_AXIOS_SUCCESS_RESPONSE_DATA()
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

describe('Given a getContatos call', () => {
	test('It should return expected value and do not get an exception', async () => {
		await expect(
			api.portais.msUsuarios.usuario.getContatos(
				MOCKS.API_PORTAIS_MSUSUARIOS_USUARIO_GETCONTATOS_VALID_CPF_INPUT(),
				MOCKS.SENSEDIA_HUB_TOKEN()
			)
		).resolves.toEqual(
			MOCKS.API_PORTAIS_MSUSUARIOS_USUARIO_GETCONTATOS_VALID_RETURN()
		)
	})
	test('It should get an exception when receive an http response with status code different then 200', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(CONSTANT.PORTAIS_MSUSUARIOS_USUARIO_API_PATH) !== -1
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
			api.portais.msUsuarios.usuario.getContatos(
				MOCKS.API_PORTAIS_MSUSUARIOS_USUARIO_GETCONTATOS_VALID_CPF_INPUT(),
				MOCKS.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow(
			`API error: code '500' data: '{"message":"Testing expected error"}`
		)
	})
	test('It should get an exception when receive an http response with status code 200 but with data.status different then 200 or 404', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(CONSTANT.PORTAIS_MSUSUARIOS_USUARIO_API_PATH) !== -1
			) {
				return {
					status: 200,
					data: {
						status: 400,
						data: [],
						errors: ['Parâmetros inválidos'],
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

		await expect(
			api.portais.msUsuarios.usuario.getContatos(
				MOCKS.API_PORTAIS_MSUSUARIOS_USUARIO_GETCONTATOS_VALID_CPF_INPUT(),
				MOCKS.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow(
			`API error: code '400' data: '[]' errors: '["Parâmetros inválidos"]'`
		)
	})
	test('It should return null when receive an http response with status code 200 and with data.status = 404', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(CONSTANT.PORTAIS_MSUSUARIOS_USUARIO_API_PATH) !== -1
			) {
				return {
					status: 200,
					data: {
						status: 404,
						data: [],
						errors: ['Nenhum dado encontrado'],
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

		await expect(
			api.portais.msUsuarios.usuario.getContatos(
				MOCKS.API_PORTAIS_MSUSUARIOS_USUARIO_GETCONTATOS_VALID_CPF_INPUT(),
				MOCKS.SENSEDIA_HUB_TOKEN()
			)
		).resolves.toBeNull()
	})
	test('It should return null when receive an http response with status code 200 and with data.data = []', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(CONSTANT.PORTAIS_MSUSUARIOS_USUARIO_API_PATH) !== -1
			) {
				return {
					status: 200,
					data: {
						status: 200,
						data: [],
						errors: [],
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

		await expect(
			api.portais.msUsuarios.usuario.getContatos(
				MOCKS.API_PORTAIS_MSUSUARIOS_USUARIO_GETCONTATOS_VALID_CPF_INPUT(),
				MOCKS.SENSEDIA_HUB_TOKEN()
			)
		).resolves.toBeNull()
	})
	test('It should get an exception when API did not give response', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(CONSTANT.PORTAIS_MSUSUARIOS_USUARIO_API_PATH) !== -1
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
			api.portais.msUsuarios.usuario.getContatos(
				MOCKS.API_PORTAIS_MSUSUARIOS_USUARIO_GETCONTATOS_VALID_CPF_INPUT(),
				MOCKS.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow('API did not give response')
	})
	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(
			api.portais.msUsuarios.usuario.getContatos(
				MOCKS.API_PORTAIS_MSUSUARIOS_USUARIO_GETCONTATOS_VALID_CPF_INPUT(),
				MOCKS.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow('API unexpected error: Unexpected error')
	})
	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		await expect(
			api.portais.msUsuarios.usuario.getContatos(
				MOCKS.API_PORTAIS_MSUSUARIOS_USUARIO_GETCONTATOS_VALID_CPF_INPUT(),
				MOCKS.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		await expect(
			api.portais.msUsuarios.usuario.getContatos(
				MOCKS.API_PORTAIS_MSUSUARIOS_USUARIO_GETCONTATOS_VALID_CPF_INPUT(),
				MOCKS.SENSEDIA_HUB_TOKEN()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
})
