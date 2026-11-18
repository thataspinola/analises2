const payload = {
	orderNumber: '00006',
	externalId: '00001',
	productCode: 61,
	scope: 'phone',
	amount: 100,
	contactEmail: 'teste@teste.com.br',
	installments: 1,
	charges: [
		{
			paymentMethod: 'CREDIT_CARD',
			amount: 300.0,
			creditCard: {
				id: '7dc64d75-63a7-46a0-8ed6-9ab11d52f3eb',
				preferred: true,
				saveCard: false,
			},
		},
	],
	paymentData: {
		tipo_documento_comercial: '01',
		endosso: '00006',
		codigo_empresa: '001',
		composicao_valor_parcela: '01',
		codigo_ramo: 171,
		codigo_modalidade: '434',
		parcela: '1',
		contrato_comercial: '123',
		evento_emissao: '01',
		flag_produto_seguro: 'S',
		codigo_agregador: '12345',
		flag_sinalizador_processo: 'O',
	},
	integrationData: {
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
	},
}

const VALID_INPUT_MESSAGE = payload

exports.VALID_INPUT_MESSAGE_REQUEST = () => {
	return VALID_INPUT_MESSAGE
}

const INVALID_INPUT_MESSAGE_MISSING_ORDER_NUMBER = {
	...payload,
	externalId: '123456',
}

exports.INVALID_INPUT_MESSAGE_MISSING_ORDER_NUMBER = () => {
	return INVALID_INPUT_MESSAGE_MISSING_ORDER_NUMBER
}

const INVALID_INPUT_MESSAGE_MISSING_SCOPE = {
	orderNumber: '123456',
	externalId: '123456',
	contactEmail: 'teste@teste.com',
	charges: [],
	integrationData: {},
}

exports.INVALID_INPUT_MESSAGE_MISSING_SCOPE = () => {
	return INVALID_INPUT_MESSAGE_MISSING_SCOPE
}

const INVALID_INPUT_MESSAGE_MISSING_CONTACT_EMAIL = {
	orderNumber: '123456',
	externalId: '123456',
	scope: 'phone',
	charges: [],
	integrationData: {},
}

exports.INVALID_INPUT_MESSAGE_MISSING_CONTACT_EMAIL = () => {
	return INVALID_INPUT_MESSAGE_MISSING_CONTACT_EMAIL
}

const INVALID_INPUT_MESSAGE_MISSING_MORE_THAN_ONE_FIELD = {
	orderNumber: '123456',
	externalId: '123456',
	charges: [],
	integrationData: {},
}

exports.INVALID_INPUT_MESSAGE_MISSING_MORE_THAN_ONE_FIELD = () => {
	return INVALID_INPUT_MESSAGE_MISSING_MORE_THAN_ONE_FIELD
}

const INVALID_INPUT_MESSAGE_EMAIL_WORNG_FORMAT = {
	orderNumber: '123456',
	externalId: '123456',
	contactEmail: 'teste.com',
	scope: 'phone',
	charges: [],
	integrationData: {},
}

exports.INVALID_INPUT_MESSAGE_EMAIL_WORNG_FORMAT = () => {
	return INVALID_INPUT_MESSAGE_EMAIL_WORNG_FORMAT
}
