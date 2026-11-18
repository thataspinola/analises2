exports.VALID_DOCUMENT = '12345678901'

exports.VALID_RESPONSE = [
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546eea',
		numeroCartao: '415274XXXXXX9119',
		bandeira: 'VISA',
		cartaoPorto: true,
		cartaoOculto: false,
	},
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546123',
		numeroCartao: '415274XXXXXX4567',
		bandeira: 'AMEX',
		cartaoPorto: true,
		cartaoOculto: false,
	},
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546123',
		numeroCartao: '415274XXXXXX4567',
		bandeira: 'ELO',
		cartaoPorto: true,
		cartaoOculto: false,
	},
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546123',
		numeroCartao: '415274XXXXXX4567',
		bandeira: 'DINNERS',
		cartaoPorto: true,
		cartaoOculto: false,
	},
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546123',
		numeroCartao: '415274XXXXXX4567',
		bandeira: 'MASTERCARD',
		cartaoPorto: true,
		cartaoOculto: false,
	},
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546123',
		numeroCartao: '415274XXXXXX4567',
		bandeira: 'VISA',
		cartaoPorto: true,
		cartaoOculto: false,
	},
]

exports.EXPECTED_RETURN = () => {
	return {
		scope: 'porto-pay-cards',
		document: this.VALID_DOCUMENT,
		data: JSON.stringify(this.VALID_RESPONSE),
	}
}
