const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const service = require('../../../../src/service')
const activity = require('../../../../src/controller/activity')
const errors = require('../../../../src/error')
const MOCKS = require('../../../mocks/src/controller/activity/certificateActivity.mock')

jest.mock('@porto-seguro/hub-vendas.carbon-token')

describe('certificateActivity test suite', () => {
	test('Should get certicate with success', async () => {
		tokenLayer.getPortoCertificates.mockResolvedValue(
			MOCKS.VALID_RESPONSE_DATA()
		)

		const result = await activity.getCertificate.execute()

		expect(result).toEqual(MOCKS.VALID_RESPONSE_DATA())
	})

	test('Should throw an error when calls certicate layer with fail', async () => {
		const errorSpy = jest.spyOn(service.logger, 'error')

		tokenLayer.getPortoCertificates.mockRejectedValue(
			new Error(MOCKS.CERTIFICATE_MESSAGE_ERROR())
		)

		await expect(activity.getCertificate.execute('traceId')).rejects.toThrow(
			errors.TokenError
		)

		expect(errorSpy).toHaveBeenCalledWith(MOCKS.LOG_ERROR_CERTIFICATE(), "Erro identificado durante a atividade' Obtendo o certificado do Sensedia'")
	})
})
