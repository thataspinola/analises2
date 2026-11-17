const CONSTANT = require('../../src/property')

exports.OBJECT_VALIDATION_TEST = {
	foo: 'bar',
	bar: 'foo',
	levelOne: {
		foo: 'bar',
	},
}

exports.MOCK_OPORTUNIDADE_ID = '089bfb1e-ec3f-43e6-9778-fb266a25c50a'

const commonProperties = {
	client: {
		name: 'LOIUTRB WWWEDRFCX WOLF ASXCVOPLMN WISKZTO PLAWERIOC',
		gender: 'masculino',
		maritalStatus: 'casado',
		cpf: '19962257077',
		cellPhone: '19997430822',
		email: 'willian.salvador@portoseguro.com.br',
		profession: '01',
		dateOfBirth: '1995-03-02',
	},
	address: {
		zipCode: '13013161',
		street: 'Avenida Andrade Neves',
		number: '1000',
		complement: '',
		neighborhood: 'Centro',
		city: 'Campinas',
		state: 'SP',
	},
	coverage: [
		{
			amount: 1500,
			code: 'BAS',
			limitMin: 5000,
			limitMax: 5000,
		},
		{
			amount: 5000,
			code: 'AFI',
			limitMin: 5000,
			limitMax: 5000,
		},
	],
	income: '1000',
	livingInBrazil: true,
	pepRadioButton: false,
	selected_plan_id: '00608210',
	porto_quotation_id: '00583246',
}

exports.INVOKER_PAYLOAD_OBJECT = {
	susep: 'CM574J',
	lifeinsurance: {
		...commonProperties,
		pepRadioButton: true,
		personPep: {
			name: 'John',
			cpf: '25509830093',
			kinshipDegree: 'Pai',
		},
	}
}

exports.INVOKER_PAYLOAD_OBJECT_PEP_EUMESMO = {
	scope: 'lifeinsurance',
	susep: 'CM574J',
	lifeinsurance: {
		...commonProperties,
		pepRadioButton: true,
		personPep: {
			name: 'LOIUTRB WWWEDRFCX WOLF ASXCVOPLMN WISKZTO PLAWERIOC',
			cpf: '19962257077',
			kinshipDegree: 'EUMESMO',
		},
	}
}

exports.INVOKER_PAYLOAD_OBJECT_WITHOUT_PEP = {
	susep: 'CM574J',
	lifeinsurance: {
		...commonProperties,
		personPep: null
	},
}

exports.PAYLOAD_LIFE_PROPOSAL_API_RESPONSE = {
	status: 204,
}

exports.PAYLOAD_LIFE_PROPOSAL_API_RESPONSE_WITH_REFUSAL = {
	codigo: 'PR04',
	descricao: 'Proposta criticada como inválida',
}

exports.PAYLOAD_LIFE_PROPOSAL_API_RESPONSE_ERROR_WITH_REFUSAL = {
	codigo: 'PR05',
	descricao: 'Dados do segurado inválidos',
}

function toInputDataMock(isPEP, isSamePerson) {
	const data = {
		proposta: {
			codigoEmpresa: CONSTANT.COD_EMPRESA_PADRAO,
			numeroOrcamento: '00608210',
			dataProtocolo: new Date().toISOString().split('T')[0],
			contratante: {
				grupo: {
					segurado: {
						pessoa: {
							tipo: CONSTANT.TIPO_PESSOA_PADRAO,
							enderecos: [
								{
									tipoEndereco: CONSTANT.TIPO_ENDERECO_PADRAO,
									logradouro: 'Avenida Andrade Neves',
									numeroLogradouro: '1000',
									bairro: 'Centro',
									cidade: 'Campinas',
									uf: 'SP',
									cep: '13013',
									complemento: '',
									complementoCep: '161',
								},
							],
							nome: 'LOIUTRB WWWEDRFCX WOLF ASXCVOPLMN WISKZTO PLAWERIOC',
							dadosPessoaFisica: {
								// profissao: '01',
								dataNascimento: '1995-03-02',
								sexo: 'MASCULINO',
								numeroCpf: '199622570',
								digitoCpf: '77',
								estadoCivil: 'CASADO',
								nacionalidade: CONSTANT.NACIONALIDADE_PADRAO,
								idade: '28',
								paisResidente: CONSTANT.PAIS_RESIDENTE_PADRAO,
								resideBrasil: true,
							},
							email: 'willian.salvador@portoseguro.com.br',
							rendaMensal: 1000,
							telefones: [
								{
									tipoTelefone: CONSTANT.TIPO_TELEFONE_PADRAO,
									numeroTelefone: '997430822',
									dddTelefone: '19',
								},
							],
							pessoaExpostaPoliticamente: isPEP
								? isSamePerson
									? 'Sim'
									: 'RelacionamentoProximo'
								: 'Nao',
							pessoaPEP: isPEP
								? {
										nome: isSamePerson
											? 'LOIUTRB WWWEDRFCX WOLF ASXCVOPLMN WISKZTO PLAWERIOC'
											: 'John',
										cpf: isSamePerson ? '19962257077' : '25509830093',
										grauParentesco: isSamePerson ? 'EUMESMO' : 'Pai',
								  }
								: null,
						},
						coberturas: [
							{
								valor: '1500',
								sigla: 'BAS',
								limiteMinimo: '5000',
								limiteMaximo: '5000',
							},
							{
								valor: '5000',
								sigla: 'AFI',
								limiteMinimo: '5000',
								limiteMaximo: '5000',
							},
						],
					},
				},
				dadosPagamento: null,
			},
			remuneracoes: [
				{
					percentual: 10,
					tipoRemuneracao: 'COR',
					favorecidos: [
						{
							papel: 'COR',
							participacao: 100,
							corretorLider: true,
							susep: 'CM574J',
							antecipaComissao: false,
						},
					],
				},
			],
		},
	}

	return data
}

exports.PARSE_TO_INPUT_OBJECT_RESPONSE_WITH_PEP = toInputDataMock(true, false)

exports.PARSE_TO_INPUT_OBJECT_RESPONSE_PEP_EUMESMO = toInputDataMock(true, true)

exports.PARSE_TO_INPUT_OBJECT_RESPONSE_WITHOUT_PEP = toInputDataMock(false)

exports.PAYLOAD_LIFE_PROPOSAL_API_REQUEST = toInputDataMock(false)

exports.TRACE_ID = 'trace-id-1'

exports.LAMBDA_TOKEN = 'token'

exports.PAYLOAD_LIFE_PROPOSAL_API_RESPONSE_NEW = {
	status: 201,
}

exports.RESPONSE_FACTORY_DEFAULT_ERROR_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}
}

exports.RESPONSE_FACTORY_DEFAULT_BAD_REQUEST_ERROR_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: 'The supplied request body is invalid',
		},
	}
}

const RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT = 'Some error message'

exports.RESPONSE_FACTORY_ERROR_MESSAGE = () => {
	return RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT
}

exports.RESPONSE_FACTORY_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT,
		},
	}
}

exports.RESPONSE_FACTORY_BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT,
		},
	}
}

exports.RESPONSE_FACTORY_SUCCESS_RETURN = () => {
	return {
		statusCode: 201,
		body: {
			message: 'Proposal created successfully',
		},
	}
}

exports.RESPONSE_FACTORY_SUCCESS_EMPTY_BODY_RETURN = () => {
	return {
		statusCode: 201,
		body: {},
	}
}

exports.VALIDATION_SERVICE_VALID_INPUT_DATA = () => {
	return { 
		body: JSON.stringify({
			susep: 'CM574J',
			lifeinsurance: {
				...commonProperties,
				personPep: {
					name: 'John',
					cpf: '25509830093',
					kinshipDegree: 'Pai',
				},
			}
		})
	}
}


exports.VALIDATION_SERVICE_SCHEMA = () => {
	return {
		type: 'object',
		properties: {
			susep: { type: 'string' },
			lifeinsurance: {
				type: 'object',
				properties: {
					client: {
						type: 'object',
						properties: {
							name: { type: 'string' },
							gender: { type: 'string' },
							maritalStatus: { type: 'string' },
							cpf: { type: 'string', minLength: 11 },
							cellPhone: { type: 'string' },
							email: { type: 'string', format: 'email' },
							profession: { type: 'string' },
							dateOfBirth: { type: 'string' },
						},
						required: [
							'name',
							'gender',
							'maritalStatus',
							'cpf',
							'cellPhone',
							'email',
							'profession',
							'dateOfBirth',
						],
					},
					address: {
						type: 'object',
						properties: {
							zipCode: { type: 'string' },
							street: { type: 'string' },
							number: { type: 'string' },
							complement: { type: 'string' },
							neighborhood: { type: 'string' },
							city: { type: 'string' },
							state: { type: 'string' },
						},
						required: [
							'zipCode',
							'street',
							'number',
							'neighborhood',
							'city',
							'state',
						],
					},
					personPep: {
						type: 'object',
						properties: {
							name: { type: 'string' },
							cpf: { type: 'string' },
							kinshipDegree: { type: 'string' },
						},
						required: ['name', 'cpf', 'kinshipDegree'],
					},
					coverage: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								amount: { type: 'integer' },
								code: { type: 'string' },
								limitMin: { type: 'integer' },
								limitMax: { type: 'integer' },
							},
							required: ['amount', 'code', 'limitMin', 'limitMax'],
						},
					},
					income: { type: 'string' },
					livingInBrazil: { type: 'boolean' },
					pepRadioButton: { type: 'boolean' },
					selected_plan_id: { type: 'string' },
					porto_quotation_id: { type: 'string' },
				},
				required: [
					'client',
					'address',
					'personPep',
					'coverage',
					'income',
					'livingInBrazil',
					'pepRadioButton',
					'selected_plan_id',
					'porto_quotation_id',
				],
			}
		},
		required: ['susep', 'lifeinsurance'],
	}
}

exports.CONTROLLER_PROPOSAL_OPENING_VALID_RESPONSE = () => {
	return {
		statusCode: 204,
		body: {}
	}
}

exports.CONTROLLER_PROPOSAL_OPENING_ERROR = (message) => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: message,
		}
	}
}

exports.CONTROLLER_PROPOSAL_OPENING_BAD_REQUEST = (message) => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: message,
		}
	}
}

exports.HANDLER_VALID_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {'carbon-trace-id': '123312'},
		statusCode: 204,
		body: "{}"
	}
}

exports.HANDLER_INVALID_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {'carbon-trace-id': '123312'},
		statusCode: 500,
		body: "{\"status\":\"error\",\"message\":\"Input must be a string\"}"
	}
}

exports.VALID_INPUT_HANDLER = () => {
	return {
		body: JSON.stringify({
			susep: 'CM574J',
			lifeinsurance: {
				client: {
					name: 'LOIUTRB WWWEDRFCX WOLF ASXCVOPLMN WISKZTO PLAWERIOC',
					gender: 'masculino',
					maritalStatus: 'casado',
					cpf: '19962257077',
					cellPhone: '19997430822',
					email: 'willian.salvador@portoseguro.com.br',
					profession: '01',
					dateOfBirth: '1995-03-02',
				},
				address: {
					zipCode: '13013161',
					street: 'Avenida Andrade Neves',
					number: '1000',
					complement: '',
					neighborhood: 'Centro',
					city: 'Campinas',
					state: 'SP',
				},
				personPep: {
					name: 'John',
					cpf: '25509830093',
					kinshipDegree: 'Pai',
				},
				coverage: [
					{
						amount: 1500,
						code: 'BAS',
						limitMin: 5000,
						limitMax: 5000,
					},
					{
						amount: 1500,
						code: 'BAS',
						limitMin: 5000,
						limitMax: 5000,
					},
				],
				income: '1000',
				livingInBrazil: true,
				pepRadioButton: false,
				selected_plan_id: '00608210',
				porto_quotation_id: '00583246',
			}
		})
	}
}

exports.HANDLER_FAIL_RETURN_WITH_DEFAULT_ERROR = (message) => {
	return {
		isBase64Encoded: false,
		headers: {'carbon-trace-id': '123312'},
		statusCode: 500,
		body: JSON.stringify({
			status: 'error',
			message: message,
		}),
	}
}

exports.HANDLER_FAIL_RETURN_WITH_DEFAULT_ERROR = (message) => {
	return {
		isBase64Encoded: false,
		headers: {'carbon-trace-id': '123312'},
		statusCode: 500,
		body: JSON.stringify({
			status: 'error',
			message: message,
		}),
	}
}

const commonSchemaProperties = {
	susep: 'CM574J',
	lifeinsurance: {
		client: {
			name: 'LOIUTRB WWWEDRFCX WOLF ASXCVOPLMN WISKZTO PLAWERIOC',
			gender: 'masculino',
			maritalStatus: 'casado',
			cpf: '19962257077',
			cellPhone: '19997430822',
			email: 'willian.salvador@portoseguro.com.br',
			profession: '01',
			dateOfBirth: '1995-03-02',
		},
		address: {
			zipCode: '13013161',
			street: 'Avenida Andrade Neves',
			number: '1000',
			complement: '',
			neighborhood: 'Centro',
			city: 'Campinas',
			state: 'SP',
		},
		coverage: [
			{
				amount: 1500,
				code: 'BAS',
				limitMin: 5000,
				limitMax: 5000,
			},
			{
				amount: 5000,
				code: 'AFI',
				limitMin: 5000,
				limitMax: 5000,
			},
		],
		personPep: {
			name: 'John',
			cpf: '25509830093',
			kinshipDegree: 'Pai',
		},
		income: '1000',
		livingInBrazil: true,
		pepRadioButton: false,
		selected_plan_id: '00608210',
		porto_quotation_id: '00583246',
	},
}

exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
	const invalidData = JSON.parse(JSON.stringify(commonSchemaProperties))
	delete invalidData.susep
	return invalidData
}

exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	const invalidData = commonSchemaProperties
	invalidData.lifeinsurance.client.cpf = 123456
	return invalidData
}

exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY = () => {
	const invalidData = commonSchemaProperties
	invalidData.lifeinsurance.client.cpf = '199622570'
	return invalidData
}

exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
	const invalidData = commonSchemaProperties
	invalidData.lifeinsurance.client.cpf = '19962257012'
	invalidData.lifeinsurance.client.email = null
	return invalidData
}

exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME = () => {
	return 'email'
}

exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'cpf'
}

exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME = () => {
	return 'cpf'
}
