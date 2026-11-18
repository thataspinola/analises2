const MOCKS = require('../../../mocks/index.mock')
const factory = require('../../../../src/factory')

describe('Suite de testes de emailNotificationFactory.js', () => {
	describe('Dada uma chamada ao método `getPayload`', () => {
		test('Deve criar um payload com o status de ERRO e o scope do portable_device', () => {
			const result = factory.api.emailNotification.getPayload(
				MOCKS.FACTORY_EMAIL_NOTIFICATION.VALID_INPUT()
			)

			expect(result).toEqual(MOCKS.FACTORY_EMAIL_NOTIFICATION.VALID_RETURN())
		})
	})
})
