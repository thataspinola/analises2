const api = require('../../../src/api')
const CONSTANT = require('../../../src/property')
const MOCKS = require('../../mocks/index.mock')
const axios = require('axios')

jest.mock('axios')

beforeEach(function () {
	axios.mockImplementation(async (params) => {
		if (params.url.search(CONSTANT.BCP_API_PATH) !== -1) {
			return MOCKS.API_BCP_GETDADOSPESSOA_AXIOS_SUCCESS_RESPONSE_DATA()
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

describe('Given a getDadosPessoa call', () => {
	test('It should return expected value and do not get an exception', async () => {
		await expect(
			api.bcp.getDadosPessoa(
				MOCKS.API_BCP_GETDADOSPESSOA_VALID_CPF_INPUT(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
		).resolves.toEqual(MOCKS.API_BCP_GETDADOSPESSOA_VALID_RETURN())
	})
	test('It should get an exception when receive an http response with status code different then 200', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (params.url.search(CONSTANT.BCP_API_PATH) !== -1) {
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
			api.bcp.getDadosPessoa(
				MOCKS.API_BCP_GETDADOSPESSOA_VALID_CPF_INPUT(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
		).rejects.toThrow(
			`API error: code '500' data: '{"message":"Testing expected error"}`
		)
	})
	test(`It should return null when receive an http response with status code 404 and 'Nenhum dado de pessoa encontrado' data`, async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (params.url.search(CONSTANT.BCP_API_PATH) !== -1) {
				responseError.response = {
					status: 404,
					data: 'Nenhum dado de pessoa encontrado',
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
			api.bcp.getDadosPessoa(
				MOCKS.API_BCP_GETDADOSPESSOA_VALID_CPF_INPUT(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
		).resolves.toBeNull()
	})
	test('It should get an exception when API did not give response', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (params.url.search(CONSTANT.BCP_API_PATH) !== -1) {
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
			api.bcp.getDadosPessoa(
				MOCKS.API_BCP_GETDADOSPESSOA_VALID_CPF_INPUT(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
		).rejects.toThrow('API did not give response')
	})
	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(
			api.bcp.getDadosPessoa(
				MOCKS.API_BCP_GETDADOSPESSOA_VALID_CPF_INPUT(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
		).rejects.toThrow('API unexpected error: Unexpected error')
	})
	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		await expect(
			api.bcp.getDadosPessoa(
				MOCKS.API_BCP_GETDADOSPESSOA_VALID_CPF_INPUT(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		await expect(
			api.bcp.getDadosPessoa(
				MOCKS.API_BCP_GETDADOSPESSOA_VALID_CPF_INPUT(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
})
//TODO: Cobrir com testes unitários os caminhos não felizes
