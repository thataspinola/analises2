const service = require('../service')
const factory = require('../factory')
const CONSTANTS = require('../property')
const api = require('../api')
const errors = require('../error')

function validateInputData(inputData) {
	service.validation.inputData(inputData)

	const scope = CONSTANTS.BRANCH_IDS[inputData.scope]

	if (!inputData.integrationData?.idBranch && !scope) {
		throw new errors.ValidationError('id_ramo not found')
	}
}

async function updateLead(payload) {
	await api.carbonInternal.updateLead(payload)
}

exports.processSqsMessage = async (jsonParsedMessage) => {
	validateInputData(jsonParsedMessage)
	const updateLeadPayload = factory.updateLead.createPayload(jsonParsedMessage)

	service.logger.info(
		updateLeadPayload,
		'Payload enviado para a atualização do lead'
	)
	await updateLead(updateLeadPayload)
}
