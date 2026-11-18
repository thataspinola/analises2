const MOCKS = require('../../../../../index.mock')

exports.PAYLOAD_INPUT_DATA = () => {
	return MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
}

exports.PAYLOAD_RETURN = () => {
	return {
		scope: 'porto_service',
		client: {
			cpf: '33207922880',
			name: 'Fulano de Tal',
			socialName: 'Fulane de Tal',
			cellPhone: '19981458065',
			email: 'teste@example.com',
		},
		address: {
			zipCode: '01310100',
			street: 'Avenida Paulista',
			number: '982',
			complement: 'Apto 30',
			neighborhood: 'Bela Vista',
			city: 'São Paulo',
			state: 'SP',
		},
		marketingOptInFlag: true,
		sessionId: '202493010587755556506-6T4XUGKR',
		ipAddress: '192.168.1.1',
		userAgent:
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
		origin: '35',
		reference: 'hub',
		channel: 'portal do cliente',
		domain: 'http://portoseguro.com.br',
		environmentType: 'Site',
		managementArea: 'portocom',
		nameArea: 'portal cliente',
		vertical: 'Institucional',
		idBranch: '65',
		pmcInfo: '',
		idGoogle: '',
		susepCode: 'TST03J',
		idLink: '9c60e40a-85d3-44fc-b71a-730c844a9f1f',
		linkOrigin: 'OTHERS',
		utm_id: '08a42c61-d122-477c-b820-c2102e47eafb',
		utm_source: 'gerador-link-corretor',
		utm_medium: 'whatsapp',
		utm_campaign: 'COL10J',
		utm_content: 'portoservicoconsertodeeletrodomestico',
	}
}
