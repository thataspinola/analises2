const service = require('../../service')
const CONSTANT = require('../../property')

exports.execute = (parsedInputData) => {
	if (CONSTANT.NODE_ENV !== 'production') {
		let currentActivity = 'Teste de exceção'
		try {
			if (parsedInputData.cartCommerceId === 'Except') {
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
