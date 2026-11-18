const controller = require('../src/controller')
const MOCKS = require('./mocks/index.mock')
const service = require('../src/service')
const { handler } = require('..')

jest.mock('../src/controller')
jest.mock('../src/service', () => ({
	logger: {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
	},
}))

describe('Suite de testes do index.js', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Deve retornar sucesso ao enviar uma mensagem válida', async () => {
		const event = { Records: [MOCKS.VALID_RECORD] }
		controller.inspectionFail.processInspectionFail.mockResolvedValue()

		const response = await handler(event)

		expect(
			controller.inspectionFail.processInspectionFail
		).toHaveBeenCalledWith(JSON.parse(MOCKS.VALID_RECORD.body))
		expect(response.batchItemFailures).toEqual([])
	})

	test('Deve retornar sucesso ao não enviar Records e não deve processar nenhuma mensagem', async () => {
		const event = {}
		controller.inspectionFail.processInspectionFail.mockResolvedValue()

		const response = await handler(event)

		expect(
			controller.inspectionFail.processInspectionFail
		).not.toHaveBeenCalled()
		expect(response.batchItemFailures).toEqual([])
	})

	test('Deve registrar um erro e retorna uma falha para uma mensagem com formato JSON inválido', async () => {
		const record = { body: 'invalid JSON', messageId: '123' }
		const event = { Records: [record] }

		const response = await handler(event)

		expect(service.logger.error).toHaveBeenCalledWith(
			expect.stringContaining('Error processing the message with id 123')
		)
		expect(response.batchItemFailures).toEqual([{ itemIdentifier: '123' }])
	})

	test('Deve registrar um erro e retorna uma falha quando o processamento falhar', async () => {
		const event = {
			Records: [
				MOCKS.VALID_RECORD,
				MOCKS.INVALID_RECORD_SCOPE,
				MOCKS.VALID_RECORD,
				MOCKS.VALID_RECORD,
				MOCKS.INVALID_RECORD_EXTERNAL_ID,
				MOCKS.INVALID_RECORD_ORDER_NUMBER,
			],
		}
		const error = new Error('Processing failed')

		controller.inspectionFail.processInspectionFail.mockResolvedValueOnce()
		controller.inspectionFail.processInspectionFail.mockRejectedValueOnce(error)
		controller.inspectionFail.processInspectionFail.mockResolvedValueOnce()
		controller.inspectionFail.processInspectionFail.mockResolvedValueOnce()
		controller.inspectionFail.processInspectionFail.mockRejectedValueOnce(error)
		controller.inspectionFail.processInspectionFail.mockRejectedValueOnce(error)

		const response = await handler(event)

		expect(service.logger.error).toHaveBeenCalledWith(
			expect.stringContaining(
				`Error processing the message with id ${MOCKS.INVALID_RECORD_SCOPE.messageId}`
			)
		)
		expect(service.logger.error).toHaveBeenCalledWith(
			expect.stringContaining(
				`Error processing the message with id ${MOCKS.INVALID_RECORD_EXTERNAL_ID.messageId}`
			)
		)
		expect(service.logger.error).toHaveBeenCalledWith(
			expect.stringContaining(
				`Error processing the message with id ${MOCKS.INVALID_RECORD_ORDER_NUMBER.messageId}`
			)
		)
		expect(response.batchItemFailures).toEqual([
			{ itemIdentifier: MOCKS.INVALID_RECORD_SCOPE.messageId },
			{ itemIdentifier: MOCKS.INVALID_RECORD_EXTERNAL_ID.messageId },
			{ itemIdentifier: MOCKS.INVALID_RECORD_ORDER_NUMBER.messageId },
		])
	})
})
