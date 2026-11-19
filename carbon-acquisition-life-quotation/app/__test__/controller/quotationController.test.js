const controller = require('../../src/controller')
const service = require('../../src/service')
const mocks = require('../mocks/index.mock')

jest.mock('@porto-seguro/hub-vendas.carbon-token')
afterEach(() => {
	jest.clearAllMocks()
})

describe('test for validate input', () => {
	test('should throw exception when it throws errors', async () => {
		let exception = new Error('msg error')
		service.validation.inputData = jest.fn(() => {
			throw exception
		})

		let response = await controller.quotation.getQuotation(
			mocks.INPUT_REQUEST_INVALID
		)
		expect(response).toEqual(mocks.RESPONSE_CONTROLLER_ERROR())
	})
})
