const { vehicleDataFactory } = require('../../../src/factory')
const {
	VEHICLE_API_SUCCESS_RESPONSE_PER_DESCRIPTION_AND_YEAR_MODEL,
	VEHICLE_DATA_FACTORY_PER_DESCRIPTION_AND_YEAR_MODEL_RESPONSE,
	VEHICLE_DATA_FACTORY_PER_PLATE_RESPONSE,
	VEHICLE_API_SUCCESS_RESPONSE_PER_PLATE,
	VEHICLE_API_SUCCESS_RESPONSE_PER_PLATE_WITH_MOTO,
	VEHICLE_DATA_FACTORY_PER_PLATE_WITH_MOTO_RESPONSE,
} = require('../../mocks/index.mock')

describe('Suite de testes de vehicleDataFactory.js', () => {
	describe('Função sanitizePlate', () => {
		test('Deve remover todos os caracteres não alfanuméricos', () => {
			const response = vehicleDataFactory.sanitizePlate('XXX-;.,/\\1234')

			expect(response).toEqual('XXX1234')
		})

		test('Deve devolver undefined caso não receba a placa', () => {
			const response = vehicleDataFactory.sanitizePlate()

			expect(response).toBeUndefined()
		})
	})

	describe('Função parseDescriptionsPerPlate', () => {
		test('Deve devolver o valor formatado como esperado', () => {
			const response = vehicleDataFactory.parseDescriptionsPerPlate(
				VEHICLE_API_SUCCESS_RESPONSE_PER_PLATE
			)

			for (const item of response) {
				expect(item.descricao).toEqual(expect.not.stringContaining('CAT.'))
				expect(item.descricao).toEqual(expect.not.stringContaining('COD.'))
			}

			expect(response).toEqual(VEHICLE_DATA_FACTORY_PER_PLATE_RESPONSE)
		})

		test('Deve devolver o valor formatado como esperado e o tipo de veiculo quando é um a moto', () => {
			const response = vehicleDataFactory.parseDescriptionsPerPlate(
				VEHICLE_API_SUCCESS_RESPONSE_PER_PLATE_WITH_MOTO
			)

			expect(response[0].tipoVeiculo).toEqual('moto')
			expect(response).toEqual(
				VEHICLE_DATA_FACTORY_PER_PLATE_WITH_MOTO_RESPONSE
			)
		})

		test('Deve devolver undefined caso não receba a entrada de dados', () => {
			const response = vehicleDataFactory.parseDescriptionsPerPlate()

			expect(response).toBeUndefined()
		})
	})

	describe('Função parseDescriptionsPerDescriptionAndYearModel', () => {
		test('Deve devolver o valor formatado como esperado', () => {
			const response =
				vehicleDataFactory.parseDescriptionsPerDescriptionAndYearModel(
					VEHICLE_API_SUCCESS_RESPONSE_PER_DESCRIPTION_AND_YEAR_MODEL
				)

			for (const item of response) {
				expect(item.descricao).toEqual(expect.not.stringContaining('CAT.'))
				expect(item.descricao).toEqual(expect.not.stringContaining('COD.'))
				expect(item.descricao).toEqual(expect.not.stringContaining('MODELO'))
			}

			expect(response).toEqual(
				VEHICLE_DATA_FACTORY_PER_DESCRIPTION_AND_YEAR_MODEL_RESPONSE
			)
		})

		test('Deve devolver undefined caso não receba a entrada de dados', () => {
			const response =
				vehicleDataFactory.parseDescriptionsPerDescriptionAndYearModel()

			expect(response).toBeUndefined()
		})
	})
})
