const MOCKS = require('./mocks/index.mock')
const controller = require('../src/controller')
const factory = require('../src/factory')
const service = require('../src/service')
const app = require('../index')

jest.mock('../src/controller')
jest.mock('../src/factory')
jest.mock('../src/service')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeAll(() => {
	service.logger.info.mockImplementation(() => {})
	service.logger.error.mockImplementation(() => {})
	service.logger.warn.mockImplementation(() => {})
	service.logger.debug.mockImplementation(() => {})

	factory.controllerResponse.badRequestError.mockImplementation((message) => {
		return MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN(
			message
		)
	})

	factory.controllerResponse.error.mockImplementation((message) => {
		return MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITH_MESSAGE_RETURN(message)
	})
})

describe('Suite de teste do handler do seu app', () => {
	describe('Quando o método HTTP é POST', () => {
		test('Deve processar e retornar um novo carrinho (NEW_CART) para POST', async () => {
			controller.request.process.mockResolvedValueOnce(
				MOCKS.CONTROLLER_REQUEST.VALID_RETURN_NEW_CART()
			)
			const inputPayload = MOCKS.HANDLER.VALID_INPUT_PAYLOAD_POST()

			const parsedBody = JSON.parse(inputPayload.body)
			parsedBody.cartCommerceId = ''
			parsedBody.customerToken = ''
			inputPayload.body = JSON.stringify(parsedBody)

			await expect(app.handler(inputPayload)).resolves.toEqual(
				MOCKS.HANDLER.SUCCESS_RETURN_NEW_CART()
			)

			expect(controller.request.process).toHaveBeenCalledWith(
				{
					...inputPayload.queryStringParameters,
					...JSON.parse(inputPayload.body),
				},
				'POST'
			)
		})

		test('Deve processar e retornar um carrinho existente (EXISTING_CART) para POST', async () => {
			controller.request.process.mockResolvedValueOnce(
				MOCKS.CONTROLLER_REQUEST.VALID_RETURN_EXISTING_CART()
			)
			const inputPayload = MOCKS.HANDLER.VALID_INPUT_PAYLOAD_POST()
			const parsedBody = JSON.parse(inputPayload.body)
			parsedBody.cartCommerceId = 'existingCartId'
			inputPayload.body = JSON.stringify(parsedBody)

			await expect(app.handler(inputPayload)).resolves.toEqual(
				MOCKS.HANDLER.SUCCESS_RETURN_EXISTING_CART()
			)
			expect(controller.request.process).toHaveBeenCalledWith(
				{
					...inputPayload.queryStringParameters,
					...JSON.parse(inputPayload.body),
				},
				'POST'
			)
		})

		test('Deve processar e retornar um carrinho atribuído a um cliente (ASSIGNED_CUSTOMER) para POST', async () => {
			controller.request.process.mockResolvedValueOnce(
				MOCKS.CONTROLLER_REQUEST.VALID_RETURN_ASSIGNED_CUSTOMER()
			)
			const inputPayload = MOCKS.HANDLER.VALID_INPUT_PAYLOAD_POST()
			const parsedBody = JSON.parse(inputPayload.body)
			parsedBody.customerToken = 'customer123'
			parsedBody.cartCommerceId = 'guestCartIdToAssign'
			inputPayload.body = JSON.stringify(parsedBody)

			await expect(app.handler(inputPayload)).resolves.toEqual(
				MOCKS.HANDLER.SUCCESS_RETURN_ASSIGNED_CUSTOMER()
			)
			expect(controller.request.process).toHaveBeenCalledWith(
				{
					...inputPayload.queryStringParameters,
					...JSON.parse(inputPayload.body),
				},
				'POST'
			)
		})
	})

	describe('Quando o método HTTP é GET', () => {
		test('Deve consultar e retornar os detalhes completos de um carrinho para um cliente autenticado', async () => {
			controller.request.process.mockResolvedValueOnce(
				MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_GET_CART_RETURN()
			)
			const inputPayload = MOCKS.HANDLER.VALID_INPUT_PAYLOAD_GET()

			await expect(app.handler(inputPayload)).resolves.toEqual(
				MOCKS.HANDLER.SUCCESS_RETURN_GET_CART()
			)
			expect(controller.request.process).toHaveBeenCalledWith(
				inputPayload.queryStringParameters,
				'GET'
			)
		})

		test('Deve consultar e retornar os detalhes completos de um carrinho de convidado', async () => {
			controller.request.process.mockResolvedValueOnce(
				MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_GET_CART_RETURN()
			)
			const inputPayload = MOCKS.HANDLER.VALID_INPUT_PAYLOAD_GET_WITHOUT_TOKEN()

			await expect(app.handler(inputPayload)).resolves.toEqual(
				MOCKS.HANDLER.SUCCESS_RETURN_GET_CART()
			)
			expect(controller.request.process).toHaveBeenCalledWith(
				inputPayload.queryStringParameters,
				'GET'
			)
		})
	})

	describe('Quando o método HTTP é DELETE', () => {
		test('Deve remover um item do carrinho para um cliente autenticado e retornar o carrinho atualizado', async () => {
			controller.request.process.mockResolvedValueOnce(
				MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_DELETE_ITEM_RETURN()
			)
			const inputPayload = MOCKS.HANDLER.VALID_INPUT_PAYLOAD_DELETE()

			await expect(app.handler(inputPayload)).resolves.toEqual(
				MOCKS.HANDLER.SUCCESS_RETURN_DELETE_ITEM()
			)
			expect(controller.request.process).toHaveBeenCalledWith(
				inputPayload.queryStringParameters,
				'DELETE'
			)
		})

		test('Deve remover um item do carrinho de convidado e retornar o carrinho atualizado', async () => {
			controller.request.process.mockResolvedValueOnce(
				MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_DELETE_ITEM_RETURN()
			)
			const inputPayload =
				MOCKS.HANDLER.VALID_INPUT_PAYLOAD_DELETE_WITHOUT_TOKEN()

			await expect(app.handler(inputPayload)).resolves.toEqual(
				MOCKS.HANDLER.SUCCESS_RETURN_DELETE_ITEM()
			)
			expect(controller.request.process).toHaveBeenCalledWith(
				inputPayload.queryStringParameters,
				'DELETE'
			)
		})
	})

	describe('Quando falha', () => {
		test('Deve retornar erro interno quando o controller falha com erro interno', async () => {
			controller.request.process.mockResolvedValueOnce(
				MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN()
			)

			const inputPayload = MOCKS.HANDLER.VALID_INPUT_PAYLOAD_POST()

			await expect(app.handler(inputPayload)).resolves.toEqual(
				MOCKS.HANDLER.INTERNALERROR_RETURN()
			)
			expect(controller.request.process).toHaveBeenCalledWith(
				{
					...inputPayload.queryStringParameters,
					...JSON.parse(inputPayload.body),
				},
				'POST'
			)
		})

		test('Deve retornar erro de requisição inválida quando o controller falha com bad request', async () => {
			controller.request.process.mockResolvedValueOnce(
				MOCKS.CONTROLLER_REQUEST.BADREQUEST_RETURN()
			)

			const inputPayload = MOCKS.HANDLER.VALID_INPUT_PAYLOAD_POST()

			await expect(app.handler(inputPayload)).resolves.toEqual(
				MOCKS.HANDLER.BADREQUEST_RETURN('Some error message')
			)
			expect(controller.request.process).toHaveBeenCalledWith(
				{
					...inputPayload.queryStringParameters,
					...JSON.parse(inputPayload.body),
				},
				'POST'
			)
		})

		test('Deve retornar erro interno se o payload não for um objeto com httpMethod', async () => {
			const invalidPayload = {
				body: MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT(),
				httpMethod: 'POST',
			}
			await expect(app.handler(invalidPayload)).resolves.toEqual(
				MOCKS.HANDLER.BADREQUEST_RETURN('Input body must be a string')
			)
		})

		test('Deve retornar erro interno quando o body não for uma string (antes do JSON.parse)', async () => {
			const invalidPayload =
				MOCKS.HANDLER.INVALID_INPUT_PAYLOAD_WITH_NON_STRING_BODY()

			await expect(app.handler(invalidPayload)).resolves.toEqual(
				MOCKS.HANDLER.BADREQUEST_RETURN('Input body must be a string')
			)
		})

		test('Deve retornar erro de requisição inválida quando o body for uma string mas não for um JSON válido', async () => {
			const invalidPayload =
				MOCKS.HANDLER.INVALID_INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT()

			await expect(app.handler(invalidPayload)).resolves.toEqual(
				MOCKS.HANDLER.BADREQUEST_RETURN('Invalid JSON format in request body')
			)
		})

		test('Deve retornar erro de bad request para um método HTTP não suportado', async () => {
			const inputPayload = MOCKS.HANDLER.UNSUPPORTED_HTTP_METHOD_PAYLOAD()
			const method = inputPayload.httpMethod

			controller.request.process.mockResolvedValueOnce(
				MOCKS.CONTROLLER_REQUEST.BAD_REQUEST_METHOD_NOT_SUPPORTED_RETURN(method)
			)

			await expect(app.handler(inputPayload)).resolves.toEqual(
				MOCKS.HANDLER.METHOD_NOT_SUPPORTED_RETURN(method)
			)

			expect(controller.request.process).toHaveBeenCalledWith(
				{
					...inputPayload.queryStringParameters,
					...JSON.parse(inputPayload.body),
				},
				method
			)
		})

		test('Deve retornar bad request para GET com cartCommerceId ausente', async () => {
			const inputPayload =
				MOCKS.HANDLER.INVALID_INPUT_PAYLOAD_GET_MISSING_CART_ID()

			controller.request.process.mockResolvedValueOnce(
				MOCKS.CONTROLLER_REQUEST.BADREQUEST_RETURN()
			)

			await expect(app.handler(inputPayload)).resolves.toEqual(
				MOCKS.HANDLER.BADREQUEST_RETURN('Some error message')
			)
			expect(controller.request.process).toHaveBeenCalledWith(
				inputPayload.queryStringParameters,
				'GET'
			)
		})

		test('Deve retornar bad request para DELETE com cartCommerceId ausente', async () => {
			const inputPayload =
				MOCKS.HANDLER.INVALID_INPUT_PAYLOAD_DELETE_MISSING_CART_ID()
			controller.request.process.mockResolvedValueOnce(
				MOCKS.CONTROLLER_REQUEST.BADREQUEST_RETURN()
			)

			await expect(app.handler(inputPayload)).resolves.toEqual(
				MOCKS.HANDLER.BADREQUEST_RETURN('Some error message')
			)
			expect(controller.request.process).toHaveBeenCalledWith(
				inputPayload.queryStringParameters,
				'DELETE'
			)
		})

		test('Deve retornar bad request para DELETE com cartItemUid ausente', async () => {
			const inputPayload =
				MOCKS.HANDLER.INVALID_INPUT_PAYLOAD_DELETE_MISSING_ITEM_UID()
			controller.request.process.mockResolvedValueOnce(
				MOCKS.CONTROLLER_REQUEST.BADREQUEST_RETURN()
			)

			await expect(app.handler(inputPayload)).resolves.toEqual(
				MOCKS.HANDLER.BADREQUEST_RETURN('Some error message')
			)
			expect(controller.request.process).toHaveBeenCalledWith(
				inputPayload.queryStringParameters,
				'DELETE'
			)
		})
	})
})
