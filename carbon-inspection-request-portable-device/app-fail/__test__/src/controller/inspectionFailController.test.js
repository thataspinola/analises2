const MOCKS = require('../../mocks/index.mock')
const api = require('../../../src/api')
const controller = require('../../../src/controller')
const errors = require('../../../src/error')
const service = require('../../../src/service')

jest.mock('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

beforeAll(() => {
	service.logger.info.mockImplementation((_message) => {})
	service.logger.error.mockImplementation((_message) => {})
	service.logger.warn.mockImplementation((_message) => {})
	service.logger.debug.mockImplementation((_message) => {})
})

describe('Suite de testes de inspectionFailController.js', () => {
	describe('Quando sucesso', () => {
		test('Deve chamar o serviço de notificação de email e postar uma mensagem na fila DLQ', async () => {
			const spyApiEmailNotification = jest
				.spyOn(api.emailNotification, 'execute')
				.mockImplementation(() => {
					return MOCKS.API_EMAIL_NOTIFICATION.VALID_RESPONSE()
				})

			const spyServiceSendMessage = jest
				.spyOn(service.sqs.queue, 'sendMessage')
				.mockImplementation(() => {
					return '1'
				})

			await controller.inspectionFail.process(
				MOCKS.CONTROLLER_INSPECTION_FAIL.VALID_INPUT()
			)

			expect(spyApiEmailNotification).toHaveBeenCalledWith(
				MOCKS.CONTROLLER_INSPECTION_FAIL.VALID_PAYLOAD()
			)

			expect(spyServiceSendMessage).toHaveBeenCalledWith(
				MOCKS.CONTROLLER_INSPECTION_FAIL.VALID_INPUT()
			)
		})

		test('Deve logar um warn quando o envio da mensagem para a DLQ falhar', async () => {
			const spyServiceSendMessage = jest
				.spyOn(service.sqs.queue, 'sendMessage')
				.mockImplementationOnce(() => {
					throw new Error('SQS Error')
				})

			const spyLogger = jest.spyOn(service.logger, 'warn')

			await controller.inspectionFail.process(
				MOCKS.CONTROLLER_INSPECTION_FAIL.VALID_INPUT()
			)

			expect(spyServiceSendMessage).toHaveBeenCalledWith(
				MOCKS.CONTROLLER_INSPECTION_FAIL.VALID_INPUT()
			)

			expect(spyLogger).toHaveBeenCalledWith(
				{
					error: true,
					message: 'SQS Error',
				},
				`Não foi possível enviar o evento para a DLQ de Inspeção de Equipamentos Portáteis, porém o envio para a email-notification ocorreu com sucesso.`
			)
		})
	})

	describe('Quando falha', () => {
		test('Deve retornar esquema de erro de validação', async () => {
			jest.spyOn(service.validation, 'inputData').mockImplementationOnce(() => {
				throw new errors.ValidationError('validation')
			})
			const jestApi = jest.spyOn(api.emailNotification, 'execute')
			const spyServiceSendMessage = jest.spyOn(service.sqs.queue, 'sendMessage')

			await expect(
				controller.inspectionFail.process(
					MOCKS.CONTROLLER_INSPECTION_FAIL.VALID_INPUT()
				)
			).rejects.toThrow('validation')

			expect(jestApi).not.toHaveBeenCalled()
			expect(spyServiceSendMessage).not.toHaveBeenCalled()
		})

		test.skip('Deve retornar erro na chamada da API', async () => {
			const jestApi = jest
				.spyOn(api.emailNotification, 'execute')
				.mockImplementationOnce(() => {
					throw new Error('Error call api')
				})

			const spyServiceSendMessage = jest.spyOn(service.sqs.queue, 'sendMessage')

			await expect(
				controller.inspectionFail.process(
					MOCKS.CONTROLLER_INSPECTION_FAIL.VALID_INPUT()
				)
			).rejects.toThrow('Error call api')

			expect(jestApi).toHaveBeenCalledWith(
				MOCKS.CONTROLLER_INSPECTION_FAIL.VALID_PAYLOAD()
			)
			expect(spyServiceSendMessage).not.toHaveBeenCalled()
		})

		test('Deve logar um warn quando o envio da mensagem para a DLQ falhar', async () => {
			const spyServiceSendMessage = jest
				.spyOn(service.sqs.queue, 'sendMessage')
				.mockImplementationOnce(() => {
					throw new Error('SQS Error')
				})

			const spyLogger = jest.spyOn(service.logger, 'warn')

			await controller.inspectionFail.process(
				MOCKS.CONTROLLER_INSPECTION_FAIL.VALID_INPUT()
			)

			expect(spyServiceSendMessage).toHaveBeenCalledWith(
				MOCKS.CONTROLLER_INSPECTION_FAIL.VALID_INPUT()
			)

			expect(spyLogger).toHaveBeenCalledWith(
				{
					error: true,
					message: 'SQS Error',
				},
				`Não foi possível enviar o evento para a DLQ de Inspeção de Equipamentos Portáteis, porém o envio para a email-notification ocorreu com sucesso.`
			)
		})
	})
})
