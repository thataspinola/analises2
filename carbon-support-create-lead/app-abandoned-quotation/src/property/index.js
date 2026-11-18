exports.NODE_ENV = process.env.NODE_ENV || 'local'

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API de atualização de lead.`

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.UPDATE_LEAD =
	process.env.UPDATE_LEAD ||
	'https://xvu9c2u0s0.execute-api.ca-central-1.amazonaws.com/v1/update-lead'
