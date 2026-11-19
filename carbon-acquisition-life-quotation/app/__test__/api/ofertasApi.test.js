const api = require('../../src/api')
const mocks = require('../mocks/index.mock')
const axios = require('axios')
const service = require('../../src/service')

jest.mock('axios')

afterEach(() => {
	jest.clearAllMocks()
})

describe('test for ofertasApi', () => {
	test('should return success', async () => {
		axios.mockResolvedValueOnce(mocks.OFERTAS_DATA())

		const response = await api.vidaOnApi.ofertas(
			mocks.INPUT_REQUEST_QUOTATION_API(),
			'token'
		)

		expect(response).toEqual(mocks.OFERTAS_DATA())
	})

	test('should return error', async () => {
		axios.mockRejectedValueOnce(mocks.RESPONSE_OFERTAS_ERROR())

		const response = await api.vidaOnApi.ofertas(
			mocks.INPUT_REQUEST_QUOTATION_API(),
			'token'
		)

		expect(response.data).toEqual(mocks.RESPONSE_OFERTAS_ERROR().response.data)
	})
})
