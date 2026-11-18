const crypto = require('crypto')

function generateRandomString(length) {
	return crypto
		.randomBytes(Math.ceil(length / 2))
		.toString('hex')
		.slice(0, length)
}

const factory = require('../../../../../../../src/factory')
const MOCKS = require('../../../../../../mocks/index.mock')

describe('Given a semSeguro.getPayload call', () => {
	test('When channel is Whatsapp, it should return a valid payload object that will be used to call semSeguro endpoint from producaoComercial/multicanal/leads API', async () => {
		const getPayloadReturnValue =
			factory.api.producaoComercial.multicanal.leads.semSeguro.getPayload(
				MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_VALID_DATA_INPUT(),
				MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_VALID_PESCOD_INPUT()
			)
		expect(getPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_VALID_RETURN()
		)
	})
	test('When channel is Telephone, it should return a valid payload object that will be used to call consentimentos endpoint from auditoria/rastreabilidadeCdc API', async () => {
		const getPayloadReturnValue =
			factory.api.producaoComercial.multicanal.leads.semSeguro.getPayload(
				MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_HUBLIGUEME_CHANNEL_VALID_DATA_INPUT(),
				MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_VALID_PESCOD_INPUT()
			)
		expect(getPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_HUBLIGUEME_CHANNEL_VALID_RETURN()
		)
	})
	test('When channel is Whatsapp and using CNPJ, it should return a valid payload object that will be used to call semSeguro endpoint from producaoComercial/multicanal/leads API', async () => {
		const getPayloadReturnValue =
			factory.api.producaoComercial.multicanal.leads.semSeguro.getPayload(
				MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_CNPJ_VALID_DATA_INPUT(),
				MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_VALID_PESCOD_INPUT(),
				true
			)
		expect(getPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_CNPJ_VALID_RETURN()
		)
	})
	test('When channel is Telephone and using CNPJ, it should return a valid payload object that will be used to call consentimentos endpoint from auditoria/rastreabilidadeCdc API', async () => {
		const getPayloadReturnValue =
			factory.api.producaoComercial.multicanal.leads.semSeguro.getPayload(
				MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_HUBLIGUEME_CHANNEL_CNPJ_VALID_DATA_INPUT(),
				MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_VALID_PESCOD_INPUT(),
				true
			)
		expect(getPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_HUBLIGUEME_CHANNEL_CNPJ_VALID_RETURN()
		)
	})
	test('It should include id_google, utm_source, utm_medium, and utm_content in the payload when provided', async () => {
		const inputData = {
			...MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_VALID_DATA_INPUT(),
			nomeSocial: '',
			id_google: 'test_id_google',
			utm_source: 'test_utm_source',
			utm_medium: 'test_utm_medium',
			utm_content: 'test_utm_content',
		}
		const pescod =
			MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_VALID_PESCOD_INPUT()
		const getPayloadReturnValue =
			factory.api.producaoComercial.multicanal.leads.semSeguro.getPayload(
				inputData,
				pescod
			)

		expect(getPayloadReturnValue.LeadXml).toContain(
			'<id_google>test_id_google</id_google>'
		)
		expect(getPayloadReturnValue.LeadXml).toContain(
			'<utm_source>test_utm_source</utm_source>'
		)
		expect(getPayloadReturnValue.LeadXml).toContain(
			'<utm_medium>test_utm_medium</utm_medium>'
		)
		expect(getPayloadReturnValue.LeadXml).toContain(
			'<utm_content>test_utm_content</utm_content>'
		)
	})
	test('It should include utm_campaign in the payload when provided', async () => {
		const inputData = {
			...MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_VALID_DATA_INPUT(),
			utm_campaign: 'test_utm_campaign',
		}
		const pescod =
			MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_VALID_PESCOD_INPUT()
		const getPayloadReturnValue =
			factory.api.producaoComercial.multicanal.leads.semSeguro.getPayload(
				inputData,
				pescod
			)
		expect(getPayloadReturnValue.LeadXml).toContain(
			'<utm_campaign>test_utm_campaign</utm_campaign>'
		)
	})
	test('It should include extra utm_* in the payload when provided', async () => {
		const randomUtmProperty = `utm_${generateRandomString(5)}`
		const inputData = {
			...MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_VALID_DATA_INPUT(),
		}
		inputData[randomUtmProperty] = `test_${randomUtmProperty}`
		const pescod =
			MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_VALID_PESCOD_INPUT()
		const getPayloadReturnValue =
			factory.api.producaoComercial.multicanal.leads.semSeguro.getPayload(
				inputData,
				pescod
			)
		expect(getPayloadReturnValue.LeadXml).toContain(
			`<${randomUtmProperty}>test_${randomUtmProperty}</${randomUtmProperty}>`
		)
	})
	test('It should include nomeSocial in the payload when provided', async () => {
		const inputData = {
			...MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_VALID_DATA_INPUT(),
			client: {
				...MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_VALID_DATA_INPUT()
					.client,
				socialName: 'NS test',
			},
		}
		const pescod =
			MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_VALID_PESCOD_INPUT()
		const getPayloadReturnValue =
			factory.api.producaoComercial.multicanal.leads.semSeguro.getPayload(
				inputData,
				pescod
			)

		expect(getPayloadReturnValue.LeadXml).toContain(
			'<nome_social>NS test</nome_social>'
		)
	})
})
