const CONSTANTS = require('../property')
const service = require('../service')
const factory = require('../factory')
const errors = require('../error')
const axios = require('axios')

function handleEmailApiError(error) {
	const errorDetails = factory.axiosHandlerError(error)
	const externalApiError = new errors.ExternalApiError(
		errorDetails.message,
		errorDetails.status
	)

	service.logger.error('Error invoking Governança API: ' + errorDetails.message)
	throw externalApiError
}

exports.getPescod = async (cpf, token, certificates) => {
	const httpsAgent = factory.httpsAgent.createHttpsAgent(certificates)
	
	try {
		const API_URL = `${CONSTANTS.MULESOFT_URL}/${CONSTANTS.API_PESCOD_MULESOFT_PATH}/${cpf}`
		const config = {
			method: 'GET',
			url: API_URL,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				partner: CONSTANTS.PARTNER_HEADER_VALUE,
			},
			httpsAgent
		}
		const { data } = await axios(config)

		return data?.cpfPessoa?.codigoPessoa
	} catch (error) {
		handleEmailApiError(error)
	}
}
