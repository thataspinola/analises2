const CONSTANTS = require('../property')
const service = require('../service')
const { eligibilityApi } = require('../api')
const factory = require('../factory')
const dealsDataLayer = require(CONSTANTS.DEALS_DATA_LIBRARY_LOCATION)

const tokenLayer = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)

exports.process = async (inputData) => {
	try {	

		delete inputData.creditCards
		delete inputData.eligibility

		validateInput(inputData)

		const SENSEDIA_TOKEN = await getToken()

		service.logger.info(`[ENVIO DE DADOS PARA A API DE PORTO BANK PIS OFERTA] - ${JSON.stringify(inputData)}`)

		const customPayload = inputData
		customPayload.primeiraCompra = {
			codigoProdutoPolitica: CONSTANTS.PRIMEIRA_COMPRA_CODIGO_PRODUTO_POLITICA
		}
		
		service.logger.info(`[ENVIO DE DADOS PARA A API DE PORTO BANK PIS OFERTA] - ${JSON.stringify(customPayload)}`)
		
		const response = await eligibilityApi.getEligibility(
			customPayload,
			SENSEDIA_TOKEN
		)

		await saveDeals(inputData, response)

		return factory.response.success('Success')
	} catch (error) {
		service.logger.error('Failed to process eligibility deal')
		throw error
	}
}

function validateInput(inputData) {
	service.schemaValidation.validate(inputData, CONSTANTS.INPUT_SCHEMA)
}

async function getToken() {
	try {
		const sensediaToken = await tokenLayer.getSensediaTokenHubCloud()

		return sensediaToken
	} catch (error) {
		service.logger.error(error.message)
		throw new Error(CONSTANTS.GET_TOKEN_ERROR_DEFAULT_MESSAGE)
	}
}

async function saveDeals(inputData, response) {
	if (response) {
		const data = factory.save.build(inputData.documento, response)

		service.logger.info(
			`Salvando eligibilidade no banco de dados: ${JSON.stringify(data)}`
		)

		await dealsDataLayer.saveDealsData(data)
	}
}
