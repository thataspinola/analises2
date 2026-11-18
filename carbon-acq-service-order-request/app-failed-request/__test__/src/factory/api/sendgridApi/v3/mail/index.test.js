const factory = require('../../../../../../../src/factory')
const MOCKS = require('../../../../../../mocks/index.mock')
describe('getPayload', () => {
	test('It should return correct structure with all fields', () => {
		const parsedSqsMessagePayload =
			MOCKS.FACTORY_API_SENDGRID_V3_MAIL_POSTSENDPOINT.PARSEDSQSMESSAGEPAYLOAD_VALID_INPUT()

		const getPayloadExpectedReturn =
			MOCKS.FACTORY_API_SENDGRID_V3_MAIL_POSTSENDPOINT.VALID_RETURN()

		const getPayloadReturn =
			factory.api.sendgrid.v3.mail.postSendEndpoint.getPayload(
				parsedSqsMessagePayload
			)
		expect(getPayloadReturn).toEqual(getPayloadExpectedReturn)
	})
})
