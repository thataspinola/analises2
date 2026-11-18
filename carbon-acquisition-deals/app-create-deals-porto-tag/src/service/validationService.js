const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const errors = require('../error')
const CONSTANTS = require('../property')

exports.inputData = (payload) => {
	const payloadAttributesValueError = validateRequestedElements(payload)
	if (payloadAttributesValueError.length > 0) {
		throw new errors.ValidationError(
			`The attributes values are not valid: ${payloadAttributesValueError.join(
				', '
			)}`
		)
	}
}

function validateRequestedElements(inputData) {
	const ajv = new Ajv({ strict: false })
	addFormats(ajv)

	const validate = ajv.compile(CONSTANTS.PORTO_TAG_SCHEMA)
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
					'oneOf',
				].includes(validateError.keyword)
			) {
				const lastInstancePathNodeRegex = /[^\/]+$/
				const lastInstancePathNodeRegexMatches =
					validateError.instancePath.match(lastInstancePathNodeRegex)
				if (
					Array.isArray(lastInstancePathNodeRegexMatches) &&
					lastInstancePathNodeRegexMatches.length > 0
				) {
					if (
						!valueErrors.some(
							(valueError) => valueError === lastInstancePathNodeRegexMatches[0]
						)
					) {
						valueErrors.push(lastInstancePathNodeRegexMatches[0])
					}
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
