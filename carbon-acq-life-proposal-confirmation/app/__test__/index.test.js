const controller = require('../src/controller')
const { handler } = require('../index')
const mocks = require('./mocks')
const factory = require('./../src/factory')
const error = require('./../src/error')

jest.mock('../src/controller')
jest.mock('../src/factory/traceFactory.js')

describe('Suite de Testes proposalController.js', () => {
	afterEach(() => {
		jest.restoreAllMocks()
	})

	test('Deve invocar o proposalController somente uma vez', async () => {
		expect(controller.proposalController.process).not.toBeCalled()

		await handler(mocks.INVOKER_PAYLOAD_STRING)

		expect(controller.proposalController.process).toBeCalledTimes(1)
	})

	test('Deve invocar o proposalController com os argumentos corretos', async () => {
		factory.trace.createdTraceId.mockImplementation(() => {return '123312'})

		await handler({body:JSON.stringify(mocks.PROPOSAL_API_REQUEST)})

		expect(controller.proposalController.process).toBeCalledWith(
			mocks.PROPOSAL_API_REQUEST, '123312', '99999999'
		)
	})

	test('Deve retornar uma resposta de sucesso no padrão correto', async () => {
		controller.proposalController.process.mockReturnValueOnce(
			mocks.RESPONSE_CONTROLLER_SUCCESS
		)
		factory.trace.createdTraceId.mockImplementation(() => {return '123312'})

		const response = await handler(mocks.INVOKER_PAYLOAD_STRING)

		expect(response).toHaveProperty('statusCode')
		expect(response.statusCode).toBe(201)
		expect(response).toHaveProperty('body')
		expect(response.body).toEqual(mocks.HANDLER_RESPONSE.body)
	})

	test('Deve retornar uma resposta sucesso com uma resposta de PR05', async () => {
		controller.proposalController.process.mockImplementationOnce(() => {
			return {
				statusCode: 200,
				body: {
					valido: false,
					quantidadeReprocessamento: 0,
					mensagens: [{ codigo: 'PR05', descricao: 'Dados do segurado inválidos' }]
				}
			} 
		})

		const response = await handler(mocks.INVOKER_PAYLOAD_STRING)

		const bodyJson = JSON.parse(response.body)

		expect(bodyJson.mensagens).toEqual([{ codigo: 'PR05', descricao: 'Dados do segurado inválidos' }])
	})

	test('Deve retornar uma resposta de erro no padrão correto', async () => {
		controller.proposalController.process.mockImplementationOnce(() => {
			return mocks.CONTROLLER_ERROR
		})
		factory.trace.createdTraceId.mockImplementation(() => {return '123312'})

		const response = await handler(mocks.INVOKER_PAYLOAD_STRING)

		expect(response).toEqual(mocks.HANDLER_RESPONSE_ERROR)
	})

	test('Deve retornar uma resposta de erro ', async () => {
		factory.trace.createdTraceId.mockImplementation(() => {return '123312'})

		const response = await handler({body: 123})

		expect(response.statusCode).toEqual(400)
		expect(response).toEqual(mocks.HANDLER_RESPONSE_BAD_REQUEST)
	})
})