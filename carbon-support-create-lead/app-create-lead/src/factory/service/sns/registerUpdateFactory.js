const isValidTelephone = (telephone) => {
	return typeof telephone === 'string' && telephone.trim() !== ''
}

const removePhoneMask = (telephone) => {
	if (!isValidTelephone(telephone)) {
		return undefined
	}

	const cleanedNumber = telephone.replace(/\D/g, '')

	return cleanedNumber.length > 0 ? cleanedNumber : undefined
}

const removeZipCodeMask = (zipCode) => {
	if (typeof zipCode !== 'string' || zipCode.trim() === '') {
		return undefined
	}

	const cleanedZipCode = zipCode.replace(/\D/g, '')

	return cleanedZipCode.length > 0 ? cleanedZipCode : undefined
}

exports.getPayload = (inputRequest) => {
	const payload = {
		codigoPessoa: inputRequest.pescod,
		cpf: inputRequest.client.cpf,
		email: inputRequest.client.email,
		nome: inputRequest.client.name,
		telefone: removePhoneMask(inputRequest.client.cellPhone),
		sessionId: inputRequest.sessionId,
		ipAddress: inputRequest.ipAddress,
		userAgent: inputRequest.userAgent,
	}

	if (inputRequest.client.socialName) {
		payload.nomeSocial = inputRequest.client.socialName
	}

	if (
		inputRequest.marketingOptInFlag !== null &&
		inputRequest.marketingOptInFlag !== undefined
	) {
		payload.marketingOptInFlag = inputRequest.marketingOptInFlag
	}

	if (inputRequest.address?.street) {
		payload.enderecoRua = inputRequest.address?.street
	}

	if (inputRequest.address?.number) {
		payload.enderecoNumero = inputRequest.address?.number
	}

	if (inputRequest.address?.neighborhood) {
		payload.enderecoBairro = inputRequest.address?.neighborhood
	}

	if (inputRequest.address?.complement) {
		payload.enderecoComplemento = inputRequest.address?.complement
	}

	const zipCode = removeZipCodeMask(inputRequest.address?.zipCode)
	if (zipCode) {
		payload.enderecoCodigoPostal = removeZipCodeMask(
			inputRequest.address?.zipCode
		)
	}

	if (inputRequest.address?.city) {
		payload.enderecoCidade = inputRequest.address?.city
	}

	if (inputRequest.address?.state) {
		payload.enderecoEstado = inputRequest.address?.state
	}

	if (inputRequest.idBranch) {
		payload.product = inputRequest.idBranch
	}

	return payload
}
