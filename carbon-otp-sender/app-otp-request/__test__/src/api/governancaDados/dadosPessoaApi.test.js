const api = require('../../../../src/api')
const CONSTANT = require('../../../../src/property')
const MOCKS = require('../../../mocks/index.mock')
const axios = require('axios')

jest.mock('axios')

beforeEach(function () {
	axios.mockImplementation(async (params) => {
		if (params.url.search(CONSTANT.GOVERNANCA_DADOS_PESSOA_API_PATH) !== -1) {
			if (params.method === 'GET') {
				return {
					status: 200,
					data: MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_SUCCESS_RESPONSE_DATA(),
				}
			}
			if (params.method === 'POST') {
				return {
					status: 200,
					data: MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_POSTPESSOA_SUCCESS_RESPONSE_DATA(),
				}
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

afterEach(function () {
	jest.clearAllMocks()
})

describe('Given a getPessoa call', () => {
	test('It should return expected value and do not get an exception', (done) => {
		expect(async () => {
			const getPessoaReturn = await api.governancaDados.dadosPessoa.getPessoa(
				MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_EXISTENT_CPF(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
			try {
				expect(getPessoaReturn).toEqual(
					MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_EXISTS_RETURN()
				)
				done()
			} catch (testError) {
				done(testError)
			}
		}).not.toThrow()
	})
	test('It should return null and do not get an exception', (done) => {
		expect(async () => {
			axios.mockImplementationOnce(async (params) => {
				if (
					params.url.search(CONSTANT.GOVERNANCA_DADOS_PESSOA_API_PATH) !== -1
				) {
					if (params.method === 'GET') {
						return {
							status: 200,
							data: MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_NOT_EXISTS_RESPONSE_DATA(),
						}
					}
				}
				const responseError = new Error()
				responseError.response = {
					status: 404,
					data: {},
				}

				throw responseError
			})

			const getPessoaReturn = await api.governancaDados.dadosPessoa.getPessoa(
				MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_NOT_EXISTS_CPF(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
			try {
				expect(getPessoaReturn).toEqual(
					MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_NOT_EXISTS_RETURN()
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

			if (params.url.search(CONSTANT.GOVERNANCA_DADOS_PESSOA_API_PATH) !== -1) {
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
			api.governancaDados.dadosPessoa.getPessoa(
				MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_EXISTENT_CPF(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
		).rejects.toThrow(
			'API error: code \'500\' data: \'{"message":"Testing expected error"}'
		)
	})
	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(
			api.governancaDados.dadosPessoa.getPessoa(
				MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_EXISTENT_CPF(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
		).rejects.toThrow('API unexpected error: Unexpected error')
	})
	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		await expect(
			api.governancaDados.dadosPessoa.getPessoa(
				MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_EXISTENT_CPF(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		await expect(
			api.governancaDados.dadosPessoa.getPessoa(
				MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_EXISTENT_CPF(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when API did not give response', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (params.url.search(CONSTANT.GOVERNANCA_DADOS_PESSOA_API_PATH) !== -1) {
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
			api.governancaDados.dadosPessoa.getPessoa(
				MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_EXISTENT_CPF(),
				MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
			)
		).rejects.toThrow('API did not give response')
	})
})
