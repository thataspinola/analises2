const { vehicleController } = require('../src/controller')
const { handler } = require('..')

const {
	CONTROLLER_SUCCESS_RESPONSE_PER_PLATE,
	VALID_INPUT_DATA,
	CONTROLLER_SUCCESS_RESPONSE_PER_DESCRIPTION_AND_YEAR_MODEL,
} = require('./mocks/index.mock')

jest.mock('../src/controller')
jest.mock('../config/logger')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de teste de index.test.js', () => {
	describe('Quando sucesso', () => {
		test('Deve invocar o controller somente uma vez e com as informações informadas na entrada', async () => {
			const spyController = jest
				.spyOn(vehicleController, 'process')
				.mockReturnValueOnce(CONTROLLER_SUCCESS_RESPONSE_PER_PLATE)

			await handler(VALID_INPUT_DATA)

			expect(spyController).toHaveBeenCalled()
			expect(spyController).toHaveBeenCalledTimes(1)
			expect(spyController).toHaveBeenCalledWith(
				VALID_INPUT_DATA.queryStringParameters.plate,
				VALID_INPUT_DATA.queryStringParameters.description,
				VALID_INPUT_DATA.queryStringParameters.yearModel
			)
		})

		test('Deve retornar um objeto de resposta no padrão esperado para busca por placa', async () => {
			jest
				.spyOn(vehicleController, 'process')
				.mockReturnValueOnce(CONTROLLER_SUCCESS_RESPONSE_PER_PLATE)

			const response = await handler(VALID_INPUT_DATA)

			expect(response).toHaveProperty('isBase64Encoded')
			expect(typeof response.isBase64Encoded).toBe('boolean')
			expect(response).toHaveProperty('headers')
			expect(typeof response.headers).toBe('object')
			expect(response).toHaveProperty('statusCode')
			expect(typeof response.statusCode).toBe('number')
			expect(response).toHaveProperty('body')
			expect(typeof response.body).toBe('string')

			const body = JSON.parse(response.body)

			expect(Array.isArray(body)).toBeTruthy()
			expect(body.length).toBe(CONTROLLER_SUCCESS_RESPONSE_PER_PLATE.length)

			for (const item of body) {
				expect(item).toHaveProperty('descricao')
				expect(typeof item.descricao).toBe('string')
				expect(item).toHaveProperty('codigoVersao')
				expect(typeof item.codigoVersao).toBe('number')
				expect(item).toHaveProperty('anoModelo')
				expect(typeof item.anoModelo).toBe('number')
				expect(item).toHaveProperty('anoFabricacao')
				expect(typeof item.anoFabricacao).toBe('number')
				expect(item).toHaveProperty('flagZeroKm')
				expect(typeof item.flagZeroKm).toBe('string')
				expect(item).toHaveProperty('modelo')
				expect(typeof item.modelo).toBe('object')

				expect(item.modelo).toHaveProperty('codigoModelo')
				expect(typeof item.modelo.codigoModelo).toBe('number')
				expect(item.modelo).toHaveProperty('nomeModelo')
				expect(typeof item.modelo.nomeModelo).toBe('string')
				expect(item.modelo).toHaveProperty('marca')
				expect(typeof item.modelo.marca).toBe('object')

				expect(item.modelo.marca).toHaveProperty('codigo')
				expect(typeof item.modelo.marca.codigo).toBe('number')
			}
		})

		test('Deve retornar um objeto de resposta no padrão esperado para busca por descrição e ano modelo', async () => {
			jest
				.spyOn(vehicleController, 'process')
				.mockReturnValueOnce(
					CONTROLLER_SUCCESS_RESPONSE_PER_DESCRIPTION_AND_YEAR_MODEL
				)

			const response = await handler(VALID_INPUT_DATA)

			expect(response).toHaveProperty('isBase64Encoded')
			expect(typeof response.isBase64Encoded).toBe('boolean')
			expect(response).toHaveProperty('headers')
			expect(typeof response.headers).toBe('object')
			expect(response).toHaveProperty('statusCode')
			expect(typeof response.statusCode).toBe('number')
			expect(response).toHaveProperty('body')
			expect(typeof response.body).toBe('string')

			const body = JSON.parse(response.body)

			expect(Array.isArray(body)).toBeTruthy()
			expect(body.length).toBe(
				CONTROLLER_SUCCESS_RESPONSE_PER_DESCRIPTION_AND_YEAR_MODEL.length
			)

			for (const item of body) {
				expect(item).toHaveProperty('descricao')
				expect(typeof item.descricao).toBe('string')
				expect(item).toHaveProperty('codigoVersao')
				expect(typeof item.codigoVersao).toBe('number')
				expect(item).toHaveProperty('anoModelo')
				expect(typeof item.anoModelo).toBe('number')
				expect(item).toHaveProperty('flagZeroKm')
				expect(typeof item.flagZeroKm).toBe('string')
				expect(item).toHaveProperty('modelo')
				expect(typeof item.modelo).toBe('object')

				expect(item.modelo).toHaveProperty('codigoModelo')
				expect(typeof item.modelo.codigoModelo).toBe('number')
				expect(item.modelo).toHaveProperty('nomeModelo')
				expect(typeof item.modelo.nomeModelo).toBe('string')
				expect(item.modelo).toHaveProperty('marca')
				expect(typeof item.modelo.marca).toBe('object')

				expect(item.modelo.marca).toHaveProperty('codigo')
				expect(typeof item.modelo.marca.codigo).toBe('number')
			}
		})
	})

	describe('Quando falha', () => {
		test('Deve invocar o controller somente uma vez e com as informações informadas na entrada', async () => {
			const spyController = jest
				.spyOn(vehicleController, 'process')
				.mockImplementation(() => {
					throw new Error()
				})

			await handler(VALID_INPUT_DATA)

			expect(spyController).toHaveBeenCalled()
			expect(spyController).toHaveBeenCalledTimes(1)
			expect(spyController).toHaveBeenCalledWith(
				VALID_INPUT_DATA.queryStringParameters.plate,
				VALID_INPUT_DATA.queryStringParameters.description,
				VALID_INPUT_DATA.queryStringParameters.yearModel
			)
		})

		test('Deve retornar um objeto de resposta de erro no padrão esperado', async () => {
			jest.spyOn(vehicleController, 'process').mockImplementation(() => {
				throw new Error()
			})

			const response = await handler(VALID_INPUT_DATA)

			expect(response).toHaveProperty('isBase64Encoded')
			expect(typeof response.isBase64Encoded).toBe('boolean')
			expect(response).toHaveProperty('headers')
			expect(typeof response.headers).toBe('object')
			expect(response).toHaveProperty('statusCode')
			expect(typeof response.statusCode).toBe('number')
			expect(typeof response.statusCode).toBe('number')
			expect(response).toHaveProperty('body')
			expect(typeof response.body).toBe('string')
			const errorBody = JSON.parse(response.body)
			expect(errorBody).toHaveProperty('status')
			expect(errorBody).toHaveProperty('message')
		})

		it('Deve logar um erro', async () => {
			const spyLogger = jest.spyOn(global.logger, 'error')

			jest.spyOn(vehicleController, 'process').mockImplementation(() => {
				throw new Error()
			})

			await handler(VALID_INPUT_DATA)

			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})
	})
})
