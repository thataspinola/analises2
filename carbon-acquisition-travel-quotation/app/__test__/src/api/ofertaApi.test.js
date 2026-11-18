const API  = require('../../../src/api')
const MOCKS = require('../../mocks/index.mock')
const axios = require('axios')
const CONSTANTS = require('../../../src/property')
const ERROR = require('../../../src/error')
const FACTORY = require('../../../src/factory')
const https = require('https');

jest.mock('axios')
jest.mock('../../../src/factory')
jest.mock('../../../logger')

afterEach(function () {
	jest.clearAllMocks()
})

describe('Given tests for quotationApi.js', () => {
	test('It should return success when call api', async () => {

		const spyHttps = jest.spyOn(https, 'Agent').mockReturnValue(new https.Agent({rejectUnauthorized: false}))

		axios.mockReturnValue({ data: MOCKS.SENSIDIA_API_SUCCESS_RESPONSE() })
		await API.vida.viagemOn.oferta.post(
			MOCKS.VALID_INPUT_DATA,
			'token',
			'123eq1'
		)

		const config = {
			method: 'post',
			url: `${CONSTANTS.GATEWAY_URL}/${CONSTANTS.OFERTAS_API_PATH}`,
			timeout: CONSTANTS.OFERTA_API_TIMEOUT_MS,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer token`,
				'partner': CONSTANTS.PARTNER_HEADER_VALUE,
				'carbon-trace-id': '123eq1'
			},
			httpsAgent: new https.Agent({rejectUnauthorized: false}),
			data: MOCKS.VALID_INPUT_DATA,
		}

		expect(axios).toHaveBeenCalledWith(config)
	})


	test('Deve aplicar o timeout recebido na chamada do axios', async () => {
		axios.mockReturnValue({ data: MOCKS.SENSIDIA_API_SUCCESS_RESPONSE() })

		await API.vida.viagemOn.oferta.post(
			MOCKS.VALID_INPUT_DATA,
			'token',
			'123eq1',
			15000
		)

		expect(axios).toHaveBeenCalledWith(
			expect.objectContaining({ timeout: 15000 })
		)
	})

	test('Deve aplicar o timeout padrao quando nenhum for informado', async () => {
		axios.mockReturnValue({ data: MOCKS.SENSIDIA_API_SUCCESS_RESPONSE() })

		await API.vida.viagemOn.oferta.post(MOCKS.VALID_INPUT_DATA, 'token', '123eq1')

		expect(axios).toHaveBeenCalledWith(
			expect.objectContaining({ timeout: CONSTANTS.OFERTA_API_TIMEOUT_MS })
		)
		expect(CONSTANTS.OFERTA_API_TIMEOUT_MS).toBeGreaterThan(0)
	})

	it('Deve lidar com erros não mapeados', async () => {
		const messageError = 'External Api Error'
		const error = new Error('Test error')
		axios.mockRejectedValue(error)
		FACTORY.axiosResponseErrorData.mockReturnValue({ message: messageError, status: 500 })

		const externalApiError = new ERROR.ExternalApiError.ExternalApiError({
			code: 500,
			message: messageError,
			stack: 'stack',
		})

		FACTORY.externalApi.externalApiErrorFactory.mockReturnValue(externalApiError)

		await expect(
			API.vida.viagemOn.oferta.post(MOCKS.VALID_INPUT_DATA, 'token')
		).rejects.toThrow(messageError)

		expect(FACTORY.axiosResponseErrorData).toHaveBeenCalledWith(error)
	})
})
