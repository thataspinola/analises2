exports.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_WITHOUTOPTIONALATTRIBUTES_VALID_INPUT =
	() => {
		return {
			carbonTraceId: '12345',
			eCommercePlatform: {
				orderNumber: '12345',
				loggedCPF: '48912354892',
			},
			externalId: '2410987',
			transactionId: 'e9d9299e-223b-42cd-9178-51f0d3442a2e',
			itemId: '4329',
			contactEmail: 'fulano.silva@gmail.com',
			installments: 1,
			productCode: '82c2862b-7680-4ff2-b6fb-8fb3ad8001b2',
			amount: 98.72,
			leadIdentifier: '1723639908410',
			paymentData: {
				externo: true,
				empresa: '51',
				filial: '0101',
				hash: '',
				proposta: '',
				tipoTransacao: 'PRE_AUTORIZACAO',
			},
			integrationData: {
				serviceOrderNumber: '1087471-24',
				serviceOrder: {
					schedule: {
						startDateTime: '2024-09-26T08:00:00.000',
						endDateTime: '2024-09-26T10:00:00.000',
						openOsDateTime: '2024-09-26T10:00:00.000',
						key: '02092024193000161456',
					},
					siebelIntegrationId: '160820240800009118210',
					serviceId: '100',
					sku: 'ED001',
					specialtyCode: '44',
					originCode: '9',
					companyCode: '1',
					sourceSystemCode: '17',
					coupon: 'TESTE',
					problem: '586',
					subject: 'UI1',
					combo: {
						id: '53',
						items: [
							{
								productId: '2417',
								quantity: 1,
							},
							{
								productId: '2417',
								quantity: 1,
							},
						],
					},
				},
				customer: {
					name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
					socialName: '',
					email: 'fulano.silva@gmail.com',
					cellphone: '11222225555',
					documentNumber: '58489669074',
				},
				serviceAddress: {
					city: 'Sao Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista',
					street: 'Avenida Paulista',
					streetType: '',
					streetNumber: '982',
					latitude: -23.5649224,
					longitude: -46.6519376,
					reference: '',
					additionalInfo: '',
				},
			},
		}
	}

exports.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT = () => {
	return {
		carbonTraceId: '12345',
		eCommercePlatform: {
			orderNumber: '12345',
			loggedCPF: '48912354892',
		},
		externalId: '2410987',
		transactionId: 'e9d9299e-223b-42cd-9178-51f0d3442a2e',
		itemId: '4329',
		contactEmail: 'fulano.silva@gmail.com',
		installments: 1,
		productCode: '82c2862b-7680-4ff2-b6fb-8fb3ad8001b2',
		amount: 98.72,
		leadIdentifier: '1723639908410',
		paymentData: {
			externo: true,
			empresa: '51',
			filial: '0101',
			hash: '',
			proposta: '',
			tipoTransacao: 'PRE_AUTORIZACAO',
		},
		integrationData: {
			serviceOrderNumber: '1087471-24',
			serviceOrder: {
				schedule: {
					startDateTime: '2024-09-26T08:00:00.000',
					endDateTime: '2024-09-26T10:00:00.000',
					openOsDateTime: '2024-09-26T10:00:00.000',
					key: '02092024193000161456',
				},
				siebelIntegrationId: '160820240800009118210',
				serviceId: '100',
				sku: 'ED001',
				specialtyCode: '44',
				originCode: '9',
				companyCode: '1',
				sourceSystemCode: '17',
				coupon: 'TESTE',
				problem: '586',
				subject: 'UI1',
				combo: {
					id: '53',
					items: [
						{
							productId: '2417',
							quantity: 1,
						},
						{
							productId: '2417',
							quantity: 1,
						},
					],
				},
			},
			customer: {
				name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
				socialName: '',
				email: 'fulano.silva@gmail.com',
				cellphone: '11222225555',
				documentNumber: '58489669074',
			},
			serviceAddress: {
				city: 'Sao Paulo',
				state: 'SP',
				zipCode: '01310100',
				neighborhood: 'Bela Vista',
				street: 'Avenida Paulista',
				streetType: '',
				streetNumber: '982',
				latitude: -23.5649224,
				longitude: -46.6519376,
				reference: '',
				additionalInfo: '',
			},
		},
	}
}

exports.GETDATAREPORT_VALID_RETURN = () => {
	return {
		confirmDataReturnMessage: "test",
		updateScheduleStatusReturnRequestId: "test123"
	}
}

exports.GETDATAREPORT_WITHOUTOPTIONALATTRIBUTES_VALID_RETURN = () => {
	return {
		reservationKey: 'N/A',
		serviceOrderNumber: '1085516',
		serviceOrderYear: '24',
	}
}

exports.GETDATAREPORT_NULL_SCHEDULE_CONFIRM_STATUS_RETURN_REQUESTID = () => {
	return {
		reservationKey: '02092024193000161456',
		serviceOrderNumber: null,
		serviceOrderYear: '24',
	}
}

exports.GETDATAREPORT_EMPTY_SCHEDULE_CONFIRM_RETURN_MESSAGE = () => {
	return {
		reservationKey: '02092024193000161456',
		serviceOrderNumber: '1085516',
		serviceOrderYear: '',
	}
}

exports.GETDATAREPORT_ALL_INVALID = () => {
	return {
		reservationKey: null,
		serviceOrderNumber: undefined,
		serviceOrderYear: '',
	}
}
