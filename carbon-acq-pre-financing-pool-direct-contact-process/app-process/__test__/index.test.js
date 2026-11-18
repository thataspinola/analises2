const MOCKS = require('./mocks/index.mock')
const controller = require('../src/controller')
const service = require('../src/service')
const { handler } = require('../index')
jest.mock('../src/controller')
jest.mock('../src/service')

afterEach(function () {
	jest.clearAllMocks()
})

beforeEach(function () {
	controller.directContact.processContact.mockImplementation(
		async (inputRequest) => {
			return MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_SUCCESS_RETURN()
		}
	)

	controller.directContactUpdate.process.mockImplementation(
		async (inputRequest) => {
			return MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_SUCCESS_RETURN()
		}
	)

	service.logger = {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	}
})

describe('Given a request', () => {
	test('It should process direct contact request records from queue and return a sucessful object', async () => {
		await expect(handler(MOCKS.HANDLER.VALID_INPUT_PAYLOAD())).resolves.toEqual(
			MOCKS.HANDLER.SUCCESS_RETURN()
		)
	})

	test('It should process direct contact request records from queue and return a sucessful object when with update flag', async () => {
		await expect(handler(MOCKS.HANDLER.VALID_INPUT_PAYLOAD_WITH_UPDATE_FLAG())).resolves.toEqual(
			MOCKS.HANDLER.SUCCESS_RETURN()
		)
	})

	test('It should process direct contact request records from queue and return a non sucessful object', async () => {
		controller.directContact.processContact.mockImplementationOnce(
			(inputRequest) => {
				throw new Error(
					`API error: code '500' data: '{ "message": "Fake failure" }'`
				)
			}
		)
		const response = await handler(MOCKS.HANDLER.VALID_INPUT_PAYLOAD())
		expect(response).toEqual(
			MOCKS.HANDLER.FIRST_RECORD_PROCESSING_FAIL_RETURN()
		)
	})
	test('It should process direct contact request records from queue and return a non sucessful object when one of the input payload items is an invalid json string', async () => {
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		await expect(
			handler(MOCKS.HANDLER.INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM())
		).resolves.toEqual(
			MOCKS.HANDLER.FIRST_RECORD_PROCESSING_JSON_FORMAT_FAIL_RETURN()
		)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			MOCKS.SERVICE_LOGGER_ERROR_MESSAGE_JSON_PARSE_ERROR()
		)
	})

	test('It should process direct contact request records from queue and return a non sucessful object when one of the input not containing a matching flag', async () => {
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		await expect(
			handler(MOCKS.HANDLER.INPUT_PAYLOAD_WITHOUT_FLAG())
		).resolves.toEqual(
			MOCKS.HANDLER.FIRST_RECORD_PROCESSING_JSON_WITHOUT_FLAG_FAIL_RETURN()
		)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			MOCKS.SERVICE_LOGGER_ERROR_MESSAGE_WITHOUT_FLAG_ERROR()
		)
	})
})


