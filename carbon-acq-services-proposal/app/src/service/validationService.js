const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const errors = require('../error')

exports.inputData = (payload, schema) => {
	const payloadAttributesValueError = validateRequestedElements(payload, schema)
	if (payloadAttributesValueError.length > 0) {
		throw new errors.ValidationError(
			`The attributes values are not valid: ${payloadAttributesValueError.join(
				', '
			)}`
		)
	}
}

function validateRequestedElements(inputData, schema) {
	const ajv = new Ajv({ discriminator: true, allErrors: false, strict: false })
	addFormats(ajv)

	const validate = ajv.compile(schema)
	const inputDataIsValid = validate(inputData)

	var valueErrors = []

	if (!inputDataIsValid) {
		validate.errors.forEach((validateError) => {
			if (validateError.schemaPath !== '#/anyOf') {
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
						'minimum',
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
				} else if (validateError.keyword === 'discriminator') {
					if (
						validateError.schemaPath ===
						'#/properties/serviceProvision/properties/products/items/discriminator'
					) {
						valueErrors.push('serviceProvision.products[0].type')
					} else {
						valueErrors.push(
							`${validateError.keyword}: ${validateError.schemaPath}`
						)
					}
				} else if (validateError.keyword === 'uniqueItems') {
					valueErrors.push(validateError.instancePath)
				} else {
					valueErrors.push('can not determine property')
				}
			}
		})
	}

	return valueErrors
}
