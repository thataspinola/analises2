const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const controller = require('../../../src/controller')
const MOCKS = require('../../mocks/index.mock')
const api = require('../../../src/api')

jest.mock('@porto-seguro/hub-vendas.carbon-token')

afterEach(() => {
	jest.clearAllMocks()
})

beforeEach(() => {
	api.vidaOn.getIncomeBracket = jest.fn(() => {
		return MOCKS.API_VIDAON_INCOME_BRACKET_VALID_RETURN()
	})
})

describe('Given a incomeBracket controller proccess call', () => {
	test('It should have success and not throw an error', async () => {
		await expect(controller.incomeBracket.verify()).resolves.toEqual({
			statusCode: 200,
			body: MOCKS.API_VIDAON_INCOME_BRACKET_VALID_RETURN(),
		})
	})

	test('It should get an exception when token layer returns an error', async () => {
		const error = new Error('Token layer error')
		tokenLayer.getSensediaTokenCarbonCloud.mockRejectedValueOnce(error)

		await expect(controller.incomeBracket.verify()).rejects.toBe(error)
	})

	test('It should get an exception when api.vidaOn.getIncomeBracket returns an error', async () => {
		const error = new Error('VidaON getIncomeBracket error')
		api.vidaOn.getIncomeBracket.mockRejectedValueOnce(error)

		await expect(controller.incomeBracket.verify()).rejects.toBe(error)
	})
})
