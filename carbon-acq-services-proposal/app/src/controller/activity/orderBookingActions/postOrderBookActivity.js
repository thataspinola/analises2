const factory = require('../../../factory')
const api = require('../../../api')
const service = require('../../../service')
const activity = require('../../activity')
const utils = require('../../../utils')

exports.execute = async (parsedInputData) => {
	let currentActivity =
		'Preparação do payload para a chamada do endpoint de API orderBook'
	try {
		const scheduleType = parsedInputData.serviceProvision.schedule.scheduleType

		const payload =
			factory.api.hubVendasCarbon.prestacaoServico.orderBookApiRequestPayload.getRequestPayload(
				parsedInputData
			)

		service.logger.info(
			`Chamada do endpoint de API orderbook: ${JSON.stringify(payload)}`
		)

		const postOrderBookingResponse = await postOrderBooking(payload)

		const isNewSchedulesSuggestionsResponse = Array.isArray(payload)

		service.logger.info(
			{
				postOrderBookingResponse,
				isNewSchedulesSuggestionsResponse,
			},
			'Resposta do endpoint de API orderbook'
		)

		if(isNewSchedulesSuggestionsResponse) {
			return factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getNewScheduleResponse(
				postOrderBookingResponse
			)
		}

		return factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload(
			postOrderBookingResponse, scheduleType
		)
	} catch (error) {
		service.logger.error(
			error,
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)

		throw error
	}
}

const postOrderBooking = async (payload) => {
	if (process.env.ORDER_BOOKING_STRATEGY_FLAG === 'API_DIRECT_CALL') {
		return postServiceAppointment(payload)
	}

	return api.hubVendasCarbon.prestacaoServico.orderBook.postOrderBook(payload)
}

const postServiceAppointment = async (parsedInput) => {
	const formattedInput = {
		...parsedInput,
		serviceDateTime: utils.date.formatDateString(parsedInput.serviceDateTime),
	}

	const payload =
		factory.api.serviceAppointment.serviceAppointmentRequestPayload.getPayload(
			formattedInput
		)

	const apiGatewayTokens = await activity.getApiGatewayTokens.execute()

	const response = await api.serviceAppointment.postServiceAppointment(
		payload,
		apiGatewayTokens.impersonalUserToken,
		apiGatewayTokens.ca
	)

	return factory.api.serviceAppointment.serviceAppointmentResponsePayload.getPayload(
		response,
		parsedInput
	)
}
