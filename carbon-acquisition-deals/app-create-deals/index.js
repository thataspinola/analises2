const factory = require('./src/factory')
const controller = require('./src/controller')
const service = require('./src/service')

module.exports.handler = async (event) => {
	const data = JSON.parse(event?.body || null)

	service.logger.info(`Evento recebido: ${JSON.stringify(data)}`)

	const response = await controller.createDealsController.process(data)

	return factory.response.handler(response)
}
