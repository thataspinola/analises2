const api = require('../../../src/api')
const CONSTANT = require('../../../src/property')
const MOCKS = require('../../mocks/index.mock')
const service = require('../../../src/service')
const axios = require('axios')

jest.mock('axios')
jest.mock('../../../src/service')

beforeEach(function () {
	let callCount = 0
	axios.mockImplementation(async (params) => {
		if (params.url.search(CONSTANT.API_SENDEMAIL_URL) !== -1) {
			callCount++
			if (callCount === 1) {
				return MOCKS.MAILSERVICE_API_SENDEMAIL_SUCCESS_RESPONSE()
			}
		}
		const responseError = new Error()
		responseError.response = {
			status: 404,
			data: {},
		}

		throw responseError
	})
})

afterEach(function () {
	jest.clearAllMocks()
})

beforeEach(() => {
	service.logger.info.mockImplementation((message) => {})
	service.logger.error.mockImplementation((message) => {})
	service.logger.warn.mockImplementation((message) => {})
	service.logger.debug.mockImplementation((message) => {})
})

describe('Suite de teste de mailService.js', () => {
	describe('Dada uma chamada para o metodo sendEmail', () => {
		describe('Quando sucesso', () => {
			test('Deve retornar o valor esperado e não receber nenhuma exceção', async () => {
				await expect(
					api.mailServiceApi.sendEmail(
						MOCKS.FACTORY_MAILSERVICE_RETURN(),
						MOCKS.SENSEDIA_HUB_TOKEN()
					)
				).resolves.toEqual(
					MOCKS.MAILSERVICE_API_SENDEMAIL_SUCCESS_RESPONSE_BODY().data
				)
			})
		})

		describe('Quando falha', () => {
			test('Deve receber uma exceção quando receber um response http com status code diferente de 200', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_SENDEMAIL_URL) !== -1) {
						responseError.response = {
							status: 500,
							data: { message: 'Testing expected error' },
						}
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.mailServiceApi.sendEmail(
						MOCKS.FACTORY_MAILSERVICE_RETURN(),
						MOCKS.SENSEDIA_HUB_TOKEN()
					)
				).rejects.toThrow(
					`Erro recebido da chamada da API: código '500' dados: '{"message":"Testing expected error"}'`
				)
			})

			test('Deve receber uma exceção quando o endpoint da API não der um response', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.request = params
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.mailServiceApi.sendEmail(
						MOCKS.FACTORY_MAILSERVICE_RETURN(),
						MOCKS.SENSEDIA_HUB_TOKEN()
					)
				).rejects.toThrow('API não respondeu à chamada')
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response vazio na primeira chamada', async () => {
				axios.mockResolvedValueOnce(null)

				await expect(
					api.mailServiceApi.sendEmail(
						MOCKS.FACTORY_MAILSERVICE_RETURN(),
						MOCKS.SENSEDIA_HUB_TOKEN()
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response inválido na primeira chamada', async () => {
				axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

				await expect(
					api.mailServiceApi.sendEmail(
						MOCKS.FACTORY_MAILSERVICE_RETURN(),
						MOCKS.SENSEDIA_HUB_TOKEN()
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando ocorrer um erro não esperado pelo tratamento de erros', async () => {
				axios.mockRejectedValueOnce(new Error('Unexpected error'))

				await expect(
					api.mailServiceApi.sendEmail(
						MOCKS.FACTORY_MAILSERVICE_RETURN(),
						MOCKS.SENSEDIA_HUB_TOKEN()
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada da API: Unexpected error'
				)
			})
		})
	})
})
