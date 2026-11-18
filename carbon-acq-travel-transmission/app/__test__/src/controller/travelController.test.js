const MOCKS = require('../../mocks/src/controller/travelController.mock')
const controller = require('../../../src/controller')
const api = require('../../../src/api')
const token = require('@porto-seguro/hub-vendas.carbon-token')
const activity = require('./../../../src/controller/activity')

jest.mock('./../../../src/controller/activity')

beforeAll(() => {
	jest.clearAllMocks()
	activity.getCertificate.execute.mockResolvedValue(MOCKS.CERTIFICATE())

	token.getSensediaTokenHubInternal = jest.fn(async () => {
		return MOCKS.FAKE_TOKEN()
	})
})

describe('Scenario with Successful request test', () => {
	test('It should receive a checkout item payload and process with success', async () => {
		const spyPortoPay = jest
			.spyOn(api.viagemOn, 'integration')
			.mockImplementation(() => {
				return MOCKS.API_TRAVEL_SUCCESS_RESPONSE()
			})

		const response = await controller.travel.process(
			MOCKS.VALID_CONTROLLER_INPUT_REQUEST()
		)

		expect(response).toEqual(MOCKS.DEFAULT_SUCCESS_RESPONSE())
		expect(spyPortoPay).toHaveBeenCalledWith(
			MOCKS.FAKE_TOKEN(),
			MOCKS.CERTIFICATE(),
			MOCKS.API_TRAVEL_VALID_REQUEST()
		)
	})
})

describe('Scenario with Fail request test', () => {
	test('It should receive a checkout item payload and process receiving api error', async () => {
		const spyPortoPay = jest
			.spyOn(api.viagemOn, 'integration')
			.mockImplementation(() => {
				throw new Error('fake error')
			})

		const response = controller.travel.process(
			MOCKS.VALID_CONTROLLER_INPUT_REQUEST()
		)

		await expect(response).rejects.toEqual(new Error('fake error'))
		expect(spyPortoPay).toHaveBeenCalled()
	})
})
