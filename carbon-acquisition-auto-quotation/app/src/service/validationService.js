const { ValidationError } = require('../error')
const addFormats = require('ajv-formats')
const CONSTANT = require('../property')
const Ajv = require('ajv')

exports.inputData = (leadData) => {
	const payloadAttributesValueError = validateRequestedElements(leadData)
	if (payloadAttributesValueError.length > 0) {
		throw new ValidationError(
			`The input path value is not valid: ${payloadAttributesValueError.join(
				' '
			)}`
		)
	}
}

function validateRequestedElements(inputData) {
	const ajv = new Ajv()
	addFormats(ajv)

	const validateCreateLead = ajv.compile(CONSTANT.QUOTATION_SCHEMA)
	const inputDataIsValidCreateLead = validateCreateLead(inputData)

	const valueErrors = []

	if (!inputDataIsValidCreateLead) {
		validateCreateLead.errors.forEach((validateError) => {
			if (['required', 'type', 'enum'].includes(validateError.keyword)) {
				valueErrors.push(
					getPath(validateError.instancePath),
					getMessage(validateError)
				)
			} else {
				valueErrors.push('can not determine property')
			}
		})
	}

	return valueErrors
}

function getPath(instancePath) {
	return `'${instancePath.replace(/^\//, '').replace(/\//g, '.') || 'root'}'`
}

function getMessage(validateError) {
	return validateError.message
}
