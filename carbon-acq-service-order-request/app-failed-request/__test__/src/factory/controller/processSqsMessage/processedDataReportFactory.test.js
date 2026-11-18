const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')

describe('getDataReport', () => {
	test('should return correct data when all values are valid', () => {
		const expectedOutput =
			MOCKS.FACTORY_CONTROLLER_PROCESSSQSMESSAGE_PROCESSEDDATAREPORT.GETDATAREPORT_VALID_RETURN()
		expect(
			factory.controller.processSqsMessage.processedDataReport.getDataReport(
				MOCKS.FACTORY_CONTROLLER_PROCESSSQSMESSAGE_PROCESSEDDATAREPORT.GETDATAREPORT_RESERVINGRESPONSE_VALID_INPUT(),
				MOCKS.FACTORY_CONTROLLER_PROCESSSQSMESSAGE_PROCESSEDDATAREPORT.GETDATAREPORT_CANCELPAYMENTRESERVATIONRESPONSE_VALID_INPUT(),
				MOCKS.FACTORY_CONTROLLER_PROCESSSQSMESSAGE_PROCESSEDDATAREPORT.GETDATAREPORT_CUSTOMERNOTIFIEDRESPONSE_TRUE_VALID_INPUT()
			)
		).toEqual(expectedOutput)
	})

	test('Should return N/A whan a field could not get value', () => {
		const expectedOutput =
			MOCKS.FACTORY_CONTROLLER_PROCESSSQSMESSAGE_PROCESSEDDATAREPORT.GETDATAREPORT_NODATA_VALID_RETURN()
		expect(
			factory.controller.processSqsMessage.processedDataReport.getDataReport(
				MOCKS.FACTORY_CONTROLLER_PROCESSSQSMESSAGE_PROCESSEDDATAREPORT.GETDATAREPORT_CUSTOMERNOTIFIEDRESPONSE_FALSE_VALID_INPUT()
			)
		).toEqual(expectedOutput)
	})
})
