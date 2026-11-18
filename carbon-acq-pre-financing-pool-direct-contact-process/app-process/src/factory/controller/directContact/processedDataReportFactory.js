const CONSTANT = require('../../../property')
exports.getDataReport = (
	taxvat,
	cellphone,
	emailAddress,
	pescod,
	consentRegistered,
	sendConsentTopicMessageId,
	leadId,
	sendAnalyticsCollectMessageId,
	isCnpjDocument
) => {
	const areaCode = cellphone.substring(0, 2)
	const phoneNumberSuffix = cellphone.substring(6)

	const payload = {
		celular: `(${areaCode})*****${phoneNumberSuffix}`,
		email: emailAddress?.trim()
			? emailAddress.replace(CONSTANT.EMAIL_MASK_REGEX, '*')
			: 'N/A',
		pescod: `${pescod ?? 'N/A'}`,
		consentimentoRegistrado: consentRegistered ? 'SIM' : 'NÃO',
		sendConsentTopicMessageId: sendConsentTopicMessageId ?? 'N/A',
		leadId: leadId ?? 'N/A',
		sendAnalyticsCollectMessageId: sendAnalyticsCollectMessageId ?? 'N/A',
	}
	if (isCnpjDocument) {
		payload.cnpj = `${taxvat.substring(0, 4)}******`
	} else {
		payload.cpf = `${taxvat.substring(0, 4)}******`
	}

	return payload
}
