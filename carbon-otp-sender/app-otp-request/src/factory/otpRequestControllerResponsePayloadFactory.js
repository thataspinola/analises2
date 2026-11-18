const CONSTANT = require('../property')

exports.getPayload = (cellphone, email) => {
	const areaCode = cellphone.substring(0, 2)
	const phoneNumberSuffix = cellphone.substring(7)
	const maskedEmail = email.replace(CONSTANT.EMAIL_MASK_REGEX, '*')
	const payload = {
		celular: `(${areaCode})*****${phoneNumberSuffix}`,
		email: `${maskedEmail}`,
	}

	return payload
}
