const CONSTANT = require('../../../../property')

function kebabCase(string) {
	return string
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/,/g, '')
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/[\s_]+/g, '-')
		.toLowerCase()
}

function groupComboItemsById(items) {
	if (!Array.isArray(items)) {
		throw new TypeError('Expected an array of items')
	}

	return items.reduce((acc, item) => {
		const key = item.id

		if (!acc[key]) {
			acc[key] = { id: item.id, quantity: item.quantity }
		} else {
			acc[key].quantity += item.quantity
		}
		return acc
	}, {})
}

function getComboPayload(items, sku) {
	const groupedItemsById = groupComboItemsById(items)

	return Object.values(groupedItemsById).map((item) => ({
		sku: `${sku}-${item.id}`,
		quantity: item.quantity,
	}))
}

function getValidBrokerValue(parsedInputData, leadData) {
	return parsedInputData && parsedInputData.trim() ? parsedInputData : leadData
}

exports.getRequestPayload = (
	parsedInputData,
	commerceQuotationId,
	scheduleData,
	leadData,
	isRecommendation
) => {
	const {
		serviceProvision: {
			products = [],
			schedule = {},
			coupon,
			serviceOrder = {},
		} = {},
	} = parsedInputData

	const product = products[0] || {}

	const serviceAddress =
		serviceOrder.serviceAddresses?.find(
			(address) => address.type === 'origem'
		) || {}

	const brokerName = getValidBrokerValue(
		parsedInputData.brokerName,
		leadData.brokerName
	)
	const brokerEmail = getValidBrokerValue(
		parsedInputData.brokerEmail,
		leadData.brokerEmail
	)
	const brokerPhone = getValidBrokerValue(
		parsedInputData.brokerPhone,
		leadData.brokerPhone
	)
	const susepCode = getValidBrokerValue(
		parsedInputData.susepCode,
		leadData.susepCode
	)

	const responsePayload = {
		proposal: {
			scope: 'porto_service',
			porto_service: {
				category: kebabCase(product.categories?.category ?? 'Porto Serviços'),
				lead_identifier: leadData?.vdoCode,
				quotation_token: commerceQuotationId,
				speciality_code: schedule.specialtyCode,
				origin_code: schedule.originCode,
				companyCode: CONSTANT.COMPANY_CODE,
				sourceSystemCode: CONSTANT.SOURCE_SYSTEM_CODE,
				coupon: !isRecommendation ? coupon : CONSTANT.RECOMMENDATION_COUPON,
				problem: schedule.problem,
				subject: product.subject,
				person: {
					document_code: serviceOrder.requester?.documentNumber,
					name: serviceOrder.requester?.name,
					social_name: serviceOrder.requester?.socialName,
					email: serviceOrder.requester?.email,
					phone: serviceOrder.requester?.cellphone,
				},
				analytics: {
					gtm_anonymous_id: parsedInputData?.gtmAnonymousId ?? null,
					user_id: parsedInputData?.userId ?? null,
					client_id_bcp: leadData?.pescod ?? null,
					measurement_session_id: parsedInputData?.measurementSessionId ?? null,
				},
				address: {
					zip_code: serviceAddress.zipCode,
					streetType: CONSTANT.STREET_TYPE,
					street: serviceAddress.street,
					number: serviceAddress.streetNumber,
					additional_info: serviceAddress.additionalInfo,
					neighborhood: serviceAddress.neighborhood,
					city: serviceAddress.city,
					state: serviceAddress.state,
					latitude: serviceAddress.latitude,
					longitude: serviceAddress.longitude,
				},
				scheduling: {
					type: scheduleData?.scheduleType,
					start_date_time: scheduleData?.startDateTime,
					end_date_time: scheduleData?.endDateTime || null,
					estimated_date_time: scheduleData?.estimatedDateTime || null,
					estimated_service_time: scheduleData?.estimatedServiceTime || null,
					open_os_date_time: scheduleData?.openOsDateTime,
					key: scheduleData?.key,
					expiration_timestamp: scheduleData?.expirationTime,
					expired_url_redirect: scheduleData?.expirationUrlRedirect,
				},
				options: [],
				combo: product.items ? getComboPayload(product.items, product.sku) : [],
				broker: {
					link_id: leadData?.idLead,
					susep: susepCode,
					name: brokerName,
					email: brokerEmail,
					phone: brokerPhone,
				},
				link_broker_origin: parsedInputData.linkBrokerOrigin,
			},
		},
	}

	if (serviceOrder.questions && serviceOrder.questions.length > 0) {
		responsePayload.proposal.porto_service.questions =
			serviceOrder.questions.map((i) => ({
				question: i.question,
				answer: i.answer,
			}))
	}

	if (product.type === 'guincho') {
		const serviceAddressDestination = serviceOrder.serviceAddresses?.find(
			(address) => address.type === 'destino'
		)

		responsePayload.proposal.porto_service.destination = {
			zip_code: serviceAddressDestination.zipCode,
			streetType: CONSTANT.STREET_TYPE,
			street: serviceAddressDestination.street,
			number: serviceAddressDestination.streetNumber,
			additional_info: serviceAddressDestination.additionalInfo,
			neighborhood: serviceAddressDestination.neighborhood,
			city: serviceAddressDestination.city,
			state: serviceAddressDestination.state,
			latitude: serviceAddressDestination.latitude,
			longitude: serviceAddressDestination.longitude,
		}

		responsePayload.proposal.porto_service.vehicle_data = {
			vehicle_license_code: product.vehicleData.vehicleLicenseCode,
			model_code: product.vehicleData.modelCode,
			model_year: product.vehicleData.modelYear,
			color: product.vehicleData.color,
		}
	}

	return responsePayload
}
