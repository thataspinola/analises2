exports.FACTORY_API_HTTPS_AGENT = require('./factory/api/httpsAgentFactory.moke')

exports.OBJECT_VALIDATION_TEST = {
	foo: 'bar',
	bar: 'foo',
	levelOne: {
		foo: 'bar',
	},
}

exports.MOCK_OPORTUNIDADE_ID = '089bfb1e-ec3f-43e6-9778-fb266a25c50a'

exports.INVOKER_PAYLOAD_OBJECT = {
	body: {
		numeroOrcamento: '99999999',
		estadoSaude: 'Não',
		profissao: '2410-05',
	},
}

exports.INVOKER_PAYLOAD_STRING = {
	body: JSON.stringify({
		numeroOrcamento: '99999999',
		estadoSaude: 'Não',
		profissao: '2410-05',
	}),
}

exports.PROPOSAL_API_REQUEST = {
	numeroOrcamento: '99999999',
	estadoSaude: 'Não',
	profissao: '2410-05',
}

exports.VALID_SCHEMA = {
	type: 'object',
	properties: {
		name: { type: 'string', minLength: 3 },
		age: { type: 'integer', minimum: 18 }
	},
	required: ['name', 'age']
}

exports.PROPOSAL_API_RESPONSE = {
	validacoes: {
		valido: true,
		quantidadeReprocessamento: 0,
		mensagens: [
			{
				codigo: 'PR08',
				descricao: 'Proposta gravada com sucesso',
			},
		],
	},
	devolutivas: {
		proposta: {
			numero: '01501224',
			validadePagamento: '2022-08-26 08:00:00',
			vigenciaInicial: '2023-12-18',
			vigenciaFinal: '2024-12-19',
			quantidadeDiasVigencia: 364,
			numeroOrcamento: 556072,
			status: 'Recusada',
			dataCalculo: '2022-12-20',
			tokenProposta: '',
		},
	},
}

exports.PROPOSAL_API_RESPONSE_WITH_REFUSAL = {
	validacoes: {
		valido: false,
		quantidadeReprocessamento: 0,
		mensagens: [
			{
				codigo: 'PR04',
				descricao: 'Proposta criticada como inválida',
			},
		],
	},
	proposta: {
		numero: '01501224',
		validadePagamento: '2022-08-26 08:00:00',
		vigenciaInicial: '2023-12-18',
		vigenciaFinal: '2024-12-19',
		quantidadeDiasVigencia: 364,
		numeroOrcamento: 556072,
		status: 'Recusada',
		dataCalculo: '2022-12-20',
		tokenProposta: '',
	},
}

exports.PROPOSAL_API_RESPONSE_ERROR_WITH_REFUSAL = {
	response: {
		data: {
			validacoes: {
				valido: false,
				quantidadeReprocessamento: 0,
				mensagens: [
					{ codigo: 'PR05', descricao: 'Dados do segurado inválidos' },
				],
			},
			proposta: null,
		},
		status: 409,
	},
}

exports.CONTROLLER_ERROR = {
	statusCode: 500,
	body: {message: 'errro controller', status: 'error'}
}

exports.HANDLER_RESPONSE = {
	statusCode: 201,
	isBase64Encoded: false,
	headers:  {'carbon-trace-id' : '123312'},
	body: JSON.stringify({
		...this.PROPOSAL_API_RESPONSE,
	}),
}

exports.HANDLER_RESPONSE_ERROR = {
	statusCode: 500,
	isBase64Encoded: false,
	headers:  {'carbon-trace-id' : '123312'},
	body: JSON.stringify({
		...this.CONTROLLER_ERROR.body,
	}),
}

exports.HANDLER_RESPONSE_ERROR_HANDLER = {
	statusCode: 500,
	isBase64Encoded: false,
	headers:  {'carbon-trace-id' : '123312'},
	body: '{\"status\":\"error\",\"message\":\"error handler\"}',
}

exports.HANDLER_RESPONSE_BAD_REQUEST = {
	statusCode: 400,
	isBase64Encoded: false,
	headers:  {'carbon-trace-id' : '123312'},
	body: '{\"status\":\"error\",\"message\":\"Input must be a string\"}',
}

exports.RESPONSE_CONTROLLER_SUCCESS = {
	statusCode: 201,
	body: this.PROPOSAL_API_RESPONSE
}

exports.RESPONSE_FACTORY_ERROR_MESSAGE = () => {return "Manssage Error"}
exports.ERROR_MESSAGEBAD_REQUEST_ERROR = () => {return "The supplied request body is invalid" }

exports.RESPONSE_FACTORY_DEFAULT_ERROR_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}
}

exports.RESPONSE_FACTORY_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: this.RESPONSE_FACTORY_ERROR_MESSAGE()
		},
	}
}

exports.RESPONSE_FACTORY_DEFAULT_BAD_REQUEST_ERROR_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: this.ERROR_MESSAGEBAD_REQUEST_ERROR()
		},
	}
}

exports.RESPONSE_FACTORY_BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: this.RESPONSE_FACTORY_ERROR_MESSAGE()
		},
	}
}

exports.RESPONSE_FACTORY_SUCCESS_RETURN = () => {
	return {
		statusCode: 201,
		body: {},
	}
}