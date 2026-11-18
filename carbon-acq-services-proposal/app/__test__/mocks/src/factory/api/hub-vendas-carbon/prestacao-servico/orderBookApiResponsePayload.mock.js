const MOCKS = require('../../../../../index.mock')

exports.PAYLOAD_INPUT = () => {
	return MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOK.VALID_RETURN()
}

exports.PAYLOAD_IMEDIATO_INPUT = () => {
	return MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOK.VALID_RETURN_IMEDIATO()
}

exports.SINGLE_PAYLOAD_INPUT = () => {
	return MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOK.SINGLE_VALID_RETURN()
}

exports.PAYLOAD_RETURN = () => {
	return {
		scheduleType: 'agendamento-programado',
		startDateTime: '2024-12-08T06:00:00.000Z',
		endDateTime: '2024-12-08T06:00:00.000Z',
		estimatedDateTime: null,
		estimatedServiceTime: null,
		openOsDateTime: '2024-12-04T18:00:00.000Z',
		key: '0812202406000012887',
		expirationTime: '2024-12-04T21:15:00.000Z',
		expirationUrlRedirect: '/servicos',
	}
}

exports.PAYLOAD_IMEDIATO_RETURN = () => {
	return {
		scheduleType: 'agendamento-imediato',
		startDateTime: '2024-12-08T06:00:00.000Z',
		endDateTime: null,
		estimatedDateTime: '2024-12-08T06:00:00.000Z',
		estimatedServiceTime: '2024-12-04T03:30:00.000Z',
		openOsDateTime: '2024-12-04T18:00:00.000Z',
		key: '0812202406000012887',
		expirationTime: '2024-12-04T21:15:00.000Z',
		expirationUrlRedirect: '/servicos',
	}
}

exports.PAYLOAD_NOT_DISPONIBLE_DATA_INPUT = () => {
	return MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOK
		.VALID_RETURN_NOT_DISPONIBLE_DATA
}

exports.PAYLOAD_NOT_DISPONIBLE_DATA_RETURN = () => {
	return {
		newSchedule: [
			{
				day: 5,
				month: 'Dezembro',
				selected: false,
				weekday: 'Quinta-feira',
				schedules: [
					{
						time: '12:00 às 14:00',
						serviceDateTime: '05/12/2024 12:00',
					},
					{
						time: '14:00 às 16:00',
						serviceDateTime: '05/12/2024 14:00',
					},
				],
			},
		],
	}
}
