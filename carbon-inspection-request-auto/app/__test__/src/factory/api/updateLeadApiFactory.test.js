const factory = require('../../../../src/factory')
const MOCKS = require('../../../mocks/index.mock')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

describe('Test suite for the updateLeadApiFactorys.js.', () => {
	test('It should a response with the expected payload', async () => {
		expect(
			factory.api.updateLead.getPayload(
				MOCKS.FACTORY_API_UPDATELEAD.GETPAYLOAD_VALID_INPUT(),
				MOCKS.FACTORY_API_UPDATELEAD.OBSERVATION()
			)
		).toEqual(MOCKS.FACTORY_API_UPDATELEAD.GETPAYLOAD_SUCCESS_RETURN())
	})

	test('There should be a response with the expected payload when there is no idProductType.', async () => {
		expect(
			factory.api.updateLead.getPayload(
				MOCKS.FACTORY_API_UPDATELEAD.GETPAYLOAD_VALID_INPUT_WITHOUT_IDPRODUCTTYPE(),
				MOCKS.FACTORY_API_UPDATELEAD.OBSERVATION()
			)
		).toEqual(
			MOCKS.FACTORY_API_UPDATELEAD.GETPAYLOAD_SUCCESS_RETURN_WITHOUT_IDPRODUCTTYPE()
		)
	})
})
