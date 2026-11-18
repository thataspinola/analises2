const { mockClient } = require('aws-sdk-client-mock')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const activity = require('../../../../src/controller/activity')
const service = require('../../../../src/service')

jest.mock('@aws-sdk/client-sqs')
jest.mock('../../../../src/service')

describe('googleAppointmentConversionActivity', () => {
	const mockLoggerInfo = jest.fn()
	const mockLoggerError = jest.fn()

	const sqsClientMock = mockClient(SQSClient)

	beforeAll(() => {
		service.logger = {
			info: mockLoggerInfo,
			error: mockLoggerError,
		}
	})

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should send a message to SQS when rwgToken is present in integrationData.googleAppointmentConversion.rwgToken', async () => {
		const parsedSqsMessage = {
			integrationData: {
				googleAppointmentConversion: {
					rwgToken: 'testToken',
				},
			},
		}

		sqsClientMock
			.on(SendMessageCommand)
			.resolves({ MessageId: 'mockMessageId' })

		await activity.googleAppointmentConversion.execute(parsedSqsMessage)

		expect(mockLoggerInfo).toHaveBeenCalledWith(
			{ output: { MessageId: 'mockMessageId' } },
			'Mensagem enviada com sucesso para fila - google appointments conversion'
		)
	})

	it('should not send a message to SQS when rwgToken is not present in integrationData.googleAppointmentConversion.rwgToken', async () => {
		const parsedSqsMessage = {
			integrationData: {
				googleAppointmentConversion: {},
			},
		}

		await activity.googleAppointmentConversion.execute(parsedSqsMessage)

		expect(mockLoggerInfo).not.toHaveBeenCalled()
		expect(mockLoggerError).not.toHaveBeenCalled()
	})

	it('should log an error if sending message to SQS fails', async () => {
		const parsedSqsMessage = {
			integrationData: {
				googleAppointmentConversion: {
					rwgToken: 'testToken',
				},
			},
		}

		const error = new Error('SQS send error')
		sqsClientMock.on(SendMessageCommand).rejects(error)

		await activity.googleAppointmentConversion.execute(parsedSqsMessage)

		expect(mockLoggerError).toHaveBeenCalledWith(
			error,
			expect.stringContaining(
				"Erro identificado durante a atividade 'Verificação e envio de rwgToken para fila SQS para processamento/conversão pós criação de OS'"
			)
		)
	})
})
