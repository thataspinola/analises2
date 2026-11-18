const CONSTANT = require('../../../property')

const ADDRESS_TYPE = '3'

const IMMEDIATE_SERVICE = 'N'

const ORIGIN_CODE = '9'

const CATEGORY_TAR_COD = '0'

const ASSISTANCE_CODE = '0'

const NATURE_CODE = '0'

const SUB_NATURE_CODE = '0'

const VEHICLE_CODE = '0'

const SOURCE_SYSTEM_CODE = '36'

exports.getPayload = (parsedJsonRequest) => {
	const outputPayload = {
		regularAgendaIn: {
			parDataHoraServico: parsedJsonRequest.serviceDateTime,
			parNomeCidade: parsedJsonRequest.city.toUpperCase(),
			parUF: parsedJsonRequest.stateCode,
			parCodigoEspecialidade: parsedJsonRequest.specialtyCode,
			parLatitude: parsedJsonRequest.latitude,
			parLongitude: parsedJsonRequest.longitude,
			parCodigoCatTar:
				parsedJsonRequest.catTarCode || CATEGORY_TAR_COD,
			parCodigoOrigem: parsedJsonRequest.originCode || ORIGIN_CODE,
			parCodigoAssistencia:
				parsedJsonRequest.assistanceCode || ASSISTANCE_CODE,
			parCodigoNatureza: parsedJsonRequest.natureCode || NATURE_CODE,
			parCodigoSubNatureza:
				parsedJsonRequest.subNatureCode || SUB_NATURE_CODE,
			parCodigoVeiculo: parsedJsonRequest.vehicleCode || VEHICLE_CODE,
			parTipoEndereco: ADDRESS_TYPE,
			parServicoImediato: IMMEDIATE_SERVICE,
			parEmpresa: parsedJsonRequest.companyCode || CONSTANT.COMPANY_CODE,
			parCodigoSistemaOrigem:
				parsedJsonRequest.sourceSystemCode || SOURCE_SYSTEM_CODE,
			parCodigoProblema: parsedJsonRequest.problemCode || null,
		},
	}

	if (parsedJsonRequest.specialtyList?.length) {
		outputPayload.regularAgendaIn.perguntas = {
			pergunta: parsedJsonRequest.specialtyList.map((especialidade) => ({
				codigo: especialidade.questions[0].code,
				descricaoResposta: especialidade.questions[0].responseDescription,
			})),
		}
	}

	return outputPayload
}
