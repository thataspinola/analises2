const CONSTANTS = require('../property')
const service = require('../service')
const api = require('../api')
const factory = require('../factory')
const dealsDataLayer = require(CONSTANTS.DEALS_DATA_LIBRARY_LOCATION)
const tokenLayer = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)
const errors = require('../error')

exports.process = async (inputData) => {
	try {

		delete inputData.creditCards
		delete inputData.eligibility

		validateInput(inputData)

		const sensediaTokenHubCloud = await getToken()

		const cardProposals =
			await api.portobank.pisWorkflow.propostaApi.getCardProposalsInProgressByDocument(
				inputData.documento,
				sensediaTokenHubCloud
			)

		const cardProposalsInProgress =
			service.filterCardProposalsInProgress.filter(cardProposals)

		const saveDealsData = factory.cardProposalsDataFactory.getSaveDealsData(
			cardProposalsInProgress
		)

		await saveDeals(inputData.documento, saveDealsData)

		return factory.response.success('Success')
	} catch (error) {
		service.logger.error('Failed to process card proposals deal')
		throw error
	}
}

const validateInput = (inputData) => {
	let currentActivity = 'Validação dos dados'

	try {
		service.schemaValidation.inputData(
			inputData,
			CONSTANTS.PROPOSALS_IN_PROGRESS_SCHEMA
		)
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		if (error.name == 'ValidationError') {
			service.logger.warn(message)
		} else {
			service.logger.error(message)
		}
		throw error
	}
}

const getToken = async () => {
	let currentActivity = 'Obtenção do token Sensedia Token Hub Cloud'
	try {
		return await tokenLayer.getSensediaTokenHubCloud()
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)

		throw new errors.TokenError()
	}
}

const saveDeals = async (document, saveDealsData) => {
	let currentActivity = 'Salvando dados no banco dynamoDB'
	try {
		if (saveDealsData && saveDealsData.length > 0) {
			const saveProposalsData = factory.saveFactory.build(
				document,
				saveDealsData
			)
			service.logger.info(
				`Salvando propostas no banco de dados: ${JSON.stringify(
					saveProposalsData
				)}`
			)
			await dealsDataLayer.saveDealsData(saveProposalsData)
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)

		throw new errors.DealsDataLayerError(error)
	}
}
