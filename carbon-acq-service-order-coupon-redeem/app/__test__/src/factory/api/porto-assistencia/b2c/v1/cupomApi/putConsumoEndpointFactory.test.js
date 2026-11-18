const factory = require('../../../../../../../../src/factory')

describe('getPayload', () => {
	test('should return correct payload when all values are provided', () => {
		const input = {
			carbonTraceId: 'a8c76d54-917c-4692-8152-731969f0bfb7',
			eCommercePlatform: {
				orderNumber: '121321548',
				loggedCPF: '33207922880',
			},
			externalId: '6522334343134',
			transactionId: 'a9aa98ce-cc3c-487c-9425-b11ba109b108',
			itemId: '4329',
			contactEmail: 'bcromo@gmail.com.com.br',
			installments: 1,
			productCode: '82c2862b-7680-4ff2-b6fb-8fb3ad8001b2',
			amount: 25.8,
			leadIdentifier: '1723639908410',
			paymentData: {
				externo: true,
				empresa: '51',
				filial: '0101',
				hash: '',
				proposta: '',
			},
			integrationData: {
				serviceOrder: {
					schedule: {
						startDateTime: '2024-09-27T08:00:00.000-00:00',
						endDateTime: '2024-09-27T10:00:00.000-00:00',
						openOsDateTime: '2024-09-27T14:00:00.000-00:00',
						key: '02092024193000161456',
					},
					siebelIntegrationId: '160820240800009118209',
					serviceId: '2303',
					sku: 'DI001',
					specialtyCode: '1541',
					originCode: '9',
					companyCode: '35',
					sourceSystemCode: '65',
					problem: '1105',
					subject: 'RCS',
					coupon: 'TEST1',
				},
				customer: {
					name: 'BrunoCromo',
					socialName: '',
					email: 'bcromo@gmail.com',
					cellphone: '19981458065',
					documentNumber: '12345678901',
				},
				serviceAddress: {
					city: 'SaoPaulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'BelaVista',
					street: 'AvenidaPaulista',
					streetType: 'Avenida',
					streetNumber: '982',
					latitude: -23.5649224,
					longitude: -46.6519376,
					reference: 'ap30',
					additionalInfo: 'ap40',
				},
				serviceOrderNumber: '1028586-23',
			},
		}
		const expectedOutput = {
			cupom: 'TEST1',
			cpfCnpj: '12345678901',
			numeroOs: '1028586-23',
		}
		expect(
			factory.api.portoAssistencia.b2c.v1.cupomApi.putConsumoEndpointFactory.getPayload(
				input
			)
		).toEqual(expectedOutput)
	})

	test('should return undefined for missing values', () => {
		const input = {
			carbonTraceId: 'a8c76d54-917c-4692-8152-731969f0bfb7',
			eCommercePlatform: {
				orderNumber: '121321548',
				loggedCPF: '33207922880',
			},
			externalId: '6522334343134',
			transactionId: 'a9aa98ce-cc3c-487c-9425-b11ba109b108',
			itemId: '4329',
			contactEmail: 'bcromo@gmail.com.com.br',
			installments: 1,
			productCode: '82c2862b-7680-4ff2-b6fb-8fb3ad8001b2',
			amount: 25.8,
			leadIdentifier: '1723639908410',
			paymentData: {
				externo: true,
				empresa: '51',
				filial: '0101',
				hash: '',
				proposta: '',
			},
			integrationData: {
				serviceOrder: {
					schedule: {
						startDateTime: '2024-09-27T08:00:00.000-00:00',
						endDateTime: '2024-09-27T10:00:00.000-00:00',
						openOsDateTime: '2024-09-27T14:00:00.000-00:00',
						key: '02092024193000161456',
					},
					siebelIntegrationId: '160820240800009118209',
					serviceId: '2303',
					sku: 'DI001',
					specialtyCode: '1541',
					originCode: '9',
					companyCode: '35',
					sourceSystemCode: '65',
					problem: '1105',
					subject: 'RCS',
					coupon: undefined,
				},
				customer: {
					name: 'BrunoCromo',
					socialName: '',
					email: 'bcromo@gmail.com',
					cellphone: '19981458065',
					documentNumber: undefined,
				},
				serviceAddress: {
					city: 'SaoPaulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'BelaVista',
					street: 'AvenidaPaulista',
					streetType: 'Avenida',
					streetNumber: '982',
					latitude: -23.5649224,
					longitude: -46.6519376,
					reference: 'ap30',
					additionalInfo: 'ap40',
				},
				serviceOrderNumber: undefined,
			},
		}
		const expectedOutput = {
			cupom: undefined,
			cpfCnpj: undefined,
			numeroOs: undefined,
		}
		expect(
			factory.api.portoAssistencia.b2c.v1.cupomApi.putConsumoEndpointFactory.getPayload(
				input
			)
		).toEqual(expectedOutput)
	})

	test('should return correct payload when some values are missing', () => {
		const input = {
			carbonTraceId: 'a8c76d54-917c-4692-8152-731969f0bfb7',
			eCommercePlatform: {
				orderNumber: '121321548',
				loggedCPF: '33207922880',
			},
			externalId: '6522334343134',
			transactionId: 'a9aa98ce-cc3c-487c-9425-b11ba109b108',
			itemId: '4329',
			contactEmail: 'bcromo@gmail.com.com.br',
			installments: 1,
			productCode: '82c2862b-7680-4ff2-b6fb-8fb3ad8001b2',
			amount: 25.8,
			leadIdentifier: '1723639908410',
			paymentData: {
				externo: true,
				empresa: '51',
				filial: '0101',
				hash: '',
				proposta: '',
			},
			integrationData: {
				serviceOrder: {
					schedule: {
						startDateTime: '2024-09-27T08:00:00.000-00:00',
						endDateTime: '2024-09-27T10:00:00.000-00:00',
						openOsDateTime: '2024-09-27T14:00:00.000-00:00',
						key: '02092024193000161456',
					},
					siebelIntegrationId: '160820240800009118209',
					serviceId: '2303',
					sku: 'DI001',
					specialtyCode: '1541',
					originCode: '9',
					companyCode: '35',
					sourceSystemCode: '65',
					problem: '1105',
					subject: 'RCS',
					coupon: 'TEST1',
				},
				customer: {
					name: 'BrunoCromo',
					socialName: '',
					email: 'bcromo@gmail.com',
					cellphone: '19981458065',
					documentNumber: undefined,
				},
				serviceAddress: {
					city: 'SaoPaulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'BelaVista',
					street: 'AvenidaPaulista',
					streetType: 'Avenida',
					streetNumber: '982',
					latitude: -23.5649224,
					longitude: -46.6519376,
					reference: 'ap30',
					additionalInfo: 'ap40',
				},
				serviceOrderNumber: '1028586-23',
			},
		}
		const expectedOutput = {
			cupom: 'TEST1',
			cpfCnpj: undefined,
			numeroOs: '1028586-23',
		}
		expect(
			factory.api.portoAssistencia.b2c.v1.cupomApi.putConsumoEndpointFactory.getPayload(
				input
			)
		).toEqual(expectedOutput)
	})

	test('should return correct payload when all values are empty strings', () => {
		const input = {
			carbonTraceId: 'a8c76d54-917c-4692-8152-731969f0bfb7',
			eCommercePlatform: {
				orderNumber: '121321548',
				loggedCPF: '33207922880',
			},
			externalId: '6522334343134',
			transactionId: 'a9aa98ce-cc3c-487c-9425-b11ba109b108',
			itemId: '4329',
			contactEmail: 'bcromo@gmail.com.com.br',
			installments: 1,
			productCode: '82c2862b-7680-4ff2-b6fb-8fb3ad8001b2',
			amount: 25.8,
			leadIdentifier: '1723639908410',
			paymentData: {
				externo: true,
				empresa: '51',
				filial: '0101',
				hash: '',
				proposta: '',
			},
			integrationData: {
				serviceOrder: {
					schedule: {
						startDateTime: '2024-09-27T08:00:00.000-00:00',
						endDateTime: '2024-09-27T10:00:00.000-00:00',
						openOsDateTime: '2024-09-27T14:00:00.000-00:00',
						key: '02092024193000161456',
					},
					siebelIntegrationId: '160820240800009118209',
					serviceId: '2303',
					sku: 'DI001',
					specialtyCode: '1541',
					originCode: '9',
					companyCode: '35',
					sourceSystemCode: '65',
					problem: '1105',
					subject: 'RCS',
					coupon: '',
				},
				customer: {
					name: 'BrunoCromo',
					socialName: '',
					email: 'bcromo@gmail.com',
					cellphone: '19981458065',
					documentNumber: '',
				},
				serviceAddress: {
					city: 'SaoPaulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'BelaVista',
					street: 'AvenidaPaulista',
					streetType: 'Avenida',
					streetNumber: '982',
					latitude: -23.5649224,
					longitude: -46.6519376,
					reference: 'ap30',
					additionalInfo: 'ap40',
				},
				serviceOrderNumber: '',
			},
		}
		const expectedOutput = {
			cupom: '',
			cpfCnpj: '',
			numeroOs: '',
		}
		expect(
			factory.api.portoAssistencia.b2c.v1.cupomApi.putConsumoEndpointFactory.getPayload(
				input
			)
		).toEqual(expectedOutput)
	})
})
