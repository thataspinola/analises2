const VALID_RESPONSE_VALUE = {
	numeroProposta: 123456,
	mensagem: 'Proposta já foi transmitida anteriormente.',
}

exports.POST_AXIOS_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: VALID_RESPONSE_VALUE,
	}
}

exports.VALID_PAYLOAD = () => {
	return {
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
}

exports.FAKE_TOKEN = () => '123456'
exports.FAKE_CERTIFICATES = () => [
	'`-----BEGIN CERTIFICATE-----<CERTIFICATE>-----END CERTIFICATE-----',
]

exports.VALID_RESPONSE = () => VALID_RESPONSE_VALUE
