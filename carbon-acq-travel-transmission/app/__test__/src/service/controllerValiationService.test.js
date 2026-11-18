const service = require('../../../src/service')
const MOCKS = require('../../mocks/src/service/controllerValidationService.mock')

beforeAll(() => {})

afterEach(() => {
	jest.clearAllMocks()
})

describe('Scenario to testing checkout fields', () => {
	let input
	beforeEach(() => {
		input = MOCKS.INPUT_REQUEST_SIMPLE_PAYLOAD()
	})

	test('It should test complete payload', () => {
		expect(() => service.controllerValidation.checkoutItemData()).toThrow(
			`No payload received to process the request`
		)
	})

	test('It should test orderPaymentId', () => {
		delete input.orderPaymentId

		expect(() => service.controllerValidation.checkoutItemData(input)).toThrow(
			`The field 'orderPaymentId' was not found in the request`
		)
	})

	test('It should test orderNumber', () => {
		delete input.orderNumber

		expect(() => service.controllerValidation.checkoutItemData(input)).toThrow(
			`The field 'orderNumber' was not found in the request`
		)
	})

	test('It should test chargeId', () => {
		delete input.chargeId

		expect(() => service.controllerValidation.checkoutItemData(input)).toThrow(
			`The field 'chargeId' was not found in the request`
		)
	})

	test('It should test integrationData', () => {
		delete input.integrationData

		expect(() => service.controllerValidation.checkoutItemData(input)).toThrow(
			`The field 'integrationData' was not found in the request`
		)
	})
})
