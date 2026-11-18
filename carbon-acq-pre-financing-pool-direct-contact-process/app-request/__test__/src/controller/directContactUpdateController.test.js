const MOCKS = require('../../mocks/index.mock')
const controller = require('../../../src/controller')
const service = require('../../../src/service')
const factory = require('../../../src/factory')
const erros = require('../../../src/error')
const { mockClient } = require('aws-sdk-client-mock')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')

jest.mock('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

const sqsMock = mockClient(SQSClient)

beforeAll(() => {
	service.logger = {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	}

	service.validation.inputData.mockImplementation(() => {
		//Do nothing (no validation errors)
	})

	factory.response.success = jest.fn(() => {
		return MOCKS.CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_SUCCESS_RETURN()
	})

	sqsMock
		.on(SendMessageCommand)
		.resolves(MOCKS.CONTROLLER_DIRECTCONTACT_VALID_SQS_RESPONSE())
})

describe('Given a valid input', () => {
	test('It should pass with no validation errors, send message to queue and return success', async () => {
		const directContactProcessRequestResponse =
			await controller.directContactUpdate.process(
				MOCKS.CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_VALID_INPUT()
			)

		expect(directContactProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should get an exception when receive an invalid json structure as string input, throwing an error', async () => {
		service.validation.inputData.mockImplementationOnce(() => {
			throw new erros.ValidationError('Invalid payload')
		})
		const directContactProcessRequestResponse =
			await controller.directContactUpdate.process(
				MOCKS.CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_INVALID_JSON_INPUT()
			)
		expect(directContactProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_DIRECTCONTACT_UPDATE_PROCESSREQUEST_INVALID_JSON_INPUT_INTERNAL_ERROR()
		)
	})
})
