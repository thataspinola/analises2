const axios = require('axios')

const CONSTANT = require('../../../src/property')
const MOCKS = require('../../mocks/index.mock')
const api = require('../../../src/api')

jest.mock('axios')

beforeEach(function () {
	axios.mockImplementation(async (params) => {
		if (params.url.search(CONSTANT.API_PATH_PROPOSTA) !== -1) {
			return MOCKS.API_PROPOSAL.POST_AXIOS_SUCCESS_RESPONSE_DATA()
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

describe('Suite de testes de proposalApi.js', () => {
	describe('Quando sucesso', () => {
		test.skip('Deve retornar o valor esperado e não receber nenhuma exceção', async () => {
			await expect(async () => {
				const response = await api.proposal.execute(
					MOCKS.API_PROPOSAL.VALID_PAYLOAD(),
					MOCKS.API_PROPOSAL.FAKE_TOKEN(),
					MOCKS.API_PROPOSAL.FAKE_CERTIFICATES()
				)

				expect(response).toEqual(MOCKS.API_PROPOSAL.VALID_RESPONSE())
			}).not.toThrow()
		})
	})

	describe('Quando falha', () => {
		test.skip('Deve receber uma exceção quando o endpoint da API não der um response', async () => {
			axios.mockImplementationOnce(async (params) => {
				const responseError = new Error()

				if (params.url.search(CONSTANT.API_PATH_PROPOSTA) !== -1) {
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
				api.proposal.execute(
					MOCKS.API_PROPOSAL.VALID_PAYLOAD(),
					MOCKS.API_PROPOSAL.FAKE_TOKEN(),
					MOCKS.API_PROPOSAL.FAKE_CERTIFICATES()
				)
			).rejects.toThrow('API não respondeu à chamada')
		})

		test.skip('Deve receber uma exceção quando ocorrer um erro não esperado pelo tratamento de erros', async () => {
			axios.mockRejectedValueOnce(new Error('Unexpected error'))

			await expect(
				api.proposal.execute(
					MOCKS.API_PROPOSAL.VALID_PAYLOAD(),
					MOCKS.API_PROPOSAL.FAKE_TOKEN(),
					MOCKS.API_PROPOSAL.FAKE_CERTIFICATES()
				)
			).rejects.toThrow(
				'Erro inesperado recebido da chamada da API: Unexpected error'
			)
		})

		test.skip('Deve receber uma exceção quando o endpoind da API devolver um response vazio', async () => {
			axios.mockResolvedValueOnce(null)

			await expect(
				api.proposal.execute(
					MOCKS.API_PROPOSAL.VALID_PAYLOAD(),
					MOCKS.API_PROPOSAL.FAKE_TOKEN(),
					MOCKS.API_PROPOSAL.FAKE_CERTIFICATES()
				)
			).rejects.toThrow(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		})

		test.skip('Deve receber uma exceção quando o endpoind da API devolver um response inválido', async () => {
			axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

			await expect(
				api.proposal.execute(
					MOCKS.API_PROPOSAL.VALID_PAYLOAD(),
					MOCKS.API_PROPOSAL.FAKE_TOKEN(),
					MOCKS.API_PROPOSAL.FAKE_CERTIFICATES()
				)
			).rejects.toThrow(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		})
	})
})
