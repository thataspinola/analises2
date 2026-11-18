const addFormats = require('ajv-formats')
const CONSTANT = require('../property')
const errors = require('../error')
const Ajv = require('ajv')

const createValidator = () => {
	const ajv = new Ajv()
	addFormats(ajv)
	return ajv.compile(CONSTANT.INSPECTION_FAIL_CELLPHONE_SCHEMA)
}

const extractValidationErrors = (errors) => {
	return errors.map((error) => {
		if (error.keyword === 'required') {
			return error.params.missingProperty
		} else if (
			[
				'type',
				'minLength',
				'maxLength',
				'enum',
				'format',
				'pattern',
				'const',
			].includes(error.keyword)
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

exports.validateInputData = (inputData) => {
	const validate = createValidator()
	if (!validate(inputData)) {
		const valueErrors = extractValidationErrors(validate.errors)
		throw new errors.ValidationError(
			`The attributes values are not valid: ${valueErrors.join(', ')}`
		)
	}
}
