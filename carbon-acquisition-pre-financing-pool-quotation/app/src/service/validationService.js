const addFormats = require('ajv-formats')
const CONSTANT = require('../property')
const Ajv = require('ajv')
const errors = require('../error')

exports.inputData = (leadData) => {
	const payloadAttributesValueError = validateRequestedElements(leadData)
	if (payloadAttributesValueError.length > 0) {
		throw new errors.ValidationError(
			`The attributes values are not valid: ${payloadAttributesValueError.join(
				', '
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
		validateCreateLead.errors.forEach((validateCreateLeadError) => {
			if (validateCreateLeadError.keyword === 'required') {
				valueErrors.push(validateCreateLeadError.params.missingProperty)
			} else if (
				['type', 'minLength', 'maxLength', 'enum', 'format'].includes(
					validateCreateLeadError.keyword
				)
			) {
				const lastInstancePathNodeRegex = /[^/]+$/
				const lastInstancePathNodeRegexMatches =
					validateCreateLeadError.instancePath.match(lastInstancePathNodeRegex)
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
