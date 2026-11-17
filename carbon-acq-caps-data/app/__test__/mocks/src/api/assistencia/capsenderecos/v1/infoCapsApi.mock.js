const MOCKS = require('../../../../../index.mock')

const GETCAPSINFOENDPOINT_VALID_RETURN_VALUE = [
	{
		EmpresaCodigo: 10,
		EmpresaNomeFantasia: 'BELA VISTA',
		EmpresaRazaoSocial: "TATY'S CAR SERVIÇOS AUTOMOTIVOS LTDA",
		EmpresaLogradouro: 'RUA DR PENAFORTE MENDES',
		EmpresaLogradouroNumero: '132     ',
		EmpresaBairro: 'BELA VISTA',
		CidadeNome: 'SAO PAULO',
		EstadoCodigo: 'SP ',
		EmpresaCEP: '01308010 ',
		EmpresaLatitude: -23.5316,
		EmpresaLongitude: -46.6456,
		EmpresaCNPJ: '04869840000146',
		EmpresaEmail: 'caps.belavistaporto@gmail.com',
		TelefoneNumero: '11 31298525',
		AgendaHoraInicioDomingo: '1753-01-01T00:00:00',
		AgendaHoraFimDomingo: '1753-01-01T00:00:00',
		AgendaHoraInicioSegunda: '1753-01-01T08:15:00',
		AgendaHoraFimSegunda: '1753-01-01T17:30:00',
		AgendaHoraInicioTerca: '1753-01-01T08:15:00',
		AgendaHoraFimTerca: '1753-01-01T17:30:00',
		AgendaHoraInicioQuarta: '1753-01-01T08:15:00',
		AgendaHoraFimQuarta: '1753-01-01T17:30:00',
		AgendaHoraInicioQuinta: '1753-01-01T08:15:00',
		AgendaHoraFimQuinta: '1753-01-01T17:30:00',
		AgendaHoraInicioSexta: '1753-01-01T08:15:00',
		AgendaHoraFimSexta: '1753-01-01T17:30:00',
		AgendaHoraInicioSabado: '1753-01-01T08:15:00',
		CarregadorEletrico: 0,
		AgendaHoraFimSabado: '1753-01-01T12:00:00',
		distancia: 2.448704336552282,
		imagens: [
			{
				tipo: 'Fachada',
				url: '[https://assets-caps.portoseguro.com.br/6/imagens/fachada/3cc7e234-f77e-4816-8382-513541fe160b.png]',
			},
		],
	},
	{
		EmpresaCodigo: 108,
		EmpresaNomeFantasia: 'TABOAO',
		EmpresaRazaoSocial: 'RR AUTO CENTER LTDA  ME',
		EmpresaLogradouro: 'R JOSE SOARES DE AZEVEDO',
		EmpresaLogradouroNumero: '264     ',
		EmpresaBairro: 'VILA SANTA LUZIA',
		CidadeNome: 'TABOAO DA SERRA',
		EstadoCodigo: 'SP ',
		EmpresaCEP: '06754020 ',
		EmpresaLatitude: -23.6075,
		EmpresaLongitude: -46.7689,
		EmpresaCNPJ: '13396365000129',
		EmpresaEmail: 'capstaboao.rodrigo@gmail.com',
		TelefoneNumero: '11 47873302',
		CarregadorEletrico: 1,
		AgendaHoraInicioDomingo: '1753-01-01T00:00:00',
		AgendaHoraFimDomingo: '1753-01-01T00:00:00',
		AgendaHoraInicioSegunda: '1753-01-01T08:15:00',
		AgendaHoraFimSegunda: '1753-01-01T19:00:00',
		AgendaHoraInicioTerca: '1753-01-01T08:15:00',
		AgendaHoraFimTerca: '1753-01-01T19:00:00',
		AgendaHoraInicioQuarta: '1753-01-01T08:15:00',
		AgendaHoraFimQuarta: '1753-01-01T19:00:00',
		AgendaHoraInicioQuinta: '1753-01-01T08:15:00',
		AgendaHoraFimQuinta: '1753-01-01T19:00:00',
		AgendaHoraInicioSexta: '1753-01-01T08:15:00',
		AgendaHoraFimSexta: '1753-01-01T19:00:00',
		AgendaHoraInicioSabado: '1753-01-01T08:00:00',
		AgendaHoraFimSabado: '1753-01-01T13:00:00',
		distancia: 12.56243939588085,
		imagens: [],
	},
]

exports.GETCAPSINFOENDPOINT_AXIOS_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: GETCAPSINFOENDPOINT_VALID_RETURN_VALUE,
	}
}

exports.GETCAPSINFOENDPOINT_VALID_PAYLOAD_INPUT = () => {
	return {
		parsedInputData: MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT(),
		token: MOCKS.CONTROLLER_REQUEST.API_GATEWAY_TOKEN(),
	}
}

exports.GETCAPSINFOENDPOINT_VALID_RETURN = () => {
	return GETCAPSINFOENDPOINT_VALID_RETURN_VALUE
}

exports.GETCAPSINFOENDPOINT_VALID_RETURN_WITHOUT_IMAGES = () => {
	return GETCAPSINFOENDPOINT_VALID_RETURN_VALUE.map((oficina) => ({
		...oficina,
		imagens: [],
	}))
}
