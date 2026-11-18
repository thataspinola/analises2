const factory = require('./src/factory')
const { findDealsController } = require('./src/controller')
const logger = require('./src/service/loggerService')

module.exports.handler = async (event) => {
	logger.info(`Evento recebido: ${JSON.stringify(event)}`)

	const cpf = event?.queryStringParameters?.cpf

	const response = await findDealsController.process(cpf)

	return factory.response.handler(response)
}
