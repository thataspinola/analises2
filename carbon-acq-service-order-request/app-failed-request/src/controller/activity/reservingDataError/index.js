const service = require('../../../service')

exports.execute = async (integrationData) => {
	let currentActivity =
		'Realizando o armazenamento do payload de erro para o DynamoDB'
	try {
		const response = await service.dynamoDB.serviceOrderTableService.createItem(
			integrationData,
			new Date(),
			2592000
		)

		service.logger.info(
			`Payload salvo do DynamoDB: ${JSON.stringify(response)}`
		)

		return response
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		service.logger.error(message)
		throw error
	}
}
