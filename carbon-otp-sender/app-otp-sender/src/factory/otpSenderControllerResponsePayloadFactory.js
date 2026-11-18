const CONSTANT = require('../property')
exports.getPayload = (
	cpf,
	cellphone,
	emailAddress,
	otpCode,
	sendSmsMessageId,
	sendEmailQueueMessageId
) => {
	const areaCode = cellphone.substring(0, 2)
	const phoneNumberSuffix = cellphone.substring(6)
	const otpCodeEnd = otpCode?.substring(3)

	const payload = {
		cpf: `${cpf.substring(0, 4)}******`,
		celular: `(${areaCode})*****${phoneNumberSuffix}`,
		email: emailAddress?.trim()
			? emailAddress.replace(CONSTANT.EMAIL_MASK_REGEX, '*')
			: 'N/A',
		otp: otpCodeEnd ? `***${otpCodeEnd}` : 'N/A',
		sendSmsMessageId: sendSmsMessageId ?? 'N/A',
		sendEmailQueueMessageId: sendEmailQueueMessageId ?? 'N/A',
	}

	return payload
}
