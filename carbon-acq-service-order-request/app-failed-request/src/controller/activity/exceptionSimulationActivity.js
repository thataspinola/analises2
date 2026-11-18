const service = require('../../service')
const CONSTANT = require('../../property')

exports.execute = (parsedJsonQueueMessage) => {
	if (CONSTANT.NODE_ENV !== 'production') {
		let currentActivity = 'Teste de exceção'
		try {
			if (
				parsedJsonQueueMessage.integrationData?.customer?.socialName ===
				'Except Except'
			) {
				throw new Error('Simulação de falha')
			}
		} catch (error) {
			service.logger.error(
				`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
			)
			throw error
		}
	}
}
