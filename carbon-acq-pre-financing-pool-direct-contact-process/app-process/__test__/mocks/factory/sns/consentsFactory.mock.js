exports.GETSENDCONSENTMESSAGEPAYLOAD_CLIENTDATA_INPUT = () => {
	return {
		fullName: 'Nomeir Sobrenomeson',
		cpfCnpj: '069637520',
		cellPhone: '1198754422',
		email: 'nomeneidesm@emaildomain.com',
	}
}

exports.GETSENDCONSENTMESSAGEPAYLOAD_MARKETINGOPTOUTFLAG_INPUT = () => {
	return false
}

exports.GETSENDCONSENTMESSAGEPAYLOAD_PRODUCT_INPUT = () => {
	return 'AUTOMOVEL'
}

exports.GETSENDCONSENTMESSAGEPAYLOAD_PESCOD_INPUT = () => {
	return '82674864'
}

exports.GETSENDCONSENTMESSAGEPAYLOAD_VALID_RETURN = () => {
	return {
		bcpId: '82674864',
		consents: [
			{
				marketingOptInFlag: true,
			},
			{
				privacyPolicy: true,
			},
		],
		doctoClient: '069637520',
		name: 'Nomeir Sobrenomeson',
		product: '24',
		productName: 'CONSÓRCIO - AUTOMÓVEL',
		vertical: 'Financeiro',
		nameArea: 'Consorcio',
		domain: 'www.portoseguro.com.br',
	}
}

exports.GETSENDCONSENTMESSAGEATTRIBUTES_PESCOD_INPUT = () => {
	return '82674864'
}

exports.GETSENDCONSENTMESSAGEATTRIBUTES_VALID_RETURN = () => {
	return {
		eventId: '82674864',
		eventType: 'PFP_LEAD_RECEIVED',
	}
}
