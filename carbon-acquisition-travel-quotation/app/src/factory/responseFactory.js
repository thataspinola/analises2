const HTTP_STATUS_MIN = 100
const HTTP_STATUS_MAX = 599
const DEFAULT_ERROR_STATUS = 500

/**
 * Normaliza o statusCode para um inteiro HTTP valido.
 * Erros de rede carregam `code` textual (ECONNABORTED, ETIMEDOUT); devolver esse
 * valor no payload faz o API Gateway responder 502 e deixa o status vazio no APM.
 * @param {any} statusCode Valor recebido do erro
 * @returns {number} Status HTTP valido
 */
function normalizeStatusCode(statusCode) {
	const parsed = Number(statusCode)

	if (
		Number.isInteger(parsed) &&
		parsed >= HTTP_STATUS_MIN &&
		parsed <= HTTP_STATUS_MAX
	) {
		return parsed
	}

	return DEFAULT_ERROR_STATUS
}

exports.success = (data, correlationId) => {
	return {
		isBase64Encoded: false,
		headers: {'carbon-trace-id' : correlationId},
		statusCode: 201,
		body: JSON.stringify(data)
	}
}

exports.Error = (message, statusCode, correlationId) => {
	return {
		isBase64Encoded: false,
		headers: {'carbon-trace-id' : correlationId},
		statusCode: normalizeStatusCode(statusCode),
		body: JSON.stringify({
			status: 'error',
			message: message || 'Internal Server Error',
		}),
	}
}
