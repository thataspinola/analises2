const controller = require('../src/controller')
const incomeBracketLambdaHandler = require('../index')
const MOCKS = require('./mocks/index.mock')

jest.mock('../src/controller')

afterEach(() => {
	jest.clearAllMocks()
})

beforeAll(() => {
	controller.incomeBracket.verify.mockImplementation(() => {
		return MOCKS.CONTROLLER_FAIXA_RENDA_VALID_RESPONSE()
	})
})

describe('Given a valid response of handler lambda data from event', () => {
	test('Teste de requisição do controller com sucesso', async () => {
		const handlingResult = await controller.incomeBracket.verify(
			MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE().SENSEDIA_CADASTRO
		)
		expect(handlingResult).toEqual(
			MOCKS.CONTROLLER_FAIXA_RENDA_VALID_RESPONSE()
		)
	})
	it('Deve receber a requisição e retornar com sucesso', async () => {
		const response = await incomeBracketLambdaHandler.handler(MOCKS.CONTEXT())
		expect(response).toEqual(MOCKS.HANDLER_VALID_RETURN())
	})
})

// //TODO: Cobrir com testes unitários os caminhos não felizes
