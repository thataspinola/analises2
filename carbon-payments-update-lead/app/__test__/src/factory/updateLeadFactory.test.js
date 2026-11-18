const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('Suite de testes de updateLeadFactory.js', () => {
	test('Deve criar o payload correto para um escopo `phone` com status `PAGA`', () => {
		const payload = factory.updateLead.createPayload(
			MOCKS.VALID_INPUT_DATA_PAID
		)

		expect(payload).toEqual(MOCKS.EXPECT_PAYLOAD_PHONE_PAID)
	})

	test('Deve criar o payload correto para um escopo `phone` com status `PAGA` quando recebe tipo produto', () => {
		const payload = factory.updateLead.createPayload(
			MOCKS.VALID_INPUT_DATA_PAID_WITH_ID_TYPE_PRODUCT
		)

		expect(payload).toEqual(
			MOCKS.EXPECT_PAYLOAD_PHONE_PAID_WITH_ID_TYPE_PRODUCT
		)
	})

	test('Deve criar o payload correto para um escopo `auto` com status `REJEITADA`', () => {
		const payload = factory.updateLead.createPayload(
			MOCKS.VALID_INPUT_DATA_REJECTED
		)

		expect(payload).toEqual(MOCKS.EXPECT_PAYLOAD_AUTO_REJECTED)
	})

	test('Deve criar o payload correto para um escopo `life` com status `PAGA`', () => {
		const payload = factory.updateLead.createPayload(
			MOCKS.INPUT_PAYLOAD_LIFE('PAGA')
		)

		expect(payload).toEqual(MOCKS.EXPECT_PAYLOAD_LIFE_PAGA)
	})

	test('Deve criar o payload correto para um escopo `life` com status `REJEITADA`', () => {
		const payload = factory.updateLead.createPayload(
			MOCKS.INPUT_PAYLOAD_LIFE('REJEITADA')
		)

		expect(payload).toEqual(MOCKS.EXPECT_PAYLOAD_LIFE_REJEITADA)
	})

	test('Deve criar o payload correto para um escopo `portable_device` com status `PAGA`', () => {
		const payload = factory.updateLead.createPayload(
			MOCKS.INPUT_PAYLOAD_PORTABLE_DEVICE('PAGA')
		)

		expect(payload).toEqual(MOCKS.EXPECT_PAYLOAD_PORTABLE_DEVICE_PAGA)
	})

	test('Deve criar o payload correto para um escopo `portable_device` com status `REJEITADA`', () => {
		const payload = factory.updateLead.createPayload(
			MOCKS.INPUT_PAYLOAD_PORTABLE_DEVICE('REJEITADA')
		)

		expect(payload).toEqual(MOCKS.EXPECT_PAYLOAD_PORTABLE_DEVICE_REJEITADA)
	})
})
