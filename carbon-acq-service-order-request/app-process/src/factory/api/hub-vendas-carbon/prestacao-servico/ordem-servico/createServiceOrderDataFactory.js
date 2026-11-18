const CONSTANT = require('../../../../../property')

const getScheduleData = (schedule) => {
	if (schedule.type === 'agendamento-imediato') {
		return {
			estimatedDateTime: schedule.estimatedServiceTime,
			openOsDateTime: schedule.openOsDateTime,
			key: schedule.key,
		}
	} else if (schedule.type === 'agendamento-programado') {
		return {
			startDateTime: schedule.startDateTime,
			endDateTime: schedule.endDateTime,
			openOsDateTime: schedule.openOsDateTime,
			key: schedule.key,
		}
	} else {
		throw new Error('Invalid schedule type')
	}
}

const splitDocumentNumber = (documentNumber) => {
	return {
		documentNumberWithoutVerifyCode: documentNumber.slice(0, -2),
		documentNumberVerifyCode: documentNumber.slice(-2),
	}
}

const splitCellPhone = (cellphone) => {
	return {
		cellPhoneDdd: cellphone.slice(0, 2),
		cellPhone: cellphone.slice(2),
	}
}

const splitZipCode = (zipCode) => {
	return {
		zipCodeBase: zipCode.slice(0, 5),
		zipCodeSuffix: zipCode.slice(5),
	}
}

const createComboQuestions = (combo) => {
	return (combo?.items || [])
		.filter((q) => q.questionCode && q.quantity)
		.map((q) => {
			return {
				questionCode: q.questionCode,
				quantity: String(q.quantity),
			}
		})
}

const createComboHistory = (combo) => {
	if (!combo?.items?.length) return
	const comboItems = combo.items
		.map((i) => `${i.name} (${i.quantity})`)
		.join(' - ')
	return `PORTO ASSISTENCIA INFORMA: ${comboItems}`
}

const formatServiceAddressDestination = (serviceAddressDestination) => {
	const zipCodeSplit = splitZipCode(serviceAddressDestination.zipCode)
	return {
		city: serviceAddressDestination.city,
		state: serviceAddressDestination.state,
		zipCodeBase: zipCodeSplit.zipCodeBase,
		zipCodeSuffix: zipCodeSplit.zipCodeSuffix,
		neighborhood: serviceAddressDestination.neighborhood,
		street: serviceAddressDestination.street,
		number: serviceAddressDestination.streetNumber,
		latitude: serviceAddressDestination.latitude,
		longitude: serviceAddressDestination.longitude,
		reference: serviceAddressDestination.reference,
		additionalInfo: serviceAddressDestination.additionalInfo,
		addressType: CONSTANT.SERVICE_ADDRESS_TYPE_DESTINATION,
		standardizationCodeCt24h:
			CONSTANT.SERVICE_ADDRESS_STANDARDIZATION_CODE_CT24H,
	}
}

exports.getServiceOrderRequestMessagePayload = (
	parsedSqsMessageIntegrationData
) => {
	const scheduleData = getScheduleData(
		parsedSqsMessageIntegrationData.serviceOrder.schedule
	)

	const documentSplit = splitDocumentNumber(
		parsedSqsMessageIntegrationData.customer.documentNumber
	)

	const cellphoneSplit = splitCellPhone(
		parsedSqsMessageIntegrationData.customer.cellphone
	)

	const zipCodeSplit = splitZipCode(
		parsedSqsMessageIntegrationData.serviceAddress.zipCode
	)

	const questionsArray = createComboQuestions(
		parsedSqsMessageIntegrationData.combo
	)

	const comboHistory = createComboHistory(parsedSqsMessageIntegrationData.combo)

	if (
		parsedSqsMessageIntegrationData.questions &&
		parsedSqsMessageIntegrationData.questions.length > 0
	) {
		questionsArray.push(
			...parsedSqsMessageIntegrationData.questions.map((q) => ({
				questionCode: String(q.question),
				quantity: q.answer,
			}))
		)
	}

	const payload = {
		serviceOrder: {
			schedule: scheduleData,
			siebelIntegrationId:
				parsedSqsMessageIntegrationData.serviceOrder.siebelIntegrationId,
			specialtyCode: parsedSqsMessageIntegrationData.serviceOrder.specialtyCode,
			originCode: parsedSqsMessageIntegrationData.serviceOrder.originCode,
			problem: parsedSqsMessageIntegrationData.serviceOrder.problem,
			subject: parsedSqsMessageIntegrationData.serviceOrder.subject,
			susep: parsedSqsMessageIntegrationData.serviceOrder.susep,

			priorityLevel: CONSTANT.SERVICE_ORDER_PRIORITY_LEVEL,
			homeServiceFlag: CONSTANT.SERVICE_ORDER_HOME_SERVICE_FLAG,
			privateServiceFlag: CONSTANT.SERVICE_ORDER_PRIVATE_SERVICE_FLAG,
			providerOnSiteFlag: CONSTANT.SERVICE_ORDER_PROVIDER_ON_SITE_FLAG,
			openingReason: CONSTANT.SERVICE_ORDER_OPENING_REASON,
			paymentMethodCode: CONSTANT.SERVICE_ORDER_PAYMENT_METHOD_CODE,
			originSystemCode: CONSTANT.SERVICE_ORDER_ORIGIN_SYSTEM_CODE,
			productBrandCode: parsedSqsMessageIntegrationData.serviceOrder
				.linkBrokerOrigin
				? CONSTANT.SERVICE_ORDER_PRODUCT_BRAND_CODE_LINK_BROKER
				: CONSTANT.SERVICE_ORDER_PRODUCT_BRAND_CODE,
			mileageLimit: CONSTANT.SERVICE_ORDER_MILEAGE_LIMIT,
			questions: questionsArray,
			history: comboHistory,
		},
		customer: {
			name: parsedSqsMessageIntegrationData.customer.name,
			socialName: parsedSqsMessageIntegrationData.customer.socialName,
			issuerName: parsedSqsMessageIntegrationData.customer.socialName
				? parsedSqsMessageIntegrationData.customer.socialName
				: parsedSqsMessageIntegrationData.customer.name,
			contactName: parsedSqsMessageIntegrationData.customer.socialName
				? parsedSqsMessageIntegrationData.customer.socialName
				: parsedSqsMessageIntegrationData.customer.name,
			email: parsedSqsMessageIntegrationData.customer.email,
			cellPhone: cellphoneSplit.cellPhone,
			cellPhoneDdd: cellphoneSplit.cellPhoneDdd,
			documentNumberComplete:
				parsedSqsMessageIntegrationData.customer.documentNumber,
			documentNumberWithoutVerifyCode:
				documentSplit.documentNumberWithoutVerifyCode,
			documentNumberVerifyCode: documentSplit.documentNumberVerifyCode,
		},
		serviceAddress: {
			city: parsedSqsMessageIntegrationData.serviceAddress.city,
			state: parsedSqsMessageIntegrationData.serviceAddress.state,
			zipCodeBase: zipCodeSplit.zipCodeBase,
			zipCodeSuffix: zipCodeSplit.zipCodeSuffix,
			neighborhood: parsedSqsMessageIntegrationData.serviceAddress.neighborhood,
			street: parsedSqsMessageIntegrationData.serviceAddress.street,
			number: parsedSqsMessageIntegrationData.serviceAddress.streetNumber,
			latitude: parsedSqsMessageIntegrationData.serviceAddress.latitude,
			longitude: parsedSqsMessageIntegrationData.serviceAddress.longitude,
			reference: parsedSqsMessageIntegrationData.serviceAddress.reference,
			additionalInfo:
				parsedSqsMessageIntegrationData.serviceAddress.additionalInfo,

			addressType: CONSTANT.SERVICE_ADDRESS_TYPE,
			standardizationCodeCt24h:
				CONSTANT.SERVICE_ADDRESS_STANDARDIZATION_CODE_CT24H,
		},
		callDetails: {
			registrationNumber: CONSTANT.CALL_DETAILS_REGISTRATION_NUMBER,
			requesterTypeCode: CONSTANT.CALL_DETAILS_REQUESTER_TYPE_CODE,
			userType: CONSTANT.CALL_DETAILS_USER_TYPE,
			companyCode: CONSTANT.CALL_DETAILS_COMPANY_CODE,
			companyGroupCode: CONSTANT.CALL_DETAILS_COMPANY_GROUP_CODE,
			agreementType: CONSTANT.CALL_DETAILS_AGREEMENT_TYPE,
			fiscalCompanyCode: CONSTANT.CALL_DETAILS_FISCAL_COMPANY_CODE,
			cgcOrder: CONSTANT.CALL_DETAILS_CGC_ORDER,
		},
	}

	if (parsedSqsMessageIntegrationData.serviceAddressDestination) {
		payload.serviceAddressDestination = formatServiceAddressDestination(
			parsedSqsMessageIntegrationData.serviceAddressDestination
		)
	}

	if (parsedSqsMessageIntegrationData.serviceOrder.vehicle) {
		payload.serviceOrder.vehicleModelCode =
			parsedSqsMessageIntegrationData.serviceOrder.vehicle.modelCode
		payload.serviceOrder.vehicleLicenseCode =
			parsedSqsMessageIntegrationData.serviceOrder.vehicle.vehicleLicenseCode
		payload.serviceOrder.vehiclemodelYear = Number(
			parsedSqsMessageIntegrationData.serviceOrder.vehicle.modelYear
		)
		payload.serviceOrder.vehicleColor =
			parsedSqsMessageIntegrationData.serviceOrder.vehicle.color
	}

	if (
		CONSTANT.BICYCLE_SERVICES_SKUS.includes(
			parsedSqsMessageIntegrationData.serviceOrder.sku
		)
	) {
		payload.serviceOrder.vehicleModelCode =
			CONSTANT.BIKE_VEHICLE_MODEL_CODE_DEFAULT
		payload.serviceOrder.vehicleLicenseCode =
			CONSTANT.BIKE_VEHICLE_LICENSE_CODE_DEFAULT
		payload.serviceOrder.vehiclemodelYear = CONSTANT.BIKE_MODELYEAR_DEFAULT
		payload.serviceOrder.vehicleColor = CONSTANT.BIKE_COLOR_CODE_DEFAULT
	}

	return payload
}
