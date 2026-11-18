const CONSTANT = require('../../property')
const token = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const service = require('../../service')

exports.execute = async () => {
	let currentActivity =
		'Obtenção dos certificados corporativos para comunicação com o API Gateway'
	try {
		const certificateArray = await token.getPortoCertificates()
		return certificateArray
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		service.logger.error({ rawError: error }, message)
		throw error
	}
}
