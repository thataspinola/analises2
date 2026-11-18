const controller = require('../../../src/controller')
const property = require('../../../src/property')
const service = require('../../../src/service')
const api = require('../../../src/api')
const factory = require('../../../src/factory')
const token = require('@porto-seguro/hub-vendas.carbon-token')
const dealsDataLayer = require('@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer')
const MOCKS = require('../../mocks/src/controller/eligibilityController.mock')
const errors = require('../../../src/error')

jest.mock('../../../src/property', () => ({
	DEALS_DATA_LIBRARY_LOCATION:
		'@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer',
	TOKEN_LIBRARY_LOCATION: '@porto-seguro/hub-vendas.carbon-token',
}))

jest.mock('../../../src/service')

jest.mock('../../../src/api', () => ({
	eligibilityApi: { getEligibility: jest.fn() },
}))

jest.mock('../../../src/factory', () => ({
	response: {
		success: jest.fn(),
		badRequestError: jest.fn(),
		error: jest.fn(),
	},
	save: {
		build: jest.fn(),
	},
}))

jest.mock(
	'@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer',
	() => ({
		saveDealsData: jest.fn(),
	})
)

jest.mock('@porto-seguro/hub-vendas.carbon-token', () => ({
	getSensediaTokenHubCloud: jest.fn(),
}))

describe('Process function test', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('Should process successfully', async () => {
		token.getSensediaTokenHubCloud.mockReturnValueOnce(MOCKS.FAKE_TOKEN)

		api.eligibilityApi.getEligibility.mockReturnValueOnce(
			MOCKS.RESPONSE_SUCCESS_API()
		)

		await controller.eligibility.process(MOCKS.VALID_INPUT_DATA())

		expect(service.schemaValidation.validate).toBeCalledWith(
			MOCKS.VALID_INPUT_DATA(),
			property.INPUT_SCHEMA
		)
		expect(token.getSensediaTokenHubCloud).toBeCalled()
		expect(api.eligibilityApi.getEligibility).toBeCalledWith(
			MOCKS.VALID_API_PAYLOAD,
			MOCKS.FAKE_TOKEN
		)
		expect(dealsDataLayer.saveDealsData).toBeCalled()
		expect(factory.response.success).toBeCalledWith('Success')
	})

	it('Should process successfully when there is no data', async () => {
		token.getSensediaTokenHubCloud.mockReturnValueOnce(MOCKS.FAKE_TOKEN)

		api.eligibilityApi.getEligibility.mockReturnValueOnce(
			MOCKS.RESPONSE_EMPTY_API()
		)

		await controller.eligibility.process(MOCKS.VALID_INPUT_DATA())

		expect(service.schemaValidation.validate).toBeCalledWith(
			MOCKS.VALID_INPUT_DATA(),
			property.INPUT_SCHEMA
		)
		expect(token.getSensediaTokenHubCloud).toBeCalled()
		expect(api.eligibilityApi.getEligibility).toBeCalledWith(
			MOCKS.VALID_API_PAYLOAD,
			MOCKS.FAKE_TOKEN
		)
		expect(dealsDataLayer.saveDealsData).not.toBeCalled()
		expect(factory.response.success).toBeCalledWith('Success')
	})

	it('Should handle ValidationError', async () => {
		const validationError = new errors.ValidationError('Validation Error')
		service.schemaValidation.validate.mockImplementationOnce(() => {
			throw validationError
		})

		const result = await controller.eligibility.process(
			MOCKS.VALID_INPUT_DATA()
		)

		expect(service.logger.error).toBeCalledWith(validationError.message)
		expect(result).toEqual(
			factory.response.badRequestError(
				'Não foi possível processar a requisição, por favor revise os dados'
			)
		)
	})

	it('Should handle get token error', async () => {
		const unknownError = new Error('Unknown error')
		token.getSensediaTokenHubCloud.mockImplementationOnce(() => {
			throw unknownError
		})

		const result = await controller.eligibility.process(
			MOCKS.VALID_INPUT_DATA()
		)

		expect(service.logger.error).toBeCalledWith(unknownError.message)
		expect(result).toEqual(factory.response.error('Erro interno'))
	})
})
