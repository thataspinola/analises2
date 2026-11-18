const HANDLER_MOCKS = require('../../handler.mock')

exports.SERVICE_VALIDATION_PAYLOAD_JUST_REQUIRED_FIELDS_VALID_INPUT = () => {
	const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
		JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
	) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation
	delete validEventSnsMessagePayloadFromHandlerMock.carbonTraceId
	delete validEventSnsMessagePayloadFromHandlerMock.eCommercePlatform
	delete validEventSnsMessagePayloadFromHandlerMock.externalId
	delete validEventSnsMessagePayloadFromHandlerMock.transactionId
	delete validEventSnsMessagePayloadFromHandlerMock.itemId
	delete validEventSnsMessagePayloadFromHandlerMock.contactEmail
	delete validEventSnsMessagePayloadFromHandlerMock.installments
	delete validEventSnsMessagePayloadFromHandlerMock.leadIdentifier
	delete validEventSnsMessagePayloadFromHandlerMock.paymentData
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.serviceOrder
		.schedule.openOsDateTime
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.serviceOrder
		.schedule.key
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.serviceOrder
		.siebelIntegrationId
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.serviceOrder
		.serviceId
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.serviceOrder
		.sku
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.serviceOrder
		.specialtyCode
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.serviceOrder
		.originCode
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.serviceOrder
		.companyCode
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.serviceOrder
		.sourceSystemCode
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.serviceOrder
		.coupon
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.serviceOrder
		.problem
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.serviceOrder
		.subject
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.serviceOrder
		.combo
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.customer
		.socialName
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.customer
		.cellPhone
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData.customer
		.documentNumber
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData
		.serviceAddress.zipCode
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData
		.serviceAddress.streetType
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData
		.serviceAddress.latitude
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData
		.serviceAddress.longitude
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData
		.serviceAddress.reference
	delete validEventSnsMessagePayloadFromHandlerMock.integrationData
		.serviceAddress.additionalInfo
	return validEventSnsMessagePayloadFromHandlerMock
}

exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_AMOUNT_INVALID_INPUT = () => {
	const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
		JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
	) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

	delete validEventSnsMessagePayloadFromHandlerMock.amount
	return validEventSnsMessagePayloadFromHandlerMock
}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEORDERNUMBER_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData
			.serviceOrderNumber
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEORDER_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData
			.serviceOrder
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEORDER_SCHEDULE_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData
			.serviceOrder.schedule
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEORDER_SCHEDULE_STARTDATETIME_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData
			.serviceOrder.schedule.startDateTime
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEORDER_SCHEDULE_ENDDATETIME_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData
			.serviceOrder.schedule.endDateTime
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_CUSTOMER_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData.customer
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_CUSTOMER_NAME_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData.customer
			.name
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_CUSTOMER_EMAIL_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData.customer
			.email
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEADDRESS_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData
			.serviceAddress
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEADDRESS_CITY_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData
			.serviceAddress.city
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEADDRESS_STATE_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData
			.serviceAddress.state
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEADDRESS_NEIGHBORHOOD_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData
			.serviceAddress.neighborhood
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEADDRESS_STREET_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData
			.serviceAddress.street
		return validEventSnsMessagePayloadFromHandlerMock
	}
exports.SERVICE_VALIDATION_PAYLOAD_WITHOUT_INTEGRATIONDATA_SERVICEADDRESS_STREETNUMBER_INVALID_INPUT =
	() => {
		const validEventSnsMessagePayloadFromHandlerMock = JSON.parse(
			JSON.stringify(HANDLER_MOCKS.VALID_EVENT_SNSMESSAGE_1_PAYLOAD())
		) //Parse over stringify is needed to do a deep copy (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) to ensure not affect usage of VALID_EVENT_SNSMESSAGE_1_PAYLOAD() in another situation

		delete validEventSnsMessagePayloadFromHandlerMock.integrationData
			.serviceAddress.streetNumber
		return validEventSnsMessagePayloadFromHandlerMock
	}
