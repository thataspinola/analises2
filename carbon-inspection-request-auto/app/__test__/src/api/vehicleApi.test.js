const MOCKS = require('../../mocks/index.mock')
const CONSTANTS = require('../../../src/property')
const api = require('../../../src/api')
const factory = require('../../../src/factory')
const errors = require('../../../src/error')
const axios = require('axios')

jest.mock('axios')
jest.mock('../../../src/service')
jest.mock('../../../src/factory')
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
		if (params.url.search(CONSTANTS.V1_AUTO_VEHICLE_SEARCH_ENDPOINT) !== -1) {
			return MOCKS.API_VEHICLE.AXIOS_GET_API_VEHICLE_SEARCH_SUCCESS_RESPONSE()
		}
		const responseError = new Error()
		responseError.response = {
			status: 404,
			data: {},
		}

		throw responseError
	})

	factory.axiosHandlerError.mockImplementation((error) => {
		return MOCKS.FACTORY_AXIOSHANDLERERROR.UNEXPECTEDERROR_VALID_RETURN()
	})
})

describe('Test suite for the vehicleApi.js', () => {
	describe('When success', () => {
		test('It should return the response in the format received when calling the Auto Vehicles API.', async () => {
			await expect(
				api.vehicleApi.get(MOCKS.API_VEHICLE.API_VEHICLE_SEARCH_VALID_INPUT())
			).resolves.toEqual(
				MOCKS.API_VEHICLE.GET_API_VEHICLE_SEARCH_SUCCESS_RESPONSE()
			)
		})
	})

	describe('When fails', () => {
		test('It should return an ExternalApiError exception when calling the Auto Vehicles API and returning a 4XX error.', async () => {
			const throwError = new errors.ExternalApiError(
				MOCKS.FACTORY_AXIOSHANDLERERROR.NOTFOUNDERROR_VALID_RETURN().message,
				MOCKS.FACTORY_AXIOSHANDLERERROR.NOTFOUNDERROR_VALID_RETURN().status
			)
			axios.mockImplementationOnce(async (params) => {
				const responseError = new Error()

				if (
					params.url.search(CONSTANTS.V1_AUTO_VEHICLE_SEARCH_ENDPOINT) !== -1
				) {
					responseError.response = {
						status: 404,
						data: {},
					}
				}

				throw responseError
			})

			factory.axiosHandlerError.mockImplementation((error) => {
				return MOCKS.FACTORY_AXIOSHANDLERERROR.NOTFOUNDERROR_VALID_RETURN()
			})

			await expect(
				api.vehicleApi.get(MOCKS.API_VEHICLE.API_VEHICLE_SEARCH_VALID_INPUT())
			).rejects.toThrow(throwError)
		})

		test('It should return an ExternalApiError exception when calling the Auto Vehicles API and returning a 5XX error with the message.', async () => {
			const throwError = new errors.ExternalApiError(
				MOCKS.FACTORY_AXIOSHANDLERERROR.UNEXPECTEDERROR_VALID_RETURN().message,
				MOCKS.FACTORY_AXIOSHANDLERERROR.UNEXPECTEDERROR_VALID_RETURN().status
			)
			axios.mockImplementationOnce(async (params) => {
				const responseError = new Error()

				if (
					params.url.search(CONSTANTS.V1_AUTO_VEHICLE_SEARCH_ENDPOINT) !== -1
				) {
					responseError.response = {
						status: 500,
						data: {},
					}
				}

				throw responseError
			})

			await expect(
				api.vehicleApi.get(MOCKS.API_VEHICLE.API_VEHICLE_SEARCH_VALID_INPUT())
			).rejects.toThrow(throwError)
		})

		test('It should return an ExternalApiError exception when the API responds with an empty value.', async () => {
			const errorMessage =
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'

			factory.axiosHandlerError.mockImplementationOnce((error) => {
				return {
					status: 500,
					message: errorMessage,
				}
			})
			const throwError = new errors.ExternalApiError(
				errorMessage,
				MOCKS.FACTORY_AXIOSHANDLERERROR.UNEXPECTEDERROR_VALID_RETURN().status
			)
			axios.mockImplementationOnce(async (params) => {
				if (
					params.url.search(CONSTANTS.V1_AUTO_VEHICLE_SEARCH_ENDPOINT) !== -1
				) {
					return MOCKS.API_VEHICLE.AXIOS_GET_API_VEHICLE_SEARCH_EMPTY_RESPONSE()
				}
			})

			await expect(
				api.vehicleApi.get(MOCKS.API_VEHICLE.API_VEHICLE_SEARCH_VALID_INPUT())
			).rejects.toThrow(throwError)
		})
	})
})
