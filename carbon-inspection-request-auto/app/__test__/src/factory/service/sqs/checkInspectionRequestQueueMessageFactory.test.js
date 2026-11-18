const MOCKS = require('../../../../mocks/index.mock')
const factory = require('../../../../../src/factory')

beforeAll(() => {
	jest.useFakeTimers('modern').setSystemTime(new Date(2023, 10, 16))
})

describe('Test suite for the checkInspectionRequestQueueMessageFactory.js', () => {
	test('It should get message in format to send queue', () => {
		const message =
			factory.service.sqs.checkInspectionRequestQueueMessage.getMessage(
				MOCKS.FACTORY_SERVICE_SQS_CHECKINSPECTIONREQUESTQUEUEMESSAGE.GETMESSAGE_VALID_INPUT(),
				MOCKS.CONTROLLER_INSPECTION.VALID_ID_TRANSACTION()
			)

		expect(message).toEqual(
			MOCKS.FACTORY_SERVICE_SQS_CHECKINSPECTIONREQUESTQUEUEMESSAGE.GETMESSAGE_SUCCESS_RETURN()
		)
	})
})
