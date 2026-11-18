const MOCKS_CONTROLLER_CREATELEAD = require('../../../controller/createLeadController.mock')
const GETPAYLOAD_VALID_INPUTREQUEST_INPUT_VALUE = JSON.parse(
	JSON.stringify(MOCKS_CONTROLLER_CREATELEAD.VALID_INPUT_DATA_WITH_PESCOD())
)
const GETPAYLOAD_VALID_INPUTREQUEST_WITHOUTOPTIONALS_INPUT_VALUE = JSON.parse(
	JSON.stringify({
		...MOCKS_CONTROLLER_CREATELEAD.VALID_INPUT_DATA_WITHOUT_OPTIONALS_WITH_PESCOD(),
		address: undefined,
		idBranch: undefined,
		sessionId: '202371115124659341722-6T4XUGKR',
		ipAddress: '131.161.97.234',
		userAgent:
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
	})
)

exports.GETPAYLOAD_VALID_INPUTREQUEST_WITHOUTOPTIONALS_INPUT = () => {
	return GETPAYLOAD_VALID_INPUTREQUEST_WITHOUTOPTIONALS_INPUT_VALUE
}

exports.GETPAYLOAD_VALID_INPUTREQUEST_INPUT = () => {
	return GETPAYLOAD_VALID_INPUTREQUEST_INPUT_VALUE
}

exports.GETPAYLOAD_VALID_INPUTREQUEST_WITHINVALIDPHONE_INPUT = () => {
	return {
		...GETPAYLOAD_VALID_INPUTREQUEST_INPUT_VALUE,
		client: {
			...GETPAYLOAD_VALID_INPUTREQUEST_INPUT_VALUE.client,
			cellPhone: '',
		},
	}
}

exports.GETPAYLOAD_VALID_INPUTREQUEST_WITHINVALIDPHONE_JUSTMASKS_INPUT = () => {
	return {
		...GETPAYLOAD_VALID_INPUTREQUEST_INPUT_VALUE,
		client: {
			...GETPAYLOAD_VALID_INPUTREQUEST_INPUT_VALUE.client,
			cellPhone: '()-',
		},
	}
}

exports.GETPAYLOAD_VALID_INPUTREQUEST_WITHINVALIDZIPCODE_JUSTMASKS_INPUT =
	() => {
		return {
			...GETPAYLOAD_VALID_INPUTREQUEST_INPUT_VALUE,
			address: {
				...GETPAYLOAD_VALID_INPUTREQUEST_INPUT_VALUE.address,
				zipCode: '-',
			},
		}
	}

const GETPAYLOAD_VALID_RETURN_WITHOUTOPTIONALS_VALUE = {
	codigoPessoa: '1234',
	cpf: '33994753813',
	email: 'email@dominio.com',
	nome: 'Maria Santos',
	telefone: '11222225555',
	sessionId: '202371115124659341722-6T4XUGKR',
	ipAddress: '131.161.97.234',
	userAgent:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
}

const GETPAYLOAD_VALID_RETURN_VALUE = {
	...GETPAYLOAD_VALID_RETURN_WITHOUTOPTIONALS_VALUE,
	nomeSocial: 'José Santos',
	marketingOptInFlag: true,
	enderecoRua: 'Avenida Andrade Neves',
	enderecoNumero: '1000',
	enderecoBairro: 'Centro',
	enderecoComplemento: 'Perto da padaria',
	enderecoCodigoPostal: '13013161',
	enderecoCidade: 'Campinas',
	enderecoEstado: 'SP',
	product: '27',
}

exports.GETPAYLOAD_VALID_RETURN = () => {
	return GETPAYLOAD_VALID_RETURN_VALUE
}

exports.GETPAYLOAD_VALID_RETURN_WITHOUTOPTIONALS = () => {
	return GETPAYLOAD_VALID_RETURN_WITHOUTOPTIONALS_VALUE
}

exports.GETPAYLOAD_VALID_RETURN_WITHINVALIDPHONE = () => {
	return {
		...GETPAYLOAD_VALID_RETURN_VALUE,
		telefone: undefined,
	}
}

exports.GETPAYLOAD_VALID_RETURN_WITHINVALIDZIPCODE = () => {
	return {
		...GETPAYLOAD_VALID_RETURN_VALUE,
		enderecoCodigoPostal: undefined,
	}
}
