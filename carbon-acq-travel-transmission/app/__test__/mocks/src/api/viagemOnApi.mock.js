const https = require('https')

const API_VIAGEMON_PAGAMENTO_SUCCESS_RESPONSE_BODY_CONTENT = {
	validacoes: {
		valido: true,
		mensagens: [
			{
				codigo: 'PR10',
				message:
					'Os vouchers das propostas também serão enviados por e-mail, assim como as apólices do seguros contratados',
			},
		],
	},
	propostas: [
		{
			numero: '1801504196',
			voucher: null,
		},
	],
	dataOperacao: '2023-06-30 09:01:12',
}

const API_VIAGEMON_PAGAMENTO_VALID_PAYLOAD_CONTENT = [
	{
		idCobranca: '5254203b-f7cd-4c53-b0c4-7319845a1838',
		idCartao: '9aa090b4-7b54-4b75-b47e-87de8385d159',
		numeroOrcamento: '570004',
		dataOperacao: '2023-06-30 09:01:12',
		estado: 'PAGA',
		valor: 108.52,
		bandeira: 'MASTERCARD',
		codigoFormaPagamento: 62,
		opcaoPrecificacao: 0,
		quantidadeParcelas: 5,
		idFormaPagamento: 'a0a0t000001jSQwAAM',
		propostas: [
			{
				numero: '1801504196',
			},
		],
	},
]

exports.LAMBDA_TOKEN_HANDLER_RESPONSE = () => {
	return 'token'
}

exports.API_VIAGEMON_PAGAMENTO_SUCCESS_RESPONSE_BODY = () => {
	return API_VIAGEMON_PAGAMENTO_SUCCESS_RESPONSE_BODY_CONTENT
}

exports.API_VIAGEMON_PAGAMENTO_VALID_PAYLOAD = () => {
	return API_VIAGEMON_PAGAMENTO_VALID_PAYLOAD_CONTENT
}

exports.API_VIAGEMON_PAGAMENTO_VALID_RETURN = () => {
	return API_VIAGEMON_PAGAMENTO_SUCCESS_RESPONSE_BODY_CONTENT
}

exports.CERTIFICATE = () => {
    return 'CERTIFICATE'
}

exports.CREATE_HTTPS_AGENT = () => {
    return new https.Agent({ ca: this.CERTIFICATE()})
}

const HTTPS_AGENT = this.CREATE_HTTPS_AGENT()

exports.GET_HTTPS_AGENT = () => {
    return HTTPS_AGENT
}