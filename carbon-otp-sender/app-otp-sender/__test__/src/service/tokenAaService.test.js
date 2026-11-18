const service = require('../../../src/service')
const api = require('../../../src/api')
const MOCKS = require('../../mocks/index.mock')

jest.mock('../../../src/api')

describe('gerarTokenAaComRetry', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('deve retornar o token na primeira tentativa', async () => {
		api.seguranca.corporativa.portocom.postGeraTokenAa.mockResolvedValue(
			MOCKS.GERAR_TOKEN_AA_VALID_RESPONSE()
		)

		const result = await service.tokenAaService.gerarTokenAaComRetry(
			MOCKS.GERAR_TOKEN_AA_VALID_PAYLOAD(),
			MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
		)

		expect(result).toEqual(MOCKS.GERAR_TOKEN_AA_VALID_RESPONSE())
		expect(
			api.seguranca.corporativa.portocom.postGeraTokenAa
		).toHaveBeenCalledTimes(1)
	})

	test('deve retornar o token na segunda tentativa após falha 404 na primeira', async () => {
		const spyLoggerWarn = jest.spyOn(service.logger, 'warn')

		api.seguranca.corporativa.portocom.postGeraTokenAa
			.mockRejectedValueOnce(MOCKS.GERAR_TOKEN_AA_NOT_FOUND_ERROR())
			.mockResolvedValueOnce(MOCKS.GERAR_TOKEN_AA_VALID_RESPONSE())

		const result = await service.tokenAaService.gerarTokenAaComRetry(
			MOCKS.GERAR_TOKEN_AA_VALID_PAYLOAD(),
			MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
		)

		expect(result).toEqual(MOCKS.GERAR_TOKEN_AA_VALID_RESPONSE())
		expect(
			api.seguranca.corporativa.portocom.postGeraTokenAa
		).toHaveBeenCalledTimes(2)
		expect(spyLoggerWarn).toHaveBeenCalledTimes(1)
	})

	test('deve retornar erro após número máximo de tentativas com status 404', async () => {
		const spyLoggerError = jest.spyOn(service.logger, 'error')
		const spyLoggerWarn = jest.spyOn(service.logger, 'warn')

		api.seguranca.corporativa.portocom.postGeraTokenAa.mockRejectedValue(
			MOCKS.GERAR_TOKEN_AA_NOT_FOUND_ERROR()
		)

		const result = await service.tokenAaService.gerarTokenAaComRetry(
			MOCKS.GERAR_TOKEN_AA_VALID_PAYLOAD(),
			MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
		)

		expect(result).toEqual(MOCKS.GERAR_TOKEN_AA_NOT_FOUND_ERROR().response)
		expect(
			api.seguranca.corporativa.portocom.postGeraTokenAa
		).toHaveBeenCalledTimes(2)
		expect(spyLoggerError).toHaveBeenCalledTimes(1)
		expect(spyLoggerWarn).toHaveBeenCalledTimes(1)
	})

	test('deve lançar erro para qualquer outro status', async () => {
		const errorMessage = 'Internal Server Error'

		const spyLoggerError = jest.spyOn(service.logger, 'error')
		const spyLoggerWarn = jest.spyOn(service.logger, 'warn')

		api.seguranca.corporativa.portocom.postGeraTokenAa.mockImplementationOnce(
			async (postGeraTokenAaPayload, apiSensediaCloudTokenString) => {
				throw new Error(errorMessage)
			}
		)

		await expect(
			service.tokenAaService.gerarTokenAaComRetry(
				MOCKS.GERAR_TOKEN_AA_VALID_PAYLOAD(),
				MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
			)
		).rejects.toThrow(errorMessage)

		expect(
			api.seguranca.corporativa.portocom.postGeraTokenAa
		).toHaveBeenCalledTimes(1)
		expect(spyLoggerError).not.toHaveBeenCalled()
		expect(spyLoggerWarn).not.toHaveBeenCalled()
	})
})
