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

beforeEach(() => {
	jest.clearAllMocks()
})

describe('Porto Assistencia B2C V1 cupom consumo endpoint tests', () => {
	test('It should return data when the API call is successful', async () => {
		const mockResponse = { data: { codigo: 200, success: true } }
		axios.mockResolvedValue(mockResponse)

		const result = await api.portoAssistencia.b2c.v1.cupom.putConsumoEndpoint(
			payload,
			token,
			carbonTraceId
		)

		expect(result).toEqual(mockResponse.data)
		expect(axios).toHaveBeenCalledWith(
			expect.objectContaining({
				method: 'PUT',
				url: `${CONSTANT.SENSEDIA_CLOUD_URL}/${CONSTANT.PORTOASSISTENCIA_B2C_CUPOM_CONSUMO_API_ENDPOINT_PATH}`,
				headers: expect.objectContaining({
					accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'carbon-trace-id': `${carbonTraceId}`,
				}),
				data: payload,
			})
		)
	})
	test('It should log the error and throw ExternalApiError when axios call fails', async () => {
		const mockError = new Error('Network Error')
		axios.mockRejectedValue(mockError)

		const mockErrorData = { message: 'Network Error', status: 500 }
		factory.axiosResponseErrorData.getErrorData.mockReturnValue(mockErrorData)

		await expect(
			api.portoAssistencia.b2c.v1.cupom.putConsumoEndpoint(
				payload,
				token,
				carbonTraceId
			)
		).rejects.toEqual(
			new errors.ExternalApiError(
				mockErrorData.message,
				mockErrorData.status,
				mockError.stack
			)
		)

		expect(factory.axiosResponseErrorData.getErrorData).toHaveBeenCalledWith(
			mockError
		)
	})
})
