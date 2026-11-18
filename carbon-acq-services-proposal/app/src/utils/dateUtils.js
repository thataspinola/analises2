/**
 * Tries to create a Date object from a string supporting multiple formats
 * (DD/MM/YYYY HH:mm:ss or YYYY-MM-DDTHH:mm:ss).
 *
 * @param {string} dateString - The date string to be parsed.
 * @returns {Date} A valid Date object.
 * @throws {Error} If the date string is not in a recognized format or is invalid.
 */
exports.parseDateTime = (dateString) => {
	if (typeof dateString !== 'string') {
		throw new Error(
			`Invalid input type. Expected string, got ${typeof dateString}`
		)
	}

	if (!dateString) {
		throw new Error(`Invalid Date: ${dateString}`)
	}

	// 1. Check for 'DD/MM/YYYY HH:mm:ss' format (uses '/')
	if (dateString.includes('/')) {
		const parts = dateString.split(' ')
		if (parts.length !== 2) {
			throw new Error(
				`Invalid Date format: ${dateString}. Expected DD/MM/YYYY HH:mm:ss`
			)
		}

		const [datePart, timePart] = parts
		const dateParts = datePart.split('/').map(Number)
		// Supports HH:mm or HH:mm:ss
		const timeParts = timePart.split(':').map(Number)

		if (
			dateParts.length !== 3 ||
			timeParts.length < 2 ||
			timeParts.length > 3
		) {
			throw new Error(`Invalid Date components: ${dateString}`)
		}

		const [day, month, year] = dateParts
		// Uses default value of 0 for seconds if missing (e.g., HH:mm)
		const [hours, minutes, seconds = 0] = timeParts

		// Validação básica (mês entre 1-12, dia entre 1-31)
		if (day < 1 || day > 31 || month < 1 || month > 12) {
			throw new Error(`Invalid Date: ${dateString}`)
		}

		// Tenta criar a data em UTC
		const dateTime = new Date(
			Date.UTC(year, month - 1, day, hours, minutes, seconds)
		)

		// **VALIDAÇÃO ROBUSTA CONTRA ROLL-OVER (DIA 32, ETC.)**
		// Se o Date.UTC ajustou o mês ou o dia (ex: 32/10 vira 01/11), a data é inválida.
		if (dateTime.getUTCMonth() !== month - 1 || dateTime.getUTCDate() !== day) {
			throw new Error(`Invalid Date: ${dateString}`)
		}

		if (isNaN(dateTime.getTime())) {
			throw new Error(`Invalid Date: ${dateString}`)
		}
		return dateTime
	}

	// 2. Fallback to native constructor for 'YYYY-MM-DDTHH:mm:ss' or other ISO-like formats
	const dateTime = new Date(dateString)

	if (isNaN(dateTime.getTime())) {
		throw new Error(`Invalid Date: ${dateString}`)
	}

	return dateTime
}

/**
 * Formats a Date object to the ISO UTC string (YYYY-MM-DDTHH:mm:ss.000Z).
 *
 * @param {Date} date - The Date object to be formatted.
 * @returns {string} The formatted UTC string (e.g., "2025-10-14T15:00:00.000Z").
 */
exports.formatUtcDate = (date) => {
	// Uses toISOString to get UTC format, then slices to 19 characters,
	// adds '.000', and re-adds 'Z'.
	const formatUtc = date.toISOString().slice(0, 19) + '.000'
	return `${formatUtc}Z`
}

/**
 * Converts a date string from 'dd/MM/yyyy HH:mm' format to 'yyyy-MM-ddTHH:mm:ss' format.
 * Since the input lacks seconds, '00' is added for the seconds component.
 * // Regular Expression for validation:
    // ^                   - Start of string
    // (0[1-9]|[12]\d|3[01]) - Day: 01-09 or 10-29 or 30-31
    // \/                  - Literal '/' separator
    // (0[1-9]|1[0-2])     - Month: 01-09 or 10-12
    // \/                  - Literal '/' separator
    // (\d{4})             - Year: Four digits
    // \s                  - Single space separator
    // ([01]\d|2[0-3])     - Hour: 00-19 or 20-23
    // :                   - Literal ':' separator
    // ([0-5]\d)           - Minute: 00-59
    // $                   - End of string
 * * @param {string} dateString The date string in 'dd/MM/yyyy HH:mm' format (e.g., "16/10/2025 10:30").
 * @returns {string} The date string in 'yyyy-MM-ddTHH:mm:ss' format (e.g., "2025-10-16T10:30:00").
 */
exports.formatDateString = (dateString) => {
	const formatRegex =
		/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(\d{4})\s([01]\d|2[0-3]):([0-5]\d)$/

	if (typeof dateString !== 'string' || !formatRegex.test(dateString)) {
		throw new Error(
			`Invalid input: Expected valid date string 'dd/MM/yyyy HH:mm' - ${dateString}`
		)
	}
	
	const [datePart, timePart] = dateString.split(' ')

	const [day, month, year] = datePart.split('/')

	return `${year}-${month}-${day}T${timePart}:00`
}
