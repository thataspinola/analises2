const MOCKS = require('../../mocks/emailNotificationApi.mock')
const CONSTANTS = require('../../../src/property')
const factory = require('../../../src/factory')
const service = require('../../../src/service')
const errors = require('../../../src/error')
const api = require('../../../src/api')
const axios = require('axios')

jest.mock('../../../src/factory')
jest.mock('../../../src/service', () => ({
	logger: {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
	},
}))
jest.mock('../../../src/error')
jest.mock('axios')

describe('Suite de testes de emailNotificationApi.js', () => {
	const API_URL = `${CONSTANTS.INTERNAL_GTW_EMAIL_NOTIFICATION_URL}/${CONSTANTS.API_PATH}`

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Deve enviar um e-mail e retornar os dados de resposta', async () => {
		axios.mockResolvedValue(MOCKS.API_RESPONSE_SUCCESS)

		const response = await api.emailNotification.invoke(MOCKS.API_PAYLOAD)

		expect(axios).toHaveBeenCalledWith({
			method: 'POST',
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
			api.emailNotification.invoke(MOCKS.API_PAYLOAD)
		).rejects.toEqual({
			message: MOCKS.ERROR_DETAILS.message,
			status: MOCKS.ERROR_DETAILS.status,
		})

		expect(factory.axiosHandlerError).toHaveBeenCalledWith(
			MOCKS.API_RESPONSE_ERROR
		)
		expect(service.logger.error).toHaveBeenCalledWith(
			`Error invoking EmailNotification API: ${MOCKS.ERROR_DETAILS.message}`
		)
	})
})
