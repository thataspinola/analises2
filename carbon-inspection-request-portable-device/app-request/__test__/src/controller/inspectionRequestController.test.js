const paymentDatalayer = require('@porto-seguro/hub-vendas.carbon-postponed-payment-data-layer')
const token = require('@porto-seguro/hub-vendas.carbon-token')

const MOCKS = require('../../mocks/index.mock')
const api = require('../../../src/api')
const controller = require('../../../src/controller')
const errors = require('../../../src/error')
const service = require('../../../src/service')

const FAKE_TOKEN = '123456'
const FAKE_CERTIFICATES = [
	'`-----BEGIN CERTIFICATE-----<CERTIFICATE>-----END CERTIFICATE-----',
]

jest.mock('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeAll(() => {
	service.logger.info.mockImplementation((_message) => {})
	service.logger.error.mockImplementation((_message) => {})
	service.logger.warn.mockImplementation((_message) => {})
	service.logger.debug.mockImplementation((_message) => {})

	token.getMulesoftTokenHubInternal = jest.fn(async () => {
		return FAKE_TOKEN
	})

	token.getPortoCertificates = jest.fn(async () => {
		return FAKE_CERTIFICATES
	})

	paymentDatalayer.savePaymentData = jest.fn(async () => {
		return {}
	})
})

describe('Suite de testes de inspectionRequestController.js', () => {
	describe('Quando sucesso', () => {
		test.skip('Deve chamar o serviço de proposta e postar uma mensagem na fila do google-analytics', async () => {
			const spyApiProposal = jest
				.spyOn(api.proposal, 'execute')
				.mockImplementation(() => {
					return MOCKS.API_PROPOSAL.VALID_RESPONSE()
				})

			const spyServiceSendMessage = jest
				.spyOn(service.sqs.queue, 'sendMessage')
				.mockImplementation(() => {
					return '1'
				})

			const response = await controller.inspectionRequest.process(
				MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_INPUT()
			)

			expect(response).toEqual(
				MOCKS.CONTROLLER_INSPECTION_REQUEST.SUCCESS_RESPONSE()
			)

			expect(spyApiProposal).toHaveBeenCalledWith(
				MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_INPUT().integrationData,
				FAKE_TOKEN,
				FAKE_CERTIFICATES
			)
			expect(spyServiceSendMessage).toHaveBeenCalledWith(
				MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_GOOGLE_ANALYTICS_MESSAGE()
			)
		})

		test.skip('Dado input sem dados de analytics, deve chamar o serviço de proposta e NÃO postar uma mensagem na fila do google-analytics', async () => {
			const spyApiProposal = jest
				.spyOn(api.proposal, 'execute')
				.mockImplementation(() => {
					return MOCKS.API_PROPOSAL.VALID_RESPONSE()
				})

			const spyServiceSendMessage = jest.spyOn(service.sqs.queue, 'sendMessage')

			const response = await controller.inspectionRequest.process(
				MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_INPUT_WITHOUT_ANALYTICS_DATA()
			)
			expect(response).toEqual(
				MOCKS.CONTROLLER_INSPECTION_REQUEST.SUCCESS_RESPONSE()
			)
			expect(spyApiProposal).toHaveBeenCalledWith(
				MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_INPUT_WITHOUT_ANALYTICS_DATA()
					.integrationData,
				FAKE_TOKEN,
				FAKE_CERTIFICATES
			)
			expect(spyServiceSendMessage).not.toHaveBeenCalled()
		})
	})

	describe('Quando falha', () => {
		test.skip('Deve retornar esquema de erro de validação', async () => {
			jest.spyOn(service.validation, 'inputData').mockImplementationOnce(() => {
				throw new errors.ValidationError('validation')
			})
			const jestApi = jest.spyOn(api.proposal, 'execute')
			const spyServiceSendMessage = jest.spyOn(service.sqs.queue, 'sendMessage')

			await expect(
				controller.inspectionRequest.process(
					MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_INPUT()
				)
			).rejects.toThrow('validation')

			expect(jestApi).not.toHaveBeenCalled()
			expect(spyServiceSendMessage).not.toHaveBeenCalled()
		})

		test.skip('Deve retornar erro na chamada da API', async () => {
			const jestApi = jest
				.spyOn(api.proposal, 'execute')
				.mockImplementationOnce(() => {
					throw new Error('Error call api')
				})

			const spyServiceSendMessage = jest.spyOn(service.sqs.queue, 'sendMessage')

			await expect(
				controller.inspectionRequest.process(
					MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_INPUT()
				)
			).rejects.toThrow('Error call api')

			expect(jestApi).toHaveBeenCalledWith(
				MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_INPUT().integrationData,
				FAKE_TOKEN,
				FAKE_CERTIFICATES
			)
			expect(spyServiceSendMessage).not.toHaveBeenCalled()
		})

		test.skip('Deve retornar erro quando serviço de proposta não retornar o numeroProposta', async () => {
			const spyApiProposal = jest
				.spyOn(api.proposal, 'execute')
				.mockImplementation(() => {
					return {}
				})

			const spyServiceSendMessage = jest.spyOn(service.sqs.queue, 'sendMessage')

			await expect(
				controller.inspectionRequest.process(
					MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_INPUT()
				)
			).rejects.toThrow('idTransaction não localizado.')

			expect(spyApiProposal).toHaveBeenCalledWith(
				MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_INPUT().integrationData,
				FAKE_TOKEN,
				FAKE_CERTIFICATES
			)
			expect(spyServiceSendMessage).not.toHaveBeenCalled()
		})

		test.skip('Deve logar erro se não conseguir postar mensagem na fila do goole-analytics', async () => {
			const spyApiProposal = jest
				.spyOn(api.proposal, 'execute')
				.mockImplementation(() => {
					return MOCKS.API_PROPOSAL.VALID_RESPONSE()
				})

			const exception = new Error('erro ao postar msg na fila')
			const spyServiceSendMessage = jest
				.spyOn(service.sqs.queue, 'sendMessage')
				.mockImplementation(() => {
					throw exception
				})

			const spyLogger = jest.spyOn(service.logger, 'error')

			await controller.inspectionRequest.process(
				MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_INPUT()
			)

			expect(spyApiProposal).toHaveBeenCalledWith(
				MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_INPUT().integrationData,
				FAKE_TOKEN,
				FAKE_CERTIFICATES
			)
			expect(spyServiceSendMessage).toHaveBeenCalledWith(
				MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_GOOGLE_ANALYTICS_MESSAGE()
			)

			expect(spyLogger).toHaveBeenCalledWith(
				exception,
				'Erro ao enviar mensagem para a fila que faz envio dos dados de tagueamento para o google-analytics'
			)
		})
	})
})
