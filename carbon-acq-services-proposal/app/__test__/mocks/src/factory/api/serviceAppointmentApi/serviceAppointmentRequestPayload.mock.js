const PROCESS_VALID_PARSEDJSON_INPUT_FORMATTED_DATE_VALUE = {
	serviceDateTime: '2024-08-26T15:30:00',
	city: 'Santa Luzia',
	stateCode: 'MG',
	specialtyCode: '44',
	latitude: -16.3655573,
	longitude: -46.8938834,
	originCode: '9',
	companyCode: '1',
	problemCode: '0',
}

const PROCESS_COMPLETE_VALID_PARSEDJSON_FORMATTED_DATE_INPUT_VALUE = {
	serviceDateTime: '2024-08-26T15:30:00',
	city: 'Santa Luzia',
	stateCode: 'MG',
	specialtyCode: '44',
	latitude: -16.3655573,
	longitude: -46.8938834,
	catTarCode: '0',
	originCode: '9',
	assistanceCode: '0',
	natureCode: '0',
	subNatureCode: '0',
	vehicleCode: '0',
	companyCode: '1',
	problemCode: '0',
	specialtyList: [
		{
			questions: [
				{
					code: '1',
					responseDescription: '1',
				},
			],
		},
	],
}

exports.PROCESS_VALID_PARSEDJSON_INPUT_FORMATTED_DATE = () => {
	return PROCESS_VALID_PARSEDJSON_INPUT_FORMATTED_DATE_VALUE
}

exports.PROCESS_COMPLETE_VALID_PARSEDJSON_FORMATTED_DATE_INPUT = () => {
	return PROCESS_COMPLETE_VALID_PARSEDJSON_FORMATTED_DATE_INPUT_VALUE
}

exports.GETPAYLOAD_API_REGULARAGENDA_VALID_RETURN = () => {
	return {
		regularAgendaIn: {
			parDataHoraServico: '2024-08-26T15:30:00',
			parNomeCidade: 'SANTA LUZIA',
			parUF: 'MG',
			parCodigoEspecialidade: '44',
			parLatitude: -16.3655573,
			parLongitude: -46.8938834,
			parCodigoCatTar: '0',
			parCodigoOrigem: '9',
			parCodigoAssistencia: '0',
			parCodigoSistemaOrigem: '36',
			parCodigoNatureza: '0',
			parCodigoSubNatureza: '0',
			parCodigoVeiculo: '0',
			parTipoEndereco: '3',
			parServicoImediato: 'N',
			parEmpresa: '1',
			parCodigoProblema: '0',
		},
	}
}

exports.GETPAYLOAD_API_REGULARAGENDA_COMPLETE_VALID_RETURN = () => {
	return {
		regularAgendaIn: {
			parDataHoraServico: '2024-08-26T15:30:00',
			parNomeCidade: 'SANTA LUZIA',
			parUF: 'MG',
			parCodigoEspecialidade: '44',
			parLatitude: -16.3655573,
			parLongitude: -46.8938834,
			parCodigoCatTar: '0',
			parCodigoOrigem: '9',
			parCodigoAssistencia: '0',
			parCodigoNatureza: '0',
			parCodigoSubNatureza: '0',
			parCodigoVeiculo: '0',
			parTipoEndereco: '3',
			parCodigoSistemaOrigem: '36',
			parServicoImediato: 'N',
			parEmpresa: '1',
			parCodigoProblema: '0',
			perguntas: {
				pergunta: [
					{
						codigo: '1',
						descricaoResposta: '1',
					},
				],
			},
		},
	}
}
