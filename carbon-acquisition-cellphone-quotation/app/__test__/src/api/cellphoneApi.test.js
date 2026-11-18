const CONST = require('../../../src/property')
const { cellphoneApi } = require('../../../src/api')
const MOCKS = require('../../mocks/index.mock')
const axios = require('axios')
const { ExternalApiError } = require('../../../src/common/errors')
const { logger } = require('../../../src/service')

jest.mock('../../../src/service', () => ({
	logger: {
		error: jest.fn(),
		info: jest.fn(),
	},
}))
jest.mock('axios')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de cellphoneApi.js', () => {
	describe('quotationRequest', () => {
		it('Deve retornar a resposta no formato recebido ao chamar a Api de Veículos do cellphone', async () => {
			axios.mockResolvedValueOnce({
				data: MOCKS.POST_CELLPHONE_API_SUCCESS_RESPONSE,
			})

			const response = await cellphoneApi.quotationRequest(
				MOCKS.VALID_INPUT_DATA
			)

			expect(response).toEqual(MOCKS.POST_CELLPHONE_API_SUCCESS_RESPONSE)
		})

		it('Deve retornar uma exceção do tipo ExternalApiError quando ao chamar a API de Cotação do cellphone retornar um erro 4XX', async () => {
			const notFoundError = new Error('Not Found')
			notFoundError.response = {
				status: 400,
				data: MOCKS.POST_CELLPHONE_API_ERROR_400_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw notFoundError
			})

			await expect(
				cellphoneApi.quotationRequest(MOCKS.VALID_INPUT_DATA)
			).rejects.toThrow(
				new ExternalApiError(
					notFoundError.response.data,
					notFoundError.response.status
				)
			)
		})

		it('Deve retornar uma exceção do tipo ExternalApiError quando ao chamar a API de Cotação do cellphone retornar um erro 5XX com mensagem', async () => {
			const serverError = new Error('Not Found')
			serverError.response = {
				status: 500,
				data: MOCKS.POST_CELLPHONE_API_ERROR_500_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw serverError
			})

			await expect(
				cellphoneApi.quotationRequest(MOCKS.VALID_INPUT_DATA)
			).rejects.toThrow(new ExternalApiError(serverError.response.data, 500))
		})

		it('Deve retornar uma exceção do tipo ExternalApiError com uma mensagem padrão quando ao chamar a API de Cotação do cellphone retornar um erro `null` ao gerar o hash', async () => {
			const serverError = new Error('Not Found')
			serverError.response = {
				status: 500,
				data: null,
			}

			axios.mockImplementationOnce(() => {
				throw serverError
			})

			await expect(
				cellphoneApi.quotationRequest(MOCKS.VALID_INPUT_DATA)
			).rejects.toThrow(
				new ExternalApiError(
					CONST.QUOTATION_REQUEST_API_ERROR_DEFAULT_MESSAGE,
					500
				)
			)
		})

		it('Deve retornar uma exceção do tipo ExternalApiError com uma mensagem padrão quando ao chamar a API de Cotação do cellphone retornar um erro genérico', async () => {
			axios.mockImplementationOnce(() => {
				throw new Error()
			})

			await expect(
				cellphoneApi.quotationRequest(MOCKS.VALID_INPUT_DATA)
			).rejects.toThrow(
				new ExternalApiError(CONST.EXTERNAL_API_ERROR_DEFAULT_MESSAGE, 500)
			)
		})

		it('Deve logar um erro com mensagem e statusCode quando ao chamar a API de Cotação do cellphone retornar um erro', async () => {
			const serverError = new Error('Some error')
			serverError.response = {
				status: 500,
				data: MOCKS.POST_CELLPHONE_API_ERROR_500_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw serverError
			})

			await expect(
				cellphoneApi.quotationRequest(MOCKS.VALID_INPUT_DATA)
			).rejects.toThrow()

			expect(logger.error).toHaveBeenCalledTimes(1)
			expect(logger.error).toHaveBeenCalledWith(
				expect.objectContaining({
					message: expect.any(String),
					statusCode: 500,
				}),
				'Erro ao invocar o método POST na API de Produto'
			)
		})
	})

	describe('getCalculoResponse', () => {
		it('should get quotation with success', async () => {
			axios.mockResolvedValueOnce({
				data: MOCKS.GET_CELLPHONE_API_SUCCESS_RESPONSE,
			})

			const response = await cellphoneApi.getCalculoResponse(
				'f6e63806-9f79-4c53-8ab5-832ba81bdfda',
				'15',
				'ADFADS4A4444A44A'
			)

			expect(response).toEqual(MOCKS.GET_CELLPHONE_API_SUCCESS_RESPONSE)
		})

		it('should throw and log when status code is 400', async () => {
			const notFoundError = new Error('Not Found')
			notFoundError.response = {
				status: 400,
				data: MOCKS.GET_CELLPHONE_API_ERROR_400_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw notFoundError
			})

			await expect(
				cellphoneApi.getCalculoResponse(
					'f6e63806-9f79-4c53-8ab5-832ba81bdfda',
					'15',
					'ADFADS4A4444A44A'
				)
			).rejects.toThrow(ExternalApiError)

			expect(logger.error).toHaveBeenCalledTimes(1)
			expect(logger.error).toHaveBeenCalledWith(
				expect.objectContaining({
					message: expect.any(String),
					statusCode: 400,
					errorCode: expect.any(String),
				}),
				'Erro ao invocar o método GET na API de Produto'
			)
		})

		it('should throw and log when scoreAceito is false', async () => {
			const badResponseError = new Error('Bad Response')
			badResponseError.response = {
				status: 400,
				data: MOCKS.GET_CELLPHONE_API_ERROR_SCORE_SUPERAPP_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw badResponseError
			})

			await expect(
				cellphoneApi.getCalculoResponse(
					'f6e63806-9f79-4c53-8ab5-832ba81bdfda',
					'15',
					'ADFADS4A4444A44A'
				)
			).rejects.toThrow(ExternalApiError)

			expect(logger.error).toHaveBeenCalledTimes(1)
			expect(logger.error).toHaveBeenCalledWith(
				expect.objectContaining({
					message: expect.any(String),
					statusCode: 400,
					errorCode: expect.stringContaining('001'),
				}),
				'Erro ao invocar o método GET na API de Produto'
			)
		})

		it('should throw and log when a generic error occurs (no response)', async () => {
			axios.mockImplementationOnce(() => {
				throw new Error('Network Error')
			})

			await expect(
				cellphoneApi.getCalculoResponse(
					'f6e63806-9f79-4c53-8ab5-832ba81bdfda',
					'15',
					'ADFADS4A4444A44A'
				)
			).rejects.toThrow(ExternalApiError)

			expect(logger.error).toHaveBeenCalledTimes(1)
			expect(logger.error).toHaveBeenCalledWith(
				expect.objectContaining({
					message: expect.any(String),
					statusCode: 500,
				}),
				'Erro ao invocar o método GET na API de Produto'
			)
		})
	})
})
