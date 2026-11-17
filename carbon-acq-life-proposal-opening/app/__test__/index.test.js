const controller = require('../src/controller')
const { handler } = require('../index')
const MOCKS = require('./mocks/index.mock')
const factory = require('../src/factory')

jest.mock('../src/controller')
jest.mock('../src/factory/traceFactory.js')

afterEach(() => {
	jest.clearAllMocks()
})

beforeAll(() => {
	logger = {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	}
})
describe('Given a request', () => {
	test('It should receive the request with error on parsed', async () => {
		const messageError = 'Error'

		factory.trace.createdTraceId.mockImplementation(() => {return '123312'})

		controller.proposalController.process.mockImplementation(() => {
			return MOCKS.CONTROLLER_PROPOSAL_OPENING_ERROR(messageError)
		})

		const response = await handler(MOCKS.VALID_INPUT_HANDLER())

		expect(response).toEqual(
			MOCKS.HANDLER_FAIL_RETURN_WITH_DEFAULT_ERROR(messageError)
		)
	})

	test('It should test the controller request successfully', async () => {
		controller.proposalController.process.mockImplementation(() => {
			return MOCKS.CONTROLLER_PROPOSAL_OPENING_VALID_RESPONSE()
		})

		const handlingResult = await controller.proposalController.process(
			MOCKS.VALIDATION_SERVICE_VALID_INPUT_DATA()
		)
		expect(handlingResult).toEqual(
			MOCKS.CONTROLLER_PROPOSAL_OPENING_VALID_RESPONSE()
		)
	})
	
	test('It should receive the request and return successfully', async () => {
		factory.trace.createdTraceId.mockImplementation(() => {return '123312'})

		controller.proposalController.process.mockImplementation(() => {
			return MOCKS.CONTROLLER_PROPOSAL_OPENING_VALID_RESPONSE()
		})
		
		const response = await handler(MOCKS.VALID_INPUT_HANDLER())
		
		expect(response).toEqual(MOCKS.HANDLER_VALID_RETURN())
	})

	test('It should throw error for invalid input', async () => {
		factory.trace.createdTraceId.mockImplementation(() => {return '123312'})

		controller.proposalController.process.mockImplementation(() => {
			return MOCKS.CONTROLLER_PROPOSAL_OPENING_VALID_RESPONSE()
		})

		const response = await handler({body: 123})
	
		expect(response).toEqual(MOCKS.HANDLER_INVALID_RETURN())
		
	})
})
