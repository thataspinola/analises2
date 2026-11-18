exports.getPayload = (
	serviceAppointmentCallResponsePayload,
	inputParsedData
) => {
	const regularAgendaOut =
		serviceAppointmentCallResponsePayload.regularAgendaOut
	const regulacoes = regularAgendaOut.regulacoes

	if (regulacoes?.regulacao?.status === 'OK') {
		const regulacao = regulacoes.regulacao
		return {
			status: regulacao.status,
			reservationKey: regulacao.chaveReserva,
			serviceEstimatedTime: regulacao.previsaoAtendimento,
			serviceDateTime: regulacao.dataHoraServico,
			statusDescription: regulacao.descricaoStatus,
			scheduledEstimatedTime: regulacao.horaPrevistaAtendimento,
			scheduledEndDateAndTime: regulacao.dataHoraProgramacaoFinal,
		}
	}

	if (Array.isArray(regulacoes) && regulacoes.length > 0) {
		return regulacoes.map((regulacao) => ({
			status: regulacao.status,
			timeSlot: regulacao.faixaHorario,
			serviceDateTime: regulacao.dataHoraServico,
			statusDescription: regulacao.descricaoStatus,
		}))
	}

	if (regulacoes?.regulacao?.status === 'NOK') {
		const regulacao = regulacoes.regulacao

		if (
			inputParsedData &&
			regulacao.dataHoraServico === inputParsedData.serviceDateTime
		) {
			return {
				status: regulacao.status,
				timeSlot: regulacao.faixaHorario,
				serviceDateTime: regulacao.dataHoraServico,
				statusDescription: regulacao.descricaoStatus,
			}
		}
	}

	throw new Error(
		`Formato inesperado na resposta da API de agendamento: ${JSON.stringify(
			serviceAppointmentCallResponsePayload
		)}`
	)
}
