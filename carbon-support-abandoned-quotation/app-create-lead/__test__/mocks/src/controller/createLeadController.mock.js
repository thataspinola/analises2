const VALID_INPUT_DATA_WITHOUT_OPTIONALS_VALUE = {
	scope: 'auto',
	client: {
		cpf: '33994753813',
		name: 'Maria Santos',
		cellPhone: '11222225555',
		email: 'email@dominio.com',
	},
	address: {
		zipCode: '13013161',
	},
	idBranch: '27',
	idProduct: '111',
	origin: '36',
	reference: 'hub',
}

const VALID_INPUT_DATA_VALUE = {
	...VALID_INPUT_DATA_WITHOUT_OPTIONALS_VALUE,
	client: {
		...VALID_INPUT_DATA_WITHOUT_OPTIONALS_VALUE.client,
		socialName: 'José Santos', //opcional
	},
	address: {
		...VALID_INPUT_DATA_WITHOUT_OPTIONALS_VALUE.address,
		street: 'Avenida Andrade Neves', //opcional
		number: '1000', //opcional
		complement: 'Perto da padaria', //opcional
		neighborhood: 'Centro', //opcional
		city: 'Campinas', //opcional
		state: 'SP', //opcional
	},
	susepCode: 'string susep_origem_LP', //opcional
	pmcInfo: 'string - pmc_observacoes',
	idGoogle: '1529945973.1680023402', //opcional
	marketingOptInFlag: true, //opcional
	productDetails: {
		//opcional
		vehicleBrand: 'string', //opcional
		vehicleModel: 'string', //opcional
		yearModel: 'string', //opcional
	},
	yearManufacture: 'string', //opcional
	brandNewCar: 'se o veículo é zero km', //opcional
	vehicleCode: 'string', //opcional
	plate: 'string', //opcional
	chassis: 'string', //opcional
	idProductType: '7', //opcional
	idLink: '08a42c61-d122-477c-b820-c2102e47eafb', //opcional
	linkOrigin: 'WHATSAPP', //opcional
	skipConsentWhenUpdateExistingBcc: false, //opcional,
	sessionId: '202371115124659341722-6T4XUGKR',
	ipAddress: '131.161.97.234',
	userAgent:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
}

const VALID_INPUT_DATA_WITH_PESCOD_VALUE = {
	...VALID_INPUT_DATA_VALUE,
	pescod: '1234', //opcional
}

const VALID_INPUT_DATA_WITHOUT_OPTIONALS_WITH_PESCOD_VALUE = {
	...VALID_INPUT_DATA_WITHOUT_OPTIONALS_VALUE,
	pescod: '1234', //opcional
}

exports.VALID_INPUT_DATA = () => {
	return VALID_INPUT_DATA_VALUE
}

exports.VALID_INPUT_DATA_WITHOUT_OPTIONALS_WITH_PESCOD = () => {
	return VALID_INPUT_DATA_WITHOUT_OPTIONALS_WITH_PESCOD_VALUE
}

exports.VALID_INPUT_DATA_WITH_PESCOD = () => {
	return VALID_INPUT_DATA_WITH_PESCOD_VALUE
}
