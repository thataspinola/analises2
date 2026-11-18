exports.getPayload = (apiCoreResponseData) => {
	return {
		caps: apiCoreResponseData?.caps?.map((capsItem) => ({
			capsCode: capsItem?.codigoCaps,
			scheduleAvailability: capsItem?.disponibilidadeAgenda.map(
				(agendaItem) => ({
					date: agendaItem?.data,
					weekDay: agendaItem?.diaSemana,
					timeSlots: agendaItem?.horario?.map((slot) => ({
						start: slot?.inicio,
						end: slot?.fim,
					})),
				})
			),
		})),
	}
}
