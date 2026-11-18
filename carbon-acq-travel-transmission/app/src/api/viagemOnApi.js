const axios = require('axios')
const CONSTANT = require('../property')
const factory = require('../../src/factory')

exports.integration = async (tokenBearerString, certificates, payload) => {
	const httpsAgent = factory.httpsAgent.createHttpsAgent(certificates)

	const viagemOnPagamentoAxiosConfig = {
		method: 'put',
		url: `${CONSTANT.SENSEDIA_URL}/${CONSTANT.API_VIAGEMON_PAGAMENTO_URL}`,
		headers: {
			Authorization: `Bearer ${tokenBearerString}`,
			'Content-Type': 'application/json',
			partner: 'HUB-VENDAS-CARBON',
		},
		httpsAgent,
		data: payload,
	}

	let viagemOnPagamentoAxiosResponse = null

	try {
		viagemOnPagamentoAxiosResponse = await axios(viagemOnPagamentoAxiosConfig)
	} catch (err) {
		if (err.response) {
			throw new Error(
				`API error: code '${err.response.status}' data: '${JSON.stringify(
					err.response.data
				)}'`
			)
		} else if (err.request) {
			throw new Error('API did not give response')
		}
		throw new Error(`API unexpected error: ${err.message}`)
	}

	if (
		!viagemOnPagamentoAxiosResponse ||
		!viagemOnPagamentoAxiosResponse.status
	) {
		throw new Error('API unexpected error: Empty or invalid response')
	}

	if (
		!viagemOnPagamentoAxiosResponse.data ||
		!viagemOnPagamentoAxiosResponse.data.validacoes ||
		viagemOnPagamentoAxiosResponse.data.validacoes.valido !== true
	) {
		if (viagemOnPagamentoAxiosResponse.data) {
			const responseData = viagemOnPagamentoAxiosResponse.data
			const numeroOrcamento = payload.numeroOrcamento
			const propostas = payload.propostas
			logger.error(
				{ numeroOrcamento, propostas, responseData },
				`Viagem-on pagamento API unsuccessful response data.`
			)
		}
		throw new Error('API unsuccessful response')
	}
	return viagemOnPagamentoAxiosResponse.data
}
