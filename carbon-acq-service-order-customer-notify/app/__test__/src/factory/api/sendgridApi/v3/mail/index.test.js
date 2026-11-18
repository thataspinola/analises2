const factory = require('../../../../../../../src/factory')
const MOCKS = require('../../../../../../mocks/index.mock')

describe('getPayload', () => {
	test('It should return correct structure with all fields', () => {
		const parsedSnsMessagePayload =
			MOCKS.FACTORY_API_SENDGRID_V3_MAIL_POSTSENDPOINT.GETPAYLOAD_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT()
		const getPayloadExpectedReturn =
			MOCKS.FACTORY_API_SENDGRID_V3_MAIL_POSTSENDPOINT.GETPAYLOAD_VALID_RETURN()
		const getPayloadReturn =
			factory.api.sendgrid.v3.mail.postSendEndpoint.getPayload(
				parsedSnsMessagePayload
			)

		expect(getPayloadReturn).toEqual(getPayloadExpectedReturn)
	})

	test('It should return success when the transactionType is PIX', () => {
		const parsedSnsMessagePayload =
			MOCKS.FACTORY_API_SENDGRID_V3_MAIL_POSTSENDPOINT.GETPAYLOAD_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT_TRANSACTIONTYPE_PIX()
		const getPayloadExpectedReturn =
			MOCKS.FACTORY_API_SENDGRID_V3_MAIL_POSTSENDPOINT.GETPAYLOAD_VALID_TEMPLATEID_PIX_RETURN()
		const getPayloadReturn =
			factory.api.sendgrid.v3.mail.postSendEndpoint.getPayload(
				parsedSnsMessagePayload
			)

		expect(getPayloadReturn).toEqual(getPayloadExpectedReturn)
	})

	test('It should return success when the transactionType is CREDIT CARD', () => {
		const parsedSnsMessagePayload =
			MOCKS.FACTORY_API_SENDGRID_V3_MAIL_POSTSENDPOINT.GETPAYLOAD_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT_TRANSACTIONTYPE_CREDITCARD()
		const getPayloadExpectedReturn =
			MOCKS.FACTORY_API_SENDGRID_V3_MAIL_POSTSENDPOINT.GETPAYLOAD_VALID_RETURN()
		const getPayloadReturn =
			factory.api.sendgrid.v3.mail.postSendEndpoint.getPayload(
				parsedSnsMessagePayload
			)

		expect(getPayloadReturn).toEqual(getPayloadExpectedReturn)
	})

	test('It should use schedule.estimatedDateTime when schedule.type is agendamento-imediato for %service_scheduling_datetime_hour_finish%', () => {
		const parsedSnsMessagePayload =
			MOCKS.FACTORY_API_SENDGRID_V3_MAIL_POSTSENDPOINT.GETPAYLOAD_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT()

		parsedSnsMessagePayload.integrationData.serviceOrder.schedule.type = 'agendamento-imediato'
		parsedSnsMessagePayload.integrationData.serviceOrder.schedule.estimatedDateTime = '2024-10-21T08:30:00.000'

		const getPayloadReturn =
			factory.api.sendgrid.v3.mail.postSendEndpoint.getPayload(
				parsedSnsMessagePayload
			)

		expect(getPayloadReturn.personalizations[0].substitutions['%service_scheduling_datetime_hour_finish%']).toEqual("08:30")
	})
})
