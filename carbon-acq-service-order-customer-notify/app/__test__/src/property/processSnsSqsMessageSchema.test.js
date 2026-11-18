const MOCKS = require('../../mocks/index.mock')
const CONSTANT = require('../../../src/property')
const service = require('../../../src/service')

describe('Given a inputData call', () => {
	test('It should not throw error when just required fields are provided', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_JUST_REQUIRED_FIELDS_VALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).not.toThrow()
	})
	test('It should throw error when amount is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_AMOUNT_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: amount')
	})
	test('It should throw error when integrationData is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: integrationData')
	})
	test('It should throw error when integrationData.serviceOrderNumber is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEORDERNUMBER_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: serviceOrderNumber')
	})
	test('It should throw error when integrationData.serviceOrder is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEORDER_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: serviceOrder')
	})
	test('It should throw error when integrationData.serviceOrder.schedule is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEORDER_SCHEDULE_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: schedule')
	})
	test('It should throw error when integrationData.serviceOrder.schedule.startDateTime is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEORDER_SCHEDULE_STARTDATETIME_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: startDateTime')
	})

	test('It should throw error when integrationData.customer is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_CUSTOMER_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: customer')
	})
	test('It should throw error when integrationData.customer.name is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_CUSTOMER_NAME_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: name')
	})
	test('It should throw error when integrationData.customer.email is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_CUSTOMER_EMAIL_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: email')
	})
	test('It should throw error when integrationData.serviceAddress is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEADDRESS_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: serviceAddress')
	})
	test('It should throw error when integrationData.serviceAddress.city is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEADDRESS_CITY_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: city')
	})
	test('It should throw error when integrationData.serviceAddress.state is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEADDRESS_STATE_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: state')
	})
	test('It should throw error when integrationData.serviceAddress.neighborhood is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEADDRESS_NEIGHBORHOOD_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: neighborhood')
	})
	test('It should throw error when integrationData.serviceAddress.street is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEADDRESS_STREET_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: street')
	})
	test('It should throw error when integrationData.serviceAddress.streetNumber is missing', () => {
		const data =
			MOCKS.PROPERTY_PROCESSSNSSQSMESSAGESCHEMA.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEADDRESS_STREETNUMBER_INVALID_INPUT()
		expect(() =>
			service.validation.inputData(
				data,
				CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
			)
		).toThrow('The attributes values are not valid: streetNumber')
	})
})
