const api = require('../api')
const factory = require('../factory')
const CONSTANTS = require('../property')
const tokenLayer = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)

exports.verify = async () => {
	const token = await tokenLayer.getSensediaTokenCarbonCloud()
	const getIncomeBracket = await api.vidaOn.getIncomeBracket(token)
	return factory.response.success(getIncomeBracket)
}
