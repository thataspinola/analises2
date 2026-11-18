const MOCKS = require('./mocks/index.mock')
const controller = require('./../src/controller')
const index = require('./../index')
const factory = require('./../src/factory')

jest.mock('../logger')
jest.mock('./../src/controller')
jest.mock('./../src/factory/traceFactory')

beforeEach(() => {
	controller.consents.process.mockImplementation(() => MOCKS.RESPONSE_CONSENTS_CONTROLLER())
	factory.trace.generateTraceId.mockImplementation(() => MOCKS.TRACE_ID())
})

describe('Tests for index.js', () => {
	test('It should return success when call lambdaHandler', async () => {
		const consents = await index.handler(MOCKS.VALID_EVENT())
	
		expect(consents).toEqual(MOCKS.RESPONSE_CONSENTS_HANDLER())
	})

	test('It should return badRequest when call lambdaHandler', async () => {
		const consents = await index.handler(MOCKS.INVALID_EVENT())

		expect(consents).toEqual(MOCKS.RESPONSE_CONSENTS_HANDLER_BAD_REQEUST())
	})

	test('It should return INTERNAL_SERVER_ERROR when call lambdaHandler', async () => {
		JSON.parse = jest.fn(() => { throw new Error('Parse Error') })
		
		const consents = await index.handler(MOCKS.VALID_EVENT())

		expect(consents).toEqual(MOCKS.RESPONSE_CONSENTS_HANDLER_ERROR())
	})
})