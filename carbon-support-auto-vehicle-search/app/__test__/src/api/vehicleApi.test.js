const { EXTERNAL_API_ERROR_DEFAULT_MESSAGE } = require('../../../src/property')
const { vehicleApi } = require('../../../src/api/')
const {
	VEHICLE_API_SUCCESS_RESPONSE_PER_DESCRIPTION_AND_YEAR_MODEL,
	VEHICLE_API_SUCCESS_RESPONSE_PER_PLATE,
	VEHICLE_API_ERROR_400_RESPONSE,
	VEHICLE_API_ERROR_500_RESPONSE,
	VALID_INPUT_DATA,
} = require('../../mocks/index.mock')
const axios = require('axios')

jest.mock('../../../config/logger')
jest.mock('axios')

beforeEach(() => {})

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de vehicleApi.js', () => {
	describe('getDataPerPlate', () => {
		it('Deve retornar a resposta no formato recebido ao chamar a Api de Veículos do Auto', async () => {
			axios.mockResolvedValueOnce({
				data: VEHICLE_API_SUCCESS_RESPONSE_PER_PLATE,
			})

			const response = await vehicleApi.getDataPerPlate(
				VALID_INPUT_DATA.queryStringParameters.plate
			)

			expect(response).toEqual(VEHICLE_API_SUCCESS_RESPONSE_PER_PLATE)
		})

		it('Deve retornar uma exceção do tipo ExternalApiError quando ao chamar a API de Veículos do Auto retornar um erro 4XX', async () => {
			const notFoundError = new Error('Not Found')
			notFoundError.response = {
				status: 404,
				data: VEHICLE_API_ERROR_400_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw notFoundError
			})

			try {
				await vehicleApi.getDataPerPlate(
					VALID_INPUT_DATA.queryStringParameters.plate
				)
			} catch (error) {
				expect(error instanceof ExternalApiError).toBeTruthy()
				expect(error.code).toBe(notFoundError.response.status)
				expect(error.message).toBe(notFoundError.response.data)
			}
		})

		it('Deve retornar uma exceção do tipo ExternalApiError quando ao chamar a API de Veículos do Auto retornar um erro 5XX com mensagem', async () => {
			const serverError = new Error('Not Found')
			serverError.response = {
				status: 500,
				data: VEHICLE_API_ERROR_500_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw serverError
			})

			try {
				await vehicleApi.getDataPerPlate(
					VALID_INPUT_DATA.queryStringParameters.plate
				)
			} catch (error) {
				expect(error instanceof ExternalApiError).toBeTruthy()
				expect(error.code).toBe(500)
				expect(error.message).toBe(serverError.response.data)
			}
		})

		it('Deve retornar uma exceção do tipo ExternalApiError com uma mensagem padrão quando ao chamar a API de Veículos do Auto retornar um erro genérico', async () => {
			axios.mockImplementationOnce(() => {
				throw new Error()
			})

			try {
				await vehicleApi.getDataPerPlate(
					VALID_INPUT_DATA.queryStringParameters.plate
				)
			} catch (error) {
				expect(error instanceof ExternalApiError).toBeTruthy()
				expect(error.code).toBe(500)
				expect(error.message).toBe(EXTERNAL_API_ERROR_DEFAULT_MESSAGE)
			}
		})

		it('Deve logar um erro quando ao chamar a API de Veículos do Auto retornar um erro', async () => {
			const spyLogger = jest.spyOn(global.logger, 'error')

			axios.mockImplementationOnce(() => {
				throw new Error()
			})

			await expect(
				vehicleApi.getDataPerPlate(VALID_INPUT_DATA.queryStringParameters.plate)
			).rejects.toThrow()

			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})
	})

	describe('getDataPerDescriptionAndYearModel', () => {
		it('Deve retornar a resposta no formato recebido dao chamar a Api de Veículos do Auto', async () => {
			axios.mockResolvedValueOnce({
				data: VEHICLE_API_SUCCESS_RESPONSE_PER_DESCRIPTION_AND_YEAR_MODEL,
			})

			const response = await vehicleApi.getDataPerDescriptionAndYearModel(
				VALID_INPUT_DATA.queryStringParameters.description,
				VALID_INPUT_DATA.queryStringParameters.yearModel
			)

			expect(response).toEqual(
				VEHICLE_API_SUCCESS_RESPONSE_PER_DESCRIPTION_AND_YEAR_MODEL
			)
		})

		it('Deve retornar uma exceção do tipo ExternalApiError quando ao chamar a API de Veículos do Auto retornar um erro 4XX', async () => {
			const notFoundError = new Error('Not Found')
			notFoundError.response = {
				status: 404,
				data: VEHICLE_API_ERROR_400_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw notFoundError
			})

			try {
				await vehicleApi.getDataPerDescriptionAndYearModel(
					VALID_INPUT_DATA.queryStringParameters.description,
					VALID_INPUT_DATA.queryStringParameters.yearModel
				)
			} catch (error) {
				expect(error instanceof ExternalApiError).toBeTruthy()
				expect(error.code).toBe(notFoundError.response.status)
				expect(error.message).toBe(notFoundError.response.data)
			}
		})

		it('Deve retornar uma exceção do tipo ExternalApiError quando ao chamar a API de Veículos do Auto retornar um erro 5XX com mensagem', async () => {
			const serverError = new Error('Not Found')
			serverError.response = {
				status: 500,
				data: VEHICLE_API_ERROR_500_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw serverError
			})

			try {
				await vehicleApi.getDataPerDescriptionAndYearModel(
					VALID_INPUT_DATA.queryStringParameters.description,
					VALID_INPUT_DATA.queryStringParameters.yearModel
				)
			} catch (error) {
				expect(error instanceof ExternalApiError).toBeTruthy()
				expect(error.code).toBe(500)
				expect(error.message).toBe(serverError.response.data)
			}
		})

		it('Deve retornar uma exceção do tipo ExternalApiError com uma mensagem padrão quando ao chamar a API de Veículos do Auto retornar um erro genérico', async () => {
			axios.mockImplementationOnce(() => {
				throw new Error()
			})

			try {
				await vehicleApi.getDataPerDescriptionAndYearModel(
					VALID_INPUT_DATA.queryStringParameters.description,
					VALID_INPUT_DATA.queryStringParameters.yearModel
				)
			} catch (error) {
				expect(error instanceof ExternalApiError).toBeTruthy()
				expect(error.code).toBe(500)
				expect(error.message).toBe(EXTERNAL_API_ERROR_DEFAULT_MESSAGE)
			}
		})

		it('Deve logar um erro quando ao chamar a API de Veículos do Auto retornar um erro', async () => {
			const spyLogger = jest.spyOn(global.logger, 'error')

			axios.mockImplementationOnce(() => {
				throw new Error()
			})

			await expect(
				vehicleApi.getDataPerDescriptionAndYearModel(
					VALID_INPUT_DATA.queryStringParameters.description,
					VALID_INPUT_DATA.queryStringParameters.yearModel
				)
			).rejects.toThrow()

			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})
	})
})
