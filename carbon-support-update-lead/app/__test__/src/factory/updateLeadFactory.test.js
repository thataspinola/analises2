const { updateLeadFactory } = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given an getPayload call', () => {
	test('It should return a valid payload object that will be used to call updateLead method from dynamics layer', async () => {
		const updateLeadFactoryReturnValue = updateLeadFactory.getPayload(
			MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
		)
		expect(updateLeadFactoryReturnValue).toEqual(MOCKS.VALID_PUT_LEAD_XML())
	})
})
