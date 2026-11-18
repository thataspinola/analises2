const MOCKS = require('../../index.mock')

const SUCCESS_BODY_CONTENT_VALUE = {
	obterListaSugestoesOut: {
		regulacoessaps: [
			{
				faixaHorario: '01:00',
				dataHoraServico: 'IMEDIATO',
			},
			{
				faixaHorario: '15:30-16:00',
				dataHoraServico: '24/07/2024 15:30',
			},
			{
				faixaHorario: '15:30-16:00',
				dataHoraServico: '25/07/2024 15:30',
			},
			{
				faixaHorario: '15:30-16:00',
				dataHoraServico: '26/07/2024 15:30',
			},
			{
				faixaHorario: '15:30-16:00',
				dataHoraServico: '27/07/2024 15:30',
			},
			{
				faixaHorario: '15:30-16:00',
				dataHoraServico: '28/07/2024 15:30',
			},
			{
				faixaHorario: '15:30-16:00',
				dataHoraServico: '29/07/2024 15:30',
			},
		],
	},
}

exports.POSTSERVICEAPPOINTMENT_AXIOS_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: SUCCESS_BODY_CONTENT_VALUE,
	}
}

exports.POSTSERVICEAPPOINTMENT_VALID_PAYLOAD_INPUT = () => {
	return MOCKS.FACTORY_REQUEST_API.GETPAYLOAD_VALID_RETURN()
}

exports.POSTSERVICEAPPOINTMENT_VALID_RETURN = () => {
	return SUCCESS_BODY_CONTENT_VALUE
}

exports.POSTSERVICEAPPOINTMENT_VALID_RETURN_WITH_REGULACOESSAPS_AS_OBJECT =
	() => {
		return {
			...SUCCESS_BODY_CONTENT_VALUE,
			obterListaSugestoesOut: {
				...SUCCESS_BODY_CONTENT_VALUE.obterListaSugestoesOut,
				regulacoessaps: {
					regulacaosaps: {
						...SUCCESS_BODY_CONTENT_VALUE.obterListaSugestoesOut
							.regulacoessaps[1],
					},
				},
			},
		}
	}

exports.POSTSERVICEAPPOINTMENT_VALID_RETURN = () => {
	return SUCCESS_BODY_CONTENT_VALUE
}

exports.POSTSERVICEAPPOINTMENT_NULL_RESPONSE = () => null

exports.POSTSERVICEAPPOINTMENT_NULL_OBTERLISTASUGESTOESOUT = () => ({
	obterListaSugestoesOut: null,
})

exports.POSTSERVICEAPPOINTMENT_NULL_REGULACOESSAPS = () => ({
	obterListaSugestoesOut: {
		regulacoessaps: null,
	},
})

exports.POSTSERVICEAPPOINTMENT_EMPTY_REGULACOESSAPS = () => ({
	obterListaSugestoesOut: {
		regulacoessaps: [],
	},
})

exports.POSTSERVICEAPPOINTMENT_NULL = () => null
