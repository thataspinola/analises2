const { WEEKDAY_NAMES, MONTH_NAMES } = require('../../../property')

const getMonthName = (dateString) => {
	const [datePart] = dateString.split(' ')
	const [day, month, year] = datePart.split('/').map(Number)
	const date = new Date(year, month - 1, day)

	if (isNaN(date.getTime())) {
		throw new Error(`Data inválida: ${dateString}`)
	}
	return MONTH_NAMES[date.getMonth()]
}

const getWeekdayName = (dateString) => {
	const [datePart] = dateString.split(' ')
	const [day, month, year] = datePart.split('/').map(Number)
	const date = new Date(year, month - 1, day)

	if (isNaN(date.getTime())) {
		throw new Error(`Data inválida: ${dateString}`)
	}
	return WEEKDAY_NAMES[date.getDay()]
}

const convertFaixaHorario = (faixaHorario) => faixaHorario.replace('-', ' às ')

module.exports.getPayload = (serviceAppointmentCallResponsePayload) => {
	const rawList =
		serviceAppointmentCallResponsePayload.obterListaSugestoesOut.regulacoessaps

	const lista = Array.isArray(rawList) ? rawList : [rawList.regulacaosaps]

	const filtered = lista.filter(
		({ dataHoraServico }) =>
			typeof dataHoraServico === 'string' &&
			!dataHoraServico.toUpperCase().includes('IMEDIATO')
	)

	const grouped = filtered.reduce((acc, item) => {
		const [dateKey] = item.dataHoraServico.split(' ')
		acc[dateKey] = acc[dateKey] || []
		acc[dateKey].push(item)
		return acc
	}, {})

	return Object.entries(grouped).map(([dateKey, items]) => {
		const [day] = dateKey.split('/').map(Number)
		return {
			day,
			month: getMonthName(dateKey),
			weekday: getWeekdayName(dateKey),
			selected: false,
			schedules: items.map(({ faixaHorario, dataHoraServico }) => ({
				time: convertFaixaHorario(faixaHorario),
				serviceDateTime: dataHoraServico,
			})),
		}
	})
}
