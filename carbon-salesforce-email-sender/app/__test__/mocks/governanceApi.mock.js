exports.CPF = '01234567890'

exports.API_RESPONSE_SUCCESS = {
	data: {
		cpfPessoa: { 
			codigoPessoa: '123456' 
		},
	},
}

exports.API_RESPONSE_ERROR = new Error('Request failed')

exports.ERROR_DETAILS = { message: 'Error message', status: 500 }
