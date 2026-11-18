exports.getSendMessageAttributes = (serviceOrderNumber) => {
	const attributes = {
		eventId: !serviceOrderNumber ? '' : `${serviceOrderNumber}`,
		eventType: 'SERVICE_ORDER_RECEIVED',
	}
	return attributes
}

const getSendServiceOrderRequestMessageComboItemPayload = (
	parsedInputItemComboItem
) => {
	const payload = {
		productId: parsedInputItemComboItem.productId,
		quantity: parsedInputItemComboItem.quantity,
	}
	return payload
}

exports.getPayload = (parsedSqsMessage, postCreateServiceOrderResponse) => {
	const payload = {
		carbonTraceId: parsedSqsMessage.carbonTraceId,
		eCommercePlatform: {
			orderNumber: parsedSqsMessage.eCommercePlatform.orderNumber,
			loggedCPF: parsedSqsMessage.eCommercePlatform.loggedCPF,
		},
		externalId: parsedSqsMessage.externalId,
		transactionId: parsedSqsMessage.transactionId,
		transactionType: parsedSqsMessage.transactionType || 'CREDIT_CARD',
		itemId: parsedSqsMessage.itemId,
		contactEmail: parsedSqsMessage.contactEmail,
		installments: parsedSqsMessage.installments,
		productCode: parsedSqsMessage.productCode,
		amount: parsedSqsMessage.amount,
		leadIdentifier: parsedSqsMessage.leadIdentifier,
		paymentData: {
			externo: parsedSqsMessage.paymentData.externo,
			empresa: parsedSqsMessage.paymentData.empresa,
			filial: parsedSqsMessage.paymentData.filial,
			hash: parsedSqsMessage.paymentData.hash,
			proposta: parsedSqsMessage.paymentData.proposta,
		},
		integrationData: {
			serviceOrderNumber: postCreateServiceOrderResponse.serviceOrderNumber,
			serviceOrder: {
				schedule: {
					type: parsedSqsMessage.integrationData.serviceOrder.schedule.type,
					startDateTime:
						parsedSqsMessage.integrationData.serviceOrder.schedule
							.startDateTime,
					endDateTime:
						parsedSqsMessage.integrationData.serviceOrder.schedule.endDateTime,
					estimatedDateTime:
						parsedSqsMessage.integrationData.serviceOrder.schedule
							.estimatedDateTime,
					openOsDateTime:
						parsedSqsMessage.integrationData.serviceOrder.schedule
							.openOsDateTime,
					key: parsedSqsMessage.integrationData.serviceOrder.schedule.key,
				},
				siebelIntegrationId:
					parsedSqsMessage.integrationData.serviceOrder.siebelIntegrationId,
				serviceId: parsedSqsMessage.integrationData.serviceOrder.serviceId,
				sku: parsedSqsMessage.integrationData.serviceOrder.sku,
				specialtyCode:
					parsedSqsMessage.integrationData.serviceOrder.specialtyCode,
				originCode: parsedSqsMessage.integrationData.serviceOrder.originCode,
				companyCode: parsedSqsMessage.integrationData.serviceOrder.companyCode,
				sourceSystemCode:
					parsedSqsMessage.integrationData.serviceOrder.sourceSystemCode,
				problem: parsedSqsMessage.integrationData.serviceOrder.problem,
				subject: parsedSqsMessage.integrationData.serviceOrder.subject,
				coupon: parsedSqsMessage.integrationData.serviceOrder.coupon,
				susep: parsedSqsMessage.integrationData.serviceOrder.susep,
				linkBrokerOrigin:
					parsedSqsMessage.integrationData.serviceOrder.linkBrokerOrigin,
			},
			customer: {
				name: parsedSqsMessage.integrationData.customer.name,
				socialName: parsedSqsMessage.integrationData.customer.socialName,
				email: parsedSqsMessage.integrationData.customer.email,
				cellphone: parsedSqsMessage.integrationData.customer.cellphone,
				documentNumber:
					parsedSqsMessage.integrationData.customer.documentNumber,
			},
			serviceAddress: {
				city: parsedSqsMessage.integrationData.serviceAddress.city,
				state: parsedSqsMessage.integrationData.serviceAddress.state,
				zipCode: parsedSqsMessage.integrationData.serviceAddress.zipCode,
				neighborhood:
					parsedSqsMessage.integrationData.serviceAddress.neighborhood,
				street: parsedSqsMessage.integrationData.serviceAddress.street,
				streetType: parsedSqsMessage.integrationData.serviceAddress.streetType,
				streetNumber:
					parsedSqsMessage.integrationData.serviceAddress.streetNumber,
				latitude: parsedSqsMessage.integrationData.serviceAddress.latitude,
				longitude: parsedSqsMessage.integrationData.serviceAddress.longitude,
				reference: parsedSqsMessage.integrationData.serviceAddress.reference,
				additionalInfo:
					parsedSqsMessage.integrationData.serviceAddress.additionalInfo,
			},
		},
	}
	if (parsedSqsMessage.integrationData.serviceOrder.combo?.items?.length) {
		const comboItems = []
		for (const comboItem of parsedSqsMessage.integrationData.serviceOrder.combo
			.items) {
			comboItems.push(
				getSendServiceOrderRequestMessageComboItemPayload(comboItem)
			)
		}
		payload.integrationData.serviceOrder.combo = {
			id: parsedSqsMessage.integrationData.serviceOrder.combo.id,
			items: [...comboItems],
		}
	}

	return payload
}
