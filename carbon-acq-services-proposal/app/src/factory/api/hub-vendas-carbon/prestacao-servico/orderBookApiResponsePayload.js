const CONSTANT = require('../../../../property')
const utils = require('../../../../utils')

exports.getResponsePayload = (payload, scheduleType) => {
	const isNewSchedulesSuggestionsResponse = Array.isArray(payload)

	if (isNewSchedulesSuggestionsResponse) {
		return exports.getNewScheduleResponse(payload)
	}

	validateScheduleData(payload, scheduleType)

	const startDateTime = utils.date.parseDateTime(payload.serviceDateTime)

	const openOsDateTime = new Date()
	openOsDateTime.setHours(openOsDateTime.getHours() - 3)

	const expirationTime = new Date(openOsDateTime)
	expirationTime.setMinutes(expirationTime.getMinutes() + 15)

	expirationTime.setHours(expirationTime.getHours() + 3)

	const formattedStartDateTime = utils.date.formatUtcDate(startDateTime)
	const formattedEndDateTime = getEndDateTime(payload)
	const formattedEstimatedDateTime = getEstimatedDateTime(payload)
	const formattedEstimatedServiceTime = getServiceEstimatedTime(payload)
	const formattedOpenOsDateTime = utils.date.formatUtcDate(openOsDateTime)
	const formattedExpirationTime = utils.date.formatUtcDate(expirationTime)

	return {
		scheduleType: scheduleType,
		startDateTime: formattedStartDateTime,
		endDateTime:
			scheduleType === 'agendamento-programado' ? formattedEndDateTime : null,
		estimatedDateTime:
			scheduleType === 'agendamento-imediato'
				? formattedEstimatedDateTime
				: null,
		estimatedServiceTime:
			scheduleType === 'agendamento-imediato'
				? formattedEstimatedServiceTime
				: null,
		openOsDateTime: formattedOpenOsDateTime,
		key: payload.reservationKey || '',
		expirationTime: formattedExpirationTime,
		expirationUrlRedirect: CONSTANT.EXPIRATION_URL_REDIRECT,
	}
}

const validateScheduleData = (payload, scheduleType) => {
	if (!payload.status || payload.status !== 'OK') {
		throw new Error('Schedule data status is invalid')
	}

	if (!payload.reservationKey) {
		throw new Error('Schedule data missing reservationKey')
	}

	if (!payload.serviceDateTime) {
		throw new Error('Schedule data missing serviceDateTime')
	}

	if (!scheduleType) {
		throw new Error('Schedule data missing scheduleType')
	}

	if (scheduleType === 'agendamento-programado' && !payload.serviceDateTime) {
		throw new Error('Schedule data missing serviceDateTime')
	}

	if (
		scheduleType === 'agendamento-programado' &&
		!payload.scheduledEndDateAndTime
	) {
		throw new Error('Schedule data missing scheduledEndDateAndTime')
	}

	if (
		scheduleType === 'agendamento-imediato' &&
		!payload.scheduledEstimatedTime
	) {
		throw new Error('Schedule data missing scheduledEstimatedTime')
	}
}

const getEndDateTime = (payload) => {
	if (!payload.scheduledEndDateAndTime) return null

	const endDateTime = utils.date.parseDateTime(payload.scheduledEndDateAndTime)
	return utils.date.formatUtcDate(endDateTime)
}

const getEstimatedDateTime = (payload) => {
	if (!payload.scheduledEstimatedTime) return null

	const scheduledEstimatedTime = utils.date.parseDateTime(
		payload.scheduledEstimatedTime
	)
	return utils.date.formatUtcDate(scheduledEstimatedTime)
}

const getServiceEstimatedTime = (payload) => {
	if (!payload.serviceEstimatedTime) return null

	const hourMinuteTimeComponent = payload.serviceEstimatedTime

	const now = new Date()

	const day = String(now.getDate()).padStart(2, '0')
	const month = String(now.getMonth() + 1).padStart(2, '0')
	const year = now.getFullYear()

	const estimatedDateTimedateString = `${year}-${month}-${day}T${hourMinuteTimeComponent}:00.000Z`

	return estimatedDateTimedateString
}

exports.getNewScheduleResponse = (payload) => {
	const groupedByDate = payload.reduce((acc, item) => {
		const [datePart] = item.serviceDateTime.split(' ')
		if (!acc[datePart]) {
			acc[datePart] = []
		}
		acc[datePart].push(item)
		return acc
	}, {})

	const formattedResponse = Object.keys(groupedByDate).map((dateKey) => {
		const items = groupedByDate[dateKey]
		const [day, month, year] = dateKey.split('/').map(Number)

		return {
			day,
			month: getMonthName(dateKey),
			weekday: getWeekdayName(dateKey),
			selected: false,
			schedules: items.map((item) => ({
				time: convertTimeSlot(item.timeSlot),
				serviceDateTime: item.serviceDateTime,
			})),
		}
	})

	return { newSchedule: formattedResponse }
}

function getMonthName(dateString) {
	const [datePart] = dateString.split(' ')
	const [day, month, year] = datePart.split('/').map(Number)
	const date = new Date(year, month - 1, day)

	if (isNaN(date.getTime())) {
		throw new Error(`Invalid Date: ${dateString}`)
	}
	return CONSTANT.MONTH_NAMES[date.getMonth()]
}

function getWeekdayName(dateString) {
	const [datePart] = dateString.split(' ')
	const [day, month, year] = datePart.split('/').map(Number)
	const date = new Date(year, month - 1, day)

	if (isNaN(date.getTime())) {
		throw new Error(`Invalid Date: ${dateString}`)
	}
	return CONSTANT.WEEKDAY_NAMES[date.getDay()]
}

function convertTimeSlot(timeSlot) {
	return timeSlot.replace('-', ' às ')
}
