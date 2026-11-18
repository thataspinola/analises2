const addFormats = require('ajv-formats')
const CONSTANTS = require('../property')
const errors = require('../error')
const Ajv = require('ajv')

const createValidator = () => {
	const ajv = new Ajv({ coerceTypes: true, allErrors: true })
	addFormats(ajv)
	return ajv.compile(CONSTANTS.UPDATE_LEAD_PAYLOAD_SCHEMA)
}

const extractValidationErrors = (errors) => {
	return errors.map((error) => {
		if (error.keyword === 'required') {
			return error.params.missingProperty
		} else if (
			['type', 'minLength', 'maxLength', 'enum', 'format', 'pattern'].includes(
				error.keyword
			)
		) {
			return extractPropertyFromInstancePath(error.instancePath)
		}
		return 'can not determine property'
	})
}

const extractPropertyFromInstancePath = (instancePath) => {
	// Esta regex corresponde ao último segmento não-barra de uma string.
	// Ela procura por um ou mais caracteres que não sejam uma barra ([^\/]+)
	// no final da string ($).
	const lastInstancePathNodeRegex = /[^/]+$/
	const match = instancePath.match(lastInstancePathNodeRegex)
	return match ? match[0] : 'can not determine property'
}

exports.inputData = (inputData) => {
	const validate = createValidator()
	if (!validate(inputData)) {
		const valueErrors = extractValidationErrors(validate.errors)
		throw new errors.ValidationError(
			`The attributes values are not valid: ${valueErrors.join(', ')}`
		)
	}
}
