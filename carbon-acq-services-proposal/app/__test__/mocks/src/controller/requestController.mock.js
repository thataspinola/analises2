const MOCKS = require('../../index.mock')

const VALID_PARSEDJSON_INPUT_VALUE = {
	scope: 'porto_service',
	serviceProvision: {
		products: [
			{
				type: 'variant',
				id: 2303,
				partnerId: 110,
				sku: 'DI001',
				productQuantity: 1,
				categories: {
					category: 'Encanador',
				},
			},
		],
		serviceOrder: {
			requester: {
				name: 'Fulano de Tal',
				socialName: 'Fulane de Tal',
				email: 'teste@example.com',
				documentNumber: '33207922880',
				cellphone: '19981458065',
			},
			serviceAddresses: [
				{
					type: 'origem',
					city: 'São Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista',
					additionalInfo: 'Apto 30',
					street: 'Avenida Paulista',
					latitude: -23.514836,
					streetNumber: '982',
					longitude: -46.3746187,
				},
			],
		},
		coupon: 'DESCHUB25',
		partnerProductId: '221',
		schedule: {
			scheduleType: 'agendamento-programado',
			serviceDateTime: '02/11/2024 12:00',
			specialtyCode: '437',
			originCode: '9',
			problem: '586',
		},
	},
	marketingOptInFlag: true,
	sessionId: '202493010587755556506-6T4XUGKR',
	userAgent:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
	ipAddress: '192.168.1.1',
	susepCode: 'TST03J',
	affiliateId: '9c60e40a-85d3-44fc-b71a-730c844a9f1f',
	linkOrigin: 'OTHERS',
	brokerName: 'TESTE HUB',
	brokerPhone: '11923932393',
	brokerEmail: 'teste@teste.com.br',
	linkBrokerOrigin: true,
	cartCommerceId: '',
	customerCommerceToken: '',
	rgwToken:
		'AJKvS9WeONmWKEwjG0--HdpzMq0yAVNL8KMxbb44QtbcxMhSx_NUud5b8PLUBFehAIxOBO-iYRIJOknEFkIJmdsofdVJ6uOweQ%3D%3D',
	utm_id: '08a42c61-d122-477c-b820-c2102e47eafb',
	utm_source: 'gerador-link-corretor',
	utm_medium: 'whatsapp',
	utm_campaign: 'COL10J',
	utm_content: 'portoservicoconsertodeeletrodomestico',
}

const VALID_PARSEDJSON_INPUT_WITH_GTMANONYMOUSID_CLIENTID_USERID_AND_MEASUREMENTSESSIONID_VALUE =
	{
		scope: 'porto_service',
		serviceProvision: {
			products: [
				{
					id: 2303,
					partnerId: 110,
					sku: 'DI001',
					productQuantity: 1,
					categories: {
						category: 'Encanador',
					},
				},
			],
			serviceOrder: {
				requester: {
					name: 'Fulano de Tal',
					socialName: 'Fulane de Tal',
					email: 'teste@example.com',
					documentNumber: '33207922880',
					cellphone: '19981458065',
				},
				serviceAddresses: [
					{
						type: 'origem',
						city: 'São Paulo',
						state: 'SP',
						zipCode: '01310100',
						neighborhood: 'Bela Vista',
						additionalInfo: 'Apto 30',
						street: 'Avenida Paulista',
						latitude: -23.514836,
						streetNumber: '982',
						longitude: -46.3746187,
					},
				],
			},
			coupon: 'DESCHUB25',
			partnerProductId: '221',
			schedule: {
				serviceDateTime: '02/11/2024 12:00',
				specialtyCode: '437',
				originCode: '9',
				problem: '586',
			},
		},
		marketingOptInFlag: true,
		sessionId: '202493010587755556506-6T4XUGKR',
		userAgent:
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
		ipAddress: '192.168.1.1',
		susepCode: 'TST03J',
		affiliateId: '9c60e40a-85d3-44fc-b71a-730c844a9f1f',
		linkOrigin: 'OTHERS',
		brokerName: 'TESTE HUB',
		brokerPhone: '11923932393',
		brokerEmail: 'teste@teste.com.br',
		linkBrokerOrigin: true,
		cartCommerceId: '',
		customerCommerceToken: '',
		rgwToken:
			'AJKvS9WeONmWKEwjG0--HdpzMq0yAVNL8KMxbb44QtbcxMhSx_NUud5b8PLUBFehAIxOBO-iYRIJOknEFkIJmdsofdVJ6uOweQ%3D%3D',
		utm_id: '08a42c61-d122-477c-b820-c2102e47eafb',
		utm_source: 'gerador-link-corretor',
		utm_medium: 'whatsapp',
		utm_campaign: 'COL10J',
		utm_content: 'portoservicoconsertodeeletrodomestico',
		gtmAnonymousId: '1699836643.1783702533',
		clientId: 'a4f9c2e7d81b3f6c9075e2a1b8d4c3f0',
		userId: '7c1e9f4a2b6d8c0e5f3a1b9d4c2e7f6a',
		measurementSessionId: 'GS1.1.1687455540.12.1.1687455600.0.0.0',
	}

const VALID_PARSEDJSON_INPUT_WITH_GTMANONYMOUSID_USERID_AND_MEASUREMENTSESSIONID_VALUE =
	{
		scope: 'porto_service',
		serviceProvision: {
			products: [
				{
					id: 2303,
					partnerId: 110,
					sku: 'DI001',
					productQuantity: 1,
					categories: {
						category: 'Encanador',
					},
				},
			],
			serviceOrder: {
				requester: {
					name: 'Fulano de Tal',
					socialName: 'Fulane de Tal',
					email: 'teste@example.com',
					documentNumber: '33207922880',
					cellphone: '19981458065',
				},
				serviceAddresses: [
					{
						city: 'São Paulo',
						state: 'SP',
						zipCode: '01310100',
						neighborhood: 'Bela Vista',
						additionalInfo: 'Apto 30',
						street: 'Avenida Paulista',
						latitude: -23.514836,
						streetNumber: '982',
						longitude: -46.3746187,
					},
				],
			},
			coupon: 'DESCHUB25',
			partnerProductId: '221',
			schedule: {
				serviceDateTime: '02/11/2024 12:00',
				specialtyCode: '437',
				originCode: '9',
				problem: '586',
			},
		},
		marketingOptInFlag: true,
		sessionId: '202493010587755556506-6T4XUGKR',
		userAgent:
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
		ipAddress: '192.168.1.1',
		susepCode: 'TST03J',
		affiliateId: '9c60e40a-85d3-44fc-b71a-730c844a9f1f',
		linkOrigin: 'OTHERS',
		brokerName: 'TESTE HUB',
		brokerPhone: '11923932393',
		brokerEmail: 'teste@teste.com.br',
		linkBrokerOrigin: true,
		cartCommerceId: '',
		customerCommerceToken: '',
		rgwToken:
			'AJKvS9WeONmWKEwjG0--HdpzMq0yAVNL8KMxbb44QtbcxMhSx_NUud5b8PLUBFehAIxOBO-iYRIJOknEFkIJmdsofdVJ6uOweQ%3D%3D',
		utm_id: '08a42c61-d122-477c-b820-c2102e47eafb',
		utm_source: 'gerador-link-corretor',
		utm_medium: 'whatsapp',
		utm_campaign: 'COL10J',
		utm_content: 'portoservicoconsertodeeletrodomestico',
		gtmAnonymousId: '1699836643.1783702533',
		userId: '7c1e9f4a2b6d8c0e5f3a1b9d4c2e7f6a',
		measurementSessionId: 'GS1.1.1687455540.12.1.1687455600.0.0.0',
	}

const VALID_PARSEDJSON_INPUT_WITH_GTMANONYMOUSID_AND_USERID_VALUE = {
	scope: 'porto_service',
	serviceProvision: {
		products: [
			{
				id: 2303,
				partnerId: 110,
				sku: 'DI001',
				productQuantity: 1,
				categories: {
					category: 'Encanador',
				},
			},
		],
		serviceOrder: {
			requester: {
				name: 'Fulano de Tal',
				socialName: 'Fulane de Tal',
				email: 'teste@example.com',
				documentNumber: '33207922880',
				cellphone: '19981458065',
			},
			serviceAddresses: [
				{
					type: 'origem',
					city: 'São Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista',
					additionalInfo: 'Apto 30',
					street: 'Avenida Paulista',
					latitude: -23.514836,
					streetNumber: '982',
					longitude: -46.3746187,
				},
			],
		},
		coupon: 'DESCHUB25',
		partnerProductId: '221',
		schedule: {
			serviceDateTime: '02/11/2024 12:00',
			specialtyCode: '437',
			originCode: '9',
			problem: '586',
		},
	},
	marketingOptInFlag: true,
	sessionId: '202493010587755556506-6T4XUGKR',
	userAgent:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
	ipAddress: '192.168.1.1',
	susepCode: 'TST03J',
	affiliateId: '9c60e40a-85d3-44fc-b71a-730c844a9f1f',
	linkOrigin: 'OTHERS',
	brokerName: 'TESTE HUB',
	brokerPhone: '11923932393',
	brokerEmail: 'teste@teste.com.br',
	linkBrokerOrigin: true,
	cartCommerceId: '',
	customerCommerceToken: '',
	rgwToken:
		'AJKvS9WeONmWKEwjG0--HdpzMq0yAVNL8KMxbb44QtbcxMhSx_NUud5b8PLUBFehAIxOBO-iYRIJOknEFkIJmdsofdVJ6uOweQ%3D%3D',
	utm_id: '08a42c61-d122-477c-b820-c2102e47eafb',
	utm_source: 'gerador-link-corretor',
	utm_medium: 'whatsapp',
	utm_campaign: 'COL10J',
	utm_content: 'portoservicoconsertodeeletrodomestico',
	gtmAnonymousId: '1699836643.1783702533',
	userId: '7c1e9f4a2b6d8c0e5f3a1b9d4c2e7f6a',
}

const VALID_PARSEDJSON_INPUT_WITH_CLIENTID_VALUE = {
	scope: 'porto_service',
	serviceProvision: {
		products: [
			{
				id: 2303,
				partnerId: 110,
				sku: 'DI001',
				productQuantity: 1,
				categories: {
					category: 'Encanador',
				},
			},
		],
		serviceOrder: {
			requester: {
				name: 'Fulano de Tal',
				socialName: 'Fulane de Tal',
				email: 'teste@example.com',
				documentNumber: '33207922880',
				cellphone: '19981458065',
			},
			serviceAddresses: [
				{
					type: 'origem',
					city: 'São Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista',
					additionalInfo: 'Apto 30',
					street: 'Avenida Paulista',
					latitude: -23.514836,
					streetNumber: '982',
					longitude: -46.3746187,
				},
			],
		},
		coupon: 'DESCHUB25',
		partnerProductId: '221',
		schedule: {
			serviceDateTime: '02/11/2024 12:00',
			specialtyCode: '437',
			originCode: '9',
			problem: '586',
		},
	},
	marketingOptInFlag: true,
	sessionId: '202493010587755556506-6T4XUGKR',
	userAgent:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
	ipAddress: '192.168.1.1',
	susepCode: 'TST03J',
	affiliateId: '9c60e40a-85d3-44fc-b71a-730c844a9f1f',
	linkOrigin: 'OTHERS',
	brokerName: 'TESTE HUB',
	brokerPhone: '11923932393',
	brokerEmail: 'teste@teste.com.br',
	linkBrokerOrigin: true,
	cartCommerceId: '',
	customerCommerceToken: '',
	rgwToken:
		'AJKvS9WeONmWKEwjG0--HdpzMq0yAVNL8KMxbb44QtbcxMhSx_NUud5b8PLUBFehAIxOBO-iYRIJOknEFkIJmdsofdVJ6uOweQ%3D%3D',
	utm_id: '08a42c61-d122-477c-b820-c2102e47eafb',
	utm_source: 'gerador-link-corretor',
	utm_medium: 'whatsapp',
	utm_campaign: 'COL10J',
	utm_content: 'portoservicoconsertodeeletrodomestico',
	clientId: 'a4f9c2e7d81b3f6c9075e2a1b8d4c3f0',
}

const VALID_PARSEDJSON_INPUT_WITH_COMBO_VALUE = {
	scope: 'porto_service',
	serviceProvision: {
		products: [
			{
				type: 'multiple',
				id: 2306,
				sku: 'EC100',
				subject: 'UI1',
				partnerId: 110,
				productQuantity: 1,
				categories: {
					category: 'Conserto Elétrico',
				},
				items: [
					{
						id: 2324,
						description: 'CONSERTO ELETRICO (CAMPAINHA)',
						label: 'CONSERTO ELETRICO (CAMPAINHA)',
						category: 'Conserto',
						subCategory: 'Porto Serviços',
						quantity: 1,
					},
					{
						id: 2326,
						description: 'CONSERTO ELETRICO (SENSOR DE PRESENCA)',
						label: 'CONSERTO ELETRICO (SENSOR DE PRESENCA)',
						category: 'Conserto',
						subCategory: 'Porto Serviços',
						quantity: 1,
					},
					{
						id: 2326,
						description: 'CONSERTO ELETRICO (SENSOR DE PRESENCA)',
						label: 'CONSERTO ELETRICO (SENSOR DE PRESENCA)',
						category: 'Conserto',
						subCategory: 'Porto Serviços',
						quantity: 1,
					},
					{
						id: 2321,
						description: 'CONSERTO ELETRICO (INTERRUPTOR)',
						label: 'CONSERTO ELETRICO (INTERRUPTOR)',
						category: 'Conserto',
						subCategory: 'Porto Serviços',
						quantity: 1,
					},
					{
						id: 2321,
						description: 'CONSERTO ELETRICO (INTERRUPTOR)',
						label: 'CONSERTO ELETRICO (INTERRUPTOR)',
						category: 'Conserto',
						subCategory: 'Porto Serviços',
						quantity: 1,
					},
				],
				comboId: 55,
			},
		],
		serviceOrder: {
			requester: {
				name: 'Fulano de Tal',
				socialName: '',
				email: 'teste@example.com',
				cellphone: '19981458065',
				documentNumber: '33207922880',
			},
			serviceAddresses: [
				{
					type: 'origem',
					city: 'São Paulo',
					state: 'SP',
					zipCode: '01310100',
					additionalInfo: 'Apto 30',
					neighborhood: 'Cidade Antônio Estevão de Carvalho',
					street: 'Avenida Paulista',
					latitude: -23.514836,
					streetNumber: '123',
					longitude: -46.3746187,
				},
			],
		},
		coupon: 'DESCHUB25',
		partnerProductId: '467',
		schedule: {
			scheduleType: 'agendamento-programado',
			serviceDateTime: '02/11/2024 12:00',
			specialtyCode: '437',
			originCode: '9',
			problem: '586',
		},
	},
	marketingOptInFlag: false,
	sessionId: '202493010587755556506-6T4XUGKR',
	userAgent:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
	ipAddress: '100.64.104.147',
	linkBrokerOrigin: true,
}

exports.INVALID_PARSEDJSON_INPUT = () => {
	const INVALID_PARSEDJSON_INPUT_VALUE = {
		...VALID_PARSEDJSON_INPUT_VALUE,
	}
	delete INVALID_PARSEDJSON_INPUT_VALUE.serviceProvision.coupon
	return INVALID_PARSEDJSON_INPUT_VALUE
}

exports.EXCEPTION_SIMULATE_VALID_PARSEDJSON_INPUT = () => {
	const payload = VALID_PARSEDJSON_INPUT_VALUE
	payload.serviceProvision.coupon = 'Except'
	return payload
}

exports.EXCEPTION_SIMULATE_MESSAGE = () => {
	return `Erro recebido da chamada da API: código '500' dados: '{ "message": "Simulação de falha" }'`
}

exports.VALID_PARSEDJSON_INPUT = () => {
	return { ...VALID_PARSEDJSON_INPUT_VALUE }
}

exports.VALID_PARSEDJSON_WITH_GTMANONYMOUSID_CLIENTID_USERID_AND_MEASUREMENTSESSIONID_INPUT =
	() => {
		return {
			...VALID_PARSEDJSON_INPUT_WITH_GTMANONYMOUSID_CLIENTID_USERID_AND_MEASUREMENTSESSIONID_VALUE,
		}
	}

exports.VALID_PARSEDJSON_WITH_GTMANONYMOUSID_USERID_AND_MEASUREMENTSESSIONID_INPUT =
	() => {
		return {
			...VALID_PARSEDJSON_INPUT_WITH_GTMANONYMOUSID_USERID_AND_MEASUREMENTSESSIONID_VALUE,
		}
	}

exports.VALID_PARSEDJSON_WITH_GTMANONYMOUSID_AND_USERID_INPUT = () => {
	return { ...VALID_PARSEDJSON_INPUT_WITH_GTMANONYMOUSID_AND_USERID_VALUE }
}

exports.VALID_PARSEDJSON_WITH_CLIENTID_INPUT = () => {
	return { ...VALID_PARSEDJSON_INPUT_WITH_CLIENTID_VALUE }
}

exports.VALID_PARSEDJSON_WITH_COMBO_INPUT = () => {
	return VALID_PARSEDJSON_INPUT_WITH_COMBO_VALUE
}

exports.INVALID_JSON_INPUT_EXCEPTION_MESSAGE = () => {
	return 'Erro no processamento: Validation'
}

exports.UNEXPECTED_INPUT_VALIDATION_EXCEPTION_MESSAGE = () => {
	return 'Erro no processamento: Unexpected validation error'
}

exports.VALID_RETURN = () => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.CONTROLLER_SUCCESS_RETURN()
}

exports.INTERNALERROR_RETURN = () => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITH_MESSAGE_RETURN()
}

exports.BADREQUEST_RETURN = () => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
}

exports.GENERIC_EXCEPTION_MESSAGE_BEGINNING = (errorMessage) => {
	return `Erro no processamento: ${errorMessage}`
}

exports.API_GATEWAY_TOKEN = () => {
	return {
		impersonalUserToken: 'token',
		ca: 'ca',
	}
}
