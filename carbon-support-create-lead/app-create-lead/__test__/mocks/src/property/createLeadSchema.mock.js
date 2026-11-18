const VALID_INPUT_JUSTREQUIRED_VALUE = {
	address: {
		zipCode: '13013161',
	},
	client: {
		cpf: '33994753813',
		cellPhone: '11222225555',
		email: 'email@dominio.com',
		name: 'Maria Santos',
	},
	idBranch: '27',
	origin: '36',
	reference: 'hub',
}

const VALID_INPUT_VALUE = {
	...VALID_INPUT_JUSTREQUIRED_VALUE,
	client: {
		...VALID_INPUT_JUSTREQUIRED_VALUE.client,
		socialName: 'José Santos',
		residentialPhone: '11222223333',
	},
	address: {
		zipCode: '13013161',
		street: 'Avenida Andrade Neves',
		number: '1000',
		complement: '',
		neighborhood: 'Centro',
		city: 'Campinas',
		state: 'SP',
	},
	idProduct: '111',
	origin: '36',
	reference: 'hub',
	susepCode: '123456AB',
	pmcInfo: 'blablabla',
	idGoogle: '1529945973.1680023402',
	utm_id: '08a42c61-d122-477c-b820-c2102e47eafb',
	utm_source: 'gerador-link-corretor',
	utm_medium: 'whatsapp',
	utm_campaign: 'COL10J',
	utm_content: 'portoservicoconsertodeeletrodomestico',
	marketingOptInFlag: true,
}

const VALID_INPUT_WITH_PESCOD_VALUE = {
	...VALID_INPUT_VALUE,
	pescod: '1234',
}

const VALID_INPUT_WITH_IDLINK_LINKORIGIN_VALUE = {
	...VALID_INPUT_VALUE,
	idLink: '08a42c61-d122-477c-b820-c2102e47eafb',
	linkOrigin: 'WHATSAPP',
}

const VALID_INPUT_WITH_PESCOD_IDLINK_LINKORIGIN_VALUE = {
	...VALID_INPUT_VALUE,
	pescod: '1234',
	idLink: '08a42c61-d122-477c-b820-c2102e47eafb',
	linkOrigin: 'WHATSAPP',
}

const VALID_INPUT_FINANCING_LOANS_VALUE = {
	...VALID_INPUT_VALUE,
	financingLoansRequestedLoanAmountValue: 10000,
	financingLoansInstallmentValue: 500,
	financingLoansProposalRequestNumber: '001080009967',
}

const VALID_INPUT_AUTOMOBILE_VALUE = {
	...VALID_INPUT_VALUE,
	scope: 'auto',
	address: {
		...VALID_INPUT_VALUE.address,
		street: 'Avenida Andrade Neves',
		number: '1000',
		complement: '',
		neighborhood: 'Centro',
		city: 'Campinas',
		state: 'SP',
	},
	productDetails: {
		vehicleBrand: 'string',
		vehicleModel: 'string',
		yearModel: 'string',
	},
	yearManufacture: 'string',
	brandNewCar: 'se o veículo é zero km',
	vehicleCode: 'string',
	plate: 'string',
	chassis: 'string',
	utm_medium: 'cpl',
	utm_campaign: 'GA13874',
	utm_content: 'vs_bike_seguro-bike_hq',
	utm_source: 'google',
}

exports.VALID_INPUT_JUSTREQUIRED = () => {
	return VALID_INPUT_JUSTREQUIRED_VALUE
}

exports.VALID_INPUT = () => {
	return VALID_INPUT_VALUE
}

exports.VALID_INPUT_WITH_PESCOD = () => {
	return VALID_INPUT_WITH_PESCOD_VALUE
}

exports.VALID_INPUT_WITH_IDLINK_LINKORIGIN = () => {
	return VALID_INPUT_WITH_IDLINK_LINKORIGIN_VALUE
}

exports.VALID_INPUT_WITH_PESCOD_IDLINK_LINKORIGIN = () => {
	return VALID_INPUT_WITH_PESCOD_IDLINK_LINKORIGIN_VALUE
}

exports.VALID_INPUT_WITHOUT_UTMS = () => {
	const validInputValueCopy = JSON.parse(JSON.stringify(VALID_INPUT_VALUE))
	const dataUtmKeys = Object.keys(validInputValueCopy).filter((dataKey) =>
		dataKey.toLowerCase().startsWith('utm_')
	)

	dataUtmKeys.forEach((dataUtmKey) => {
		delete validInputValueCopy[`${dataUtmKey}`]
	})

	return validInputValueCopy
}

exports.INVALID_INPUT_MISSING_IDBRANCH = () => {
	const validInputValueCopy = JSON.parse(JSON.stringify(VALID_INPUT_VALUE))
	delete validInputValueCopy.idBranch
	return validInputValueCopy
}

exports.INVALID_INPUT_MISSING_CLIENT = () => {
	const validInputValueCopy = JSON.parse(JSON.stringify(VALID_INPUT_VALUE))
	delete validInputValueCopy.client
	return validInputValueCopy
}

exports.VALID_INPUT_WITHOUT_IDPRODUCT = () => {
	const validInputValueCopy = JSON.parse(JSON.stringify(VALID_INPUT_VALUE))
	delete validInputValueCopy.idProduct
	return validInputValueCopy
}

exports.VALID_INPUT_WITHOUT_IDPRODUCTTYPE = () => {
	const validInputValueCopy = JSON.parse(JSON.stringify(VALID_INPUT_VALUE))
	delete validInputValueCopy.idProductType
	return validInputValueCopy
}

exports.VALID_INPUT_WITHOUT_IDPRODUCT_IDPRODUCTTYPE = () => {
	const validInputValueCopy = JSON.parse(JSON.stringify(VALID_INPUT_VALUE))
	delete validInputValueCopy.idProduct
	delete validInputValueCopy.idProductType
	return validInputValueCopy
}

exports.VALID_INPUT_WITHOUT_SUSEPCODE = () => {
	const validInputValueCopy = JSON.parse(JSON.stringify(VALID_INPUT_VALUE))
	delete validInputValueCopy.susepCode
	return validInputValueCopy
}

exports.VALID_INPUT_AUTOMOBILE = () => {
	return VALID_INPUT_AUTOMOBILE_VALUE
}

exports.VALID_INPUT_FINANCING_LOANS = () => {
	return VALID_INPUT_FINANCING_LOANS_VALUE
}
