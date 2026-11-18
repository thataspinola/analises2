const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const { vehicleController } = require('../../../src/controller')
const { vehicleDataFactory } = require('../../../src/factory')
const { validationService } = require('../../../src/services')
const { vehicleApi } = require('../../../src/api')
const {
	CONTROLLER_SUCCESS_RESPONSE_PER_DESCRIPTION_AND_YEAR_MODEL,
	CONTROLLER_SUCCESS_RESPONSE_PER_PLATE,
	VALID_INPUT_DATA,
	VEHICLE_DATA_FACTORY_PER_PLATE_RESPONSE,
	VEHICLE_DATA_FACTORY_PER_DESCRIPTION_AND_YEAR_MODEL_RESPONSE,
} = require('../../mocks/index.mock')
const {
	VALIDATION_SERVICE_PLATE_MESSAGES,
	GET_TOKEN_ERROR_DEFAULT_MESSAGE,
	NO_QUERY_STRING_MESSAGE,
} = require('../../../src/property')

jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../config/logger')
jest.mock('../../../src/factory')
jest.mock('../../../src/services')
jest.mock('../../../src/api')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de vehicleController.js', () => {
	describe('Ao buscar veículo por placa', () => {
		test('Deve invocar a layer de token somente uma vez', async () => {
			const spyLayer = jest.spyOn(tokenLayer, 'getSensediaTokenHub')

			await vehicleController.process(
				VALID_INPUT_DATA.queryStringParameters.plate
			)

			expect(spyLayer).toHaveBeenCalled()
			expect(spyLayer).toHaveBeenCalledTimes(1)
		})

		test('Deve invocar a API de Veículos somente uma vez a placa informada na entrada e com o token recuperado da layer', async () => {
			jest
				.spyOn(tokenLayer, 'getSensediaTokenHub')
				.mockReturnValueOnce('fakeToken')

			const spyVehicleApi = jest.spyOn(vehicleApi, 'getDataPerPlate')

			await vehicleController.process(
				VALID_INPUT_DATA.queryStringParameters.plate
			)

			expect(spyVehicleApi).toHaveBeenCalled()
			expect(spyVehicleApi).toHaveBeenCalledTimes(1)
			expect(spyVehicleApi).toHaveBeenCalledWith(
				VALID_INPUT_DATA.queryStringParameters.plate,
				'fakeToken'
			)
		})

		test('Deve retornar um objeto de resposta de sucesso no padrão esperado', async () => {
			jest
				.spyOn(vehicleDataFactory, 'parseDescriptionsPerPlate')
				.mockReturnValueOnce(VEHICLE_DATA_FACTORY_PER_PLATE_RESPONSE)

			const response = await vehicleController.process(
				VALID_INPUT_DATA.queryStringParameters.plate
			)

			expect(response).toEqual(CONTROLLER_SUCCESS_RESPONSE_PER_PLATE)
		})

		test('Deve retornar uma exceção ao receber um erro de validação', async () => {
			jest
				.spyOn(validationService, 'plateValidation')
				.mockImplementationOnce(() => {
					throw new Error(VALIDATION_SERVICE_PLATE_MESSAGES.mustBeString)
				})

			await expect(vehicleController.process(12345)).rejects.toThrow(
				VALIDATION_SERVICE_PLATE_MESSAGES.mustBeString
			)
		})

		it('Deve retornar uma exceção ao receber erro ao buscar o token', async () => {
			jest
				.spyOn(tokenLayer, 'getSensediaTokenHub')
				.mockImplementationOnce(() => {
					throw new Error()
				})

			await expect(
				vehicleController.process(VALID_INPUT_DATA.queryStringParameters.plate)
			).rejects.toThrow(GET_TOKEN_ERROR_DEFAULT_MESSAGE)
		})

		it('Deve logar um erro ao receber erro ao buscar o token', async () => {
			const spyLogger = jest.spyOn(global.logger, 'error')

			jest
				.spyOn(tokenLayer, 'getSensediaTokenHub')
				.mockImplementationOnce(() => {
					throw new Error()
				})

			await expect(
				vehicleController.process(VALID_INPUT_DATA.queryStringParameters.plate)
			).rejects.toThrow()

			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})
	})

	describe('Ao buscar veículo por descrição e ano modelo', () => {
		test('Deve invocar a layer de token somente uma vez', async () => {
			const spyLayer = jest.spyOn(tokenLayer, 'getSensediaTokenHub')

			await vehicleController.process(
				undefined,
				VALID_INPUT_DATA.queryStringParameters.description,
				VALID_INPUT_DATA.queryStringParameters.yearModel
			)

			expect(spyLayer).toHaveBeenCalled()
			expect(spyLayer).toHaveBeenCalledTimes(1)
		})

		test('Deve invocar a API de Veículos somente uma vez a placa informada na entrada e com o token recuperado da layer', async () => {
			jest
				.spyOn(tokenLayer, 'getSensediaTokenHub')
				.mockReturnValueOnce('fakeToken')

			const spyVehicleApi = jest.spyOn(
				vehicleApi,
				'getDataPerDescriptionAndYearModel'
			)

			await vehicleController.process(
				undefined,
				VALID_INPUT_DATA.queryStringParameters.description,
				VALID_INPUT_DATA.queryStringParameters.yearModel
			)

			expect(spyVehicleApi).toHaveBeenCalled()
			expect(spyVehicleApi).toHaveBeenCalledTimes(1)
			expect(spyVehicleApi).toHaveBeenCalledWith(
				VALID_INPUT_DATA.queryStringParameters.description,
				VALID_INPUT_DATA.queryStringParameters.yearModel,
				'fakeToken'
			)
		})

		test('Deve retornar um objeto de resposta de sucesso no padrão esperado', async () => {
			jest
				.spyOn(
					vehicleDataFactory,
					'parseDescriptionsPerDescriptionAndYearModel'
				)
				.mockReturnValueOnce(
					VEHICLE_DATA_FACTORY_PER_DESCRIPTION_AND_YEAR_MODEL_RESPONSE
				)

			const response = await vehicleController.process(
				undefined,
				VALID_INPUT_DATA.queryStringParameters.description,
				VALID_INPUT_DATA.queryStringParameters.yearModel
			)

			expect(response).toEqual(
				CONTROLLER_SUCCESS_RESPONSE_PER_DESCRIPTION_AND_YEAR_MODEL
			)
		})

		test('Deve retornar uma exceção ao receber um erro de validação', async () => {
			jest
				.spyOn(validationService, 'plateValidation')
				.mockImplementationOnce(() => {
					throw new Error(VALIDATION_SERVICE_PLATE_MESSAGES.mustBeString)
				})

			await expect(vehicleController.process(12345)).rejects.toThrow(
				VALIDATION_SERVICE_PLATE_MESSAGES.mustBeString
			)
		})

		it('Deve retornar uma exceção ao receber erro ao buscar o token', async () => {
			jest
				.spyOn(tokenLayer, 'getSensediaTokenHub')
				.mockImplementationOnce(() => {
					throw new Error()
				})

			await expect(
				vehicleController.process(
					undefined,
					VALID_INPUT_DATA.queryStringParameters.description,
					VALID_INPUT_DATA.queryStringParameters.yearModel
				)
			).rejects.toThrow(GET_TOKEN_ERROR_DEFAULT_MESSAGE)
		})

		it('Deve logar um erro ao receber erro ao buscar o token', async () => {
			const spyLogger = jest.spyOn(global.logger, 'error')

			jest
				.spyOn(tokenLayer, 'getSensediaTokenHub')
				.mockImplementationOnce(() => {
					throw new Error()
				})

			await expect(
				vehicleController.process(
					undefined,
					VALID_INPUT_DATA.queryStringParameters.description,
					VALID_INPUT_DATA.queryStringParameters.yearModel
				)
			).rejects.toThrow()

			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})
	})

	test('Deve retornar uma exceção ao não fornecer a placa ou descrição e ano modelo', async () => {
		await expect(vehicleController.process()).rejects.toThrow(
			NO_QUERY_STRING_MESSAGE
		)
	})
})
