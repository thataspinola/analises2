const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const errors = require('../error')

const VALIDATION_KEYWORDS = [
	'type',
	'minLength',
	'maxLength',
	'minimum',
	'maximum',
	'enum',
	'format',
	'pattern',
	'oneOf',
	'ip'
]

exports.inputData = (leadData, schema) => {
	const payloadAttributesValueError = validateRequestedElements(
		leadData,
		schema
	)
	if (payloadAttributesValueError.length > 0) {
		throw new errors.ValidationError(
			`The attributes values are not valid: ${payloadAttributesValueError.join(
				', '
			)}`
		)
	}
}

function validateRequestedElements(inputData, schema) {
	const ajv = new Ajv({ strict: true })
	addFormats(ajv)

	const validate = ajv.compile(schema)
	const inputDataIsValid = validate(inputData)

	if (inputDataIsValid) return []

	return extractValueErrors(validate.errors)
}

function extractValueErrors(validationErrors) {
	const valueErrors = new Set()

	validationErrors.forEach((error) => {
		if (error.keyword === 'required') {
			valueErrors.add(error.params.missingProperty)
		} else if (VALIDATION_KEYWORDS.includes(error.keyword)) {
			const property = getLastInstancePathNode(error.instancePath)
			valueErrors.add(property || 'can not determine property')
		} else {
			valueErrors.add('can not determine property')
		}
	})

	return Array.from(valueErrors)
}

function getLastInstancePathNode(instancePath) {
	const matches = instancePath.match(/[^\/]+$/)
	return matches ? matches[0] : null
}

