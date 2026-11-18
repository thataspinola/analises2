const MOCKS = require('../../../../../index.mock')

exports.CREATELEADAPI_REQUEST_PAYLOAD_INPUT_DATA = () => {
	return MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
}

exports.CREATELEADAPI_REQUEST_PAYLOAD_RETURN = () => {
	return {
		scope: 'petlove',
		client: {
			cpf: '33207922880',
			name: 'João Silva',
			phone: '19981458065',
			email: 'joao.silva@example.com',
		},
		address: {
			zipCode: '01310100',
			street: 'Avenida Paulista',
			number: '982',
			complement: 'Apto 30',
			city: 'São Paulo',
			state: 'SP',
			neighborhood: 'Jardim Bela Vista',
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
		idBranch: '87',
		idProduct: '23',
		pmcInfo: 'Cachorro',
		idGoogle: '',
		susepCode: 'CM056J',
		idLink: '9c60e40a-85d3-44fc-b71a-730c844a9f1f',
		linkOrigin: 'OTHERS',
	}
}
