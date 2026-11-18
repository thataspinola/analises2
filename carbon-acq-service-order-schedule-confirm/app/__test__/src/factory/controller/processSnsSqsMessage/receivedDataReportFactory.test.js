const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')

describe('getDataReport', () => {
	test('should return correct data when all values are valid', () => {
		const input =
			MOCKS.FACTORY_CONTROLLER_PROCESSSNSSQSMESSAGE_RECEIVEDDATAREPORT.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT()
		const expectedOutput = {
			key: 'N/A',
			serviceOrderNumber: 'N/A',
		}
		expect(
			factory.controller.processSnsSqsMessage.receivedDataReport.getDataReport(
				input
			)
		).toEqual(expectedOutput)
	})

	test('should return N/A for coupon if it is undefined', () => {
		const input =
			MOCKS.FACTORY_CONTROLLER_PROCESSSNSSQSMESSAGE_RECEIVEDDATAREPORT.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_WITHOUTOPTIONALATTRIBUTES_VALID_INPUT()
		const expectedOutput = {
			key: 'N/A',
			serviceOrderNumber: 'N/A',
		}
		expect(
			factory.controller.processSnsSqsMessage.receivedDataReport.getDataReport(
				input
			)
		).toEqual(expectedOutput)
	})

	test('should return null for customer number if it is undefined', () => {
		const input =
			MOCKS.FACTORY_CONTROLLER_PROCESSSNSSQSMESSAGE_RECEIVEDDATAREPORT.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_WITHOUTOPTIONALATTRIBUTES_VALID_INPUT()
		const expectedOutput = {
			key: 'N/A',
			serviceOrderNumber: 'N/A',
		}
		expect(
			factory.controller.processSnsSqsMessage.receivedDataReport.getDataReport(
				input
			)
		).toEqual(expectedOutput)
	})
})
