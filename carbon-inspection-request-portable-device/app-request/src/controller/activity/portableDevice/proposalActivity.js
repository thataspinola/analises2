const service = require('../../../service')
const api = require('../../../api')
const factory = require('../../../factory')

exports.send = async (data, token, portoCertificates) => {
	let currentActivity = 'envio da proposta de equipamento portatil'
	try {
		const { integrationData, amount, installments, externalId, charges } = data
		const proposalApiPayload =
			await factory.api.portableDevice.proposal.makePayload(
				integrationData,
				amount,
				installments,
				externalId,
				charges
			)
		service.logger.info(
			{ payload: { ...proposalApiPayload } },
			'Dados enviados para o produto.'
		)
		const proposalApiResponse = await api.portableDevice.proposal.execute(
			proposalApiPayload,
			token,
			portoCertificates
		)

		currentActivity =
			'Retorno do endpoint de envio da proposta de equipamento portatil'
		service.logger.info(
			`${currentActivity} ${JSON.stringify(proposalApiResponse)}`
		)

		if (!proposalApiResponse?.numeroProposta) {
			throw new Error('idTransaction/numeroProposta não localizado.')
		}

		return proposalApiResponse?.numeroProposta
	} catch (error) {
		const currentActivityMessage = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`

		const errorReporting = {
			rawError: error,
			carbonErrorData: {
				layer: 'proposalActivity',
				currentActivity: currentActivityMessage,
				errorMessage: error.message,
			},
		}
		service.logger.error(errorReporting, error.message)

		throw error
	}
}
