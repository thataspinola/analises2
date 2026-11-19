const repository = require('../repository')
const CONSTANTS = require('../property')
const service = require('../service')
const factory = require('../factory')

exports.saveDealsData = async (inputData) => {
	try {
		service.logger.info(`Evento Recebido: ${inputData}`)

		validateInput(inputData, CONSTANTS.SAVE_INPUT_SCHEMA)

		addTTL(inputData)

		await repository.deals.save(CONSTANTS.DYNAMODB_TABLE_NAME, inputData)

		return 'The deals data was saved with success.'
	} catch (error) {
		service.logger.error('Failed to save deals data')
		throw error
	}
}

exports.getDealsData = async (inputData) => {
	try {
		service.logger.info(`Evento Recebido: ${inputData}`)

		validateInput(inputData, CONSTANTS.GET_INPUT_SCHEMA)

		const response = await repository.deals.get(
			CONSTANTS.DYNAMODB_TABLE_NAME,
			inputData.document
		)

		return response
	} catch (error) {
		service.logger.error(`Erro identificado: ${error.message}`)

		if (error.name == 'ValidationError') {
			return factory.response.error(error.message, 400)
		}

		return factory.response.error('Erro interno')
	}
}

function validateInput(data, schema) {
	service.schemaValidation.validate(data, schema)
}

function addTTL(inputData) {
	inputData.TTL = Math.floor(Date.now() / 1000) + 3600
}
