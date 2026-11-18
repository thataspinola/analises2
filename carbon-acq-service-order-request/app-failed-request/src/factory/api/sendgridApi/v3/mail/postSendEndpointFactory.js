const CONSTANT = require('../../../../../property')

exports.getPayload = (parsedSqsMessagePayload) => {
	const payload = {
		personalizations: [
			{
				to: [
					{
						email: parsedSqsMessagePayload.integrationData.customer.email,
					},
				],
			},
		],
		from: {
			email: CONSTANT.PORTOSERVICO_SERVICEORDER_MAIL_SENDER,
			name: CONSTANT.PORTOSERVICO_SERVICEORDER_MAIL_SENDER_NAME,
		},
		subject: CONSTANT.PORTOSERVICO_SERVICEORDER_MAIL_FAILED_SUBJECT,
		template_id: CONSTANT.PORTOSERVICO_SERVICEORDER_MAIL_FAILED_TEMPLATEID,
	}
	return payload
}
