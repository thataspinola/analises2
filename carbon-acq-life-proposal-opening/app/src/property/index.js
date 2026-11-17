require('dotenv').config()

exports.NODE_ENV = process.env.NODE_ENV || 'local'

exports.SENSEDIA_URL =
	process.env.SENSEDIA_URL || 'https://portoapicloud-hml.portoseguro.com.br'

exports.API_PATH = process.env.API_PATH || 'vida/vida-on/v1/proposta/abertura'

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(this.NODE_ENV)

exports.PROPOSAL_SCHEMA = require('./proposalSchema')

/**
 * Função que retorna o endereço de importação da biblioteca de tokens
 * @param {String} NODE_ENV Variável de identificação do ambiente
 * @returns {String} Endereço de importação da biblioteca de tokens
 */
function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API do Produto.`
exports.COD_EMPRESA_PADRAO = 1
exports.TIPO_ENDERECO_PADRAO = 'RESIDENCIAL'
exports.TIPO_TELEFONE_PADRAO = 'CEL'
exports.TIPO_PESSOA_PADRAO = 'PF'
exports.TIPO_REMUNERACAO_PADRAO = 'COR'
exports.NACIONALIDADE_PADRAO = 'BRASILEIRA'
exports.PAIS_RESIDENTE_PADRAO = 'Brasil'

exports.MESSAGES = {
	INDEX: {
		START: "Start lambdaHandler",
		INVALID_BODY: 'Input must be a string',
		CONVERTING_BODY: "Converting body",
		PROCESSING_PROPOSAL: "Processing proposal controller",
		SUCCESS: 'Proposal created successfully',
		INPUT_REQUEST: 'Evento request'
	},
	PROPOSAL_CONTROLLER: {
		VALIDATION: "Validando os dados recebidos",
		CONVERTING_PAYLOAD: 'Parseando dados de entrada para formato aceito pela API de Proposta do Vida',
		GETTING_TOKEN: "Obtendo o token Sensedia",
		GETTING_API: "Chamando a API do Sensedia",
		APPLYING_DATA_MASKKING: "aplicando mascaramento de dados"
	},
	OPEN_PROPOSAL_API: {
		CONFIGING: 'Criando config gateway api de abertura de proposta',
		REQUESTING: 'chamando api abertura de proposta'
	}
}

exports.EMAIL_MASK_REGEX = /(?<=.)[^@\n](?=[^@\n]*?[^@\n]@)|(?:(?<=@.)|(?!^)\G(?=[^@\n]*$)).(?=.*[^@\n]\.)/gm
exports.NUMERIC_EXTRACTOR = /[^0-9]/g
exports.REMOVE_EXTRERNAL_SPACES = /\s+/g