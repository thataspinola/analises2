const CONSTANTS = require('../../../property')
const service = require('../../../service')

exports.makePayload = async (data, leadInformation, couponData) => {
	const inputData = data.portableDevice
	const deviceSubtypeCode =
		CONSTANTS.DEVICE_SUBTYPE_MAPPING[data.portableDevice.productDetails.deviceTypeCode]
	const externalBudgetNumber = await getExternalBudgetNumber(deviceSubtypeCode)
	const operationCode = getOperationCode(leadInformation)
	const deviceAge = CONSTANTS.DEVICE_AGE

	const payload = {
		idOportunidadeMulticanal: leadInformation.idLead,
		numeroExtOrc: externalBudgetNumber,
		codigoCanal: CONSTANTS.CHANNEL_CODE,
		codigoTipoCalculo: CONSTANTS.CALCULATION_TYPE_CODE,
		codigoTipoSeguro: CONSTANTS.INSURANCE_TYPE_CODE,
		codigoOferta: inputData.productDetails.offerCode,
		codigoRamo: getCodigoRamo(
			data.portableDevice.productDetails.deviceTypeCode
		),
		corretor: {
			codigoOperacao: operationCode,
			flagMulticanal: true,
			flagVinculo: true,
			susep: leadInformation.susepCode,
		},
		cupom: couponData
			? {
					codigo: couponData.codigo,
					percentualDesconto: couponData.percentualDesconto,
			  }
			: null,
		proponente: {
			cpf: inputData.client.cpf,
			nomePessoa: service.string.removeAccents(inputData.client.name),
			nomeSocial: inputData.client?.socialName ? 
				service.string.removeAccents(inputData.client.socialName) : undefined,
			telefone: inputData.client.phone,
			email: inputData.client.email,
			codigoPessoa: leadInformation.pescod,
			cep: inputData.client.zipCode,
			tipoTelefone: 1,
		},
		itens: [
			{
				numeroItem: 1,
				codigoEquipamento: deviceSubtypeCode,
				codigoTipoEquipamento: inputData.productDetails.deviceTypeCode,
				codigoFaixaEtariaPrincipalUsuario: CONSTANTS.MAIN_USER_AGE_GROUP_CODE,
				codigoMarca: inputData.productDetails.brandCode,
				codigoRelevancia: CONSTANTS.MAIN_RELEVANCE_CODE,
				equipamentoLocado: inputData.productDetails.rentedDevice,
				idadeAparelho: deviceAge,
				dataAquisicao: inputData.productDetails.acquisitionDate,
				modelo: {
					nomeModelo: inputData.productDetails.deviceModel,
					valorModelo: inputData.productDetails.acquisitionValue,
				},
				pacotes: filterPackages(inputData),
			},
		],
	}

	return payload
}

function filterPackages(inputData) {
	const defaultParticipation = CONSTANTS.DEFAULT_INSURED_PARTICIPATION

	const DEVICE_SUBTYPE = Object.keys(CONSTANTS.DEVICE_SUBTYPE_ENUM).find(
		(key) => CONSTANTS.DEVICE_SUBTYPE_ENUM[key] === inputData.productDetails.deviceTypeCode
	)
	const packagePlans = CONSTANTS.DEVICE_SUBTYPE_PACKAGE[DEVICE_SUBTYPE]

	const packages = packagePlans.map((plan, index) => {
		return {
			codigoPacote: index + 1,
			codigoPlanoCobertura: plan.code,
			coberturas: plan.coverages.map((coverageCode) => ({
				codigoCobertura: coverageCode,
				percentualParticipacaoSegurado: defaultParticipation,
			})),
		}
	})

	return packages
}

function getOperationCode(leadInformation) {
	let operationCode = CONSTANTS.OPERATION_CODE_DEFAULT
	if (leadInformation?.activeSusepOriginLP) {
		if (leadInformation?.susepCode === CONSTANTS.SUSEP_FUNCIONARIO) {
			operationCode = CONSTANTS.OPERATION_CODE_EMPLOYEE
		}
	}
	return operationCode
}

async function getExternalBudgetNumber(deviceSubtypeId) {
	const newSequence =
		await service.dynamoDB.sequence.getPortableDeviceSequence()

	const formattedSequence = newSequence.toString().padStart(9, '0')
	const channelCode = CONSTANTS.CHANNEL_CODE
	const deviceSubtypeCode = deviceSubtypeId

	return `${channelCode}${deviceSubtypeCode}${formattedSequence}`
}

function getCodigoRamo(deviceTypeCode) {
	for (const productId in CONSTANTS.ID_BRANCH_MAPPING) {
		if (CONSTANTS.ID_BRANCH_MAPPING[productId].includes(deviceTypeCode)) {
			return +productId
		}
	}
	return null
}
