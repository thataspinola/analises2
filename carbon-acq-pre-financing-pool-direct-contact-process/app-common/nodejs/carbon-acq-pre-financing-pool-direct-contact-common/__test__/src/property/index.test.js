const MOCKS = require('../../mocks/index.mock')
const CONSTANT = require('../../../src/property')
const service = require('../../../src/service')

describe('Given a inputData call', () => {
	test('It should not throw error when client.socialName is empty', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_VALID_EMPTY_SOCIALNAME()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw error when client.socialName is null', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_VALID_NULL_SOCIALNAME()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw error when client.socialName is not provided', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_VALID_WITHOUT_SOCIALNAME()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw error when client.socialName is provided and not empty', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_VALID_FILLED_SOCIALNAME()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw error when no utc fields are provided', () => {
		const data = MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_VALID_NO_UTCS()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw error when know utc fields are provided', () => {
		const data = MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_VALID_KNOW_UTCS()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw error when extra utc fields are provided', () => {
		const data = MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_VALID_EXTRA_UTCS()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw error when just required fields are provided', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_VALID_JUST_REQUIRED_FIELDS()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).not.toThrow()
	})

	test('It should throw error when channel is missing', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_CHANNEL()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).toThrow('The attributes values are not valid: channel')
	})

	test('It should throw error when product is missing', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_PRODUCT()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).toThrow('The attributes values are not valid: product')
	})

	test('It should throw error when product is invalid', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_INVALID_INVALID_PRODUCT()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).toThrow('The attributes values are not valid: product')
	})

	test('It should throw error when client is missing', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_CLIENT()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).toThrow('The attributes values are not valid: client')
	})

	test('It should throw error when client.fullName is missing', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_CLIENT_FULLNAME()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).toThrow('The attributes values are not valid: fullName')
	})

	test('It should throw error when client.cpfCnpj is missing', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_CLIENT_CPFCNPJ()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).toThrow('The attributes values are not valid: cpfCnpj')
	})

	test('It should throw error when client.cellphone is missing', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_CLIENT_CELLPHONE()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).toThrow('The attributes values are not valid: cellPhone')
	})

	test('It should throw error when client.email is missing', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_CLIENT_EMAIL()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).toThrow('The attributes values are not valid: email')
	})

	test('It should throw error when address is missing', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_ADDRESS()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).toThrow('The attributes values are not valid: address')
	})

	test('It should throw error when address.zipCode is missing', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_ADDRESS_ZIPCODE()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).toThrow('The attributes values are not valid: zipCode')
	})

	test('It should throw error when marketingoptout is missing', () => {
		const data =
			MOCKS.PROPERTY.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_MARKETINGOPTOUTFLAG()
		expect(() => {
			service.validation.inputData(
				data,
				CONSTANT.WHATSAPP_CONTACT_REQUEST_SCHEMA
			)
		}).toThrow('The attributes values are not valid: marketingOptOut')
	})
})
