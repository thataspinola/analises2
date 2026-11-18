const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
exports.NODE_ENV = NODE_ENV_VALUE
exports.LEAD_SCHEMA = require('./leadSchema')

exports.ERROR_MESSAGES = {
	INVALID_CPF: "Número de CPF inválido"
}