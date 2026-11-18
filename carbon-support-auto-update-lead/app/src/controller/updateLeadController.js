const { updateLeadApi } = require('../api')
const { validation, logger } = require('../service')

exports.process = async (inputData) => {
	let currentActivity = 'Validacao dos dados'
	try {
		logger.info(inputData, 'payload update lead')

		validation.inputData(inputData)

		currentActivity = 'Chamando api gateway de atualizacao de lead'
		await updateLeadApi.putUpdateLead(inputData)

		logger.info('Solicitacao de atualizacao de lead efetuada com sucesso')
	} catch (error) {
		logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}
