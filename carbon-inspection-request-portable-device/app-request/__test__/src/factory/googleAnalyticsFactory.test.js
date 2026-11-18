const MOCKS = require('../../mocks/index.mock')
const factory = require('../../../src/factory')

describe('Suite de testes de googleAnalyticsFactory.js', () => {
	describe('Dada uma chamada ao método `getMessage`', () => {
		test('Deve retornar uma resposta com o valor esperado', async () => {
			const response = factory.googleAnalytics.getMessage(
				MOCKS.FACTORY_GOOGLE_ANALYTICS.VALID_INPUT(),
				MOCKS.FACTORY_GOOGLE_ANALYTICS.PROPOSAL_ID()
			)
			expect(response).toEqual(MOCKS.FACTORY_GOOGLE_ANALYTICS.VALID_RETURN())
		})
	})
})
