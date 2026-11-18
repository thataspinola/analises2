const CONSTANT = require('../../property')
const token = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const service = require('../../service')

exports.execute = async () => {
	let currentActivity = 'Obtenção do token do API Gateway Sensedia Corp Cloud'
	try {
		const sensediaCloudToken = await token.getToken(
            CONSTANT.SENSEDIA_CORP_MIDDLEWARE_TOKEN_KEY
        )
		service.logger.info("Obtendo Token")
		return sensediaCloudToken
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		service.logger.error({ rawError: error }, message)
		throw error
	}
}
