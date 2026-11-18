const api = require('../api')
const factory = require('../factory')
const CONSTANTS = require('../property')
const tokenLayer = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)

exports.verify = async () => {
	try {
		const token = await tokenLayer.getSensediaTokenCarbonCloud()
		const getIncomeBracket = await api.vidaOn.getIncomeBracket(token)

		return factory.response.success(getIncomeBracket)
	} catch (error) {
		const vidaOnFaixaRendaError = new Error(
			`API vida-on income-bracket-life error: ${error.message}`
		)
		logger.error(vidaOnFaixaRendaError.message)
		throw vidaOnFaixaRendaError
	}
}
