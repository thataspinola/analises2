const CONSTANT = require('../../../../property')

exports.getRequestPayload = (inputData) => {
	const petTypeMapping = {
		dog: 'Cachorro',
		cat: 'Gato',
		default: '',
	}
	const petType = inputData.pet.type
		? inputData.pet.type.toLowerCase()
		: 'default'
	const mappedPetType = petTypeMapping[petType] || petTypeMapping['default']
	const utmFields = Object.fromEntries(
		Object.entries(inputData).filter(([key]) => key.startsWith('utm_'))
	)
	const responsePayload = {
		...CONSTANT.CREATE_LEAD_DATA,
		pmcInfo: mappedPetType,

		scope: CONSTANT.SCOPE,
		client: {
			cpf: inputData.user.cpf,
			name: inputData.user.fullName,
			cellPhone: inputData.user.phone,
			email: inputData.user.email,
		},
		address: {
			zipCode: inputData.address.cep,
			street: inputData.address.street,
			number: inputData.address.number,
			complement: inputData.address.complement,
			city: inputData.address.city,
			state: inputData.address.stateCode,
			neighborhood: inputData.address.neighborhood,
		},
		marketingOptInFlag: inputData.user.mktCommunication,
		sessionId: inputData.sessionId,
		ipAddress: inputData.ipAddress,
		userAgent: inputData.userAgent,
		susepCode: inputData.susepCode,
		idLink: inputData.affiliateId,
		linkOrigin: inputData.linkOrigin,
		idGoogle: inputData.idGoogle,
		...utmFields,
	}

	return responsePayload
}
