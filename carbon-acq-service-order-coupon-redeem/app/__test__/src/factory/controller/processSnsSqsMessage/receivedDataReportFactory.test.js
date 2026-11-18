const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')

describe('getDataReport', () => {
	test('should return correct data when all values are valid', () => {
		const input =
			MOCKS.FACTORY_CONTROLLER_PROCESSSNSSQSMESSAGE_RECEIVEDDATAREPORT.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT()
		const expectedOutput = {
			number: '1028586-23',
			coupon: 'TEST1',
			documentNumber: '1234******',
		}
		expect(
			factory.controller.processSqsMessage.receivedDataReport.getDataReport({
				integrationData: {
					serviceOrder: input,
					serviceOrderNumber: '1028586-23',
					customer: { documentNumber: '12345678901' },
				},
			})
		).toEqual(expectedOutput)
	})

	test('should return N/A for coupon if it is undefined', () => {
		const expectedOutput = {
			number: 'N/A',
			coupon: 'N/A',
			documentNumber: 'N/A',
		}
		expect(
			factory.controller.processSqsMessage.receivedDataReport.getDataReport({
				integrationData: {
					serviceOrder: { coupon: undefined, number: undefined },
					customer: { documentNumber: undefined },
				},
			})
		).toEqual(expectedOutput)
	})

	test('should return N/A for customer number if it is undefined', () => {
		const expectedOutput = {
			number: 'N/A',
			coupon: 'N/A',
			documentNumber: 'N/A',
		}
		expect(
			factory.controller.processSqsMessage.receivedDataReport.getDataReport({
				integrationData: {
					serviceOrder: { coupon: undefined, number: undefined },
					customer: {},
				},
			})
		).toEqual(expectedOutput)
	})
})
