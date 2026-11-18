const MOCKS = require('../../../../../../index.mock')

exports.GETPAYLOAD_VALID_RETURN = () => {
	return {
		caps: MOCKS.API_ASSISTENCIA_CAPSENDERECOS_V1_AGENDAMENTOS.VALID_RETURN().caps.map((capsItem) => ({
			capsCode: capsItem.codigoCaps,
			scheduleAvailability: capsItem.disponibilidadeAgenda.map(
				(agendaItem) => ({
					date: agendaItem.data,
					weekDay: agendaItem.diaSemana,
					timeSlots: agendaItem.horario?.map((slot) => ({
						start: slot.inicio,
						end: slot.fim,
					})),
				})
			),
		}))
	}
}

exports.GETPAYLOAD_PARSEDJSON_VALID_INPUT = () => {
	return MOCKS.API_ASSISTENCIA_CAPSENDERECOS_V1_AGENDAMENTOS.VALID_RETURN()
}
