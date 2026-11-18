const { handler } = require('../../')

const mockedLocalData = {
	body: JSON.stringify({
		scope: 'auto',
		productId: '143',
		client: {
			cpf: '58489669074',
			name: 'Maria Santos',
			socialName: 'José Santos',
			cellPhone: '11222225555',
			email: 'email@dominio.com',
		},
		address: {
			zipCode: '13013161',
		},
		idBranch: '27',
		origin: '36',
		reference: 'hub',
		vdoCode: String(Date.now()),
		pmcInfo: 'string - pmc_observacoes',
		marketingOptInFlag: true,
		sessionId: '2023102119547179841726-6T4XUGKR',
		ipAddress: '10.95.174.37',
		userAgent:
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
		susepCode: null,
		idLink: '08a42c61-d122-477c-b820-c2102e47eafb',
		linkOrigin: 'WHATSAPP',
	}),
}

handler(mockedLocalData)
	.then((res) => {
		console.log(JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log(err)
	})
