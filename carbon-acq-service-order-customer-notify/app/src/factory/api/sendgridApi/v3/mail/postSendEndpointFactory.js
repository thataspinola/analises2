const CONSTANT = require('../../../../../property')

const getEndDateTimeBasedOnScheduleType = (schedule) => {
	if (schedule.type === 'agendamento-imediato') {
		return new Date(Date.parse(schedule.estimatedDateTime))
	}

	return new Date(Date.parse(schedule.endDateTime))
}

exports.getPayload = (parsedSnsMessagePayload) => {
	const scheduleStartDate = new Date(
		Date.parse(
			parsedSnsMessagePayload.integrationData.serviceOrder.schedule
				.startDateTime
		)
	)

	const scheduleEndDate = getEndDateTimeBasedOnScheduleType(
		parsedSnsMessagePayload.integrationData.serviceOrder.schedule
	)

	const templateId =
		parsedSnsMessagePayload?.transactionType?.toUpperCase() === 'PIX'
			? CONSTANT.PORTOSERVICO_SERVICEORDER_MAIL_SUCCESS_TEMPLATEID_PIX
			: CONSTANT.PORTOSERVICO_SERVICEORDER_MAIL_SUCCESS_TEMPLATEID
	const payload = {
		personalizations: [
			{
				to: [
					{
						email: parsedSnsMessagePayload.integrationData.customer.email,
					},
				],
				substitutions: {
					'%service_portosocorro_os%':
						parsedSnsMessagePayload.integrationData.serviceOrderNumber,
					'%service_scheduling_datetime_date%':
						scheduleStartDate.toLocaleDateString('pt-BR'),
					'%service_scheduling_datetime_hour%':
						scheduleStartDate.toLocaleTimeString('pt-BR', {
							hour: '2-digit',
							minute: '2-digit',
						}),
					'%service_scheduling_datetime_hour_finish%':
						scheduleEndDate.toLocaleTimeString('pt-BR', {
							hour: '2-digit',
							minute: '2-digit',
						}),
					'%payment_value%': `R$ ${parsedSnsMessagePayload.amount}`,
					'%service_address_street%':
						parsedSnsMessagePayload.integrationData.serviceAddress.street,
					'%service_address_number%':
						parsedSnsMessagePayload.integrationData.serviceAddress.streetNumber,
					'%service_address_neighborhood%':
						parsedSnsMessagePayload.integrationData.serviceAddress.neighborhood,
					'%service_address_city%':
						parsedSnsMessagePayload.integrationData.serviceAddress.city,
					'%service_address_state%':
						parsedSnsMessagePayload.integrationData.serviceAddress.state,
				},
			},
		],
		from: {
			email: CONSTANT.PORTOSERVICO_SERVICEORDER_MAIL_SENDER,
			name: CONSTANT.PORTOSERVICO_SERVICEORDER_MAIL_SENDER_NAME,
		},
		subject: CONSTANT.PORTOSERVICO_SERVICEORDER_MAIL_SUCCESS_SUBJECT,
		template_id: templateId,
	}
	return payload
}
