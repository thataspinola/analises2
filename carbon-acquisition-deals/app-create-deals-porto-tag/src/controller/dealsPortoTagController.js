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

		const portoSegTokenHub = await getToken()

		const tags = await api.portoTag.tagsApi.getTagsByDocument(
			inputData.documento,
			portoSegTokenHub
		)

		await saveDeals(inputData.documento, tags)

		return factory.response.success('Success')
	} catch (error) {
		service.logger.error('Failed to process Porto Tag deal')
		throw error
	}
}

const validateInput = (inputData) => {
	let currentActivity = 'Validação dos dados'

	try {
		service.schemaValidation.inputData(inputData)
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
	let currentActivity = 'Obtenção do token Porto Seg'
	try {
		return await tokenLayer.getPortoSegTokenHub()
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)

		throw new errors.TokenError()
	}
}

const saveDeals = async (document, tags) => {
	let currentActivity = 'Salvando dados no banco dynamoDB'
	try {
		if (tags && tags.length > 0) {
			const saveTagsData = factory.saveFactory.build(document, tags)

			service.logger.info(
				`Salvando tags no banco de dados: ${JSON.stringify(saveTagsData)}`
			)

			await dealsDataLayer.saveDealsData(saveTagsData)
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)

		throw new errors.DealsDataLayerError(error)
	}
}
