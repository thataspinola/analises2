const controller = require('./src/controller')
const service = require('./src/service')

module.exports.handler = async (event) => {
	const records = event.Records.map(async (record, index) => {
		return new Promise((resolve, reject) => {
			try {
				service.logger.info(`EVENTO RECEBIDO: ${record.body}`)

				const parsedInput = JSON.parse(record.body)

				if (parsedInput.creditCards === false) {
					service.logger.info(
						`[NÃO REALIZAR A CHAMADA PARA GOOD CARDS][TOGGLE GOOD CARDS] = ${parsedInput.creditCards}`
					)
				} else {
					service.logger.info(
						`[REALIZAR A CHAMADA PARA GOOD CARDS][TOGGLE GOOD CARDS] = ${parsedInput.creditCards}`
					)
					controller.goodCard.process(parsedInput).then(resolve).catch(reject)
				}
			} catch (error) {
				service.logger.error(`Error to parse input message: ${record.body}`)
				reject(error)
			}
		})
	})

	const response = await Promise.allSettled(records)

	const batchItemFailures = []
	for (const [idx, record] of Object.entries(event.Records)) {
		const { status, reason } = response[idx]
		if (status === 'fulfilled') continue

		batchItemFailures.push({
			itemIdentifier: record.messageId,
		})
	}

	return {
		batchItemFailures,
	}
}
