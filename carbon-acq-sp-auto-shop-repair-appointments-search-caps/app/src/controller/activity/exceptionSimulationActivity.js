const service = require('../../service')
const CONSTANT = require('../../property')

exports.execute = (inputData) => {
	if (CONSTANT.NODE_ENV !== 'production') {
		let currentActivity = 'Teste de exceção'
		try {
			if (inputData.appointmentCode === 'Except') {
				throw new Error(
					`Erro recebido da chamada da API: código '500' dados: '{ "message": "Simulação de falha" }'`
				)
			}
		} catch (error) {
			service.logger.error(
				`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
			)
			throw error
		}
	}
}
