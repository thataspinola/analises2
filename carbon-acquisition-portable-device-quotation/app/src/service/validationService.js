const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const errors = require('../common/errors')
const CONSTANT = require('../property')

exports.inputData = (data) => {
	const payloadAttributesValueError = validateRequestedElements(data)
	if (payloadAttributesValueError.length > 0) {
		throw new errors.ValidationError(
			`The attributes values are not valid: ${payloadAttributesValueError.join(
				', '
			)}`
		)
	}
}

function validateRequestedElements(inputData) {
	const ajv = new Ajv({ allErrors: true })
	addFormats(ajv)

	const validate = ajv.compile(CONSTANT.QUOTATION_SCHEMA)
	const inputDataIsValid = validate(inputData)

	var valueErrors = []

	if (!inputDataIsValid) {
		validate.errors.forEach((validateError) => {
			if (validateError.keyword === 'required') {
				valueErrors.push(validateError.params.missingProperty)
			} else if (
				[
					'type',
					'minLength',
					'maxLength',
					'enum',
					'format',
					'pattern',
					'if',
					'const',
					'minimum',
					'maximum',
				].includes(validateError.keyword)
			) {
				const lastInstancePathNodeRegex = /[^\/]+$/
				const lastInstancePathNodeRegexMatches =
					validateError.instancePath.match(lastInstancePathNodeRegex)
				if (
					Array.isArray(lastInstancePathNodeRegexMatches) &&
					lastInstancePathNodeRegexMatches.length > 0
				) {
					valueErrors.push(lastInstancePathNodeRegexMatches[0])
				} else {
					valueErrors.push('can not determine property')
				}
			} else {
				valueErrors.push('can not determine property')
			}
		})
	}

	return valueErrors
}
