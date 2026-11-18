const MOCKS = require('../../../../../index.mock')

const VALID_RETURN_VALUE = {
	caps: [
		{
			codigoCaps: '001',
			disponibilidadeAgenda: [
				{
					data: '03-09-2025',
					diaSemana: 'Quarta-feira',
					horario: [
						{
							inicio: '09:00:00',
							fim: '10:55:00',
						},
						{
							inicio: '13:00:00',
							fim: '15:55:00',
						},
					],
				},
				{
					data: '04-09-2025',
					diaSemana: 'Quinta-feira',
					horario: [
						{
							inicio: '09:00:00',
							fim: '10:55:00',
						},
						{
							inicio: '13:00:00',
							fim: '15:55:00',
						},
					],
				},
				{
					data: '05-09-2025',
					diaSemana: 'Sexta-feira',
					horario: [
						{
							inicio: '09:00:00',
							fim: '10:55:00',
						},
						{
							inicio: '13:00:00',
							fim: '15:55:00',
						},
					],
				},
				{
					data: '06-09-2025',
					diaSemana: 'Sábado',
					horario: [],
				},
				{
					data: '07-09-2025',
					diaSemana: 'Domingo',
					horario: [],
				},
				{
					data: '08-09-2025',
					diaSemana: 'Segunda-feira',
					horario: [
						{
							inicio: '09:00:00',
							fim: '10:55:00',
						},
						{
							inicio: '13:00:00',
							fim: '15:55:00',
						},
					],
				},
				{
					data: '09-09-2025',
					diaSemana: 'Terça-feira',
					horario: [
						{
							inicio: '09:00:00',
							fim: '10:55:00',
						},
						{
							inicio: '13:00:00',
							fim: '15:55:00',
						},
					],
				},
				{
					data: '10-09-2025',
					diaSemana: 'Quarta-feira',
					horario: [
						{
							inicio: '09:00:00',
							fim: '10:55:00',
						},
						{
							inicio: '13:00:00',
							fim: '15:55:00',
						},
					],
				},
			],
		},
		{
			codigoCaps: '500',
			disponibilidadeAgenda: [
				{
					data: '03-09-2025',
					diaSemana: 'Quarta-feira',
					horario: [
						{
							inicio: '08:00:00',
							fim: '10:55:00',
						},
						{
							inicio: '13:00:00',
							fim: '16:55:00',
						},
					],
				},
				{
					data: '04-09-2025',
					diaSemana: 'Quinta-feira',
					horario: [
						{
							inicio: '07:00:00',
							fim: '08:55:00',
						},
						{
							inicio: '12:00:00',
							fim: '15:55:00',
						},
					],
				},
				{
					data: '05-09-2025',
					diaSemana: 'Sexta-feira',
					horario: [
						{
							inicio: '09:00:00',
							fim: '10:55:00',
						},
						{
							inicio: '13:00:00',
							fim: '15:55:00',
						},
					],
				},
				{
					data: '06-09-2025',
					diaSemana: 'Sábado',
					horario: [],
				},
				{
					data: '07-09-2025',
					diaSemana: 'Domingo',
					horario: [],
				},
				{
					data: '08-09-2025',
					diaSemana: 'Segunda-feira',
					horario: [
						{
							inicio: '08:00:00',
							fim: '10:55:00',
						},
						{
							inicio: '13:00:00',
							fim: '16:55:00',
						},
					],
				},
				{
					data: '09-09-2025',
					diaSemana: 'Terça-feira',
					horario: [
						{
							inicio: '08:00:00',
							fim: '10:55:00',
						},
						{
							inicio: '13:00:00',
							fim: '16:55:00',
						},
					],
				},
				{
					data: '10-09-2025',
					diaSemana: 'Quarta-feira',
					horario: [
						{
							inicio: '08:00:00',
							fim: '10:55:00',
						},
						{
							inicio: '13:00:00',
							fim: '16:55:00',
						},
					],
				},
			],
		},
	],
}

const VALID_INPUT_VALUE = {
	capsCodes: ['1'],
	serviceCodes: ['f7e12a53-8316-47c1-88c3-56748fff86cc'],
	dateAvailability: '2025-09-25',
}

exports.AXIOS_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: VALID_RETURN_VALUE,
	}
}

exports.VALID_PAYLOAD_INPUT = () => {
	return {
		inputData:
			MOCKS.FACTORY_API_ASSISTENCIA_CAPSENDERECOS_V1_AGENDAMENTOSPAYLOADRESPONSE.GETPAYLOAD_VALID_RETURN(),
		token: MOCKS.CONTROLLER_REQUEST.API_GATEWAY_TOKEN().mulesoftToken,
		certificate: MOCKS.CONTROLLER_REQUEST.API_GATEWAY_TOKEN().ca,
	}
}

exports.VALID_RETURN = () => {
	return VALID_RETURN_VALUE
}

exports.VALID_INPUT = () => {
	return VALID_INPUT_VALUE
}