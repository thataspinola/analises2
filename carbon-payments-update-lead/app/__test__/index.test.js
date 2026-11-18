const logger = require('../src/service/loggerService')
const controller = require('../src/controller')
const MOCKS = require('./mocks/index.mock')
const { handler } = require('..')

jest.mock('../src/service/loggerService')
jest.mock('../src/controller')

describe('Suite de testes do index.js', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Deve retornar sucesso ao enviar uma mensagem válida', async () => {
		const message = {
			body: JSON.stringify(MOCKS.VALID_INPUT_DATA_PAID),
		}

		const event = { Records: [message] }
		controller.updateLead.processSqsMessage.mockResolvedValue()

		const response = await handler(event)

		expect(controller.updateLead.processSqsMessage).toHaveBeenCalledWith(
			JSON.parse(message.body)
		)
		expect(response.batchItemFailures).toEqual([])
	})

	test('Deve retornar sucesso ao não enviar Records e não deve processar nenhuma mensagem', async () => {
		const event = {}
		controller.updateLead.processSqsMessage.mockResolvedValue()

		const response = await handler(event)

		expect(controller.updateLead.processSqsMessage).not.toHaveBeenCalled()
		expect(response.batchItemFailures).toEqual([])
	})

	test('Deve registrar um erro e retorna uma falha para uma mensagem com formato JSON inválido', async () => {
		const record = { body: 'invalid JSON', messageId: '123' }
		const event = { Records: [record] }

		const response = await handler(event)

		expect(logger.error).toHaveBeenCalledWith(
			expect.stringContaining('Error processing the message with id 123')
		)
		expect(response.batchItemFailures).toEqual([{ itemIdentifier: '123' }])
	})

	test('Deve registrar um erro e retorna uma falha para uma mensagem quando o body não for uma string', async () => {
		const record = { body: 12345, messageId: '123' }
		const event = { Records: [record] }

		const response = await handler(event)

		expect(logger.error).toHaveBeenCalledWith(
			expect.stringContaining('Error processing the message with id 123')
		)
		expect(response.batchItemFailures).toEqual([{ itemIdentifier: '123' }])
	})
})
