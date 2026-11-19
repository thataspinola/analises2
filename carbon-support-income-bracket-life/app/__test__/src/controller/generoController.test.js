const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const controller = require('../../../src/controller')
const MOCKS = require('../../mocks/index.mock')
const api = require('../../../src/api')

jest.mock('@porto-seguro/hub-vendas.carbon-token')

afterEach(() => {
	jest.clearAllMocks()
})

beforeEach(() => {
	global.logger = {
		error: jest.fn(),
	}

	api.vidaOn.getIncomeBracket = jest.fn(() => {
		return MOCKS.API_VIDAON_INCOME_BRACKET_VALID_RETURN()
	})
})

describe('Given a incomeBracket controller proccess call', () => {
	test('It should have success and not throw an error', async () => {
		expect(async () => {
			controller.incomeBracket.verify()
		}).not.toThrow()
	})

	test('It should get an exception when token layer returns an error', async () => {
		tokenLayer.getSensediaTokenCarbonCloud.mockImplementationOnce(() =>
			Promise.reject({ message: 'Token layer error' })
		)

		expect(controller.incomeBracket.verify()).rejects.toThrow(
			`API vida-on income-bracket-life error: Token layer error`
		)
	})

	test('It should get an exception when api.vidaOn.getIncomeBracket returns an error', async () => {
		api.vidaOn.getIncomeBracket.mockImplementationOnce(() =>
			Promise.reject({ message: 'VidaON getIncomeBracket error' })
		)

		expect(controller.incomeBracket.verify()).rejects.toThrow(
			`API vida-on income-bracket-life error: VidaON getIncomeBracket error`
		)
	})
})
