const {
	VALIDATION_SERVICE_DESCRIPTION_MESSAGES,
	VALIDATION_SERVICE_YEAR_MODEL_MESSAGES,
	VALIDATION_SERVICE_PLATE_MESSAGES,
	CONTAINS_ONLY_DIGITS_REGEX,
} = require('../property')

/**
 * Função responsável por validar a placa
 * @param {object} inputData
 * @returns {string|undefined} Retorna um mensagem de erro ou undefined, caso não exista erro
 */
exports.plateValidation = function (plate) {
	if (typeof plate !== 'string')
		throw new ValidationError(VALIDATION_SERVICE_PLATE_MESSAGES.mustBeString)

	if (plate.length < 7)
		throw new ValidationError(VALIDATION_SERVICE_PLATE_MESSAGES.haveFewerThan)

	if (plate.length > 7)
		throw new ValidationError(VALIDATION_SERVICE_PLATE_MESSAGES.haveMoreThan)

	// Este regex é o mesmo utilizado na validação por parte do Auto para avaliar um padrão válido de placa
	const regex = /([a-zA-Z][0-9]+[a-zA-Z]+[0-9])|([a-zA-Z]{3}[0-9]{4})/g

	if (!plate.match(regex))
		throw new ValidationError(VALIDATION_SERVICE_PLATE_MESSAGES.validFormat)
}

/**
 * Função responsável por validar a descrição
 * @param {object} inputData
 * @returns {string|undefined} Retorna um mensagem de erro ou undefined, caso não exista erro
 */
exports.descriptionValidation = function (description) {
	if (typeof description !== 'string')
		throw new ValidationError(
			VALIDATION_SERVICE_DESCRIPTION_MESSAGES.mustBeString
		)

	if (description.length < 2)
		throw new ValidationError(
			VALIDATION_SERVICE_DESCRIPTION_MESSAGES.mustBeStringAt2Characters
		)
}

/**
 * Função responsável por validar o ano modelo
 * @param {object} inputData
 * @returns {string|undefined} Retorna um mensagem de erro ou undefined, caso não exista erro
 */
exports.yearModelValidation = function (yearModel) {
	if (typeof yearModel !== 'string' && typeof yearModel !== 'number') {
		throw new ValidationError(
			VALIDATION_SERVICE_YEAR_MODEL_MESSAGES.mustBeValidYear
		)
	}

	const yearModelString = yearModel.toString()

	if (yearModelString.length !== 4) {
		throw new ValidationError(
			VALIDATION_SERVICE_YEAR_MODEL_MESSAGES.mustBeValidYear
		)
	}

	if (!CONTAINS_ONLY_DIGITS_REGEX.test(yearModelString)) {
		throw new ValidationError(
			VALIDATION_SERVICE_YEAR_MODEL_MESSAGES.mustBeValidYear
		)
	}
}
