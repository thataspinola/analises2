const errors = require('../../../src/error')
const token = require('@porto-seguro/hub-vendas.carbon-token')
const serviceOrderLayer = require('@porto-seguro/hub-vendas.carbon-acq-service-order-layer')
const service = require('../../../src/service')
const factory = require('../../../src/factory')
const api = require('../../../src/api')
const controller = require('../../../src/controller')
const MOCKS = require('../../../__test__/mocks/index.mock')

jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('@porto-seguro/hub-vendas.carbon-acq-service-order-layer')
jest.mock('../../../src/service')
jest.mock('../../../src/factory')

afterEach(() => {
	jest.clearAllMocks()
})

let parsedSnsMessage
let carbonTraceId
let processMock
let response

beforeEach(() => {
	parsedSnsMessage =
		MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_PARSEDJSONQUEUEMESSAGE_PAYLOAD_INPUT()
	carbonTraceId = 'test-trace-id'
	response = { couponId: 'test-coupon-id' }

	processMock = jest.spyOn(controller.processSnsSqsMessage, 'process')

	service.validation.inputData = jest.fn()
	service.logger = {
		info: jest.fn(),
		warn: jest.fn(),
		error: jest.fn(),
	}

	token.getSensediaTokenHub.mockImplementation(() => {
		return MOCKS.SENSEDIA_HUB_TOKEN()
	})

	api.assistencia.webhook.oschassi.checkinOsApi.postCheckinOs = jest
		.fn()
		.mockResolvedValue('api-response')
	factory.controller.serviceOrderCheckinData.getPayload = jest
		.fn()
		.mockReturnValue('payload')
	factory.api.asssitencia.webhook.oschassi.checkinOsApi.postCheckinOsPayload.getPayload =
		jest.fn().mockReturnValue('checkinData')
	serviceOrderLayer.setServiceOrderCheckinData = jest.fn().mockResolvedValue()
})

afterEach(() => {
	processMock.mockRestore()
})

describe('process', () => {
	test('It should process the message successfully', async () => {
		controller.processSnsSqsMessage.process = jest
			.fn()
			.mockResolvedValue(
				MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_RETURN()
			)
		await expect(
			controller.processSnsSqsMessage.process(
				MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_PARSEDJSONQUEUEMESSAGE_PAYLOAD_INPUT()
			)
		).resolves.toEqual(
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_RETURN()
		)
	})

	test('It should handle validation error', async () => {
		service.validation.inputData.mockImplementation(() => {
			throw new errors.ValidationError('Validation error')
		})

		await expect(
			controller.processSnsSqsMessage.process(parsedSnsMessage, carbonTraceId)
		).rejects.toThrow(
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_INPUT_VALIDATION_EXCEPTION_MESSAGE()
		)
		expect(service.logger.error).toHaveBeenCalledWith(
			expect.stringContaining('Validation error')
		)
	})

	test('It should handle general error', async () => {
		service.validation.inputData.mockImplementation(() => {
			throw new Error('General error')
		})

		await expect(
			controller.processSnsSqsMessage.process(parsedSnsMessage, carbonTraceId)
		).rejects.toThrow(
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_GENERIC_EXCEPTION_MESSAGE_BEGINNING(
				'General error'
			)
		)
		expect(service.logger.error).toHaveBeenCalledWith(
			expect.stringContaining('General error')
		)
	})
	test('It should handle errors when calling the API', async () => {
		const parsedSnsMessage =
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_PAYLOAD_SERVICE_ORDER_HANDLE_ERRORS()
		const carbonTraceId = 'test-trace-id'
		const errorMessage = 'API call failed'

		factory.api.asssitencia.webhook.oschassi.checkinOsApi.postCheckinOsPayload.getPayload.mockReturnValue(
			'mockedDataPayload'
		)
		api.assistencia.webhook.oschassi.checkinOsApi.postCheckinOs.mockRejectedValue(
			new Error(errorMessage)
		)

		await expect(
			controller.processSnsSqsMessage.process(parsedSnsMessage, carbonTraceId)
		).rejects.toThrow(errorMessage)

		expect(service.logger.error).toHaveBeenCalledWith(
			expect.stringContaining('Chamada do endpoint de API postCheckinOs')
		)
	})
})
