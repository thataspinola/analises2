exports.VALID_RESPONSE_SUCCESS = () => {
	return [
		{
			idCartao: '018828ed-8c8d-3245-9853-ebbb5c546eea',
			numeroCartao: '415274XXXXXX9119',
			bandeira: 'VISA',
			cartaoPorto: true,
			cartaoOculto: false,
		},
	]
}

exports.VALID_PAYLOAD = () => {
	return {
		cpfOrCnpj: '00000017400',
		documentType: 'CPF',
	}
}

exports.SENSIDIA_TOKEN = () => {
	return '123456'
}
