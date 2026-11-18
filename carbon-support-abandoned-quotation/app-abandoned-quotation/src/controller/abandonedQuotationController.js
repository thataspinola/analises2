const { carbonUpdateLeadApi } = require('../api')
const { updateLeadFactory } = require('../factory')
const { logger } = require('../service')

exports.process = async (event) => {
	logger.info({ event: { ...event } }, 'Evento Recebido')

	return Promise.all(
		event.Records.map(async (record) => {
			const inputData = record.dynamodb.OldImage
			const updateLeadPayload =
				updateLeadFactory.makeUpdateLeadPayload(inputData)

			const elapsedTime = elapsedTimeInMinutes(inputData)

			logger.info(
				{
					leadAbandonadoEm: `${elapsedTime} minutos`,
					payload: { ...updateLeadPayload },
				},
				'Payload enviado para atualização de lead'
			)

			const updateLeadResponse = await carbonUpdateLeadApi.updateLead(
				updateLeadPayload
			)

			logger.info(
				{ response: { ...updateLeadResponse } },
				'Response da atualização do lead'
			)

			return updateLeadResponse
		})
	)
}

function elapsedTimeInMinutes(inputData) {
	const expireTime = inputData.expireAt.N
	const currentTime = Math.floor(new Date().getTime() / 1000)
	const diffInSeconds = Math.abs(currentTime - expireTime)

	return Math.floor(diffInSeconds / 60)
}
