const api = require('../../../src/api')
const factory = require('../../../src/factory')
const service = require('../../../src/service')
const CONSTANT = require('../../../src/property')
const MOCKS = require('../../mocks/index.mock')
const controller = require('../../../src/controller')
const token = require('@porto-seguro/hub-vendas.carbon-token')

jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/api')
jest.mock('../../../src/service')
jest.mock(
	'../../../src/factory/automovel/propostaCriticasApi/postPagamentoCheckoutPayloadFactory'
)

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeAll(() => {
	service.validation.inputData.mockImplementation(() => {
		//Do nothing (no validation errors)
	})

	service.logger = {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	}

	token.getSensediaTokenCarbonCloud.mockImplementation(async () => {
		return MOCKS.SENSEDIA_CARBON_CLOUD()
	})

	factory.automovel.propostaCriticasApi.postPagamentoCheckoutPayload.getPayload.mockImplementation(
		(parsedSQSMessage, codigoFormaPagamento) => {
			return MOCKS.FACTORY_AUTOMOVEL_PROPOSTA_CRITICAS_POSTPAGAMENTOCHECKOUTPAYLOAD.GETPAYLOAD_VALID_RETURN()
		}
	)

	api.automovel.propostaCriticas.postPagamentoCheckout.mockImplementation(
		(payload, sensediaCloudToken) => {
			return MOCKS.API_AUTOMOVEL_PROPOSTACRITICAS_PAGAMENTOCHECKOUT.POSTPAGAMENTOCHECKOUT_VALID_RETURN()
		}
	)
})

describe('processSqsMessage', () => {
	test('should process the SQS message successfully and return the expected response', async () => {
		const response = await controller.auto.processSqsMessage(
			MOCKS.VALID_CONTROLLER_INPUT_REQUEST()
		)

		expect(response).toEqual({
			status: 'Informe do pagamento disparado com sucesso',
		})
	})
})
