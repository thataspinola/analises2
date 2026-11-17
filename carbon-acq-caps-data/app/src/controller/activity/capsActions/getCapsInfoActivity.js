const service = require('../../../service')
const factory = require('../../../factory')
const api = require('../../../api')

exports.execute = async (queryStringParameters, mulesoftToken) => {
	let currentActivity = 'Chamada do endpoint de API getCapsInfo'
	try {
		const getCapsInfoEndpointReturn =
			await api.assistencia.capsEnderecos.v1.infoCaps.getCapsInfo(
				queryStringParameters,
				mulesoftToken
			)

		currentActivity =
			'Preparação para o retorno da chamada do endpoint de API getCapsInfo'

		const getCapsInfoResponsePayload =
			factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
				getCapsInfoEndpointReturn,
				queryStringParameters
			)

		return getCapsInfoResponsePayload
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}
