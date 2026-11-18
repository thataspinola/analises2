const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')

describe('getDataReport', () => {
	test('should return correct data when all values are valid', () => {
		const parsedSqsMessagePayload =
			MOCKS.FACTORY_CONTROLLER_PROCESSSQSMESSAGE_RECEIVEDDATAREPORT.GETDATAREPORT_PARSEDSQSMESSAGEPAYLOAD_VALID_INPUT()
		const expectedOutput =
			MOCKS.FACTORY_CONTROLLER_PROCESSSQSMESSAGE_RECEIVEDDATAREPORT.GETDATAREPORT_VALID_RETURN()
		expect(
			factory.controller.processSqsMessage.receivedDataReport.getDataReport(
				parsedSqsMessagePayload
			)
		).toEqual(expectedOutput)
	})

	test('Should return N/A whan a field could not get value', () => {
		const expectedOutput =
			MOCKS.FACTORY_CONTROLLER_PROCESSSQSMESSAGE_RECEIVEDDATAREPORT.GETDATAREPORT_NODATA_VALID_RETURN()
		expect(
			factory.controller.processSqsMessage.receivedDataReport.getDataReport()
		).toEqual(expectedOutput)
	})
})
