exports.GETDATAREPORT_TAXVAT_VALID_INPUT = () => {
	return '82674864'
}

exports.GETDATAREPORT_CELLPHONE_VALID_INPUT = () => {
	return '1198754422'
}

exports.GETDATAREPORT_EMAILADDRESS_VALID_INPUT = () => {
	return 'nomeneidesm@emaildomain.com'
}

exports.GETDATAREPORT_PESCOD_VALID_INPUT = () => {
	return '82674864'
}

exports.GETDATAREPORT_CONSENTREGISTERED_YES_VALID_INPUT = () => {
	return true
}

exports.GETDATAREPORT_CONSENTREGISTERED_NO_VALID_INPUT = () => {
	return false
}

exports.GETDATAREPORT_LEADID_VALID_INPUT = () => {
	return '179265dc-f013-4fe4-a010-a0aae2103877'
}

exports.GETDATAREPORT_SENDCONSENTTOPICMESSAGEID_NULL_VALID_INPUT = () => {
	return null
}

exports.GETDATAREPORT_SENDCONSENTTOPICMESSAGEID_VALID_INPUT = () => {
	return 'a0Fc01eb-1de2-4ac8-b21e-f147123af689'
}
exports.GETDATAREPORT_SENDANALYTICSCOLLECTMESSAGEID_VALID_INPUT = () => {
	return 'd5f6aa22-a863-4df9-9763-37ab760a3866'
}

exports.GETDATAREPORT_ISCNPJDOCUMENT_TRUE_VALID_INPUT = () => {
	return true
}

exports.GETDATAREPORT_ISCNPJDOCUMENT_FALSE_VALID_INPUT = () => {
	return false
}

exports.GETDATAREPORT_ISCNPJDOCUMENT_TRUE_VALID_RETURN = () => {
	return {
		celular: '(11)*****4422',
		consentimentoRegistrado: 'SIM',
		email: 'n*********m@e*aildomain.com',
		leadId: '179265dc-f013-4fe4-a010-a0aae2103877',
		pescod: '82674864',
		sendConsentTopicMessageId: 'N/A',
		sendAnalyticsCollectMessageId: 'd5f6aa22-a863-4df9-9763-37ab760a3866',
		cnpj: '8267******',
	}
}

exports.GETDATAREPORT_ISCNPJDOCUMENT_TRUE_WITHCONSENTTOPICMESSAGEID_VALID_RETURN =
	() => {
		return {
			celular: '(11)*****4422',
			consentimentoRegistrado: 'NÃO',
			email: 'n*********m@e*aildomain.com',
			leadId: '179265dc-f013-4fe4-a010-a0aae2103877',
			pescod: '82674864',
			sendConsentTopicMessageId: 'a0Fc01eb-1de2-4ac8-b21e-f147123af689',
			sendAnalyticsCollectMessageId: 'd5f6aa22-a863-4df9-9763-37ab760a3866',
			cnpj: '8267******',
		}
	}

exports.GETDATAREPORT_ISCNPJDOCUMENT_FALSE_VALID_RETURN = () => {
	return {
		celular: '(11)*****4422',
		consentimentoRegistrado: 'SIM',
		email: 'n*********m@e*aildomain.com',
		leadId: '179265dc-f013-4fe4-a010-a0aae2103877',
		pescod: '82674864',
		sendConsentTopicMessageId: 'N/A',
		sendAnalyticsCollectMessageId: 'd5f6aa22-a863-4df9-9763-37ab760a3866',
		cpf: '8267******',
	}
}

exports.GETDATAREPORT_ISCNPJDOCUMENT_FALSE_WITHOUTOPTIONALATTRIBUTES_VALID_RETURN =
	() => {
		return {
			celular: '(11)*****4422',
			consentimentoRegistrado: 'NÃO',
			email: 'N/A',
			leadId: 'N/A',
			pescod: 'N/A',
			sendConsentTopicMessageId: 'N/A',
			sendAnalyticsCollectMessageId: 'N/A',
			cpf: '8267******',
		}
	}
