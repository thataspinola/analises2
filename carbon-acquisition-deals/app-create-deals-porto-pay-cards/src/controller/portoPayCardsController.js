const CONSTANTS = require('../property')
const service = require('../service')
const { portoPayCardsApi } = require('../api')
const factory = require('../factory')

const tokenLayer = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)
const dealsDataLayer = require(CONSTANTS.DEALS_DATA_LIBRARY_LOCATION)

exports.process = async (inputData) => {
	try {

		delete inputData.creditCards
		delete inputData.eligibility

		service.schemaValidation.validate(inputData, CONSTANTS.INPUT_SCHEMA)

		const SENSEDIA_TOKEN = await getToken()

		const payload = {
			cpfOrCnpj: `${inputData.documento}`,
			documentType: 'CPF',
		}
		const response = await portoPayCardsApi.getPortoPayCards(
			payload,
			SENSEDIA_TOKEN
		)


		const cards = service.filterCards.filter(response)

		const sortedCards = service.sortCards.sort(cards)

		await saveDeals(inputData, sortedCards)

		return factory.response.success('Success')
	} catch (error) {
		service.logger.error('Failed to process Porto Pay cards deal')
		throw error
	}
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
			`Salvando porto pay cards no banco de dados: ${JSON.stringify(data)}`
		)

		await dealsDataLayer.saveDealsData(data)
	}
}
