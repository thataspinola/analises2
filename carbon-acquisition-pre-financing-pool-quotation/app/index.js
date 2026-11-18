const { quotationController } = require('./src/controller')
const { logger } = require('./src/service')
const factory = require('./src/factory')

module.exports.handler = async (event) => {
	let responseFinal = null
	try {
		logger.info(`Recebendo evento - ${JSON.stringify(event)}`)
		if(!event.hasOwnProperty('body')){
			responseFinal = await quotationController.process(event)
		}else{
			if (typeof event.body !== 'string') {
				throw new Error('Corpo do evento tem que ser uma string')
			}
			const parsedInput = JSON.parse(event.body)
			
			responseFinal = await quotationController.process(parsedInput)

			if(responseFinal.hasOwnProperty('Output')) delete responseFinal?.Output
			if(responseFinal.hasOwnProperty('Status')) delete responseFinal?.Status
		}
		
		logger.info("FIM DO PROCESSO")
	} catch (error) {
		logger.error(error, 'Erro durante a execução da lambda.')
		responseFinal = factory.response.error(error?.message, 400)
	}

	return responseFinal
}
