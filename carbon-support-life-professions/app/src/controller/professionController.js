const factory = require('../factory')
const CONSTANTS = require('../property')
const api = require('../api')
const tokenLayer = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)
const { logger } = require('../service')

exports.getProfessions = async (query) => {
	try {
		const token = await tokenLayer.getSensediaTokenCarbonCloud()
		const allProfessions = await api.professionApi.getProfessions(token)

		if (!allProfessions || allProfessions.length == 0)
			throw new Error('Product API returned empty response')

		const professionsFiltered = filterProfessions(allProfessions, query)

		return factory.response.success(professionsFiltered)
	} catch (error) {
		logger.error({ query }, error.message)
		return factory.response.error(
			'Error to get professions data, please try again'
		)
	}
}

function filterProfessions(allProfessions, query) {
	if (!query) return allProfessions

	const normalizedQuery = query
		.normalize('NFD')
		.replace(/[^a-zA-Z\s]/g, '')
		.toLowerCase()

	return allProfessions.filter((profession) =>
		matchQuery(profession.descricao, normalizedQuery)
	)
}

function matchQuery(profession, normalizedQuery) {
	const INVALID_POSITION = -1

	const normalizedProfession = profession
		.normalize('NFD')
		.replace(/[^a-zA-Z\s]/g, '')
		.toLowerCase()

	const queryPosition = normalizedProfession.indexOf(normalizedQuery)
	if (queryPosition == INVALID_POSITION) return false
	return true
}
