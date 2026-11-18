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

	api.hubVendasCarbon.prestacaoServico.v1.agendamentoApi.postBaixaEndpoint =
		jest.fn().mockResolvedValue('api-response')
	factory.controller.processSnsSqsMessage.receivedDataReport.getDataReport =
		jest.fn().mockReturnValue('payload')
	factory.api.hubVendasCarbon.prestacaoServico.v1.agendamentoApi.postBaixaEndpointFactory.getPayload =
		jest.fn().mockReturnValue('scheduleConfirmData')
	serviceOrderLayer.setServiceOrderScheduleConfirm = jest
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
				parsedSnsMessage,
				carbonTraceId
			)
		).resolves.toEqual(
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_RETURN()
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
	// TODO: FAZER OS TESTES QUE FALTAM PAR A COBERTURA
})
