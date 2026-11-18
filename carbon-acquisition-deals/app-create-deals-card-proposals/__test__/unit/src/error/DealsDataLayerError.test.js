const errors = require('../../../../src/error')
const MOCKS = require('../../mocks/index.mock')
const CONSTANTS = require('../../../../src/property')

describe('DealsDataLayerError.js test suit', () => {
	test('Should create an instance of DealsDataLayerError with the correct properties', () => {
		const error = new errors.DealsDataLayerError(
			MOCKS.DEALS_DATA_LAYER_ERROR_MOCKS.CUSTOM_ERROR()
		)

		expect(error).toBeInstanceOf(Error)
		expect(error).toBeInstanceOf(errors.DealsDataLayerError)
		expect(error.message).toBe(
			MOCKS.DEALS_DATA_LAYER_ERROR_MOCKS.CUSTOM_MESSAGE()
		)
		expect(error.name).toBe('DealsDataLayerError')
		expect(error.code).toBe(500)
		expect(error.stack).toBe(
			MOCKS.DEALS_DATA_LAYER_ERROR_MOCKS.CUSTOM_STACK_TRACE()
		)
	})
	test('Deve criar uma instância de DealsDataLayerError com as propriedades corretas quando não há mensagem', () => {
		const error = new errors.DealsDataLayerError({})

		expect(error).toBeInstanceOf(Error)
		expect(error).toBeInstanceOf(errors.DealsDataLayerError)
		expect(error.message).toBe(CONSTANTS.DEALS_DATA_LAYER_ERROR_DEFAULT_MESSAGE)
		expect(error.name).toBe('DealsDataLayerError')
	})
})
