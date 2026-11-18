const {
	GET_TOKEN_ERROR_DEFAULT_MESSAGE,
	TOKEN_LIBRARY_LOCATION,
	NO_QUERY_STRING_MESSAGE,
	NODE_ENV,
} = require('../property')
const { validationService } = require('../services')
const { vehicleDataFactory } = require('../factory')
const tokenLayer = require(TOKEN_LIBRARY_LOCATION)
const { vehicleApi } = require('../api')

exports.process = async (plate, description, yearModel) => {
	let response

	if (plate) response = await getPerPlate(plate)
	else if (description && yearModel)
		response = await getPerDescriptionAndYearModel(description, yearModel)
	else throw new ValidationError(NO_QUERY_STRING_MESSAGE)

	return response
}

async function getPerPlate(plate) {
	const sanitizedPlate = vehicleDataFactory.sanitizePlate(plate)

	validationService.plateValidation(sanitizedPlate)

	const sensediaToken = await getToken()

	const apiResponseData = await vehicleApi.getDataPerPlate(plate, sensediaToken)

	const descriptions =
		vehicleDataFactory.parseDescriptionsPerPlate(apiResponseData)

	return descriptions
}

async function getPerDescriptionAndYearModel(description, yearModel) {
	validationService.descriptionValidation(description)
	validationService.yearModelValidation(yearModel)

	const sensediaToken = await getToken()

	const apiResponseData = await vehicleApi.getDataPerDescriptionAndYearModel(
		description,
		yearModel,
		sensediaToken
	)

	const descriptions =
		vehicleDataFactory.parseDescriptionsPerDescriptionAndYearModel(
			apiResponseData
		)

	return descriptions
}

async function getToken() {
	try {
		if (NODE_ENV === 'production') {
			return await tokenLayer.getSensediaTokenHubCloud()
		}
		return await tokenLayer.getSensediaTokenHub()
	} catch (error) {
		logger.error(error.message)
		throw Error(GET_TOKEN_ERROR_DEFAULT_MESSAGE)
	}
}
