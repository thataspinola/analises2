const service = require('../../service')
const CONSTANT = require('../../property')

exports.execute = (inputData) => {
	if (CONSTANT.NODE_ENV !== 'production') {
		let currentActivity = 'Teste de exceção'
		try {
			if (inputData.pet === 'Except') {
				throw new Error('Fake failure')
			}
		} catch (error) {
			service.logger.error(
				`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
			)
			throw error
		}
	}
}
