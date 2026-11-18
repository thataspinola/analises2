const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const controller = require('../../../src/controller')
const MOCKS = require('../../mocks/index.mock')
const API = require('../../../src/api')
const activity = require('../../../src/controller/activity')
const factory = require('../../../src/factory')
const CONSTANT = require('../../../src/property')

jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../logger')
jest.mock('../../../src/service')
jest.mock('../../../src/factory')
jest.mock('../../../src/controller/activity', () => ({
	couponHandler: {
		execute: jest.fn(),
	},
}))

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de quotationControler.js', () => {
	beforeEach(() => {
		activity.couponHandler.execute.mockResolvedValue(null)
		factory.quotation.create.mockImplementation((input) => input)
	})

	test('Deve invocar a layer de token somente uma vez', async () => {
		const spyLayer = jest.spyOn(tokenLayer, 'getSensediaTokenHub')

		API.vida.viagemOn.oferta.post = jest.fn(() => {
			return MOCKS.API_DATA_QUOTACAO
		})

		await controller.quotation.create(MOCKS.VALID_INPUT_DATA, '123elhe1')

		expect(spyLayer).toHaveBeenCalled()
		expect(spyLayer).toHaveBeenCalledTimes(1)
	})

	test('Deve retornar um objeto de resposta de sucesso no padrão esperado', async () => {
		API.vida.viagemOn.oferta.post = jest.fn(() => {
			return MOCKS.API_DATA_QUOTACAO
		})

		const response = await controller.quotation.create(MOCKS.VALID_INPUT_DATA, '123elhe1')
		
		expect(typeof response).toBe('object')
		expect(response).toHaveProperty('orcamento')
	})

	test('cupomAplicado deve ser null quando nenhum cupom e aplicado', async () => {
		API.vida.viagemOn.oferta.post = jest.fn(() => ([{ ...MOCKS.API_DATA_QUOTACAO }]))

		const payloadSemCupom = {
			...MOCKS.VALID_INPUT_DATA,
			informacoes: MOCKS.VALID_INPUT_DATA.informacoes.filter(
				(item) => item.codigo !== 'DICIO_CUPOM'
			),
		}

		const response = await controller.quotation.create(payloadSemCupom, '123elhe1')

		expect(Array.isArray(response)).toBe(true)
		expect(response[0].cupomAplicado).toBeNull()
	})

	test('cupomAplicado deve conter codigo e percentualDesconto quando atividade retorna cupom', async () => {
		activity.couponHandler.execute.mockResolvedValue({
			codigo: 'CUPOM30',
			percentualDesconto: 30,
		})

		API.vida.viagemOn.oferta.post = jest.fn(() => ([{ ...MOCKS.API_DATA_QUOTACAO }]))

		const payloadSemCupom = {
			...MOCKS.VALID_INPUT_DATA,
			informacoes: MOCKS.VALID_INPUT_DATA.informacoes.filter(
				(item) => item.codigo !== 'DICIO_CUPOM'
			),
		}

		const response = await controller.quotation.create(payloadSemCupom, '123elhe1')

		expect(Array.isArray(response)).toBe(true)
		expect(response[0].cupomAplicado).toEqual({
			codigo: 'CUPOM30',
			percentualDesconto: 30,
		})
	})

	describe('Orcamento de tempo da chamada de oferta', () => {
		const buildContext = (remainingMs) => ({
			getRemainingTimeInMillis: () => remainingMs,
		})

		test('Deve usar o timeout padrao quando o tempo restante for folgado', async () => {
			API.vida.viagemOn.oferta.post = jest.fn(() => MOCKS.API_DATA_QUOTACAO)

			await controller.quotation.create(
				MOCKS.VALID_INPUT_DATA,
				'123elhe1',
				buildContext(30000)
			)

			expect(API.vida.viagemOn.oferta.post).toHaveBeenCalledWith(
				expect.anything(),
				undefined,
				'123elhe1',
				CONSTANT.OFERTA_API_TIMEOUT_MS
			)
		})

		test('Deve reduzir o timeout ao tempo restante menos a reserva de resposta', async () => {
			API.vida.viagemOn.oferta.post = jest.fn(() => MOCKS.API_DATA_QUOTACAO)

			await controller.quotation.create(
				MOCKS.VALID_INPUT_DATA,
				'123elhe1',
				buildContext(8000)
			)

			expect(API.vida.viagemOn.oferta.post).toHaveBeenCalledWith(
				expect.anything(),
				undefined,
				'123elhe1',
				8000 - CONSTANT.LAMBDA_RESPONSE_RESERVE_MS
			)
		})

		test('Deve respeitar o piso minimo quando quase nao houver tempo restante', async () => {
			API.vida.viagemOn.oferta.post = jest.fn(() => MOCKS.API_DATA_QUOTACAO)

			await controller.quotation.create(
				MOCKS.VALID_INPUT_DATA,
				'123elhe1',
				buildContext(2200)
			)

			expect(API.vida.viagemOn.oferta.post).toHaveBeenCalledWith(
				expect.anything(),
				undefined,
				'123elhe1',
				CONSTANT.MIN_API_TIMEOUT_MS
			)
		})

		test('Deve usar o timeout padrao quando o context nao for informado', async () => {
			API.vida.viagemOn.oferta.post = jest.fn(() => MOCKS.API_DATA_QUOTACAO)

			await controller.quotation.create(MOCKS.VALID_INPUT_DATA, '123elhe1')

			expect(API.vida.viagemOn.oferta.post).toHaveBeenCalledWith(
				expect.anything(),
				undefined,
				'123elhe1',
				CONSTANT.OFERTA_API_TIMEOUT_MS
			)
		})
	})

	test('Nao deve incluir cupomAplicado quando resposta da oferta nao for array', async () => {
		API.vida.viagemOn.oferta.post = jest.fn(() => ({ ...MOCKS.API_DATA_QUOTACAO }))

		const response = await controller.quotation.create(MOCKS.VALID_INPUT_DATA, '123elhe1')

		expect(response).not.toHaveProperty('cupomAplicado')
	})
})