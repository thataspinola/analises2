const MOCKS = require('./mocks/index.mock')
const controller = require('../src/controller')
const service = require('../src/service')
const { handler } = require('../index')
describe('Given a request', () => {
	test('It should create a direct contact request with success', async () => {
		controller.directContact.processRequest = jest.fn(() => {
			return MOCKS.CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_SUCCESS_RETURN()
		})

		const response = await handler(
			MOCKS.HANDLER_VALID_POST_INPUT_REQUEST_DATA()
		)

		expect(response).toEqual(MOCKS.HANDLER_SUCCESS_RETURN())
	})

	test('It should create a register complete request with error', async () => {
		const response = await handler(
			MOCKS.HANDLER_INVALID_POST_NULL_INPUT_REQUEST_DATA()
		)
		expect(response).toEqual(MOCKS.HANDLER_FAIL_RETURN_WITH_INPUT_NULL())
	})

	test('It should create a register complete request with error on parsed', async () => {
		const spyLoggerError = jest.spyOn(service.logger, 'error')
		const spyLoggerInfo = jest.spyOn(service.logger, 'info')

		const response = await handler(
			MOCKS.HANDLER_INVALID_POST_INPUT_REQUEST_DATA_WITH_ERROR_PARSED()
		)

		const loggerErrorMessage = `Body JSON parse error: Expected property name or \'}\' in JSON at position 1 (line 1 column 2)`
		const loggerInfoMessage = `data: {`

		expect(spyLoggerError).toHaveBeenCalled()
		expect(spyLoggerError).toHaveBeenCalledWith(loggerErrorMessage)
		expect(spyLoggerInfo).toHaveBeenCalled()
		expect(spyLoggerInfo).toHaveBeenCalledWith(loggerInfoMessage)
		expect(response).toEqual(
			MOCKS.HANDLER_FAIL_RETURN_WITH_INPUT_ERROR_PARSED()
		)
	})
})
