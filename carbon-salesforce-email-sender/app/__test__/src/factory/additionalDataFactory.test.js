const MOCKS = require('../../mocks/additionalDataFactory.mock')
const factory = require('../../../src/factory')

describe('Suite de testes de additionalData.js', () => {
	test('Deve montar corretamente os dados do cliente, corretor e pessoa', () => {
		const result = factory.additionalData.mount(
			MOCKS.CLIENT_DATA,
			MOCKS.BROKER_DATA,
			MOCKS.PESCOD
		)

		expect(result).toEqual(MOCKS.EXPECT_OUTPUT)
	})

	test('Deve montar corretamente os dados do cliente com nome social, corretor e pessoa', () => {
		const result = factory.additionalData.mount(
			MOCKS.CLIENT_DATA_WITH_SOCIAL_NAME,
			MOCKS.BROKER_DATA,
			MOCKS.PESCOD
		)

		expect(result).toEqual(MOCKS.EXPECT_OUTPUT_WITH_SOCIAL_NAME)
	})
})
test('Deve lidar com entradas indefinidas', () => {
	const result = factory.additionalData.mount(undefined, undefined, undefined)

	expect(result).toEqual(MOCKS.EXPECT_OUTPUT_UNDEFINED)
})
