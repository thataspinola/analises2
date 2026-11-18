const CONSTANT = require('../../../property')

exports.getPayload = (cellphone, otpCode) => {
	const areaCode = cellphone.substring(0, 2)
	const phoneNumber = cellphone.substring(2)
	const payload = {
		codigoDdd: areaCode,
		numeroTelefone: phoneNumber,
		origem: '',
		mensagem: `${otpCode} ${CONSTANT.CORPORATIVO_SMSSERVICE_SENDSMS_MENSAGEM} #${otpCode}`,
	}

	return payload
}
