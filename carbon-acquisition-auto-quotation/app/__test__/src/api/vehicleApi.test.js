const { EXTERNAL_API_ERROR_DEFAULT_MESSAGE } = require('../../../src/property')
const { vehicleApi } = require('../../../src/api/')
const {
	VEHICLE_API_SUCCESS_RESPONSE,
	VEHICLE_API_ERROR_400_RESPONSE,
	VEHICLE_API_ERROR_500_RESPONSE,
	QUOTATION_FACTORY_PAYLOAD_RESPONSE_NEW_INSURANCE,
	VALID_INPUT_DATA,
} = require('../../mocks/index.mock')
const axios = require('axios')
const { VehicleApiError } = require('../../../src/error')
const { logger } = require('../../../config')

jest.mock('../../../config/logger', () => ({
	info: jest.fn(),
	error: jest.fn(),
	warn: jest.fn(),
	debug: jest.fn(),
}))
jest.mock('axios')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de vehicleApi.js', () => {
	describe('generateQuote', () => {
		it('Deve retornar a resposta no formato recebido ao chamar a Api de Veículos do Auto', async () => {
			axios.mockResolvedValueOnce({
				data: VEHICLE_API_SUCCESS_RESPONSE,
			})

			const response = await vehicleApi.generateQuote(
				QUOTATION_FACTORY_PAYLOAD_RESPONSE_NEW_INSURANCE
			)

			expect(response).toEqual(VEHICLE_API_SUCCESS_RESPONSE)
		})

		it('Deve retornar uma exceção do tipo VehicleApiError quando ao chamar a API de Cotação do Auto retornar um erro 4XX', async () => {
			const notFoundError = new Error('Not Found')
			notFoundError.response = {
				status: 404,
				data: VEHICLE_API_ERROR_400_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw notFoundError
			})

			await expect(
				vehicleApi.generateQuote(
					QUOTATION_FACTORY_PAYLOAD_RESPONSE_NEW_INSURANCE,
					'token',
					VALID_INPUT_DATA
				)
			).rejects.toThrow(
				new VehicleApiError(
					notFoundError.response.data,
					notFoundError.response.status
				)
			)
		})

		it('Deve retornar uma exceção do tipo VehicleApiError quando ao chamar a API de Cotação do Auto retornar um erro 5XX com mensagem', async () => {
			const serverError = new Error('Not Found')
			serverError.response = {
				status: 500,
				data: VEHICLE_API_ERROR_500_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw serverError
			})

			await expect(
				vehicleApi.generateQuote(
					QUOTATION_FACTORY_PAYLOAD_RESPONSE_NEW_INSURANCE,
					'token',
					VALID_INPUT_DATA
				)
			).rejects.toThrow(new VehicleApiError(
				serverError.response.data,
				serverError.response.status
			))
		})

		it('Deve retornar uma exceção do tipo VehicleApiError com uma mensagem padrão quando ao chamar a API de Cotação do Auto retornar um erro genérico', async () => {
			axios.mockImplementationOnce(() => {
				throw new Error()
			})

			await expect(
				vehicleApi.generateQuote(
					QUOTATION_FACTORY_PAYLOAD_RESPONSE_NEW_INSURANCE,
					'token',
					VALID_INPUT_DATA
				)
			).rejects.toThrow(
				new VehicleApiError(EXTERNAL_API_ERROR_DEFAULT_MESSAGE, 500)
			)
		})

		it('Deve logar um erro quando ao chamar a API de Cotação do Auto retornar um erro', async () => {
			const spyLogger = jest.spyOn(logger, 'error')

			axios.mockImplementationOnce(() => {
				throw new Error()
			})

			await expect(
				vehicleApi.generateQuote(
					QUOTATION_FACTORY_PAYLOAD_RESPONSE_NEW_INSURANCE
				)
			).rejects.toThrow()

			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})
	})
})
