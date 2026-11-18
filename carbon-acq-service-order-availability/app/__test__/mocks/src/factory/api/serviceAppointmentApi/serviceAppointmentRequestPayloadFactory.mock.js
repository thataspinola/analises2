const MOCKS = require('../../../../index.mock')

exports.GETPAYLOAD_VALID_RETURN = () => {
	return {
		obterListaSugestoesIn: {
			parIdParceiro: '110',
			parDataHoraServico: '2024-08-05T00:00:00.000Z',
			parNomeCidade: 'SANTA LUZIA',
			parUF: 'MG',
			parTipoEndereco: '3',
			parLatitude: -16.3655573,
			parLongitude: -46.8938834,
			parCodigoEmpresa: 95,
			parCodigoOrigem: '9',
			parCodigoSistemaOrigem: '36',
			parCodigoEspecialidade: '44',
			parCodigoCatTar: '0',
			parCodigoAssistencia: '0',
			parCodigoNatureza: '0',
			parCodigoSubNatureza: '0',
			parCodigoVeiculo: '0',
			parCodigoProblema: '0',
		},
	}
}

exports.GETPAYLOAD_VALID_INPUT = () =>
	MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
