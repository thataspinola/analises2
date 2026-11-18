const logger = require('../../../src/service/loggerService')
const CONSTANTS = require('../../../src/property')
const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')
const errors = require('../../../src/error')
const api = require('../../../src/api')
const axios = require('axios')

jest.mock('../../../src/service/loggerService')
jest.mock('../../../src/factory')
jest.mock('../../../src/error')
jest.mock('axios')

describe('Suite de testes de carbonInternalApi.js', () => {
	const API_URL = `${CONSTANTS.CARBON_INTERNAL_GATEWAY_URL}/${CONSTANTS.API_UPDATE_LEAD_PATH}`

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Deve realizar o updade do lead e retornar os dados de resposta', async () => {
		axios.mockResolvedValue(MOCKS.API_RESPONSE_SUCCESS)

		const response = await api.carbonInternal.updateLead(MOCKS.API_PAYLOAD)

		expect(axios).toHaveBeenCalledWith({
			method: 'PUT',
			url: API_URL,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				partner: CONSTANTS.PARTNER_HEADER_VALUE,
			},
			data: MOCKS.API_PAYLOAD,
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
			api.carbonInternal.updateLead(MOCKS.API_PAYLOAD)
		).rejects.toEqual({
			message: MOCKS.ERROR_DETAILS.message,
			status: MOCKS.ERROR_DETAILS.status,
		})

		expect(factory.axiosHandlerError).toHaveBeenCalledWith(
			MOCKS.API_RESPONSE_ERROR
		)
		expect(logger.error).toHaveBeenCalledWith(
			'Error invoking Carbon Update Lead API:',
			MOCKS.ERROR_DETAILS.message
		)
	})
})
