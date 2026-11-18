const { handler } = require('../../')

const mockedLocalData = {
	scope: 'phone',
	cellPhone: {
		client: {
			cpf: '46092879000',
			name: 'Maria Santos',
			socialName: 'Maria',
			cellPhone: '83981495349',
			email: 'email@dominio.com',
			mainUserAgeGroupCode: 1,
		},
		address: {
			zipCode: '02460-030',
		},
		commissionRate: "R$: 20,00",
		externalBudget: '58000000010497',
		origin: 35,
		reference: 'hub',
		channel: 'portal do cliente',
		domain: 'http://portoseguro.brasil',
		environmentType: 'Site',
		managementArea: 'portocom',
		nameArea: 'portal cliente',
		vertical: 'Institucional',
		idBranch: 143,
		pmcInfo: '',
		idGoogle: '',
		utmSource: '',
		utmMedium: '',
		utmContent: '',
		marketingOptInFlag: false,
		sessionId: '20244311346684675844-6T4XUGKR',
		ipAddress: '131.161.97.232',
		userAgent:
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
		channelCode: 35,
		CalculationTypeCode: 2,
		digitalProtectionValue: 2000,
		productDetails: {
			deviceCode: 646,
			deviceTypeCode: 35,
			relevanceCode: 1,
			phoneBrand: 'Apple',
			phoneBrandCode: 94,
			phoneModel: 'iPhone XS',
			phoneModelCode: 2390,
			phoneCapacity: '32GB',
			phoneAge: 1,
			marketValue: '4049.10',
		},
		//coupon: 'TESTEMATRICULA2',
		// coupon: 'INATIVO',
		// coupon: 'INEXISTENTE',
	},
	productLinkScope: null,
	activeSusepOriginLP: true,
	idLead: '121CLKMAW',
	susep: 'COL10J',
	pescod: 81234,
}

async function process() {
	try {
		const response = await handler(mockedLocalData)
		console.log('Sucesso:', response)
	} catch (error) {
		console.log('Erro:', error)
	}
}

process()
