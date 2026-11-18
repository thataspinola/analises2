const MOCKS = require('../../mocks/index.mock')
const CONSTANTS = require('../../../src/property')
const axios = require('axios')

const api = require('../../../src/api')

jest.mock('axios')
jest.mock('../../../src/service')
jest.mock('pino', () => {
	const info = jest.fn()
	const error = jest.fn()
	const warn = jest.fn()
	const debug = jest.fn()
	const silent = jest.fn() // 'silent' log level is also a method in newer versions
	const child = jest.fn(() => ({ info, error, warn, debug, silent, child })) // child returns a logger instance

	return () => ({
		info,
		error,
		warn,
		debug,
		silent,
		child,
	})
})

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeEach(() => {
	axios.mockImplementation(async (params) => {
		if (params.url.search(CONSTANTS.V1_UPDATE_LEAD_ENDPOINT) !== -1) {
			return MOCKS.API_UPDATELEAD.PUT_API_UPDATE_LEAD_SUCCESS_RETURN()
		}
		const responseError = new Error()
		responseError.response = {
			status: 404,
			data: {},
		}

		throw responseError
	})
})

describe('Test suite for the updateLeadApi.js', () => {
	describe('When success', () => {
		test('It should return success when call api', async () => {
			await expect(
				api.updateLeadApi.put(
					MOCKS.API_UPDATELEAD.API_UPDATE_LEAD_VALID_PAYLOAD()
				)
			).resolves.toEqual(
				MOCKS.API_UPDATELEAD.PUT_API_UPDATE_LEAD_SUCCESS_RETURN().data
			)
		})
	})

	describe('When fails', () => {
		test('It should get an exception when receive an http response with status code different then 200', async () => {
			axios.mockImplementationOnce(async (params) => {
				const responseError = new Error()
				responseError.response = {
					status: 500,
					data: { message: 'Testing expected error' },
				}
				throw responseError
			})

			await expect(
				api.updateLeadApi.put(
					MOCKS.API_UPDATELEAD.API_UPDATE_LEAD_VALID_PAYLOAD()
				)
			).rejects.toThrow(
				'API error: code \'500\' data: \'{"message":"Testing expected error"}'
			)
		})

		test('It should return error 404', async () => {
			axios.mockImplementation(async (params) => {
				const responseError = new Error()
				responseError.response = {
					status: 404,
					data: {},
				}

				throw responseError
			})
			await expect(
				api.updateLeadApi.put(
					MOCKS.API_UPDATELEAD.API_UPDATE_LEAD_VALID_PAYLOAD()
				)
			).rejects.toThrow("API error: code '404' data: '{}'")
		})

		test('It should get an exception when get error from api with not response', async () => {
			axios.mockImplementation(async (params) => {
				const responseError = new Error()
				responseError.request = params

				throw responseError
			})
			await await expect(
				api.updateLeadApi.put(
					MOCKS.API_UPDATELEAD.API_UPDATE_LEAD_VALID_PAYLOAD()
				)
			).rejects.toThrow('API did not give response')
		})

		test('It should get an exception when receive an unexpected error', async () => {
			axios.mockRejectedValueOnce(new Error('Unexpected error'))

			await await expect(
				api.updateLeadApi.put(
					MOCKS.API_UPDATELEAD.API_UPDATE_LEAD_VALID_PAYLOAD()
				)
			).rejects.toThrow('API unexpected error: Unexpected error')
		})

		test('It should return an error when the API responds with an empty value.', async () => {
			const errorMessage =
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'

			axios.mockImplementationOnce(async (params) => {
				if (
					params.url.search(CONSTANTS.V1_UPDATE_LEAD_ENDPOINT) !== -1
				) {
					return MOCKS.API_UPDATELEAD.PUT_API_UPDATE_LEAD_EMPTY_RETURN()
				}
			})

			await expect(
				api.updateLeadApi.put(MOCKS.API_UPDATELEAD.API_UPDATE_LEAD_VALID_PAYLOAD())
			).rejects.toThrow(`API unexpected error: ${errorMessage}`)
		})
	})
})
