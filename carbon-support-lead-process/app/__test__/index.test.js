const index = require('../index')
const controller = require('../src/controller')
const error = require('../src/error')
const service = require('../src/service')
const factory = require('../src/factory')
const CONSTANTS = require('../src/property')
const MOCKS = require('../__test__/mocks/index.mock')

jest.mock('../src/controller/index')
jest.mock('../src/service/index')
jest.mock('../src/factory/index')

beforeEach(() => {
	jest.clearAllMocks()
})

describe('index.js', () => {
	test('should return a valid response when the event body is valid', async () => {
		const event = { body: JSON.stringify(MOCKS.VALID_INPUT_DATA()) }
		const controllerResponse = MOCKS.SUCCESS_RESPONSE('Success')
		const expectedResponse = {
			isBase64Encoded: false,
			headers: null,
			statusCode: controllerResponse.statusCode,
			body: JSON.stringify(controllerResponse.body),
		}

		controller.leadController.process.mockResolvedValue(controllerResponse)

		const response = await index.handler(event)

		expect(response).toEqual(expectedResponse)
		expect(controller.leadController.process).toHaveBeenCalledWith(MOCKS.VALID_INPUT_DATA())
		expect(service.logger.error).not.toHaveBeenCalled()
		expect(factory.response.badRequestError).not.toHaveBeenCalled()
		expect(factory.response.error).not.toHaveBeenCalled()
	})

	test('should throw a ValidationError when the event body is invalid', async () => {
		const event = {}
		const errorMessage = CONSTANTS.MESSAGES.HANDLER.INVALID_BODY
		const badRequestResponse = MOCKS.BAD_RESPONSE(errorMessage)
		const expectedResponse = {
			isBase64Encoded: false,
			headers: null,
			statusCode: badRequestResponse.statusCode,
			body: JSON.stringify(badRequestResponse.body),
		}

		factory.response.badRequestError.mockReturnValue(badRequestResponse)

		const response = await index.handler(event)

		expect(response).toEqual(expectedResponse)
		expect(service.logger.error).toHaveBeenCalledWith(
			expect.objectContaining({
				rawError: expect.any(error.ValidationError),
				carbonErrorData: {
					layer: CONSTANTS.MESSAGES.LAYER.HANDLER,
					currentActivity: `${CONSTANTS.MESSAGES.HANDLER.CURRENT_ACTIVITY}' ${CONSTANTS.MESSAGES.LEAD_CONTROLLER.SENDING_MESSAGE}'`,
					errorMessage: errorMessage,
				},
			}),
			expect.stringContaining(CONSTANTS.MESSAGES.HANDLER.CURRENT_ACTIVITY)
		)
		expect(factory.response.badRequestError).toHaveBeenCalledWith(
			errorMessage
		)
		expect(factory.response.error).not.toHaveBeenCalled()
	})

	test('should handle other errors and return a 500 response', async () => {
		const event = { body: JSON.stringify(MOCKS.VALID_INPUT_DATA()) }
		const errorMessage = 'Some other error'
		const errorRequestResponse = MOCKS.ERROR_RESPONSE(errorMessage)
		const expectedResponse = {
			isBase64Encoded: false,
			headers: null,
			statusCode: errorRequestResponse.statusCode,
			body: JSON.stringify(errorRequestResponse.body),
		}

		controller.leadController.process.mockRejectedValue(new Error(errorMessage))
		factory.response.error.mockReturnValue(errorRequestResponse)

		const response = await index.handler(event)

		expect(response).toEqual(expectedResponse)
		expect(service.logger.error).toHaveBeenCalledWith(
			expect.objectContaining({
				rawError: expect.any(Error),
				carbonErrorData: {
					layer: CONSTANTS.MESSAGES.LAYER.HANDLER,
					currentActivity: `${CONSTANTS.MESSAGES.HANDLER.CURRENT_ACTIVITY}' ${CONSTANTS.MESSAGES.LEAD_CONTROLLER.SENDING_MESSAGE}'`,
					errorMessage: errorMessage,
				},
			}),
			expect.stringContaining(CONSTANTS.MESSAGES.HANDLER.CURRENT_ACTIVITY)
		)
		expect(factory.response.badRequestError).not.toHaveBeenCalled()
		expect(factory.response.error).toHaveBeenCalledWith(errorMessage)
	})
})