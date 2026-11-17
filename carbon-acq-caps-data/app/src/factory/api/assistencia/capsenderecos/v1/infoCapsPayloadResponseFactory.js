function formatTime(timeStr) {
	if (!timeStr) return ''
	const timePart = timeStr.substring(
		timeStr.indexOf('T') + 1,
		timeStr.lastIndexOf(':')
	)
	return timePart.endsWith(':00')
		? timePart.slice(0, 2) + 'h'
		: timePart.replace(':', 'h')
}

function getWeekdayHours(item) {
	const start = item.AgendaHoraInicioSegunda
	const end = item.AgendaHoraFimSegunda
	if (
		start &&
		end &&
		start !== '1753-01-01T00:00:00' &&
		end !== '1753-01-01T00:00:00'
	) {
		return `Seg. a sex. das ${formatTime(start)} às ${formatTime(end)}`
	}
	return ''
}

function getSaturdayHours(item) {
	const start = item.AgendaHoraInicioSabado
	const end = item.AgendaHoraFimSabado
	if (
		start &&
		end &&
		start !== '1753-01-01T00:00:00' &&
		end !== '1753-01-01T00:00:00' &&
		start !== '1970-01-01T00:00:01' &&
		end !== '1970-01-01T00:00:01'
	) {
		return `Sáb. das ${formatTime(start)} às ${formatTime(end)}`
	}
	return ''
}

function getOperatingHours(item) {
	const weekdayHours = getWeekdayHours(item)
	const saturdayHours = getSaturdayHours(item)
	if (weekdayHours && saturdayHours) {
		return `${weekdayHours} - ${saturdayHours}`
	}
	return weekdayHours || saturdayHours
}

function formatPhone(phoneStr) {
	let areaCode = ''
	let phone = ''
	if (phoneStr) {
		const phoneParts = phoneStr.trim().split(' ')
		if (phoneParts.length > 1) {
			areaCode = phoneParts[0]
			phone = phoneParts.slice(1).join('')
			if (phone.length === 8) {
				phone = phone.replace(/(\d{4})(\d{4})/, '$1-$2')
			}
		} else {
			phone = phoneParts[0]
		}
	}
	return { areaCode, phone }
}

function computeOperatesAtNight(item) {
	const weekdays = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta']
	for (const day of weekdays) {
		const endTimeField = item[`AgendaHoraFim${day}`]
		if (endTimeField && endTimeField !== '1753-01-01T00:00:00') {
			const timePart = endTimeField.split('T')[1]
			if (timePart > '18:00:00') {
				return true
			}
		}
	}
	return false
}

exports.getPayload = (inputData, parsedInputData) => {
	const fullList = inputData.map((item) => {
		// HDV-21116 Regra: se empresa não tem número do endereço cadastrado,
		// não é possível seguir com o fluxo do agendamento; vamos retornar a lista sem essa empresa.
		if (!item.EmpresaLogradouroNumero) {
			return null
		}
		const address = `${item.EmpresaLogradouro.trim()}, ${item.EmpresaLogradouroNumero.trim()}`
		const state = item.EstadoCodigo.trim()

		const rawZip = item.EmpresaCEP.trim()
		const zipCode =
			rawZip.length === 8 ? rawZip.replace(/(\d{5})(\d{3})/, '$1-$2') : rawZip

		const { areaCode, phone } = formatPhone(item.TelefoneNumero)

		const workingSaturday =
			item.AgendaHoraInicioSabado &&
			item.AgendaHoraInicioSabado !== '1753-01-01T00:00:00' &&
			item.AgendaHoraInicioSabado !== '1970-01-01T00:00:01' &&
			item.AgendaHoraFimSabado !== '1970-01-01T00:00:01'

		const operatesAtNight = computeOperatesAtNight(item)

		const distance =
			item.distancia != null ? `${Math.round(item.distancia)} km` : null

		const images = item.imagens?.map((image) => {
			return {
				type: image.tipo,
				url: image.url,
			}
		})

		return {
			code: String(item.EmpresaCodigo),
			name: item.EmpresaNomeFantasia,
			address: address,
			district: item.EmpresaBairro,
			city: item.CidadeNome,
			state: state,
			zipCode: zipCode,
			areaCode: areaCode,
			phone: phone,
			companyName: item.EmpresaRazaoSocial,
			taxId: item.EmpresaCNPJ,
			workingSaturday: workingSaturday,
			email: item.EmpresaEmail,
			latitude:
				item.EmpresaLatitude != null ? String(item.EmpresaLatitude) : '',
			longitude:
				item.EmpresaLongitude != null ? String(item.EmpresaLongitude) : '',
			distance: distance,
			operatingHours: getOperatingHours(item),
			operatesAtNight: operatesAtNight,
			electricCharger: item?.CarregadorEletrico,
			images: images || [],
		}
	})

	let filteredList = fullList.filter((item) => item)
	if (parsedInputData.operatesAtNight) {
		const operatesAtNightParam = parsedInputData.operatesAtNight === 'true'
		filteredList = filteredList.filter(
			(item) => item.operatesAtNight === operatesAtNightParam
		)
	}

	if (parsedInputData.electricCharger) {
		const electricChargerParam = parsedInputData.electricCharger === 'true'

		if (electricChargerParam) {
			filteredList = filteredList.filter((item) => item.electricCharger === 1)
		} else {
			filteredList = filteredList.filter((item) => item.electricCharger === 0)
		}
	}

	if (parsedInputData.workingSaturday) {
		const workingSaturdayParam = parsedInputData.workingSaturday === 'true'
		filteredList = filteredList.filter(
			(item) => item.workingSaturday === workingSaturdayParam
		)
	}

	return filteredList
}
