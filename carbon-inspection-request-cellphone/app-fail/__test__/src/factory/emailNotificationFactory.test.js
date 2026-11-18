const factory = require('../../../src/factory') // Adjust the path to where your code is located

describe('Suite de testes de emailNotificationFactory.js', () => {
	test('Deve criar um payload com o status de ERRO e o scope do phone', () => {
		const inputData = {
			orderNumber: '12345',
			externalId: 'abcde',
			scope: 'phone',
		}

		const expectedPayload = {
			status: 'ERROR',
			scope: 'phone',
			paymentData: {
				orderNumber: '12345',
				externalId: 'abcde',
				scope: 'phone',
			},
		}

		const result = factory.emailNotification.createPayload(inputData)

		expect(result).toEqual(expectedPayload)
	})
})
