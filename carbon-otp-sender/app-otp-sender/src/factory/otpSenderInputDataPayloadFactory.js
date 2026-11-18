const CONSTANT = require('../property')

exports.getPayload = (inputData) => {
	const areaCode = inputData.destinationnumber.substring(0, 2)
	const phoneNumberSuffix = inputData.destinationnumber.substring(6)

	const payload = {
		cpf: `${inputData.taxvat.substring(0, 4)}******`,
		celular: `(${areaCode})*****${phoneNumberSuffix}`,
		email: inputData.emaildestinantionaddress?.trim()
			? emaildestinantionaddress.replace(CONSTANT.EMAIL_MASK_REGEX, '*')
			: 'N/A',
		pescod: inputData.pescod,
	}

	return payload
}
