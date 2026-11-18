exports.makeregisterCompletePayload = (data) => {
	return {
		codigoPessoa: null,
		codigoPessoaBcp: null,
		codigoSusepCongenere: null,
		dataFalecimentoPessoaFisica: null,
		dataNascimento: null,
		cpf: data.client.cpf,
		email: data.client.email,
		localidadeNascimento: null,
		nome: data.client.name,
		nomeSocial: data.client.socialName || '',
		paisDomicilio: 'Brasil',
		papeisPessoa: null,
		sexo: null,
		telefone: removePhoneMask(data.client.cellPhone, FULL_NUMBER_TYPE),
		tipoPessoa: '1',
		tipoSituacaoPessoa: '1',
		marketingOptInFlag: data.marketingOptInFlag,
		enderecoRua: data.address?.street,
		enderecoNumero: data.address?.number,
		enderecoBairro: data.address?.neighborhood,
		enderecoComplemento: data.address?.complement,
		enderecoCodigoPostal: removeZipCodeMask(data.address?.zipCode),
		enderecoCidade: data.address?.city,
		enderecoEstado: data.address?.state,
		sessionId: data.sessionId,
		ipAddress: data.ipAddress,
		userAgent: data.userAgent,
		product: data.idBranch,
		productName: null,
	}
}

const DDD_TYPE = 'ddd_only'
const NUMBER_TYPE = 'number_only'
const FULL_NUMBER_TYPE = 'full_number'
const DDD_LENGTH = 2

exports.makeCreateLeadPayload = (data) => {
	const dddCelular = removePhoneMask(data.client.cellPhone, DDD_TYPE)
	const telCelular = removePhoneMask(data.client.cellPhone, NUMBER_TYPE)
	const dddResidencial = removePhoneMask(data.client.residentialPhone, DDD_TYPE)
	const telResidencial = removePhoneMask(
		data.client.residentialPhone,
		NUMBER_TYPE
	)
	const cep = removeZipCodeMask(data.address?.zipCode)

	const payload = {
		cpf: data.client.cpf,
		origem: data.origin,
		nome: data.client.name,
		nome_social: data.client.socialName || '',
		email: data.client.email,
		ddd_celular: dddCelular,
		tel_celular: telCelular,
		logradouro: data.address?.street,
		numero: data.address?.number,
		complemento: data.address?.complement,
		bairro: data.address?.neighborhood,
		cidade: data.address?.city,
		uf: data.address?.state,
		referencia: data.reference || 'hub',
		id_ramo: data.idBranch,
		susep_origem_LP: data.susepCode,
		codigo_vdo: data.vdoCode,
		pmc_observacoes: data.pmcInfo,
		id_google: data.idGoogle,
		id_produto: data.idProduct,
		lgpd: {
			data_aceite: new Date().toISOString(),
			aceite: 'true',
			pescod: data.pescod,
			compartilhamento: 'true',
			consentimento: 'true',
			marketing: data.marketingOptInFlag,
			channel: 'portal do cliente',
			domain: 'http://portoseguro.com.br',
			environmentType: 'Site',
			managementArea: 'portocom',
			nameArea: 'portal cliente',
			vertical: 'Institucional',
		},
		detalhes_produto: {
			marca_veiculo: data.productDetails?.vehicleBrand,
			modelo_veiculo: data.productDetails?.vehicleModel,
			ano_modelo: data.productDetails?.yearModel,
		},
		ano_fabricacao: data.yearManufacture,
		zero_km: data.brandNewCar,
		cod_veiculo: data.vehicleCode,
		placa: data.plate,
		chassi: data.chassis,
		id_tipo_produto: data.idProductType,
		id_link: data?.idLink,
		origem_link: data?.linkOrigin,
	}

	if (dddResidencial) {
		payload.ddd_residencial = dddResidencial
	}
	if (telResidencial) {
		payload.tel_residencial = telResidencial
	}
	if (cep) {
		payload.cep = cep
	}

	if (data.utmSource) {
		//Needed to avoid legacy calls errors
		payload['utm_source'] = data.utmSource
	}
	if (data.utmMedium) {
		//Needed to avoid legacy calls errors
		payload['utm_medium'] = data.utmMedium
	}
	if (data.utmContent) {
		//Needed to avoid legacy calls errors
		payload['utm_content'] = data.utmContent
	}
	if (data.utmCampaign) {
		payload['utm_campaign '] = data.utmCampaign
	}

	const dataUtmKeys = Object.keys(data).filter((dataKey) =>
		dataKey.toLowerCase().startsWith('utm_')
	)

	dataUtmKeys.forEach((dataUtmKey) => {
		payload[`${dataUtmKey}`] = data[`${dataUtmKey}`]
	})

	if (data.financingLoansRequestedLoanAmountValue) {
		payload.cnsc_valor_total_credito_desejado =
			data.financingLoansRequestedLoanAmountValue
	}
	if (data.financingLoansInstallmentValue) {
		payload.cnsc_valor_parcela = data.financingLoansInstallmentValue
	}
	if (data.financingLoansProposalRequestNumber) {
		payload.numero_proposta = data.financingLoansProposalRequestNumber
	}

	return payload
}

function removePhoneMask(telephone, type) {
	if (!isValidTelephone(telephone)) {
		return undefined
	}

	const cleanedNumber = telephone.replace(/\D/g, '')

	let typeCleanedNumber

	if (type === FULL_NUMBER_TYPE) {
		typeCleanedNumber = cleanedNumber
	} else if (type === DDD_TYPE) {
		typeCleanedNumber = cleanedNumber.substring(0, DDD_LENGTH)
	} else {
		typeCleanedNumber = cleanedNumber.substring(DDD_LENGTH)
	}

	return typeCleanedNumber.length > 0 ? typeCleanedNumber : undefined
}

function isValidTelephone(telephone) {
	return typeof telephone === 'string' && telephone.trim() !== ''
}

function removeZipCodeMask(zipCode) {
	if (typeof zipCode !== 'string' || zipCode.trim() === '') {
		return undefined
	}

	const cleanedZipCode = zipCode.replace(/\D/g, '')

	return cleanedZipCode.length > 0 ? cleanedZipCode : undefined
}
