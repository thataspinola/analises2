/**
 * Função responsável por retornar um objeto de resposta de sucesso
 * @param {Object} data Dados a serem retornados
 * @returns {Object} resposta padronizada de sucesso
 */
exports.success = (data) => {
	return {
		statusCode: 200,
		body: data,
	}
}

/**
 * Função responsável por retornar um objeto de resposta de erro
 * @param {String} description Descrição do erro
 * @param {Number} code CÓDIGO HTTP
 * @returns {Object} resposta padronizada de erro
 */
exports.error = (description, code = 500) => {
	return {
		statusCode: code,
		body: {
			status: 'error',
			description,
		},
	}
}
