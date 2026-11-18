const MOCKS = require('./mocks/index.mock')
const { handler } = require('../index')
const { updateLeadController } = require('../src/controller')
jest.mock('../src/controller')
const service = require('../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Root Index Handler Tests', () => {
	test('should process record and return success', async () => {
		const spyController = jest
			.spyOn(updateLeadController, 'process')
			.mockReturnValue(MOCKS.DYNAMICS_OPORTUNIDADE_UPDATE_SUCCESS())

		await handler({
			body: JSON.stringify(
				MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
			),
		})

		expect(spyController).toHaveBeenCalled()
		expect(spyController).toHaveBeenCalledTimes(1)
		expect(spyController).toHaveBeenCalledWith(
			MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
		)
	})
	test('should return a response object in the expected pattern', async () => {
		jest
			.spyOn(updateLeadController, 'process')
			.mockReturnValue(MOCKS.DYNAMICS_OPORTUNIDADE_UPDATE_SUCCESS())
		const response = await handler({
			body: JSON.stringify(
				MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
			),
		})

		expect(response).toHaveProperty('isBase64Encoded')
		expect(typeof response.isBase64Encoded).toBe('boolean')
		expect(response).toHaveProperty('headers')
		expect(typeof response.headers).toBe('object')
		expect(response).toHaveProperty('statusCode')
		expect(typeof response.statusCode).toBe('number')
		expect(response).toHaveProperty('body')
		expect(typeof response.body).toBe('string')

		const body = JSON.parse(response.body)

		expect(body).toHaveProperty('statusMessage')
		expect(typeof body.statusMessage).toBe('string')
		expect(body).toHaveProperty('statusCode')
		expect(typeof body.statusCode).toBe('number')
	})

	test('should invoke the controller only once and with the information entered in the entry', async () => {
		const spyController = jest
			.spyOn(updateLeadController, 'process')
			.mockImplementation(() => {
				throw new Error()
			})

		await handler({
			body: JSON.stringify(
				MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
			),
		})

		expect(spyController).toHaveBeenCalled()
		expect(spyController).toHaveBeenCalledTimes(1)
		expect(spyController).toHaveBeenCalledWith(
			MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
		)
	})

	test('should return an error response object in the expected pattern', async () => {
		jest.spyOn(updateLeadController, 'process').mockImplementation(() => {
			throw new Error()
		})

		const response = await handler({
			body: JSON.stringify(
				MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
			),
		})

		expect(response).toHaveProperty('isBase64Encoded')
		expect(typeof response.isBase64Encoded).toBe('boolean')
		expect(response).toHaveProperty('headers')
		expect(typeof response.headers).toBe('object')
		expect(response).toHaveProperty('statusCode')
		expect(typeof response.statusCode).toBe('number')
		expect(response.statusCode).toBe(500)
		expect(response).toHaveProperty('body')
		expect(typeof response.body).toBe('string')
		const errorBody = JSON.parse(response.body)
		expect(errorBody).toHaveProperty('status')
		expect(errorBody.status).toBe('error')
		expect(errorBody).toHaveProperty('message')
		expect(errorBody.message).toBe('Unknown Server Error')
	})

	test('Deve retornar um objeto de resposta de erro ao não enviar o body', async () => {
		const response = await handler({})

		expect(response).toHaveProperty('isBase64Encoded')
		expect(typeof response.isBase64Encoded).toBe('boolean')
		expect(response).toHaveProperty('headers')
		expect(typeof response.headers).toBe('object')
		expect(response).toHaveProperty('statusCode')
		expect(typeof response.statusCode).toBe('number')
		expect(response.statusCode).toBe(400)
		expect(response).toHaveProperty('body')
		expect(typeof response.body).toBe('string')
		const errorBody = JSON.parse(response.body)
		expect(errorBody).toHaveProperty('status')
		expect(errorBody.status).toBe('error')
		expect(errorBody).toHaveProperty('message')
		expect(errorBody.message).toBe('The request body is required')
	})
	test('Deve logar um erro', async () => {
		const spyLogger = jest.spyOn(service.logger, 'error')

		jest.spyOn(updateLeadController, 'process').mockImplementationOnce(() => {
			throw new Error()
		})

		await handler({
			body: JSON.stringify(
				MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
			),
		})

		expect(spyLogger).toHaveBeenCalled()
		expect(spyLogger).toHaveBeenCalledTimes(1)
	})

	test('should process record the consumer sqs and return success', async () => {
		const spyController = jest
			.spyOn(updateLeadController, 'process')
			.mockReturnValue(MOCKS.DYNAMICS_OPORTUNIDADE_UPDATE_SUCCESS())

		await handler({
			Records: [{
				body: JSON.stringify(
					MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
				),
			}]
		})

		expect(spyController).toHaveBeenCalled()
		expect(spyController).toHaveBeenCalledTimes(1)
		expect(spyController).toHaveBeenCalledWith(
			MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
		)
	})

	test('should process record the consumer sqs with error', async () => {
		const spyLogger = jest.spyOn(service.logger, 'error')

		jest.spyOn(updateLeadController, 'process').mockImplementationOnce(() => {
			throw new Error()
		})

		await handler({
			Records: [{
				body: JSON.stringify(
					MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
				),
			}]
		})

		expect(spyLogger).toHaveBeenCalled()
		expect(spyLogger).toHaveBeenCalledTimes(1)
	})
})
