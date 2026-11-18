const axios = require('axios')
const CONSTANT = require('../property')
const https = require('https')

module.exports.integration = async (payload, tokenBearerString, portoCertificates) => {
	try {
		const httpsAgent = new https.Agent({ ca: portoCertificates })
		const axiosConfig = {
			method: 'post',
			url: `${CONSTANT.MULE_URL}/${CONSTANT.API_PROPOSTA_CELULAR_URL}`,
			headers: {
				Authorization: `Bearer ${tokenBearerString}`,
				'Content-Type': 'application/json',
				partner: 'HUB-VENDAS-CARBON',
			},
			data: payload,
			httpsAgent,
		}
		const response = await axios(axiosConfig)
		return response?.data
	} catch (err) {
		const errorDetail = err?.response?.data?.mensagemError?.localizedMessage
		throw new Error(`API unexpected error: ${err.message} - ${errorDetail}`)
	}
}
