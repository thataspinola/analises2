const CONSTANTS = require('../property')
const service = require('../service')
const { goodCardApi } = require('../api')
const factory = require('../factory')
const dealsDataLayer = require(CONSTANTS.DEALS_DATA_LIBRARY_LOCATION)

const tokenLayer = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)

exports.process = async (inputData) => {
	try {

		delete inputData.creditCards
		delete inputData.eligibility
		
		validateInput(inputData)

		const SENSEDIA_TOKEN = await getToken()

		const response = await goodCardApi.getGoodCard(
			getPayload(inputData),
			SENSEDIA_TOKEN
		)

		await saveDeals(inputData, response)

		return factory.response.success('Success')
	} catch (error) {
		service.logger.error(error.message)

		if (error.name == 'ValidationError') {
			return factory.response.badRequestError(
				'Não foi possível processar a requisição, por favor revise os dados'
			)
		}
		return factory.response.error('Erro interno')
	}
}

function validateInput(inputData) {
	service.schemaValidation.validate(inputData, CONSTANTS.INPUT_SCHEMA)
}

async function getToken() {
	try {
		const sensediaToken = await tokenLayer.getSensediaTokenCarbon()

		return sensediaToken
	} catch (error) {
		service.logger.error(error.message)
		throw new Error(CONSTANTS.GET_TOKEN_ERROR_DEFAULT_MESSAGE)
	}
}

function getPayload(inputData) {
	return { cpf: inputData.documento }
}

async function saveDeals(inputData, response) {
	if (response) {
		const data = factory.save.build(inputData.documento, response)

		service.logger.info(
			`Salvando good card no banco de dados: ${JSON.stringify(data)}`
		)

		await dealsDataLayer.saveDealsData(data)
	}
}
