const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const { ValidationError } = require('../error')
const CONSTANT = require('../property')

exports.inputData = (leadData) => {
	const payloadAttributesValueError = validateRequestedElements(leadData)
	if (payloadAttributesValueError.length > 0) {
		throw new ValidationError(
			`The attributes values are not valid: ${payloadAttributesValueError.join(
				', '
			)}`
		)
	}
}

function validateRequestedElements(inputData) {
	const ajv = new Ajv({ coerceTypes: true })
	addFormats(ajv)

	const validate = ajv.compile(CONSTANT.SEND_EMAIL_REQUEST_SCHEMA)
	const inputDataIsValid = validate(inputData)

	const valueErrors = []

	if (!inputDataIsValid) {
		validate.errors.forEach((validateError) => {
			if (validateError.keyword === 'required') {
				valueErrors.push(validateError.params.missingProperty)
			} else if (
				['type', 'pattern', 'enum', 'minLength', 'minItems', 'format'].includes(
					validateError.keyword
				) &&
				validateError.instancePath
			) {
				valueErrors.push(
					validateError.instancePath + ' ' + validateError.message
				)
			} else {
				valueErrors.push('can not determine property')
			}
		})
	}

	return valueErrors
}
