const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a consentimentos.getPayload call', () => {
	test('It should return a valid payload object that will be used to call consentimentos endpoint from auditoria/rastreabilidadeCdc API', async () => {
		const getPayloadReturnValue =
			await factory.api.auditoria.rastreabilidadeCdc.consentimentos.getPayload(
				MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_VALID_CLIENTDATA_INPUT(),
				MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_FALSE_MARKETINGOPTOUTFLAG_INPUT(),
				MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_VALID_PRODUCT_INPUT(),
				MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_VALID_BCPID_INPUT()
			)
		expect(getPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_VALID_RETURN()
		)
	})
	test('If Bcpid parameter is not provided, it should return a valid payload object that will be used to call consentimentos endpoint from auditoria/rastreabilidadeCdc API', async () => {
		const getPayloadReturnValue =
			await factory.api.auditoria.rastreabilidadeCdc.consentimentos.getPayload(
				MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_VALID_CLIENTDATA_INPUT(),
				MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_FALSE_MARKETINGOPTOUTFLAG_INPUT(),
				MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_VALID_PRODUCT_INPUT()
			)
		expect(getPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_WITHOUT_BCPID_VALID_RETURN()
		)
	})
	test('If marketingOptOutFlag parameter is true, it should return a valid payload object that will be used to call consentimentos endpoint from auditoria/rastreabilidadeCdc API', async () => {
		const getPayloadReturnValue =
			await factory.api.auditoria.rastreabilidadeCdc.consentimentos.getPayload(
				MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_VALID_CLIENTDATA_INPUT(),
				MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_TRUE_MARKETINGOPTOUTFLAG_INPUT(),
				MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_VALID_PRODUCT_INPUT(),
				MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_VALID_BCPID_INPUT()
			)
		expect(getPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_WITH_FALSE_MARKETING_CONSENT_VALID_RETURN()
		)
	})
})
