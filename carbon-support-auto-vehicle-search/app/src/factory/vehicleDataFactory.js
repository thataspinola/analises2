const {
	NO_ALPHANUMERICS_CHARACTERS_REGEX,
	REMOVE_TABS_AND_BRAKE_LINES_REGEX,
	REMOVE_CAT_COD_REGEX,
	PREMIUM_VEHICLE_VALUE
} = require('../property')

exports.sanitizePlate = (plate) => {
	if (typeof plate !== 'string') return plate

	return plate.replace(NO_ALPHANUMERICS_CHARACTERS_REGEX, '')
}

exports.parseDescriptionsPerPlate = (data) => {
	if (!data) return

	const valuesMarket = data?.valoresMercado

	return valuesMarket.map((value) => {
		const vehicleVersion = value.versaoVeiculo
		return {
			descricao: versionName(vehicleVersion),
			codigoVersao: value.codigoVersao,
			anoModelo: value.anoModelo,
			anoFabricacao: value.anoFabricacao,
			flagZeroKm: value.flagZeroKm,
			modelo: vehicleVersion.modelo,
			tipoVeiculo: tipoVeiculo(
				vehicleVersion.categoriaTarifariaOriginal.codigo
			),
			chassi: vehicleVersion.chassi,
			premium: isPremium(value.valorMercado),
			versao: version(vehicleVersion)
		}
	})
}

exports.parseDescriptionsPerDescriptionAndYearModel = (data) => {
	if (!data) return

	const valuesMarket = data?.valoresMercado

	return valuesMarket.map((value) => {
		const vehicleVersion = value.versaoVeiculo
		return {
			descricao: versionName(vehicleVersion),
			codigoVersao: value.codigoVersao,
			anoModelo: value.anoModelo,
			anoFabricacao: value.anoFabricacao,
			flagZeroKm: value.flagZeroKm,
			modelo: vehicleVersion.modelo,
			tipoVeiculo: tipoVeiculo(
				vehicleVersion.categoriaTarifariaOriginal.codigo
			),
			premium: isPremium(value.valorMercado),
			versao: version(vehicleVersion)
		}
	})
}

function removeTabsAndLineBrakes(vehicleVersion) {
	let versionStringCleared = vehicleVersion?.nomeVersao.replace(
		REMOVE_TABS_AND_BRAKE_LINES_REGEX,
		''
	)

	return versionStringCleared
}

function versionName(vehicleVersion) {
	const versionString = removeTabsAndLineBrakes(vehicleVersion)

	return versionString.replace(REMOVE_CAT_COD_REGEX, '')
}

function tipoVeiculo(codigo) {
	return [30, 31].includes(codigo) ? 'moto' : undefined
}

function isPremium(value) {
	return value >= PREMIUM_VEHICLE_VALUE
}

function version(vehicleVersion) {
	const name = versionName(vehicleVersion)
	const version = name.split(' - ')[0]
	const model = vehicleVersion.modelo
	return version.replace(model.marca.descricao, '').replace(model.nomeModelo, '').trim()
}
