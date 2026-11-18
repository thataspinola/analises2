const CONSTANT = require('../../../property')

exports.getPayload = (parsedJsonRequest, date) => {
	const outputPayload = {
		obterListaSugestoesIn: {
			parIdParceiro: CONSTANT.PARTNER_ID,
			parDataHoraServico: date,
			parNomeCidade: parsedJsonRequest.city.toUpperCase(),
			parUF: parsedJsonRequest.stateCode,
			parTipoEndereco: CONSTANT.ADDRESS_TYPE,
			parLatitude: parsedJsonRequest.latitude,
			parLongitude: parsedJsonRequest.longitude,
			parCodigoEmpresa: parsedJsonRequest.companyCode || CONSTANT.COMPANY_CODE,
			parCodigoOrigem: parsedJsonRequest.originCode || CONSTANT.ORIGIN_CODE,
			parCodigoSistemaOrigem:
				parsedJsonRequest.sourceSystemCode || CONSTANT.SOURCE_SYSTEM_CODE,
			parCodigoEspecialidade: parsedJsonRequest.specialtyCode,
			parCodigoCatTar:
				parsedJsonRequest.catTarCode || CONSTANT.CATEGORY_TAR_COD,
			parCodigoAssistencia:
				parsedJsonRequest.assistanceCode || CONSTANT.ASSISTANCE_CODE,
			parCodigoNatureza: parsedJsonRequest.natureCode || CONSTANT.NATURE_CODE,
			parCodigoSubNatureza:
				parsedJsonRequest.subNatureCode || CONSTANT.SUB_NATURE_CODE,
			parCodigoVeiculo: parsedJsonRequest.vehicleCode || CONSTANT.VEHICLE_CODE,
			parCodigoProblema: parsedJsonRequest.problemCode || null,
		},
	}

	if (
		parsedJsonRequest.specialtyList &&
		parsedJsonRequest.specialtyList.length > 0
	) {
		outputPayload.obterListaSugestoesIn.perguntas = {
			pergunta: parsedJsonRequest.specialtyList.map((especialidade) => ({
				codigo: especialidade.questions[0].code,
				descricaoResposta: especialidade.questions[0].responseDescription,
			})),
		}
	}

	return outputPayload
}
