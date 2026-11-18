const MOCKS = require('./mocks/index.mock')
const controller = require('../src/controller')
const service = require('../src/service')
const nodeCrypto = require('node:crypto')
const { handler } = require('../index')
jest.mock('../src/controller')
jest.mock('../src/service')
jest.mock('node:crypto', () => {
	const originalNodeCrypto = jest.requireActual('node:crypto')
	return {
		__esModule: true,
		...originalNodeCrypto,
		randomUUID: jest.fn(() => {}),
	}
})

afterEach(function () {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeEach(function () {
	nodeCrypto.randomUUID.mockImplementation(() => {
		return MOCKS.HANDLER.VALID_GENERATED_CARBONTRACEID()
	})
	controller.processSnsSqsMessage.process.mockImplementation(
		async (inputRequest) => {
			return MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_RETURN()
		}
	)
	service.logger.info.mockImplementation((message) => {})
	service.logger.error.mockImplementation((message) => {})
	service.logger.warn.mockImplementation((message) => {})
	service.logger.debug.mockImplementation((message) => {})
})

describe('lambdaHandler', () => {
	test('It should process request records from queue and return a sucessful object', async () => {
		const spyControllerProcessSnsSqsMessageProcess = jest.spyOn(
			controller.processSnsSqsMessage,
			'process'
		)
		await expect(handler(MOCKS.HANDLER.VALID_EVENT_INPUT())).resolves.toEqual(
			MOCKS.HANDLER.SUCCESS_RETURN()
		)
		expect(spyControllerProcessSnsSqsMessageProcess).toHaveBeenCalledWith(
			MOCKS.HANDLER.VALID_EVENT_SNSMESSAGE_1(),
			MOCKS.HANDLER.VALID_EVENT_SNSMESSAGE_1_PAYLOAD_CARBONTRACEID()
		)
		expect(spyControllerProcessSnsSqsMessageProcess).toHaveBeenCalledWith(
			MOCKS.HANDLER.VALID_EVENT_SNSMESSAGE_2(),
			MOCKS.HANDLER.VALID_EVENT_SNSMESSAGE_2_PAYLOAD_CARBONTRACEID()
		)
	})
	test('It should process request records from queue and return a non sucessful object', async () => {
		controller.processSnsSqsMessage.process.mockImplementationOnce(
			(inputRequest) => {
				throw new Error(
					`API error: code '500' data: '{ "message": "Fake failure" }'`
				)
			}
		)
		const response = await handler(MOCKS.HANDLER.VALID_EVENT_INPUT())
		expect(response).toEqual(
			MOCKS.HANDLER.FIRST_RECORD_PROCESSING_FAIL_RETURN()
		)
	})
	test('It should process request records from queue and return a non sucessful object when one of the input payload items is an invalid json string', async () => {
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		await expect(
			handler(MOCKS.HANDLER.INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM())
		).resolves.toEqual(
			MOCKS.HANDLER.FIRST_RECORD_PROCESSING_JSON_FORMAT_FAIL_RETURN()
		)
		expect(spyServiceLoggerError).toHaveBeenCalledTimes(1)
	})

	test('Should generate a new carbon-trace-id if not provided', async () => {
		const spyControllerProcessSnsSqsMessageProcess = jest.spyOn(
			controller.processSnsSqsMessage,
			'process'
		)
		await expect(
			handler(MOCKS.HANDLER.VALID_EVENT_WITHOUTCARBONTRACEID_INPUT())
		).resolves.toEqual(MOCKS.HANDLER.SUCCESS_RETURN())
		expect(spyControllerProcessSnsSqsMessageProcess).toHaveBeenCalledWith(
			MOCKS.HANDLER.VALID_EVENT_SNSMESSAGE_1_WITHOUTCARBONTRACEID(),
			MOCKS.HANDLER.VALID_GENERATED_CARBONTRACEID()
		)
	})
})
