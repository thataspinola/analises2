const CONST = require('../../../src/property')
const api = require('../../../src/api')
const MOCKS = require('../../mocks/index.mock')
const axios = require('axios')
const { ExternalApiError } = require('../../../src/common/errors')
const service = require('../../../src/service')

jest.mock('../../../src/service', () => ({
	logger: {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	},
	validation: {},
	dynamoDB: {},
}))
jest.mock('axios')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de api.portableDevice.js', () => {
	describe('quotationRequest', () => {
		it('Deve retornar a resposta no formato recebido ao chamar a Api de Veículos do portableDevice', async () => {
			axios.mockResolvedValueOnce({
				data: MOCKS.POST_PORTABLE_DEVICE_API_SUCCESS_RESPONSE,
			})

			const response = await api.portableDevice.quotationRequest(
				MOCKS.VALID_INPUT_DATA
			)

			expect(response).toEqual(MOCKS.POST_PORTABLE_DEVICE_API_SUCCESS_RESPONSE)
		})

		// it('Deve retornar uma exceção do tipo ExternalApiError quando ao chamar a API de Cotação do portableDevice retornar um erro 4XX', async () => {
		// 	const externalApiError = new ExternalApiError()
		// 	externalApiError.response = {
		// 		status: 400,
		// 		data: {
		// 			message: 'External api error',
		// 		},
		// 	}

		// 	axios.mockImplementationOnce(() => {
		// 		throw externalApiError
		// 	})

		// 	await expect(
		// 		api.portableDevice.quotationRequest(MOCKS.VALID_INPUT_DATA)
		// 	).rejects.toThrow(
		// 		new ExternalApiError(
		// 			externalApiError.response.data,
		// 			externalApiError.response.status
		// 		)
		// 	)
		// })

		// it('Deve retornar uma exceção do tipo ExternalApiError quando ao chamar a API de Cotação do portableDevice retornar um erro 5XX com mensagem', async () => {
		// 	const serverError = new Error('Not Found')
		// 	serverError.response = {
		// 		status: 500,
		// 		data: MOCKS.POST_PORTABLE_DEVICE_API_ERROR_500_RESPONSE,
		// 	}

		// 	axios.mockImplementationOnce(() => {
		// 		throw serverError
		// 	})

		// 	await expect(
		// 		api.portableDevice.quotationRequest(MOCKS.VALID_INPUT_DATA)
		// 	).rejects.toThrow(new ExternalApiError(serverError.response.data, 500))
		// })

		// it('Deve retornar uma exceção do tipo ExternalApiError com uma mensagem padrão quando ao chamar a API de Cotação do portableDevice retornar um erro `null` ao gerar o hash', async () => {
		// 	const serverError = new Error()
		// 	serverError.response = {
		// 		status: 500,
		// 		data: null,
		// 	}

		// 	axios.mockImplementationOnce(() => {
		// 		throw serverError
		// 	})

		// 	await expect(
		// 		api.portableDevice.quotationRequest(MOCKS.VALID_INPUT_DATA)
		// 	).rejects.toThrow(
		// 		new ExternalApiError(
		// 			CONST.QUOTATION_REQUEST_API_ERROR_DEFAULT_MESSAGE,
		// 			500
		// 		)
		// 	)
		// })

		// it('Deve retornar uma exceção do tipo ExternalApiError com uma mensagem padrão quando ao chamar a API de Cotação do portableDevice retornar um erro genérico', async () => {
		// 	axios.mockImplementationOnce(() => {
		// 		throw new Error()
		// 	})

		// 	await expect(
		// 		api.portableDevice.quotationRequest(MOCKS.VALID_INPUT_DATA)
		// 	).rejects.toThrow(
		// 		new ExternalApiError(CONST.EXTERNAL_API_ERROR_DEFAULT_MESSAGE, 500)
		// 	)
		// })

		it('Deve logar um erro quando ao chamar a API de Cotação do portableDevice retornar um erro', async () => {
			const spyLogger = jest.spyOn(service.logger, 'error')

			axios.mockImplementationOnce(() => {
				throw new Error()
			})

			await expect(
				api.portableDevice.quotationRequest(MOCKS.VALID_INPUT_DATA)
			).rejects.toThrow()

			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})
	})

	describe('getCalculoResponse', () => {
		it('should get quotation with success', async () => {
			axios.mockResolvedValueOnce({
				data: MOCKS.GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE,
			})

			const response = await api.portableDevice.getCalculoResponse(
				'f6e63806-9f79-4c53-8ab5-832ba81bdfda				',
				'15',
				'ADFADS4A4444A44A'
			)

			expect(response).toEqual(MOCKS.GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE)
		})

		// it('should not get throw when status code is 500', async () => {
		// 	const spyLogger = jest.spyOn(service.logger, 'info')
		// 	const serverError = new Error('server error')
		// 	serverError.response = {
		// 		status: 500,
		// 		data: MOCKS.GET_PORTABLE_DEVICE_API_ERROR_500_RESPONSE,
		// 	}

		// 	axios.mockImplementationOnce(() => {
		// 		throw serverError
		// 	})

		// 	const response = await api.portableDevice.getCalculoResponse(
		// 		'f6e63806-9f79-4c53-8ab5-832ba81bdfda				',
		// 		'15',
		// 		'ADFADS4A4444A44A'
		// 	)
		// 	expect(response).toEqual(undefined)
		// 	expect(spyLogger).toHaveBeenCalled()
		// 	expect(spyLogger).toHaveBeenCalledTimes(1)
		// })

		it('should get throw when status code is different 500', async () => {
			const spyLogger = jest.spyOn(service.logger, 'error')
			const notFoundError = new Error('Not Found')
			notFoundError.response = {
				status: 400,
				data: MOCKS.GET_PORTABLE_DEVICE_API_ERROR_400_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw notFoundError
			})

			await expect(
				api.portableDevice.getCalculoResponse(
					'f6e63806-9f79-4c53-8ab5-832ba81bdfda				',
					'15',
					'ADFADS4A4444A44A'
				)
			).rejects.toThrow()
			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})

		it('should get throw when scoreAceito is false', async () => {
			const spyLogger = jest.spyOn(service.logger, 'error')
			const badResponseError = new Error('Bad Response')
			badResponseError.response = {
				status: 400,
				data: MOCKS.GET_PORTABLE_DEVICE_API_ERROR_SCORE_SUPERAPP_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw badResponseError
			})

			await expect(
				api.portableDevice.getCalculoResponse(
					'f6e63806-9f79-4c53-8ab5-832ba81bdfda',
					'15',
					'ADFADS4A4444A44A'
				)
			).rejects.toThrow()
			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})
	})
})
