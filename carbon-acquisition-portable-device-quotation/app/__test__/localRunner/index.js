const { handler } = require('../../')

const mockedLocalDataCamera = {
	body: JSON.stringify({
		portableDevice: {
			client: {
				cpf: '46092879000',
				name: 'Maria Santos',
				socialName: 'Maria Test',
				phone: '83981495349',
				email: 'email@dominio.com',
				zipCode: '02460-030',
			},
			productDetails: {
				offerCode: 5221,
				deviceTypeCode: 33,
				deviceModel: 'Câmera Canon PowerShot SX70 HS',
				brandCode: 201,
				acquisitionDate: '12/10/2024',
				acquisitionValue: 2500.0,
				rentedDevice: false,
			},
			marketingOptInFlag: false,
			sessionId: '202493010587755556506-6T4XUGKR',
			userAgent:
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
			ipAddress: '192.168.1.1',
			coupon: 'LANCAMENTO10',
		},
	}),
}
const mockedLocalDataCameraLinkCorretor = {
	body: JSON.stringify({
		portableDevice: {
			client: {
				cpf: '46092879000',
				name: 'Maria Santos',
				socialName: 'Maria Test',
				phone: '83981495349',
				email: 'email@dominio.com',
				zipCode: '02460-030',
			},
			productDetails: {
				offerCode: 5221,
				deviceTypeCode: 33,
				deviceModel: 'Câmera Canon PowerShot SX70 HS',
				brandCode: 201,
				acquisitionDate: '12/10/2024',
				acquisitionValue: 2500.0,
				rentedDevice: false,
			},
			marketingOptInFlag: false,
			sessionId: '202493010587755556506-6T4XUGKR',
			userAgent:
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
			ipAddress: '192.168.1.1',
			coupon: 'EP11',
			affiliate: {
				susepCode: 'COL10J',
				affiliateId: 'c992b87a-a622-408e-b632-fc486127f7d9',
				linkOrigin: 'OTHERS',
				email: 'testehub@hub.com',
				phone: '11999999999',
				name: 'Teste HUB - Não alterar',
			},
		},
	}),
}
const mockedLocalDataNotebook = {
	body: JSON.stringify({
		portableDevice: {
			client: {
				cpf: '46092879000',
				name: 'Maria Santos',
				socialName: 'Maria Test',
				phone: '83981495349',
				email: 'email@dominio.com',
				zipCode: '02460-030',
			},
			productDetails: {
				offerCode: 5220,
				deviceTypeCode: 26,
				deviceModel: 'Notebook Acer Aspire 15 555Q',
				brandCode: 15, //ACER
				acquisitionDate: '12/10/2021',
				acquisitionValue: 2600.0,
				rentedDevice: false,
			},
			marketingOptInFlag: false,
			sessionId: '202493010587755556506-6T4XUGKR',
			userAgent:
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
			ipAddress: '192.168.1.1',
			coupon: 'LANCAMENTO10',
		},
	}),
}

async function process() {
	try {
		const response = await handler(mockedLocalDataCameraLinkCorretor)
		console.log('Sucesso:', response)
	} catch (error) {
		console.log('Erro:', error)
	}
}

process()
