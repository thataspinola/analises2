const factory = require('../../../../src/factory')
const MOCKS = require('../../../mocks/index.mock')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeAll(() => {
	jest.useFakeTimers('modern').setSystemTime(new Date(2023, 10, 16))
})

describe('Test suite for the proposalTransmissionApiFactory.js.', () => {
	test('It should a response with the expected payload', async () => {
		expect(
			factory.api.proposalTransmission.getPayload(
				MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_VALID_INPUT()
			)
		).toEqual(
			MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_SUCCESS_RETURN()
		)
	})

	test('It should respond with the expected payload when there is no license plate.', async () => {
		expect(
			factory.api.proposalTransmission.getPayload(
				MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_VALID_INPUT_WITHOUT_PLATE()
			)
		).toEqual(
			MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_SUCCESS_RETURN_WITHOUT_PLATE()
		)
	})

	test('It should respond with the expected payload when there is no card data.', async () => {
		expect(
			factory.api.proposalTransmission.getPayload(
				MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_VALID_INPUT_WITHOUT_DATACARD()
			)
		).toEqual(
			MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_SUCCESS_RETURN_WITHOUT_DATACARD()
		)
	})

	test('It should respond with the expected payload when there is no payment method specified.', async () => {
		expect(
			factory.api.proposalTransmission.getPayload(
				MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_VALID_INPUT_WITHOUT_PAYMENTMETHOD()
			)
		).toEqual(
			MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_SUCCESS_RETURN_WITHOUT_PAYMENTMETHOD()
		)
	})
})
