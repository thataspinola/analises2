const axios = require('axios')

const CONSTANT = require('../../../src/property')
const MOCKS = require('../../mocks/index.mock')
const api = require('../../../src/api')

jest.mock('axios')

beforeEach(function () {
	axios.mockImplementation(async (params) => {
		if (params.url.search(CONSTANT.API_PATH_EMAIL_NOTIFICATION) !== -1) {
			return MOCKS.API_EMAIL_NOTIFICATION.POST_AXIOS_SUCCESS_RESPONSE_DATA()
		}
		const responseError = new Error()
		responseError.response = {
			status: 404,
			data: {},
		}

		throw responseError
	})
})

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de emailNotificationApi.js', () => {
	describe('Quando sucesso', () => {
		test('Deve retornar o valor esperado e não receber nenhuma exceção', async () => {
			await expect(async () => {
				const response = await api.emailNotification.execute(
					MOCKS.API_EMAIL_NOTIFICATION.VALID_PAYLOAD()
				)

				expect(response).toEqual(MOCKS.API_EMAIL_NOTIFICATION.VALID_RESPONSE())
			}).not.toThrow()
		})
	})

	describe('Quando falha', () => {
		test('Deve receber uma exceção quando o endpoint da API não der um response', async () => {
			axios.mockImplementationOnce(async (params) => {
				const responseError = new Error()

				if (params.url.search(CONSTANT.API_PATH_EMAIL_NOTIFICATION) !== -1) {
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
				api.emailNotification.execute(
					MOCKS.API_EMAIL_NOTIFICATION.VALID_PAYLOAD()
				)
			).rejects.toThrow('API não respondeu à chamada')
		})

		test.skip('Deve receber uma exceção quando ocorrer um erro não esperado pelo tratamento de erros', async () => {
			axios.mockRejectedValueOnce(new Error('Unexpected error'))

			await expect(
				api.emailNotification.execute(
					MOCKS.API_EMAIL_NOTIFICATION.VALID_PAYLOAD()
				)
			).rejects.toThrow(
				'Erro inesperado recebido da chamada da API: Unexpected error'
			)
		})

		test.skip('Deve receber uma exceção quando o endpoind da API devolver um response vazio', async () => {
			axios.mockResolvedValueOnce(null)

			await expect(
				api.emailNotification.execute(
					MOCKS.API_EMAIL_NOTIFICATION.VALID_PAYLOAD()
				)
			).rejects.toThrow(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		})

		test.skip('Deve receber uma exceção quando o endpoind da API devolver um response inválido', async () => {
			axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

			await expect(
				api.emailNotification.execute(
					MOCKS.API_EMAIL_NOTIFICATION.VALID_PAYLOAD()
				)
			).rejects.toThrow(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		})
	})
})
