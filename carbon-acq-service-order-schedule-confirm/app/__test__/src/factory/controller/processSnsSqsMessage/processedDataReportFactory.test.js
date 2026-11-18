const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../../__test__/mocks/index.mock')

describe('getDataReport', () => {
	test('should return N/A for redeemCouponReturnMessage when it is undefined', () => {
		const input =
			MOCKS.FACTORY_API_PROCESSEDDATAREPORT.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_WITHOUTOPTIONALATTRIBUTES_VALID_INPUT()
		const expectedOutput = {
			confirmDataReturnMessage: "N/A",
			updateScheduleStatusReturnRequestId: "N/A"
		}
		expect(
			factory.controller.processSnsSqsMessage.processedDataReport.getDataReport(input)
		).toEqual(expectedOutput)
	})

	test('should return null for document number when it is null', () => {
		const input =
			MOCKS.FACTORY_API_PROCESSEDDATAREPORT.GETDATAREPORT_NULL_SCHEDULE_CONFIRM_STATUS_RETURN_REQUESTID()
		const expectedOutput = {
			confirmDataReturnMessage: "N/A",
			updateScheduleStatusReturnRequestId: "N/A"
		}
		expect(
			factory.controller.processSnsSqsMessage.processedDataReport.getDataReport(input)
		).toEqual(expectedOutput)
	})

	test('should return null for order number when it is an empty string', () => {
		const input =
			MOCKS.FACTORY_API_PROCESSEDDATAREPORT.GETDATAREPORT_EMPTY_SCHEDULE_CONFIRM_RETURN_MESSAGE()
		const expectedOutput = {
			confirmDataReturnMessage: "N/A",
			updateScheduleStatusReturnRequestId: "N/A"
		}
		expect(
			factory.controller.processSnsSqsMessage.processedDataReport.getDataReport(input)
		).toEqual(expectedOutput)
	})
})
