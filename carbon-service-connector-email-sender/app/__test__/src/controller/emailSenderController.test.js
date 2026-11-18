const MOCKS = require('../../mocks/index.mock')
const token = require('@porto-seguro/hub-vendas.carbon-token')
const controller = require('../../../src/controller')
const errors = require('../../../src/error')
const service = require('../../../src/service')
const factory = require('../../../src/factory')
const api = require('../../../src/api')

jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/service')
jest.mock('../../../src/factory')
jest.mock('../../../src/api')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeEach(() => {
	service.logger.info.mockImplementation(() => {})
	service.logger.error.mockImplementation(() => {})
	service.logger.warn.mockImplementation(() => {})
	service.logger.debug.mockImplementation(() => {})

	service.validation.inputData.mockImplementation(() => {})

	service.emailContent.getEmailHtmlBody.mockImplementation(
		() => MOCKS.GET_EMAIL_BODY_DATA_RESPONSE
	)

	token.getSensediaTokenHub.mockImplementation(() => MOCKS.SENSEDIA_HUB_TOKEN())

	factory.mailService.payloadSendEmail.mockImplementation(() =>
		MOCKS.FACTORY_MAILSERVICE_RETURN()
	)

	api.mailServiceApi.sendEmail.mockImplementation(() =>
		MOCKS.MAILSERVICE_API_SENDEMAIL_SUCCESS_RESPONSE_BODY()
	)
})

describe('Suite de testes do emailSenderController', () => {
	describe('Quando sucesso', () => {
		test('Deve processar corretamente com payload válido e logar sucesso', async () => {
			const spyLoggerInfo = jest.spyOn(service.logger, 'info')

			await controller.emailSender.sendEmail(MOCKS.PAYLOAD_VALID)

			expect(spyLoggerInfo).toHaveBeenCalledWith(
				expect.stringContaining('response API send-email')
			)
		})
	})

	describe('Quando falha', () => {
		test('Deve lançar exceção para payload inválido', async () => {
			service.validation.inputData.mockImplementationOnce(() => {
				throw new errors.ValidationError('Erro de validação')
			})

			await expect(
				controller.emailSender.sendEmail(MOCKS.PAYLOAD_VALID)
			).rejects.toThrow('Erro de validação')
		})

		test('Deve lançar exceção para erro inesperado na validação', async () => {
			service.validation.inputData.mockImplementationOnce(() => {
				throw new Error('Erro inesperado de validação')
			})

			await expect(
				controller.emailSender.sendEmail(MOCKS.PAYLOAD_VALID)
			).rejects.toThrow('Erro inesperado de validação')
		})

		test('Deve lançar exceção para erro ao obter token', async () => {
			const errorMessage = 'Erro ao obter token'
			token.getSensediaTokenHub.mockImplementationOnce(async () => {
				throw new Error(errorMessage)
			})

			await expect(
				controller.emailSender.sendEmail(MOCKS.PAYLOAD_VALID)
			).rejects.toThrow(errorMessage)
		})

		test('Deve lançar exceção para erro no envio de e-mail', async () => {
			const errorMessage = 'Erro no envio de e-mail'
			factory.mailService.payloadSendEmail.mockImplementationOnce(() => {
				throw new Error(errorMessage)
			})

			await expect(
				controller.emailSender.sendEmail(MOCKS.PAYLOAD_VALID)
			).rejects.toThrow(errorMessage)
		})

		test('Deve logar erro ao obter template de e-mail', async () => {
			const spyLoggerError = jest.spyOn(service.logger, 'error')

			service.emailContent.getEmailHtmlBody.mockImplementationOnce(() => {
				throw new Error('Erro ao renderizar template')
			})

			await expect(
				controller.emailSender.sendEmail(MOCKS.PAYLOAD_VALID)
			).rejects.toThrow('Erro ao renderizar template')
			expect(spyLoggerError).toHaveBeenCalledWith(
				expect.stringContaining('error getting template or render')
			)
		})
	})
})
