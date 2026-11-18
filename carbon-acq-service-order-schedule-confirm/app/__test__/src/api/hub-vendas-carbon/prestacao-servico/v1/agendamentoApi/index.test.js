const axios = require('axios')
const api = require('../../../../../../../src/api')
const CONSTANT = require('../../../../../../../src/property')
const errors = require('../../../../../../../src/error')
const factory = require('../../../../../../../src/factory')
const service = require('../../../../../../../src/service')

jest.mock('axios')
jest.mock('../../../../../../../src/property')
jest.mock('../../../../../../../src/error')
jest.mock('../../../../../../../src/factory')
jest.mock('../../../../../../../src/service')

const payload = { some: 'data' }
const token = 'test-token'
const carbonTraceId = 'test-trace-id'
const message = 'Resultado de chamada vazio ou inválido'
const impersonalUserCarbon = 'test-impersonal-token'

beforeEach(() => {
	jest.clearAllMocks()
})

describe('Hub vendas carbon prestacao servico v1 agendamentoApi endpoint tests', () => {
	test('It should return data when the API call is successful', async () => {
		const mockResponse = { data: { status: 'OK', message: 'Servico no Moov' } }
		axios.mockResolvedValueOnce(mockResponse)
		const result =
			await api.hubVendasCarbon.prestacaoServico.v1.agendamentoApi.postBaixaEndpoint(
				payload,
				token,
				impersonalUserCarbon,
				carbonTraceId
			)

		expect(result).toEqual(mockResponse.data)

		expect(axios).toHaveBeenCalledWith(
			expect.objectContaining({
				method: 'POST',
				url: `${CONSTANT.SENSEDIA_CLOUD_URL}/${CONSTANT.HUB_VENDAS_CARBON_PRESTACAO_SERVICO_V1_AGENDAMENTO_API_ENDPOINT_PATH}`,
				headers: expect.objectContaining({
					accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					B64_IBA: impersonalUserCarbon,
					'carbon-trace-id': `${carbonTraceId}`,
				}),
				data: payload,
			})
		)
	})
	test('It should log the error and throw ExternalApiError when axios call fails', async () => {
		const mockError = new errors.ExternalApiError('Network Error')
		axios.mockRejectedValue(mockError)

		const mockErrorData = { message: '', status: 500 }
		factory.axiosResponseErrorData.getErrorData.mockReturnValue(mockErrorData)

		await expect(
			api.hubVendasCarbon.prestacaoServico.v1.agendamentoApi.postBaixaEndpoint(
				payload,
				token,
				carbonTraceId
			)
		).rejects.toEqual(new errors.ExternalApiError(mockErrorData.message))

		expect(factory.axiosResponseErrorData.getErrorData).toHaveBeenCalledWith(
			mockError
		)
	})
})
