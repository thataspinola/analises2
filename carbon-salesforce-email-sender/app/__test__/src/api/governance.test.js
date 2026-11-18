const MOCKS = require('../../mocks/governanceApi.mock')
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

describe('Suite de testes de governance.js', () => {
	const mockToken = 'mockToken'

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Deve retornar os dados de resposta com sucesso', async () => {
		axios.mockResolvedValue(MOCKS.API_RESPONSE_SUCCESS)

		const API_URL = `${CONSTANTS.MULESOFT_URL}/${CONSTANTS.API_PESCOD_MULESOFT_PATH}/${MOCKS.CPF}`

		const response = await api.governance.getPescod(MOCKS.CPF, mockToken)

		expect(axios).toHaveBeenCalledWith({
			method: 'GET',
			url: API_URL,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${mockToken}`,
				partner: CONSTANTS.PARTNER_HEADER_VALUE,
			},
		})
		expect(response).toEqual(MOCKS.API_RESPONSE_SUCCESS.data.cpfPessoa.codigoPessoa)
	})

	test('Deve retornar uma exceção do tipo ExternalApiError quando a solicitação falhar', async () => {
		axios.mockRejectedValue(MOCKS.API_RESPONSE_ERROR)
		factory.axiosHandlerError.mockReturnValue(MOCKS.ERROR_DETAILS)

		errors.ExternalApiError.mockImplementation((message, status) => {
			return { message, status }
		})

		await expect(
			api.governance.getPescod(MOCKS.CPF, mockToken)
		).rejects.toEqual({
			message: MOCKS.ERROR_DETAILS.message,
			status: MOCKS.ERROR_DETAILS.status,
		})

		expect(factory.axiosHandlerError).toHaveBeenCalledWith(
			MOCKS.API_RESPONSE_ERROR
		)
		expect(service.logger.error).toHaveBeenCalledWith(
			`Error invoking Governança API: ${MOCKS.ERROR_DETAILS.message}`
		)
	})
})
