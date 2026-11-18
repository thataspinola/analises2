const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')

describe('Given a whatsappPortoBotTrigger.getHeaders call', () => {
	test('It should return headers array that will be used to call 2 endpoint from zenvia/portoassistencia API', async () => {
		const getHeadersReturnValue =
			await factory.api.zenvia.portoAssistencia.whatsappPortoBotTrigger.getHeaders()
		expect(getHeadersReturnValue).toEqual(
			MOCKS.FACTORY_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_GETHEADERS_VALID_RETURN()
		)
	})
})

describe('Given a whatsappPortoBotTrigger.getPayload call', () => {
	test('It should return a valid payload object that will be used to call 2 endpoint from zenvia/portoassistencia API', async () => {
		const getPayloadReturnValue =
			await factory.api.zenvia.portoAssistencia.whatsappPortoBotTrigger.getPayload(
				MOCKS.FACTORY_ZENVIA_PORTOASSISTENCIA_WHATSAPPPORTOBOTTRIGGER_GETPAYLOAD_VALID_DATA_INPUT(),
				MOCKS.FACTORY_ZENVIA_PORTOASSISTENCIA_WHATSAPPPORTOBOTTRIGGER_GETPAYLOAD_VALID_IDLEAD_INPUT()
			)
		expect(getPayloadReturnValue).toEqual(
			MOCKS.FACTORY_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_GETPAYLOAD_VALID_RETURN()
		)
	})
})
