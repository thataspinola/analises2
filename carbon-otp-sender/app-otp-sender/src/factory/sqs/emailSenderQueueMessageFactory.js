const CONSTANT = require('../../property')
exports.getMessage = (destinationEmail, clientName, otpCode) => {
	const message = {
		from: CONSTANT.SERVICE_SQS_EMAIL_SENDER_QUEUE_MESSAGE_SENDER,
		to: [destinationEmail],
		cc: [],
		bcc: [],
		subject: `${CONSTANT.SERVICE_SQS_EMAIL_SENDER_QUEUE_MESSAGE_SUBJECT}${otpCode}`,
		emailType: 'HTML',
		template: 'template/email-otp-message.edge',
		metadata: {
			NOME_USUARIO: clientName,
			CODIGO_OTP: otpCode,
		},
	}

	return message
}
