const axios = require('axios')
const api = require('../../../../../../src/api')
const CONSTANT = require('../../../../../../src/property')
const errors = require('../../../../../../src/error')
const factory = require('../../../../../../src/factory')
const service = require('../../../../../../src/service')

jest.mock('axios')
jest.mock('../../../../../../src/property')
jest.mock('../../../../../../src/error')
jest.mock('../../../../../../src/factory')
jest.mock('../../../../../../src/service')

const parsedJsonRequest = { some: 'data' }
const token = 'test-token'
const carbonTraceId = 'test-trace-id'
const message = 'Resultado de chamada vazio ou inválido'

beforeEach(() => {
	jest.clearAllMocks()
})

describe('Assistencia webhook oschassi checkinOsApi endpoint tests', () => {
	test('It should return data when the API call is successful', async () => {
		const mockResponse = { data: { status: 'OK', message: 'Servico no Moov' } }
		axios.mockResolvedValueOnce(mockResponse)

		const result =
			await api.assistencia.webhook.oschassi.checkinOsApi.postCheckinOs(
				parsedJsonRequest,
				token,
				carbonTraceId
			)

		expect(result).toEqual(mockResponse.data)

		expect(axios).toHaveBeenCalledWith(
			expect.objectContaining({
				method: 'POST',
				url: `${CONSTANT.MULESOFT_URL}/${CONSTANT.PORTOASSISTENCIA_ENDPOINT_PATH}`,
				headers: expect.objectContaining({
					accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'carbon-trace-id': carbonTraceId,
					token: CONSTANT.TOKEN_PORTOASSISTENCIA_MULESOFT,
					clientid: CONSTANT.CLIENTID_PORTOASSISTENCIA_MULESOFT,
				}),
				data: parsedJsonRequest,
			})
		)
	})
	test('It should throw an error when the API response is empty or invalid', async () => {
		axios.mockResolvedValue(null)

		await expect(
			api.assistencia.webhook.oschassi.checkinOsApi.postCheckinOs(
				parsedJsonRequest,
				token,
				carbonTraceId
			)
		).rejects.toThrow('Resultado de chamada vazio ou inválido')

		expect(service.logger.info).toHaveBeenCalledWith(message)
	})
	test('It should log the error and throw ExternalApiError when axios call fails', async () => {
		const mockError = new errors.ExternalApiError('Network Error')
		axios.mockRejectedValue(mockError)

		const mockErrorData = { message: '', status: 500 }
		factory.axiosResponseErrorData.getErrorData.mockReturnValue(mockErrorData)

		await expect(
			api.assistencia.webhook.oschassi.checkinOsApi.postCheckinOs(
				parsedJsonRequest,
				token,
				carbonTraceId
			)
		).rejects.toEqual(new errors.ExternalApiError(mockErrorData.message))

		expect(factory.axiosResponseErrorData.getErrorData).toHaveBeenCalledWith(
			mockError
		)
	})
})
