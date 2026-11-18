const payload = {
	correlationId: '5547a10e-60d0-4f43-9740-5161e8d2e45b',
	pacote: 1,
	codigoCanal: 58,
	proponente: {
		cpf: '70050937200',
		dataNascimento: '10/05/1980',
		nomePessoa: 'ROBERTO TRINDADE',
		faixaRenda: 2,
		estadoCivil: 2,
		sexo: 'M',
		enderecos: [
			{
				bairro: 'guilhermina',
				cidade: 'santos',
				complemento: 'apt',
				complementoCep: '000',
				latitude: 41.19301,
				logradouro: 'Rozario',
				longitude: 41.19301,
				numero: 131,
				numeroCep: 16650,
				tipoLogradouro: 'R',
				uf: 'SP',
			},
		],
		telefone: 11959777800,
		tipoTelefone: 1,
		tipoPessoa: 'F',
		email: 'nichole.abdala@portoseguro.com.br',
	},
	pagamento: {
		encargos: 0,
		iof: 10,
		juros: 0,
		parcela: 1,
		codigoPagamento: 62,
		valor: 10023,
		valorReais: 10023,
		cartao: {
			tokenCartao: '3dd2dd96-a48b-49c8-a3e7-abb9e4b82c14',
			codigoBandeira: 'MASTER',
		},
	},
}

const API_PROPOSAL_TRANSMISSION_VALID_PAYLOAD_REQUEST = payload

const API_PROPOSAL_TRANSMISSION_RESPONSE_BODY = {
	idTransaction: '000063',
}

exports.API_PROPOSAL_TRANSMISSION_VALID_PAYLOAD = () => {
	return API_PROPOSAL_TRANSMISSION_VALID_PAYLOAD_REQUEST
}

exports.API_PROPOSAL_TRANSMISSION_SUCCESS_RESPONSE_BODY = () => {
	return API_PROPOSAL_TRANSMISSION_RESPONSE_BODY
}

exports.API_PROPOSAL_TRANSMISSION_VALID_RESPONSE = () => {
	return {
		status: 200,
		data: API_PROPOSAL_TRANSMISSION_RESPONSE_BODY,
	}
}

exports.LAMBDA_TOKEN_HANDLER_RESPONSE = () => {
	return 'token'
}
