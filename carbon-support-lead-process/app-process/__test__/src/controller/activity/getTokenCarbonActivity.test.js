const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const service = require('../../../../src/service')
const activity = require('../../../../src/controller/activity')
const errors = require('../../../../src/error')
const MOCKS = require('../../../mocks/index')

jest.mock('@porto-seguro/hub-vendas.carbon-token')

describe('tokenActivity test suite', () => {
	test('Should get token with success', async () => {
		tokenLayer.getSensediaTokenHubCloud.mockResolvedValue(
			MOCKS.ACTIVITY_TOKEN.VALID_RESPONSE_DATA()
		)

		const result = await activity.getTokenCloud.execute()

		expect(result).toEqual(MOCKS.ACTIVITY_TOKEN.VALID_RESPONSE_DATA())
	})

	test('Should throw an error when calls token layer with fail', async () => {
		const errorSpy = jest.spyOn(service.logger, 'error')

		tokenLayer.getSensediaTokenHubCloud.mockRejectedValue(
			new errors.TokenError()
		)

		await expect(activity.getTokenCloud.execute()).rejects.toThrow(
			errors.TokenError
		)

		expect(errorSpy).toHaveBeenCalledWith(MOCKS.ACTIVITY_TOKEN.LOG_ERROR_TOKEN())
	})
})