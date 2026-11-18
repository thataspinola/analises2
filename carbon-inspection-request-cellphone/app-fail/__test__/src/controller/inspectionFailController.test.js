const MOCKS = require('../../mocks/inspectionFailController.mock')
const integration = require('../../../src/integration')
const controller = require('../../../src/controller')
const service = require('../../../src/service')
const factory = require('../../../src/factory')
const api = require('../../../src/api')

jest.mock('../../../src/integration')
jest.mock('../../../src/service', () => ({
	validation: {
		validateInputData: jest.fn(),
	},
	logger: {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
	},
}))
jest.mock('../../../src/factory')
jest.mock('../../../src/api')

describe('Suite de testes de inspectionFailController.js', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Deve validar a entrada e invocar a o emailNotificationApi com sucesso', async () => {
		factory.emailNotification.createPayload.mockReturnValue(MOCKS.PAYLOAD)
		api.emailNotification.invoke.mockResolvedValue()
		integration.sqs.send.mockResolvedValue()

		await controller.inspectionFail.processInspectionFail(MOCKS.VALID_MESSAGE)

		expect(service.validation.validateInputData).toHaveBeenCalledWith(
			MOCKS.VALID_MESSAGE
		)
		expect(factory.emailNotification.createPayload).toHaveBeenCalledWith(
			MOCKS.VALID_MESSAGE
		)
		expect(api.emailNotification.invoke).toHaveBeenCalledWith(MOCKS.PAYLOAD)
		expect(integration.sqs.send).toHaveBeenCalledWith(MOCKS.VALID_MESSAGE)
	})

	test('Deve retornar um erro quando a validação da entrada falhar', () => {
		const validationError = new Error('Validation failed')
		service.validation.validateInputData.mockImplementationOnce(() => {
			throw validationError
		})

		expect(() =>
			controller.inspectionFail.processInspectionFail(MOCKS.VALID_MESSAGE)
		).rejects.toThrow('Validation failed')
	})

	test('Deve retornar um erro quando a invocação da emailNotificationApi falhar', () => {
		const error = new Error('504 Timeout')
		api.emailNotification.invoke.mockImplementationOnce(() => {
			throw error
		})

		expect(() =>
			controller.inspectionFail.processInspectionFail(MOCKS.VALID_MESSAGE)
		).rejects.toThrow('504 Timeout')
	})

	test('Deve logar um warn quando o envio da mensagem para a DLQ falhar', async () => {
		factory.emailNotification.createPayload.mockReturnValue(MOCKS.PAYLOAD)
		api.emailNotification.invoke.mockResolvedValue()
		const error = new Error('SQS Error')
		integration.sqs.send.mockImplementationOnce(() => {
			throw error
		})

		const spyLogger = jest.spyOn(service.logger, 'warn')

		await controller.inspectionFail.processInspectionFail(MOCKS.VALID_MESSAGE)

		expect(spyLogger).toHaveBeenCalledWith(
			{
				error: true,
				message: 'SQS Error',
			},
			`Não foi possível enviar o evento para a DLQ de Inspeção do Celular, porém o envio para a email-notification ocorreu com sucesso.`
		)
	})
})
