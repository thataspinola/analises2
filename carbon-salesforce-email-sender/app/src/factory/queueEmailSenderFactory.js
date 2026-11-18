const CONSTANTS = require('../property')
const service = require('../service')

function getInfos(scope) {
	return CONSTANTS.PRODUCTS_INFO[scope]
}

function getDefinitionKey(infos, status, needInspection, scope) {
	const definition_keys = infos.definition_keys

	if (scope === CONSTANTS.SCOPE.PD) {
		if (CONSTANTS.NODE_ENV === 'production') {
			return definition_keys[status]
		} else {
			return `HML_${definition_keys[status]}`
		}
	}

	const withoutInspection =
		typeof needInspection === 'boolean' && !needInspection && status !== 'ERROR'

	if (CONSTANTS.NODE_ENV === 'production')
		return `PROD_${
			withoutInspection
				? definition_keys.WITHOUT_INSPECTION
				: definition_keys[status]
		}`

	return withoutInspection
		? `HML_${definition_keys.WITHOUT_INSPECTION}`
		: `UAT_${definition_keys[status]}`
}

function getCampaignName(infos, status) {
	return infos.campaign[status]
}

const getFirstName = (fullName) => fullName.split(' ')[0]

const getCoastCenter = (infos) => {
	return infos.coastCenter
}

function checkField(value) {
	if (value && value.toString().toUpperCase().trim() === 'NÃO PREENCHIDO') {
		value = null
		service.logger.warn('removido campo não preenchido')
	}

	return value
}

function getProductName(scope, infos, idBranch) {
	if (scope == CONSTANTS.SCOPE.PD) {
		switch (idBranch) {
			case 201:
				return 'Equipamentos-Portateis-foto-e-video'
			case 202:
				return 'Equipamentos-Portateis-notebook-e-tablet'
			case 203:
				return 'Equipamentos-Portateis-smart-e-games'
			default:
				service.logger.error(
					'idBranch não encontrado para identificar o nome do produto (foto-e-video, notebook-e-tablet, smart-e-games)'
				)
				break
		}
	}
	return infos.name
}

exports.createMessage = (inputData, additionalInfo) => {
	const { scope, status } = inputData
	const {
		pescod,
		clientEmail,
		clientName,
		brokerName,
		brokerPhone,
		brokerEmail,
		needInspection,
		idBranch,
	} = additionalInfo

	const infos = getInfos(scope)

	const definitionKey = getDefinitionKey(infos, status, needInspection, scope)

	return {
		scope,
		payload: {
			contactEmail: clientEmail,
			definitionKey,
			pescod: String(pescod),
			attributes: {
				Produto: getProductName(scope, infos, idBranch),
				Area: 'Hub',
				Centro_de_Custo: getCoastCenter(infos),
				PrimeiroNome: getFirstName(clientName),
				NomeCorretor: checkField(brokerName),
				TelefoneCorretor: checkField(brokerPhone),
				EmailCorretor: checkField(brokerEmail),
				Nome_Campanha: getCampaignName(infos, status),
			},
		},
	}
}
