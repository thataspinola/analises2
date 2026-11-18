const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const service = require('../../../../src/service')
const activity = require('../../../../src/controller/activity')
const errors = require('../../../../src/error')
const MOCKS = require('../../../mocks/src/controller/activity/tokenActivity.mock')

jest.mock('@porto-seguro/hub-vendas.carbon-token')

describe('tokenActivity test suite', () => {
	test('Should get commerce token with success', async () => {
		tokenLayer.getMulesoftTokenHub.mockResolvedValue(
			MOCKS.VALID_RESPONSE_DATA()
		)

		const result = await activity.getToken.execute()

		expect(result).toEqual(MOCKS.VALID_RESPONSE_DATA())
	})

	test('Should throw an error when calls token layer with fail', async () => {
		const errorSpy = jest.spyOn(service.logger, 'error')

		tokenLayer.getMulesoftTokenHub.mockRejectedValue(
			new Error(MOCKS.TOKEN_MESSAGE_ERROR())
		)

		await expect(activity.getToken.execute('traceId')).rejects.toThrow(
			errors.TokenError
		)

		expect(errorSpy).toHaveBeenCalledWith(MOCKS.LOG_ERROR_TOKEN(), "Erro identificado durante a atividade' Obtendo o token Sensedia'")
	})
})
