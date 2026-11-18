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
		MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_PARSEDJSONQUEUEMESSAGE_INPUT()
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

	api.portoAssistencia.b2c.v1.cupom.putConsumoEndpoint = jest
		.fn()
		.mockResolvedValue('api-response')
	factory.controller.processSqsMessage.receivedDataReport.getDataReport = jest
		.fn()
		.mockReturnValue('payload')
	factory.api.portoAssistencia.b2c.v1.cupomApi.putConsumoEndpointFactory.getConsumoPayload = jest
		.fn()
		.mockReturnValue('couponRedeemData')
	serviceOrderLayer.setServiceOrderCouponRedeemData = jest
		.fn()
		.mockResolvedValue()
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
				MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_PARSEDJSONQUEUEMESSAGE_INPUT()
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
		).rejects.toThrow('Validation error')
		expect(service.logger.error).toHaveBeenCalledWith(
			expect.stringContaining('Validation error')
		)
	})
	test('It should throw exception when an unexpected exception occurs during input validation', async () => {
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

		service.validation.inputData.mockImplementationOnce(() => {
			throw new Error('Unexpected validation error')
		})

		await expect(
			controller.processSnsSqsMessage.process(
				MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_INVALID_PARSEDJSONQUEUEMESSAGE_INPUT()
			)
		).rejects.toThrow('Unexpected validation error')
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			expect.stringContaining("Erro identificado durante 'Validação dos dados': Unexpected validation error")
		)
	})
	test('It should handle general error', async () => {
		jest
			.spyOn(controller.processSnsSqsMessage, 'process')
			.mockRejectedValue(new Error('General error'))

		await expect(
			controller.processSnsSqsMessage.process(parsedSnsMessage, carbonTraceId)
		).rejects.toThrow('General error')
	})
})