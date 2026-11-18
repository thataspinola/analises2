const controller = require('../../../src/controller')
const MOCKS = require('../../mocks/src/controller/consentsController.mock')
const activity = require('../../../src/controller/activity')
const error = require('../../../src/error')

jest.mock('../../../logger')
jest.mock('./../../../src/controller/activity')

beforeEach(() => {
	activity.validation.execute.mockImplementation(() => {})
	activity.getToken.execute.mockImplementation(() => 'token')
})

describe('Suite de testes de consentsController.js', () => {

	test('It should return success when call consentsController', async () => {
		activity.consentsAPI.execute.mockImplementation(async () => {
			return MOCKS.RESPONSE_CONSENTS_ACTIVITY_SUCCESS()
		})

		const consents = await controller.consents.process(MOCKS.VALID_INPUT_DATA(), MOCKS.TRACE_ID())

		expect(consents).toEqual(MOCKS.RESPONSE_CONSENTS_CONTROLLER())
	})


	test('It should return success with consentCode NOT_FOUND when call consentsController', async () => {
		activity.consentsAPI.execute.mockImplementation(async () => {
			throw MOCKS.RESPONSE_CONSENTS_ACTIVITY_NOT_FOUND()
		})

		const consents = await controller.consents.process(MOCKS.VALID_INPUT_DATA(), MOCKS.TRACE_ID())

		expect(consents).toEqual(MOCKS.RESPONSE_CONSENTS_NOT_FOUND())
	})

	test('It should return badRequest when validationService return error', async () => {
		const validateError = new error.ValidationError('Error de validação')

		activity.validation.execute.mockImplementation(() => {
			throw validateError
		})
		
		const consents = await controller.consents.process(MOCKS.VALID_INPUT_DATA(), MOCKS.TRACE_ID())

		expect(consents).toEqual(MOCKS.RESPONSE_CONSENTS_CONTROLLER_BAD_REQUEST(
			validateError.message
		))
	})

	test('It should return INTERNAL_SERVER_ERROR when consentsActivity return error', async () => {
		const externalApiError = new error.ExternalApiError.ExternalApiError('internal serve error')

		activity.consentsAPI.execute.mockImplementation(() => {
			throw externalApiError
		})

		const consents = await controller.consents.process(MOCKS.VALID_INPUT_DATA(), MOCKS.TRACE_ID())

		expect(consents).toEqual(MOCKS.RESPONSE_CONSENTS_CONTROLLER_ERROR())
	})
})