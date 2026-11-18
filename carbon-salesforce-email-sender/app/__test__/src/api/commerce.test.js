const MOCKS = require('../../mocks/commerceApi.mock')
const CONSTANTS = require('../../../src/property')
const factory = require('../../../src/factory')
const errors = require('../../../src/error')
const service = require('../../../src/service')
const api = require('../../../src/api')
const axios = require('axios')

jest.mock('../../../src/factory')
jest.mock('../../../src/error')
jest.mock('../../../src/service')
jest.mock('axios')

describe('Suite de testes de commerce.js', () => {
	const mockToken = 'mockToken'

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Deve retornar os dados de resposta com sucesso', async () => {
		axios.mockResolvedValue(MOCKS.API_RESPONSE_SUCCESS)

		const API_URL = `${
			CONSTANTS.COMMERCE_URL
		}/${CONSTANTS.COMMERCE_SEARCH_CRITERIA(MOCKS.ORDER_NUMBER)}`

		const response = await api.commerce.searchCriteria(
			MOCKS.ORDER_NUMBER,
			mockToken
		)

		expect(axios).toHaveBeenCalledWith({
			method: 'GET',
			url: API_URL,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${mockToken}`,
				partner: CONSTANTS.PARTNER_HEADER_VALUE,
			},
		})
		expect(response).toEqual(MOCKS.API_RESPONSE_SUCCESS.data)
	})

	test('Deve retornar uma exceção do tipo ExternalApiError quando a solicitação falhar', async () => {
		axios.mockRejectedValue(MOCKS.API_RESPONSE_ERROR)
		factory.axiosHandlerError.mockReturnValue(MOCKS.ERROR_DETAILS)

		errors.ExternalApiError.mockImplementation((message, status) => {
			return { message, status }
		})

		await expect(
			api.commerce.searchCriteria(MOCKS.ORDER_NUMBER, mockToken)
		).rejects.toEqual({
			message: MOCKS.ERROR_DETAILS.message,
			status: MOCKS.ERROR_DETAILS.status,
		})

		expect(factory.axiosHandlerError).toHaveBeenCalledWith(
			MOCKS.API_RESPONSE_ERROR
		)
		expect(service.logger.error).toHaveBeenCalledWith(
			`Error invoking Commerce API: ${MOCKS.ERROR_DETAILS.message}`
		)
	})
})
