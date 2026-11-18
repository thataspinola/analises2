const MOCKS = require('../../../../index.mock')

exports.GETPAYLOAD_VALID_RETURN = () => [
	{
		day: 24,
		month: 'Julho',
		selected: false,
		weekday: 'Quarta-feira',
		schedules: [
			{
				time: '15:30 às 16:00',
				serviceDateTime: '24/07/2024 15:30',
			},
		],
	},
	{
		day: 25,
		month: 'Julho',
		selected: false,
		weekday: 'Quinta-feira',
		schedules: [
			{
				time: '15:30 às 16:00',
				serviceDateTime: '25/07/2024 15:30',
			},
		],
	},
	{
		day: 26,
		month: 'Julho',
		selected: false,
		weekday: 'Sexta-feira',
		schedules: [
			{
				time: '15:30 às 16:00',
				serviceDateTime: '26/07/2024 15:30',
			},
		],
	},
	{
		day: 27,
		month: 'Julho',
		selected: false,
		weekday: 'Sábado',
		schedules: [
			{
				time: '15:30 às 16:00',
				serviceDateTime: '27/07/2024 15:30',
			},
		],
	},
	{
		day: 28,
		month: 'Julho',
		selected: false,
		weekday: 'Domingo',
		schedules: [
			{
				time: '15:30 às 16:00',
				serviceDateTime: '28/07/2024 15:30',
			},
		],
	},
	{
		day: 29,
		month: 'Julho',
		selected: false,
		weekday: 'Segunda-feira',
		schedules: [
			{
				time: '15:30 às 16:00',
				serviceDateTime: '29/07/2024 15:30',
			},
		],
	},
]

exports.GETPAYLOAD_VALID_RETURN_FROM_INPUT_WITH_REGULACOESSAPS_AS_OBJECT =
	() => [
		{
			day: 24,
			month: 'Julho',
			selected: false,
			weekday: 'Quarta-feira',
			schedules: [
				{
					time: '15:30 às 16:00',
					serviceDateTime: '24/07/2024 15:30',
				},
			],
		},
	]

exports.GETPAYLOAD_VALID_INPUT = () =>
	MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_VALID_RETURN()
