const controller = require('../../../src/controller')
const property = require('../../../src/property')
const service = require('../../../src/service')
const api = require('../../../src/api')
const factory = require('../../../src/factory')
const token = require('@porto-seguro/hub-vendas.carbon-token')
const dealsDataLayer = require('@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer')
const MOCKS = require('../../mocks/src/controller/goodCardController.mock')

jest.mock('../../../src/property', () => ({
	DEALS_DATA_LIBRARY_LOCATION:
		'@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer',
	TOKEN_LIBRARY_LOCATION: '@porto-seguro/hub-vendas.carbon-token',
}))

jest.mock('../../../src/service')

jest.mock('../../../src/api', () => ({
	goodCardApi: { getGoodCard: jest.fn() },
}))

jest.mock('../../../src/factory', () => ({
	response: {
		success: jest.fn(),
		badRequestError: jest.fn(),
		error: jest.fn(),
	},
	save: {
		build: jest.fn(),
	},
}))

jest.mock(
	'@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer',
	() => ({
		saveDealsData: jest.fn(),
	})
)

jest.mock('@porto-seguro/hub-vendas.carbon-token', () => ({
	getSensediaTokenCarbon: jest.fn(),
}))

describe('Teste da função process', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	test('Processo bem-sucedido', async () => {
		token.getSensediaTokenCarbon.mockReturnValueOnce(
			Promise.resolve(MOCKS.FAKE_TOKEN)
		)
		api.goodCardApi.getGoodCard.mockReturnValueOnce(
			Promise.resolve(MOCKS.RESPONSE_SUCCESS_API())
		)

		await controller.goodCard.process(MOCKS.VALID_INPUT_DATA())

		expect(service.schemaValidation.validate).toBeCalledWith(
			MOCKS.VALID_INPUT_DATA(),
			property.INPUT_SCHEMA
		)
		expect(token.getSensediaTokenCarbon).toBeCalled()
		expect(api.goodCardApi.getGoodCard).toBeCalledWith(
			MOCKS.VALID_API_PAYLOAD,
			MOCKS.FAKE_TOKEN
		)
		expect(dealsDataLayer.saveDealsData).toBeCalled()
		expect(factory.response.success).toBeCalledWith('Success')
	})

	it('deve retornar erro de validação quando o schema de entrada é inválido', async () => {
		const inputData = { documento: 'invalid' }
		service.schemaValidation.validate.mockImplementation(() => {
			throw new Error('ValidationError')
		})

		const result = await controller.goodCard.process(inputData)

		expect(result).toEqual(
			factory.response.badRequestError(
				'Não foi possível processar a requisição, por favor revise os dados'
			)
		)
	})

	it('deve retornar erro ao falhar na obtenção do token', async () => {
		token.getSensediaTokenCarbon.mockRejectedValue(new Error())

		const result = await controller.goodCard.process(MOCKS.VALID_INPUT_DATA())

		expect(result).toEqual(factory.response.error('Erro interno'))
	})

	it('deve retornar erro ao falhar na chamada da API goodCardApi', async () => {
		token.getSensediaTokenCarbon.mockResolvedValue('token')
		api.goodCardApi.getGoodCard.mockRejectedValue(new Error())

		const result = await controller.goodCard.process(MOCKS.VALID_INPUT_DATA())

		expect(result).toEqual(factory.response.error('Erro interno'))
	})

	it('deve retornar erro ao falhar ao salvar os dados dos negócios', async () => {
		token.getSensediaTokenCarbon.mockResolvedValue('token')
		api.goodCardApi.getGoodCard.mockResolvedValue([])
		dealsDataLayer.saveDealsData.mockRejectedValue(new Error())

		const result = await controller.goodCard.process(MOCKS.VALID_INPUT_DATA())

		expect(result).toEqual(factory.response.error('Erro interno'))
	})
})
