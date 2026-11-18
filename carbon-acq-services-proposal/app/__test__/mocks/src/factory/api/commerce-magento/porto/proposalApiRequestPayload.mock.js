const MOCKS = require('../../../../../index.mock')

exports.PAYLOAD_PROPOSALDATA_INPUT = () => ({
	parsedInputData: MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT(),
	commerceQuotationId: MOCKS.API_COMMERCEMAGENTO_PORTO_QUOTATION.VALID_RETURN(),
	scheduleData:
		MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_RETURN(),
	leadData: MOCKS.API_SUPPORTCREATELEAD.VALID_RETURN(),
})

exports.PAYLOAD_PROPOSALDATA_WITH_COMBO_INPUT = () => ({
	parsedInputData: MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_WITH_COMBO_INPUT(),
	commerceQuotationId: MOCKS.API_COMMERCEMAGENTO_PORTO_QUOTATION.VALID_RETURN(),
	scheduleData:
		MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_RETURN(),
	leadData: MOCKS.API_SUPPORTCREATELEAD.VALID_RETURN(),
})

exports.PAYLOAD_PROPOSALDATA_WITH_GTMANONYMOUSID_CLIENTID_USERID_AND_MEASUREMENTSESSIONID_INPUT =
	() => ({
		parsedInputData:
			MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_WITH_GTMANONYMOUSID_CLIENTID_USERID_AND_MEASUREMENTSESSIONID_INPUT(),
		commerceQuotationId:
			MOCKS.API_COMMERCEMAGENTO_PORTO_QUOTATION.VALID_RETURN(),
		scheduleData:
			MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_RETURN(),
		leadData: MOCKS.API_SUPPORTCREATELEAD.VALID_RETURN(),
	})

exports.PAYLOAD_PROPOSALDATA_WITH_GTMANONYMOUSID_USERID_AND_MEASUREMENTSESSIONID_INPUT =
	() => ({
		parsedInputData:
			MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_WITH_GTMANONYMOUSID_USERID_AND_MEASUREMENTSESSIONID_INPUT(),
		commerceQuotationId:
			MOCKS.API_COMMERCEMAGENTO_PORTO_QUOTATION.VALID_RETURN(),
		scheduleData:
			MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_RETURN(),
		leadData: MOCKS.API_SUPPORTCREATELEAD.VALID_RETURN(),
	})

exports.PAYLOAD_PROPOSALDATA_WITH_GTMANONYMOUSID_AND_USERID_INPUT = () => ({
	parsedInputData:
		MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_WITH_GTMANONYMOUSID_AND_USERID_INPUT(),
	commerceQuotationId: MOCKS.API_COMMERCEMAGENTO_PORTO_QUOTATION.VALID_RETURN(),
	scheduleData:
		MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_RETURN(),
	leadData: MOCKS.API_SUPPORTCREATELEAD.VALID_RETURN(),
})

exports.PAYLOAD_PROPOSALDATA_WITH_CLIENTID_INPUT = () => ({
	parsedInputData:
		MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_WITH_CLIENTID_INPUT(),
	commerceQuotationId: MOCKS.API_COMMERCEMAGENTO_PORTO_QUOTATION.VALID_RETURN(),
	scheduleData:
		MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_RETURN(),
	leadData: MOCKS.API_SUPPORTCREATELEAD.VALID_RETURN(),
})

exports.PAYLOAD_PROPOSALDATA_RESPONSE = () => {
	return {
		proposal: {
			scope: 'porto_service',
			porto_service: {
				category: 'encanador',
				lead_identifier: '1739915904443',
				quotation_token: 'tokenCommerceQuotationGeneration',
				speciality_code: '437',
				origin_code: '9',
				companyCode: '95',
				sourceSystemCode: '36',
				coupon: 'DESCHUB25',
				problem: '586',
				subject: undefined,
				person: {
					document_code: '33207922880',
					name: 'Fulano de Tal',
					social_name: 'Fulane de Tal',
					email: 'teste@example.com',
					phone: '19981458065',
				},
				address: {
					zip_code: '01310100',
					streetType: 'Rua',
					street: 'Avenida Paulista',
					number: '982',
					additional_info: 'Apto 30',
					neighborhood: 'Bela Vista',
					city: 'São Paulo',
					state: 'SP',
					latitude: -23.514836,
					longitude: -46.3746187,
				},
				scheduling: {
					type: 'agendamento-programado',
					start_date_time: '2024-12-08T06:00:00.000Z',
					end_date_time: '2024-12-08T06:00:00.000Z',
					estimated_date_time: null,
					estimated_service_time: null,
					open_os_date_time: '2024-12-04T18:00:00.000Z',
					key: '0812202406000012887',
					expiration_timestamp: '2024-12-04T21:15:00.000Z',
					expired_url_redirect: '/servicos',
				},
				options: [],
				combo: [],
				analytics: {
					gtm_anonymous_id: null,
					user_id: null,
					client_id_bcp: 82624114,
					measurement_session_id: null,
				},
				broker: {
					link_id: '1b2bc46f-5428-4073-aa43-709624594e48',
					susep: 'TST03J',
					name: 'TESTE HUB',
					phone: '11923932393',
					email: 'teste@teste.com.br',
				},
				link_broker_origin: true,
			},
		},
	}
}

exports.PAYLOAD_PROPOSALDATA_WITH_GTMANONYMOUSID_CLIENTID_USERID_AND_MEASUREMENTSESSIONID_RESPONSE =
	() => {
		return {
			proposal: {
				scope: 'porto_service',
				porto_service: {
					category: 'encanador',
					lead_identifier: '1739915904443',
					quotation_token: 'tokenCommerceQuotationGeneration',
					speciality_code: '437',
					origin_code: '9',
					companyCode: '95',
					sourceSystemCode: '36',
					coupon: 'DESCHUB25',
					problem: '586',
					subject: undefined,
					person: {
						document_code: '33207922880',
						name: 'Fulano de Tal',
						social_name: 'Fulane de Tal',
						email: 'teste@example.com',
						phone: '19981458065',
					},
					address: {
						zip_code: '01310100',
						streetType: 'Rua',
						street: 'Avenida Paulista',
						number: '982',
						additional_info: 'Apto 30',
						neighborhood: 'Bela Vista',
						city: 'São Paulo',
						state: 'SP',
						latitude: -23.514836,
						longitude: -46.3746187,
					},
					scheduling: {
						type: 'agendamento-programado',
						start_date_time: '2024-12-08T06:00:00.000Z',
						end_date_time: '2024-12-08T06:00:00.000Z',
						estimated_date_time: null,
						estimated_service_time: null,
						open_os_date_time: '2024-12-04T18:00:00.000Z',
						key: '0812202406000012887',
						expiration_timestamp: '2024-12-04T21:15:00.000Z',
						expired_url_redirect: '/servicos',
					},
					options: [],
					combo: [],
					analytics: {
						gtm_anonymous_id: '1699836643.1783702533',
						user_id: '7c1e9f4a2b6d8c0e5f3a1b9d4c2e7f6a',
						client_id_bcp: 82624114,
						measurement_session_id: 'GS1.1.1687455540.12.1.1687455600.0.0.0',
					},
					broker: {
						link_id: '1b2bc46f-5428-4073-aa43-709624594e48',
						susep: 'TST03J',
						name: 'TESTE HUB',
						phone: '11923932393',
						email: 'teste@teste.com.br',
					},
					link_broker_origin: true,
				},
			},
		}
	}

exports.PAYLOAD_PROPOSALDATA_WITH_GTMANONYMOUSID_USERID_AND_MEASUREMENTSESSIONID_RESPONSE =
	() => {
		return {
			proposal: {
				scope: 'porto_service',
				porto_service: {
					category: 'encanador',
					lead_identifier: '1739915904443',
					quotation_token: 'tokenCommerceQuotationGeneration',
					speciality_code: '437',
					origin_code: '9',
					companyCode: '95',
					sourceSystemCode: '36',
					coupon: 'DESCHUB25',
					problem: '586',
					subject: undefined,
					person: {
						document_code: '33207922880',
						name: 'Fulano de Tal',
						social_name: 'Fulane de Tal',
						email: 'teste@example.com',
						phone: '19981458065',
					},
					address: {
						zip_code: '01310100',
						streetType: 'Rua',
						street: 'Avenida Paulista',
						number: '982',
						additional_info: 'Apto 30',
						neighborhood: 'Bela Vista',
						city: 'São Paulo',
						state: 'SP',
						latitude: -23.514836,
						longitude: -46.3746187,
					},
					scheduling: {
						type: 'agendamento-programado',
						start_date_time: '2024-12-08T06:00:00.000Z',
						end_date_time: '2024-12-08T06:00:00.000Z',
						estimated_date_time: null,
						estimated_service_time: null,
						open_os_date_time: '2024-12-04T18:00:00.000Z',
						key: '0812202406000012887',
						expiration_timestamp: '2024-12-04T21:15:00.000Z',
						expired_url_redirect: '/servicos',
					},
					options: [],
					combo: [],
					analytics: {
						gtm_anonymous_id: '1699836643.1783702533',
						user_id: '7c1e9f4a2b6d8c0e5f3a1b9d4c2e7f6a',
						client_id_bcp: 82624114,
						measurement_session_id: 'GS1.1.1687455540.12.1.1687455600.0.0.0',
					},
					broker: {
						link_id: '1b2bc46f-5428-4073-aa43-709624594e48',
						susep: 'TST03J',
						name: 'TESTE HUB',
						phone: '11923932393',
						email: 'teste@teste.com.br',
					},
					link_broker_origin: true,
				},
			},
		}
	}

exports.PAYLOAD_PROPOSALDATA_WITH_GTMANONYMOUSID_AND_USERID_RESPONSE = () => {
	return {
		proposal: {
			scope: 'porto_service',
			porto_service: {
				category: 'encanador',
				lead_identifier: '1739915904443',
				quotation_token: 'tokenCommerceQuotationGeneration',
				speciality_code: '437',
				origin_code: '9',
				companyCode: '95',
				sourceSystemCode: '36',
				coupon: 'DESCHUB25',
				problem: '586',
				subject: undefined,
				person: {
					document_code: '33207922880',
					name: 'Fulano de Tal',
					social_name: 'Fulane de Tal',
					email: 'teste@example.com',
					phone: '19981458065',
				},
				address: {
					zip_code: '01310100',
					streetType: 'Rua',
					street: 'Avenida Paulista',
					number: '982',
					additional_info: 'Apto 30',
					neighborhood: 'Bela Vista',
					city: 'São Paulo',
					state: 'SP',
					latitude: -23.514836,
					longitude: -46.3746187,
				},
				scheduling: {
					type: 'agendamento-programado',
					start_date_time: '2024-12-08T06:00:00.000Z',
					end_date_time: '2024-12-08T06:00:00.000Z',
					estimated_date_time: null,
					estimated_service_time: null,
					open_os_date_time: '2024-12-04T18:00:00.000Z',
					key: '0812202406000012887',
					expiration_timestamp: '2024-12-04T21:15:00.000Z',
					expired_url_redirect: '/servicos',
				},
				options: [],
				combo: [],
				analytics: {
					gtm_anonymous_id: '1699836643.1783702533',
					user_id: '7c1e9f4a2b6d8c0e5f3a1b9d4c2e7f6a',
					client_id_bcp: 82624114,
					measurement_session_id: null,
				},
				broker: {
					link_id: '1b2bc46f-5428-4073-aa43-709624594e48',
					susep: 'TST03J',
					name: 'TESTE HUB',
					phone: '11923932393',
					email: 'teste@teste.com.br',
				},
				link_broker_origin: true,
			},
		},
	}
}

exports.PAYLOAD_PROPOSALDATA_WITH_CLIENTIDBCP_RESPONSE = () => {
	return {
		proposal: {
			scope: 'porto_service',
			porto_service: {
				category: 'encanador',
				lead_identifier: '1739915904443',
				quotation_token: 'tokenCommerceQuotationGeneration',
				speciality_code: '437',
				origin_code: '9',
				companyCode: '95',
				sourceSystemCode: '36',
				coupon: 'DESCHUB25',
				problem: '586',
				subject: undefined,
				person: {
					document_code: '33207922880',
					name: 'Fulano de Tal',
					social_name: 'Fulane de Tal',
					email: 'teste@example.com',
					phone: '19981458065',
				},
				address: {
					zip_code: '01310100',
					streetType: 'Rua',
					street: 'Avenida Paulista',
					number: '982',
					additional_info: 'Apto 30',
					neighborhood: 'Bela Vista',
					city: 'São Paulo',
					state: 'SP',
					latitude: -23.514836,
					longitude: -46.3746187,
				},
				scheduling: {
					type: 'agendamento-programado',
					start_date_time: '2024-12-08T06:00:00.000Z',
					end_date_time: '2024-12-08T06:00:00.000Z',
					estimated_date_time: null,
					estimated_service_time: null,
					open_os_date_time: '2024-12-04T18:00:00.000Z',
					key: '0812202406000012887',
					expiration_timestamp: '2024-12-04T21:15:00.000Z',
					expired_url_redirect: '/servicos',
				},
				options: [],
				combo: [],
				analytics: {
					gtm_anonymous_id: null,
					user_id: null,
					client_id_bcp: 82624114,
					measurement_session_id: null,
				},
				broker: {
					link_id: '1b2bc46f-5428-4073-aa43-709624594e48',
					susep: 'TST03J',
					name: 'TESTE HUB',
					phone: '11923932393',
					email: 'teste@teste.com.br',
				},
				link_broker_origin: true,
			},
		},
	}
}

exports.PAYLOAD_PROPOSALDATA_WITH_LEAD_BROKERDATA_RESPONSE = () => {
	return {
		proposal: {
			scope: 'porto_service',
			porto_service: {
				category: 'encanador',
				lead_identifier: '1739915904443',
				quotation_token: 'tokenCommerceQuotationGeneration',
				speciality_code: '437',
				origin_code: '9',
				companyCode: '95',
				sourceSystemCode: '36',
				coupon: 'DESCHUB25',
				problem: '586',
				subject: undefined,
				person: {
					document_code: '33207922880',
					name: 'Fulano de Tal',
					social_name: 'Fulane de Tal',
					email: 'teste@example.com',
					phone: '19981458065',
				},
				address: {
					zip_code: '01310100',
					streetType: 'Rua',
					street: 'Avenida Paulista',
					number: '982',
					additional_info: 'Apto 30',
					neighborhood: 'Bela Vista',
					city: 'São Paulo',
					state: 'SP',
					latitude: -23.514836,
					longitude: -46.3746187,
				},
				scheduling: {
					type: 'agendamento-programado',
					start_date_time: '2024-12-08T06:00:00.000Z',
					end_date_time: '2024-12-08T06:00:00.000Z',
					estimated_date_time: null,
					estimated_service_time: null,
					open_os_date_time: '2024-12-04T18:00:00.000Z',
					key: '0812202406000012887',
					expiration_timestamp: '2024-12-04T21:15:00.000Z',
					expired_url_redirect: '/servicos',
				},
				options: [],
				combo: [],
				analytics: {
					gtm_anonymous_id: null,
					user_id: null,
					client_id_bcp: 82624114,
					measurement_session_id: null,
				},
				broker: {
					link_id: '1b2bc46f-5428-4073-aa43-709624594e48',
					susep: 'CMERRJ',
					name: 'Corretor da Silva',
					phone: '(XX)XX-XXXXXXXX',
					email: 'corretor@email.com',
				},
				link_broker_origin: true,
			},
		},
	}
}

exports.PAYLOAD_PROPOSALDATA_WITHOUT_BROKERDATA_RESPONSE = () => {
	return {
		proposal: {
			scope: 'porto_service',
			porto_service: {
				category: 'encanador',
				lead_identifier: '1739915904443',
				quotation_token: 'tokenCommerceQuotationGeneration',
				speciality_code: '437',
				origin_code: '9',
				companyCode: '95',
				sourceSystemCode: '36',
				coupon: 'DESCHUB25',
				problem: '586',
				subject: undefined,
				person: {
					document_code: '33207922880',
					name: 'Fulano de Tal',
					social_name: 'Fulane de Tal',
					email: 'teste@example.com',
					phone: '19981458065',
				},
				address: {
					zip_code: '01310100',
					streetType: 'Rua',
					street: 'Avenida Paulista',
					number: '982',
					additional_info: 'Apto 30',
					neighborhood: 'Bela Vista',
					city: 'São Paulo',
					state: 'SP',
					latitude: -23.514836,
					longitude: -46.3746187,
				},
				scheduling: {
					start_date_time: '2024-12-08T06:00:00.000Z',
					end_date_time: '2024-12-08T06:00:00.000Z',
					open_os_date_time: '2024-12-04T18:00:00.000Z',
					key: '0812202406000012887',
					expiration_timestamp: '2024-12-04T21:15:00.000Z',
					expired_url_redirect: '/servicos',
				},
				options: [],
				combo: [],
			},
		},
	}
}

exports.PAYLOAD_PROPOSALDATA_WITH_COMBO_RESPONSE = () => {
	return {
		proposal: {
			scope: 'porto_service',
			porto_service: {
				category: 'conserto-eletrico',
				lead_identifier: '1739915904443',
				quotation_token: 'tokenCommerceQuotationGeneration',
				speciality_code: '437',
				origin_code: '9',
				companyCode: '95',
				sourceSystemCode: '36',
				coupon: 'DESCHUB25',
				problem: '586',
				subject: 'UI1',
				person: {
					document_code: '33207922880',
					name: 'Fulano de Tal',
					social_name: '',
					email: 'teste@example.com',
					phone: '19981458065',
				},
				address: {
					zip_code: '01310100',
					streetType: 'Rua',
					street: 'Avenida Paulista',
					number: '123',
					additional_info: 'Apto 30',
					neighborhood: 'Cidade Antônio Estevão de Carvalho',
					city: 'São Paulo',
					state: 'SP',
					latitude: -23.514836,
					longitude: -46.3746187,
				},
				scheduling: {
					type: 'agendamento-programado',
					start_date_time: '2024-12-08T06:00:00.000Z',
					end_date_time: '2024-12-08T06:00:00.000Z',
					estimated_date_time: null,
					estimated_service_time: null,
					open_os_date_time: '2024-12-04T18:00:00.000Z',
					key: '0812202406000012887',
					expiration_timestamp: '2024-12-04T21:15:00.000Z',
					expired_url_redirect: '/servicos',
				},
				options: [],
				combo: [
					{
						sku: 'EC100-2321',
						quantity: 2,
					},
					{
						sku: 'EC100-2324',
						quantity: 1,
					},
					{
						sku: 'EC100-2326',
						quantity: 2,
					},
				],
				analytics: {
					gtm_anonymous_id: null,
					user_id: null,
					client_id_bcp: 82624114,
					measurement_session_id: null,
				},
				broker: {
					link_id: '1b2bc46f-5428-4073-aa43-709624594e48',
					susep: 'CMERRJ',
					name: 'Corretor da Silva',
					email: 'corretor@email.com',
					phone: '(XX)XX-XXXXXXXX',
				},
				link_broker_origin: true,
			},
		},
	}
}
