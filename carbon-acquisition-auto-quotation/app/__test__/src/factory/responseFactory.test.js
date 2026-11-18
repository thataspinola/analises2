const { responseFactory } = require('../../../src/factory')
const { BusinessError, VehicleApiError } = require('../../../src/error')
const { VEHICLE_API_DATA_ERROR_MESSAGE } = require('../../../src/property');
const {
	VEHICLE_API_SUCCESS_RESPONSE,
	RESPONSE_FACTORY_QUOTATIONS,
	VALID_INPUT_DATA_PARSED,
	VEHICLE_API_SUCCESS_RESPONSE_WITHOUT_TIPO_CLASSE_CALULO_PREMIO_2,
	RESPONSE_FACTORY_QUOTATIONS_WITHOUT_TIPO_CLASSE_CALULO_PREMIO_2,
	VEHICLE_API_SUCCESS_RESPONSE_WITH_UNPERMITTED,
	VEHICLE_API_SUCCESS_RESPONSE_WITHOUT_PARCELAMENTO,
} = require('../../mocks/index.mock')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

describe('Test suite for responseFactory.js', () => {
	test('Should return susepCode, idLead, and quotations for successful quotation', () => {
		const response = responseFactory.quotationSuccess(
			VALID_INPUT_DATA_PARSED,
			VEHICLE_API_SUCCESS_RESPONSE
		)

		expect(typeof response).toBe('object')
		expect(response).toHaveProperty(
			'susepCode',
			VALID_INPUT_DATA_PARSED.auto.susepCode
		)
		expect(response).toHaveProperty('idLead', VALID_INPUT_DATA_PARSED.auto.idLead)
		expect(response).toHaveProperty(
			'quotation_data',
			VEHICLE_API_SUCCESS_RESPONSE
		)
		expect(response).toHaveProperty('quotations', RESPONSE_FACTORY_QUOTATIONS)
	})

	test('Should return susepCode, idLead, and quotations for successful quotation when not have tipoClasseCalculoPremio 2', () => {
		const response = responseFactory.quotationSuccess(
			VALID_INPUT_DATA_PARSED,
			VEHICLE_API_SUCCESS_RESPONSE_WITHOUT_TIPO_CLASSE_CALULO_PREMIO_2
		)

		expect(typeof response).toBe('object')
		expect(response).toHaveProperty(
			'susepCode',
			VALID_INPUT_DATA_PARSED.auto.susepCode
		)
		expect(response).toHaveProperty('idLead', VALID_INPUT_DATA_PARSED.auto.idLead)
		expect(response).toHaveProperty(
			'quotation_data',
			VEHICLE_API_SUCCESS_RESPONSE_WITHOUT_TIPO_CLASSE_CALULO_PREMIO_2
		)
		expect(response).toHaveProperty(
			'quotations',
			RESPONSE_FACTORY_QUOTATIONS_WITHOUT_TIPO_CLASSE_CALULO_PREMIO_2
		)
	})

	test('Should throw a BusinessError with the provided code and message', () => {
		const errorCode = 404
		const errorMessage = 'Error message'

		expect(() => {
			responseFactory.quotationError(errorMessage, errorCode)
		}).toThrow(BusinessError)
		try {
			responseFactory.quotationError(errorMessage, errorCode)
		} catch (error) {
			expect(error).toBeInstanceOf(BusinessError)
			expect(error).toHaveProperty('code', errorCode)
			expect(error).toHaveProperty('message', errorMessage)
		}
	})

	test('Should throw a BusinessError with default values', () => {
		expect(() => {
			responseFactory.quotationError()
		}).toThrow(BusinessError)
		try {
			responseFactory.quotationError()
		} catch (error) {
			expect(error).toBeInstanceOf(BusinessError)
		}
	})

	test('Should return susepCode, idLead, and quotations for successful quotation and filter unpermitted quotation', () => {
		const response = responseFactory.quotationSuccess(
			VALID_INPUT_DATA_PARSED,
			VEHICLE_API_SUCCESS_RESPONSE_WITH_UNPERMITTED
		)

		expect(typeof response).toBe('object')
		expect(response).toHaveProperty(
			'susepCode',
			VALID_INPUT_DATA_PARSED.auto.susepCode
		)
		expect(response).toHaveProperty('idLead', VALID_INPUT_DATA_PARSED.auto.idLead)
		expect(response).toHaveProperty(
			'quotation_data',
			VEHICLE_API_SUCCESS_RESPONSE_WITH_UNPERMITTED
		)
		expect(response).toHaveProperty('quotations', RESPONSE_FACTORY_QUOTATIONS)
	})

	test('Should throw a VehicleApiError when api response is invalid', () => {
		expect(() => {
			responseFactory.quotationSuccess(
				VALID_INPUT_DATA_PARSED,
				VEHICLE_API_SUCCESS_RESPONSE_WITHOUT_PARCELAMENTO
			)
		}).toThrow(VehicleApiError)

		try {
			responseFactory.quotationSuccess(
				VALID_INPUT_DATA_PARSED,
				VEHICLE_API_SUCCESS_RESPONSE_WITHOUT_PARCELAMENTO
			)
		} catch (error) {
			expect(error).toBeInstanceOf(VehicleApiError)
			expect(error).toHaveProperty('errorCode', '0600000')
			expect(error).toHaveProperty('code', 500)
			expect(error).toHaveProperty('message', VEHICLE_API_DATA_ERROR_MESSAGE)
		}
	})
})
