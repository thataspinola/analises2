const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('Given an getInspectionStatus call', () => {
	test('It should a response with the ok value', async () => {
		const returnValue = factory.status.getInspectionStatus(
			MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_JUSTSETOFFEEDBACKS_VALID_RETURN())
		expect(returnValue).toEqual(MOCKS.STATUS_FACTORY.GET_OK_STATUS())
	})

	test('It should a response with the pending value', async () => {
		const returnValue = factory.status.getInspectionStatus(
			MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_UNABLETOPAY_JUSTSETOFFEEDBACKS_VALID_RETURN())
		expect(returnValue).toEqual(MOCKS.STATUS_FACTORY.GET_PENDING_STATUS())
	})

	test('It should a response with the refused value', async () => {
		const returnValue = factory.status.getInspectionStatus(
			MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_REFUSED_SUCCESS_RESPONSE().data)
		expect(returnValue).toEqual(MOCKS.STATUS_FACTORY.GET_REFUSED_STATUS())
	})

	test('It should a response with the pending value when protolData is invalid', async () => {
		const returnValue = factory.status.getInspectionStatus(null)
		expect(returnValue).toEqual(MOCKS.STATUS_FACTORY.GET_PENDING_STATUS())
	})

	test('It should a response with the issued value', async () => {
		const returnValue = factory.status.getInspectionStatus(
			MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_ISSUED_SUCCESS_RESPONSE().data)
		expect(returnValue).toEqual(MOCKS.STATUS_FACTORY.GET_ISSUED_STATUS())
	})
})
