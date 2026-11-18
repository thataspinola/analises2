const CONSTANTS = require('../../../../src/property')

exports.FAKE_TOKEN = '123456'

exports.VALID_INPUT_DATA = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
		codigoCampanha: '86',
		primeiraCompra: {
			codigoProdutoPolitica: CONSTANTS.PRIMEIRA_COMPRA_CODIGO_PRODUTO_POLITICA
		}
	}
}

exports.VALID_API_PAYLOAD = {
	codigoCanal: 83,
	tipoDocumento: 'CPF',
	documento: '00000017400',
	codigoCampanha: '86',
	primeiraCompra: {
		codigoProdutoPolitica: CONSTANTS.PRIMEIRA_COMPRA_CODIGO_PRODUTO_POLITICA
	}
}

exports.RESPONSE_SUCCESS_API = () => {
	return CONTROLLER_SUCCESS_RETURN_BODY_VALUE
}

exports.RESPONSE_EMPTY_API = () => {
	return null
}

exports.CONTROLLER_VALID_RETURN_RESPONSE = () => {
	return {
		statusCode: 200,
		body: {
			elegivel: true,
		},
	}
}

exports.CONTROLLER_REQUEST_INTERNAL_ERROR = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: 'Erro interno',
		},
	}
}

exports.CONTROLLER_REQUEST_BAD_REQUEST = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message:
				'Não foi possível processar a requisição, por favor revise os dados',
		},
	}
}

exports.CONTROLLER_RESPONSE_SUCCESS = () => {
	return CONTROLLER_SUCCESS_RETURN_BODY_VALUE
}

exports.CONTROLLER_SUCCESS_RESPONSE = () => {
	return {
		statusCode: 200,
		body: CONTROLLER_SUCCESS_RETURN_BODY_VALUE,
	}
}

const CONTROLLER_SUCCESS_RETURN_BODY_VALUE = {
	codigoOferta: '9cdbd131-6963-4fda-9cfd-7d121e3ab2e6',
	codigoCanal: 83,
	tipoDocumento: 'CPF',
	documento: '05636844964',
	situacao: 'Incluída',
	dataHoraInclusao: '2023-11-17T13:16:37.713Z',
	dataHoraValidadeOferta: '2023-11-17T14:16:31.973Z',
	elegibilidade: {
		codigoElegibilidade: '2be8c653-6e6f-42e7-98a4-b7bb44728b6e',
		produtos: [
			{
				codigoProduto: 1,
				nomeProduto: 'Cartao',
				propensao: 0,
				valor: null,
				valorDesconto: 0,
			},
			{
				codigoProduto: 8,
				nomeProduto: 'Tag ConnectCar',
				propensao: 0,
				valor: null,
				valorDesconto: 0,
			},
		],
	},
	valorTransacao: 0,
}
