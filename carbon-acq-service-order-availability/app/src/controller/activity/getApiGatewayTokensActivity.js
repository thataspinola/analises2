const CONSTANT = require('../../property')
const token = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const service = require('../../service')

exports.execute = async () => {
	let currentActivity = 'Obtenção do token do API Gateway'
	try {
		const getImpersonalUserCarbon = await token.getImpersonalUserCarbon()
		const getCertificate = await token.getPortoCertificates()

		return {
			impersonalUserToken: getImpersonalUserCarbon,
			ca: getCertificate,
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}
