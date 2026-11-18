const CONSTANT = require('../../src/property')

const CPF_CACHED_WITH_PESCOD_VALUE = '37834215000'
exports.IOREDISCACHE_KEY_CPF_WITHPESCOD = () => {
	return CPF_CACHED_WITH_PESCOD_VALUE
}

const CPF_CACHED_WITHOUT_PESCOD_VALUE = '45237901085'
exports.IOREDISCACHE_KEY_CPF_WITHOUTPESCOD = () => {
	return CPF_CACHED_WITHOUT_PESCOD_VALUE
}

const IOREDISCACHE_VALUE_CPF_WITHPESCOD_PESCOD_VALUE = '4875921'
const IOREDISCACHE_VALUE_CPF_WITHPESCOD_VALUE = {
	pescod: IOREDISCACHE_VALUE_CPF_WITHPESCOD_PESCOD_VALUE,
	sqsMessages: [
		{
			messageId: 'b7ca8d41-4e71-11ee-8025-fa164e039e10',
			timeStamp: '2023-10-03T14:48:00.000Z',
		},
	],
}
exports.IOREDISCACHE_VALUE_CPF_WITHPESCOD = () => {
	return IOREDISCACHE_VALUE_CPF_WITHPESCOD_VALUE
}

exports.IOREDISCACHE_VALUE_CPF_WITHPESCOD_AND_MULTIPLE_MESSAGES = () => {
	return {
		...IOREDISCACHE_VALUE_CPF_WITHPESCOD_VALUE,
		sqsMessages: [
			...IOREDISCACHE_VALUE_CPF_WITHPESCOD_VALUE.sqsMessages,
			{
				messageId: 'd5f6aa22-a863-4df9-5587-37ab760a3866',
				timeStamp: '2023-10-05T14:50:00.000Z',
			},
		],
	}
}

exports.IOREDISCACHE_VALUE_CPF_WITHPESCOD_FROM_MULTIPLE_MESSAGES_WITHOUT_FIRST_JSON_STRING =
	() => {
		return JSON.stringify({
			...IOREDISCACHE_VALUE_CPF_WITHPESCOD_VALUE,
			sqsMessages: [
				{
					messageId: 'd5f6aa22-a863-4df9-5587-37ab760a3866',
					timeStamp: '2023-10-05T14:50:00.000Z',
				},
			],
		})
	}

exports.IOREDISCACHE_VALUE_CPF_WITHOUTPESCOD = () => {
	return {
		pescod: null,
		sqsMessages: [
			{
				messageId: 'b7ca8d41-4e71-11ee-8025-fa164e039e10',
				timeStamp: '2023-10-03T14:48:00.000Z',
			},
		],
	}
}

const API_BCP_GETDADOSPESSOA_EXISTS_PESCOD_NUMERIC_VALUE = 6788687

const API_BCP_GETDADOSPESSOA_EXISTS_RETURN_VALUE = {
	pescod: API_BCP_GETDADOSPESSOA_EXISTS_PESCOD_NUMERIC_VALUE,
	tipoPessoa: 'P',
	nome: 'Nomeir Sobrenomeson',
	nomeTratamento: 'Nomeir',
	tipoDocumento: 'CPF',
	titularidadeDocumento: 'TITULAR',
	numDocumento: '01234567890',
	dataNascimento: '18-10-1989',
	nomeMae: 'Nomerleide da Sobrenomilde',
	nomePai: null,
	sexo: 'M',
	estadoCivil: 1,
	codigoPapel: '1',
	nomePapel: 'CLIENTE',
	emails: [
		{
			email: 'nomeir.snson@somedomainservice.com',
			dataAtualizacaoEmail: '11-11-2022',
			numseq: 1,
			tipoEmail: 'PESSOAL',
		},
	],
	telefones: [
		{
			codigo: 3,
			ddd: 11,
			ddi: 55,
			numero: 987623451,
			seqnum: 5,
			tipo: 'CELULAR',
		},
		{
			codigo: 5,
			ddd: 11,
			ddi: 55,
			numero: 996229303,
			seqnum: 6,
			tipo: 'CELULAR_INTERACAO',
		},
		{
			codigo: 1,
			ddd: 11,
			ddi: 55,
			numero: 32588877,
			seqnum: 3,
			tipo: 'RESIDENCIA',
		},
		{
			codigo: -2,
			ddd: 0,
			ddi: 55,
			numero: 0,
			seqnum: 1,
			tipo: 'NAO_ESPECIFICADO',
		},
	],
	enderecos: [
		{
			tipoLogradouro: 'Rua',
			logradouro: 'Francisco Lameu',
			numero: '300',
			complemento: 'Casa',
			cep: '06086150',
			cplcepnum: '150',
			bairro: 'Vila Osasco',
			cidade: 'Osasco',
			uf: 'SP',
			pais: 'BRA',
			latitude: '-23.53534584',
			longitude: '-46.78493045',
			codigoFinalidade: 1,
			descricaoFinalidade: null,
		},
	],
}

exports.API_BCP_GETDADOSPESSOA_EXISTS_RETURN = () => {
	return API_BCP_GETDADOSPESSOA_EXISTS_RETURN_VALUE
}

const HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_CODIGO_VALUE = '1234567'

const HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_TAXVAT_VALUE =
	CPF_CACHED_WITH_PESCOD_VALUE

exports.FACTORY_SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAAPAYLOAD_GETPAYLOAD_VALID_RETURN =
	() => {
		return {
			userName: CPF_CACHED_WITH_PESCOD_VALUE,
			orgName: CONSTANT.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME,
			profileName:
				CONSTANT.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_PROFILENAME,
			otp: HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_CODIGO_VALUE,
		}
	}

const API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_SUCCESS_RESPONSE_DATA_FIRST_ITEM_PESCOD_NUMERIC_VALUE = 82674864

const API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_SUCCESS_RESPONSE_DATA_FIRST_ITEM_PESCOD_VALUE = `${API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_SUCCESS_RESPONSE_DATA_FIRST_ITEM_PESCOD_NUMERIC_VALUE}`

const API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_SUCCESS_RESPONSE_DATA_FIRST_ITEM_VALUE =
	{
		codigoPessoaBCP:
			API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_SUCCESS_RESPONSE_DATA_FIRST_ITEM_PESCOD_NUMERIC_VALUE,
		codigoPessoa:
			API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_SUCCESS_RESPONSE_DATA_FIRST_ITEM_PESCOD_NUMERIC_VALUE,
		nomeLegalPessoa: 'Nomeir Sobrenomeson',
		tipoPessoa: {
			codigoTipoPessoa: 1,
			nomeTipoPessoa: 'Pessoa Fisica',
			siglaTipoPessoa: 'PF',
		},
		nomeSocialPessoaFisica: 'Nomeir Sobrenomeson',
	}

exports.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_SUCCESS_RESPONSE_DATA =
	() => {
		return {
			pessoas: [
				API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_SUCCESS_RESPONSE_DATA_FIRST_ITEM_VALUE,
			],
		}
	}

exports.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_EXISTS_RETURN = () => {
	return API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_SUCCESS_RESPONSE_DATA_FIRST_ITEM_VALUE
}

const API_GOVERNANCADADOS_DADOSPESSOA_POSTPESSOA_SUCCESS_RESPONSE_PESCOD_DATA_VALUE =
	'75315984'

exports.API_GOVERNANCADADOS_DADOSPESSOA_POSTPESSOA_SUCCESS_RETURN = () => {
	return {
		codigoPessoa:
			API_GOVERNANCADADOS_DADOSPESSOA_POSTPESSOA_SUCCESS_RESPONSE_PESCOD_DATA_VALUE,
		codigoPessoaBCP:
			API_GOVERNANCADADOS_DADOSPESSOA_POSTPESSOA_SUCCESS_RESPONSE_PESCOD_DATA_VALUE,
	}
}

exports.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_EXISTENT_CPF = () => {
	return '06963752060'
}

exports.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_NOT_EXISTS_RESPONSE_DATA =
	() => {
		return {}
	}

exports.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_NOT_EXISTS_CPF = () => {
	return '26538041078'
}
exports.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_NOT_EXISTS_RETURN = () => {
	return null
}

const API_GOVERNANCADADOS_DADOSPESSOA_POSTPESSOA_VALID_PAYLOAD_VALUE = {
	codigoOrigemBCP: 174,
	nomeLegalPessoa: 'Nomeir Sobrenomeson',
	tipoPessoa: {
		codigoTipoPessoa: 1,
	},
	nomeSocialPessoaFisica: 'Nomeir Sobrenomeson',
	documentosIdentificacao: [
		{
			tipoDocumentoIdentificacao: {
				codigoTipoDocumentoIdentificacao: 1,
			},
			numeroRaizCpfPessoa: '012345678',
			digitoCpfPessoa: '90',
			orgaoExpedidorDocumento: {
				codigoOrgaoExpedidorDocumento: 10,
			},
		},
	],
	enderecosEletronicos: [
		{
			tipoFinalidadeEnderecoEletronico: {
				codigoTipoFinalidadeEnderecoEletronico: 1,
			},
			textoEnderecoEletronico: 'nomeir.snson@somedomainservice.com',
		},
	],
	telefones: [
		{
			codigoDDITelefone: 55,
			codigoDDDTelefone: 11,
			numeroTelefone: 987625544,
			tipoLinhaTelefonica: {
				codigoTipoLinhaTelefonica: 1,
			},
			tipoFinalidadeTelefone: {
				codigoTipoFinalidadeTelefone: 1,
			},
		},
	],
}

exports.API_GOVERNANCADADOS_DADOSPESSOA_POSTPESSOA_VALID_PAYLOAD = () => {
	return API_GOVERNANCADADOS_DADOSPESSOA_POSTPESSOA_VALID_PAYLOAD_VALUE
}
exports.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_PESCOD_VALID_RETURN =
	() => {
		return {
			message: 'Código validado com sucesso',
			pescod: `${API_BCP_GETDADOSPESSOA_EXISTS_PESCOD_NUMERIC_VALUE}`,
		}
	}
exports.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_VALID_RETURN =
	() => {
		return {
			message: 'Código validado com sucesso',
			pescod: IOREDISCACHE_VALUE_CPF_WITHPESCOD_PESCOD_VALUE,
		}
	}

exports.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_FROM_CONTROLLER_BCP_PESCOD_VALID_RETURN =
	() => {
		return {
			message: 'Código validado com sucesso',
			pescod: `${API_BCP_GETDADOSPESSOA_EXISTS_PESCOD_NUMERIC_VALUE}`,
		}
	}

exports.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_FROM_CONTROLLER_BCC_PESCOD_VALID_RETURN =
	() => {
		return {
			message: 'Código validado com sucesso',
			pescod: `${API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_SUCCESS_RESPONSE_DATA_FIRST_ITEM_PESCOD_NUMERIC_VALUE}`,
		}
	}

const HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE = {
	taxvat: HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_TAXVAT_VALUE,
	codigo: HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_CODIGO_VALUE,
}

const HANDLER_VALID_POST_INPUT_REQUEST_DATA_VALUE = {
	body: JSON.stringify(HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE),
}

exports.HANDLER_VALID_POST_INPUT_REQUEST_DATA = () => {
	return HANDLER_VALID_POST_INPUT_REQUEST_DATA_VALUE
}

const HANDLER_INVALID_POST_INPUT_REQUEST_DATA_VALUE_WITH_ERROR_PARSED = {
	body: '{',
}

exports.HANDLER_VALID_POST_INPUT_REQUEST_DATA = () => {
	return HANDLER_VALID_POST_INPUT_REQUEST_DATA_VALUE
}

exports.HANDLER_INVALID_POST_INPUT_REQUEST_DATA_WITH_ERROR_PARSED = () => {
	return HANDLER_INVALID_POST_INPUT_REQUEST_DATA_VALUE_WITH_ERROR_PARSED
}

exports.HANDLER_INVALID_POST_NULL_INPUT_REQUEST_DATA = () => {
	return {}
}

exports.HANDLER_SUCCESS_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify(
			CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_RETURN_BODY_VALUE
		),
	}
}

exports.HANDLER_FAIL_RETURN_WITH_INPUT_NULL = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 500,
		body: {
			status: 'error',
			message: 'Input must be a string',
		},
	}
}

exports.HANDLER_FAIL_RETURN_WITH_INPUT_ERROR_PARSED = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 500,
		body: {
			status: 'error',
			message: 'Unexpected end of JSON input',
		},
	}
}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT = () => {
	return HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE
}

const CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_RETURN_BODY_VALUE = {
	message: 'Código validado com sucesso',
	pescod: IOREDISCACHE_VALUE_CPF_WITHPESCOD_PESCOD_VALUE,
}

const CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_BCP_RETURN_BODY_VALUE = {
	message: 'Código validado com sucesso',
	pescod: `${API_BCP_GETDADOSPESSOA_EXISTS_PESCOD_NUMERIC_VALUE}`,
}

const CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_BCC_RETURN_BODY_VALUE = {
	message: 'Código validado com sucesso',
	pescod: `${API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_SUCCESS_RESPONSE_DATA_FIRST_ITEM_PESCOD_NUMERIC_VALUE}`,
}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_RETURN_BODY_VALUE,
	}
}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALID_INPUT = () => {
	return {
		...HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE,
		taxvat: undefined,
	}
}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_NO_FIELDS_INVALID_INPUT = () => {
	return {}
}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALID_JSON_INPUT_BAD_REQUEST =
	() => {
		return {
			statusCode: 400,
			body: {
				status: 'error',
				message: 'Validation',
			},
		}
	}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_BAD_REQUEST = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message:
				'Não foi possível processar a requisição, por favor revise os dados',
		},
	}
}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALIDCODE_BAD_REQUEST = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: 'informações inválidas',
		},
	}
}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_TAXVAT_NOTEXISTS_BAD_REQUEST =
	() => {
		return {
			statusCode: 400,
			body: {
				status: 'error',
				message: 'informações inválidas',
			},
		}
	}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALID_JSON_INPUT_EXCEPTION_MESSAGE =
	() => {
		return 'OTP send request processing error: Validation'
	}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALID_TAXVAT_INPUT = () => {
	return {
		...HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE,
		taxvat: '12345678901',
	}
}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_TAXVAT_NOTEXISTS_INPUT = () => {
	return {
		...HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE,
		taxvat: '85367976069',
	}
}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALID_CODIGO_INPUT = () => {
	return {
		...HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE,
		codigo: '000000',
	}
}
exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALID_CPF_INPUT_EXCEPTION_MESSAGE =
	() => {
		return 'OTP send request processing error: Número de CPF inválido'
	}
exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: 'Erro interno na validação de login de uso único',
		},
	}
}
exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_EXCEPTION_SIMULATE_INPUT =
	() => {
		return {
			...HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE,
			taxvat: '01234567890',
		}
	}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_BCP_RETURN = () => {
	return {
		statusCode: 200,
		body: CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_BCP_RETURN_BODY_VALUE,
	}
}

exports.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_BCC_RETURN = () => {
	return {
		statusCode: 200,
		body: CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_BCC_RETURN_BODY_VALUE,
	}
}

exports.MULESOFT_IMPERSONAL_TOKEN_HUB = () => {
	return 'token'
}

exports.SENSEDIA_HUB_TOKEN = () => {
	return 'token'
}

exports.SENSEDIA_HUB_CLOUD_TOKEN = () => {
	return 'token'
}

exports.FACTORY_REQUEST_SUCCESS_BODYCONTENT_INPUT = () => {
	return CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_RETURN_BODY_VALUE
}

exports.FACTORY_REQUEST_SUCCESS_BODYCONTENT_BCP_INPUT = () => {
	return CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_BCP_RETURN_BODY_VALUE
}

exports.FACTORY_GOVERNANCADADOS_DADOS_PESSOA_PESSOA_GETPAYLOAD_VALID_CLIENTDATA_INPUT =
	() => {
		return HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE
	}

const FACTORY_GOVERNANCADADOS_DADOS_PESSOA_PESSOA_GETPAYLOAD_VALID_RETURN_VALUE =
	{
		codigoOrigemBCP: 174,
		nomeLegalPessoa: 'Nomeir Sobrenomeson',
		tipoPessoa: {
			codigoTipoPessoa: 1,
		},
		nomeSocialPessoaFisica: 'Nomeir Sobrenomeson',
		documentosIdentificacao: [
			{
				tipoDocumentoIdentificacao: {
					codigoTipoDocumentoIdentificacao: 1,
				},
				numeroRaizCpfPessoa: '012345678',
				digitoCpfPessoa: '90',
				orgaoExpedidorDocumento: {
					codigoOrgaoExpedidorDocumento: 10,
				},
			},
		],
		enderecosEletronicos: [
			{
				tipoFinalidadeEnderecoEletronico: {
					codigoTipoFinalidadeEnderecoEletronico: 1,
				},
				textoEnderecoEletronico: 'nomeir.snson@somedomainservice.com',
			},
		],
		telefones: [
			{
				codigoDDITelefone: 55,
				codigoDDDTelefone: '11',
				numeroTelefone: '987623451',
				tipoLinhaTelefonica: {
					codigoTipoLinhaTelefonica: 1,
				},
				tipoFinalidadeTelefone: {
					codigoTipoFinalidadeTelefone: 1,
				},
			},
		],
	}

exports.FACTORY_GOVERNANCADADOS_DADOS_PESSOA_PESSOA_GETPAYLOAD_VALID_RETURN =
	() => {
		return FACTORY_GOVERNANCADADOS_DADOS_PESSOA_PESSOA_GETPAYLOAD_VALID_RETURN_VALUE
	}

exports.FACTORY_RESPONSE_DEFAULT_ERROR_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}
}

const RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT = 'Some error message'

exports.FACTORY_RESPONSE_ERROR_MESSAGE = () => {
	return RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT
}

exports.FACTORY_RESPONSE_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT,
		},
	}
}

exports.FACTORY_RESPONSE_DEFAULT_BAD_REQUEST_ERROR_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: 'The supplied request body is invalid',
		},
	}
}

exports.FACTORY_RESPONSE_BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT,
		},
	}
}

const RESPONSE_FACTORY_SUCCESS_BODY_CONTENT_VALUE = {
	something: 'somevalue',
}

exports.FACTORY_RESPONSE_SUCCESS_BODY_CONTENT = () => {
	return RESPONSE_FACTORY_SUCCESS_BODY_CONTENT_VALUE
}

exports.FACTORY_RESPONSE_SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: RESPONSE_FACTORY_SUCCESS_BODY_CONTENT_VALUE,
	}
}

exports.FACTORY_RESPONSE_SUCCESS_EMPTY_BODY_RETURN = () => {
	return {
		statusCode: 200,
		body: {},
	}
}

exports.SERVICE_VALIDATION_VALID_INPUT_DATA = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'some@domainemail.com',
		channel: 'Channel 1',
	}
}
exports.SERVICE_VALIDATION_SCHEMA = () => {
	return {
		type: 'object',
		properties: {
			fullName: { type: 'string' },
			cellPhone: { type: 'string', minLength: 10 },
			email: { type: 'string', format: 'email' },
			channel: {
				enum: ['Channel 1', 'Channel 2'],
			},
		},
		required: ['fullName', 'cellPhone', 'email', 'channel'],
	}
}
exports.SERVICE_VALIDATION_INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'some@domainemail.com',
	}
}
exports.SERVICE_VALIDATION_INVALID_INPUT_DATA_MISSING_PROPERTY_NAME = () => {
	return 'channel'
}
exports.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: false,
		email: 'some@domainemail.com',
		channel: 'Channel 1',
	}
}
exports.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'cellPhone'
}
exports.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '123',
		email: 'some@domainemail.com',
		channel: 'Channel 1',
	}
}
exports.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME = () => {
	return 'cellPhone'
}
exports.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'some@domainemail.com',
		channel: 'Channel 3',
	}
}
exports.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY_NAME =
	() => {
		return 'channel'
	}
exports.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'somedomainemail.com',
		channel: 'Channel 1',
	}
}
exports.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME =
	() => {
		return 'email'
	}

exports.SERVICE_CPFVALIDATION_VALID_CPF = () => {
	return '06963752060'
}

exports.SERVICE_CPFVALIDATION_VALID_CPF_SHORT = () => {
	return '6963752060'
}

exports.SERVICE_CPFVALIDATION_INVALID_CPF_BOTH_VERIFICATION_DIGITS = () => {
	return '6963752099'
}

exports.SERVICE_CPFVALIDATION_INVALID_CPF_UNIT_VERIFICATION_DIGIT = () => {
	return '6963752068'
}

exports.SERVICE_CPFVALIDATION_INVALID_CPF_SIZE = () => {
	return '123456789010'
}

exports.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_BCP_PESCOD_INPUT =
	() => {
		return `${API_BCP_GETDADOSPESSOA_EXISTS_PESCOD_NUMERIC_VALUE}`
	}

exports.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_PESCOD_INPUT =
	() => {
		return IOREDISCACHE_VALUE_CPF_WITHPESCOD_PESCOD_VALUE
	}

exports.API_BCP_GETDADOSPESSOA_AXIOS_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: API_BCP_GETDADOSPESSOA_EXISTS_RETURN_VALUE,
	}
}

exports.API_BCP_GETDADOSPESSOA_VALID_CPF_INPUT = () => {
	return '12345678901'
}

exports.API_BCP_GETDADOSPESSOA_VALID_RETURN = () => {
	return API_BCP_GETDADOSPESSOA_EXISTS_RETURN_VALUE
}

const API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_BADREQUEST_INVALIDTOKEN_RESPONSE_DATA_VALUE =
	{
		message: 'One-Time Password is not active.',
	}
const API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_SUCCESS_RESPONSE_DATA_VALUE =
	{
		validityStartTime: '2023-10-10T16:49:05.000Z',
		validityEndTime: '2023-10-10T16:54:05.000Z',
		numberOfFailedAuthAttempts: '0',
		daysLeftToExpire: '1',
		remainingUsageCount: '0',
		responseCode: '0',
		message: 'The operation was successful.',
	}

const API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_SUCCESS_RESPONSE_VALUE =
	{
		status: 200,
		data: API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_SUCCESS_RESPONSE_DATA_VALUE,
	}

exports.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_VALID_RETURN =
	() => {
		return API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_SUCCESS_RESPONSE_VALUE
	}

const API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_BADREQUEST_INVALIDTOKEN_RESPONSE_VALUE =
	{
		status: 404,
		data: API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_BADREQUEST_INVALIDTOKEN_RESPONSE_DATA_VALUE,
	}

exports.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_INVALID_RETURN =
	() => {
		return API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_BADREQUEST_INVALIDTOKEN_RESPONSE_VALUE
	}

exports.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_SUCCESS_RESPONSE =
	() => {
		return API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_SUCCESS_RESPONSE_VALUE
	}

exports.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_VALID_PAYLOAD_INPUT =
	() => {
		return {
			userName: HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_TAXVAT_VALUE,
			orgName: CONSTANT.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME,
			profileName:
				CONSTANT.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_PROFILENAME,
			otp: HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_CODIGO_VALUE,
		}
	}

const API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_NOTFOUND_RESPONSE_VALUE =
	{
		status: 404,
		data: {
			message: 'The user ( 85367976069 ) was not found.',
		},
	}

exports.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_NOTFOUND_RESPONSE =
	() => {
		return API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_NOTFOUND_RESPONSE_VALUE
	}
exports.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_NOTFOUND_RETURN =
	() => {
		return API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_NOTFOUND_RESPONSE_VALUE
	}
exports.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_UNEXPECTED_NOTFOUND_RETURN =
	() => {
		return {
			status: 404,
			data: {},
		}
	}

exports.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_NOTFOUND_INVALIDTOKEN_RESPONSE =
	() => {
		return API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_BADREQUEST_INVALIDTOKEN_RESPONSE_VALUE
	}

exports.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_NOTFOUND_INVALIDTOKEN_RESPONSE =
	() => {
		return API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_AXIOS_BADREQUEST_INVALIDTOKEN_RESPONSE_VALUE
	}

exports.FACTORY_SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAAPAYLOAD_GETPAYLOAD_VALID_CPF_INPUT =
	() => {
		return HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_TAXVAT_VALUE
	}

exports.FACTORY_SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAAPAYLOAD_GETPAYLOAD_VALID_OTP_INPUT =
	() => {
		return HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_CODIGO_VALUE
	}
