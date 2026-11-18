const CONSTANTS = require('./../property')
const service = require('./../service')

exports.makePayload = (data, couponData) => {
	const inputData = data.cellPhone

	const payload = {
		idOportunidadeMulticanal: data.idLead, //obter na criação do lead
		numeroExtOrc: inputData.externalBudget || 56123456789, //Enviado pelo commerce
		codigoCanal: inputData.channelCode, //fixo - Enviado pelo commerce
		codigoTipoCalculo: inputData.CalculationTypeCode, //aguardando definição -- Será enviado pelo commerce
		corretor: {
			codigoOperacao: getOperationCode(data),
			flagMulticanal: true, //fixo True
			flagVinculo: true, //fixo True
			susep: data.susep, //Obter na criação do lead
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
			telefone: inputData.client.cellPhone,
			tipoTelefone: 1,
			email: inputData.client.email,
			sexo: inputData.client.sexo,
			dataNascimento: inputData.client.dataNascimento,
			codigoPessoa: data.pescod,
			cep: inputData.address.zipCode,
		},
		itens: [
			{
				numeroItem: 1,
				codigoEquipamento: inputData.productDetails.deviceCode, //fixo - enviado pelo commerce
				idadeAparelho: inputData.productDetails.phoneAge, //Duvida -  é a idade em anos, tipo 1 ano, 2 anos e assim por diante ou é um valor de dominio?
				codigoFaixaEtariaPrincipalUsuario:
					inputData.client.mainUserAgeGroupCode, //fixo - enviado pelo commerce
				codigoMarca: inputData.productDetails.phoneBrandCode, // usuário preenche - vem do commerce
				codigoRelevancia: inputData.productDetails.relevanceCode, //fixo 1 - enviado pelo commerce
				codigoTipoEquipamento: inputData.productDetails.deviceTypeCode, //fixo - enviado pelo commerce
				modelo: {
					codigoModelo: inputData.productDetails.phoneModelCode,
					nomeModelo: inputData.productDetails.phoneModel,
					valorModelo: inputData.productDetails.marketValue,
					capacidade: inputData.productDetails.phoneCapacity,
				},
				pacotes: filterPackages(inputData),
			},
		],
	}

	return payload
}

function filterPackages(inputData) {
	let packages = [
		{
			codigoPacote: 2,
			codigoPlanoCobertura: 6,
			coberturas: [
				{
					codigoCobertura: 644,
					percentualParticipacaoSegurado: 0,
				},
			],
		},
		{
			codigoPacote: 3,
			codigoPlanoCobertura: 7,
			coberturas: [
				{
					codigoCobertura: 643,
					percentualParticipacaoSegurado: 0,
				},
				{
					codigoCobertura: 644,
					percentualParticipacaoSegurado: 0,
				},
			],
		},
		{
			codigoPacote: 4,
			codigoPlanoCobertura: 8,
			coberturas: [
				{
					codigoCobertura: 643,
					percentualParticipacaoSegurado: 0,
				},
				{
					codigoCobertura: 644,
					percentualParticipacaoSegurado: 0,
				},
				{
					codigoCobertura: 645,
					percentualParticipacaoSegurado: 0,
				},
			],
		},
	]

	if (inputData.digitalProtectionValue) {
		packages.push({
			codigoPacote: 5,
			codigoPlanoCobertura: 11,
			coberturas: [
				{
					codigoCobertura: 714,
					percentualParticipacaoSegurado: 0,
					valorCobertura: inputData.digitalProtectionValue,
				},
				{
					codigoCobertura: 643,
					percentualParticipacaoSegurado: 0,
				},
				{
					codigoCobertura: 644,
					percentualParticipacaoSegurado: 0,
				},
				{
					codigoCobertura: 645,
					percentualParticipacaoSegurado: 0,
				},
			],
		})
	}

	if (inputData.channelCode === CONSTANTS.SUPER_APP_CHANNEL_CODE) {
		const filteredPackages = packages.filter((item) =>
			inputData.packages?.includes(item.codigoPacote)
		)
		if (filteredPackages.length) packages = filteredPackages
	}

	return packages.filter((item) => item)
}

function getOperationCode(inputData) {
	let operationCode = '597'

	if (inputData.activeSusepOriginLP) {
		switch (inputData.susep) {
			case CONSTANTS.SUSEP_FUNCIONARIO:
				operationCode = '708'
				break;
			case CONSTANTS.SUSEP_NOMAD:
				operationCode = '527'
				break;
			case CONSTANTS.SUSEP_BHG:
				operationCode = '776'
				break;
			case CONSTANTS.SUSEP_COB47J:
				operationCode = '831'
				break;
			case CONSTANTS.SUSEP_4N6U1J:
				operationCode = '1'
				break;
			default:
				if(inputData.cellPhone.commissionRate && 
					inputData?.productLinkScope?.includes(CONSTANTS.PRODUCT_SCOPE)
				) {
					const comission = inputData.cellPhone.commissionRate.replace(/\D/g, '')
					if(isValidNumber(comission)) operationCode = comission
				} else {
					operationCode = '20'
				}
				break;
		}
	}
	return operationCode
}

function isValidNumber(value) {
    const regex = /^[0-9]+(\.[0-9]+)?$/
	
    return regex.test(value)
}