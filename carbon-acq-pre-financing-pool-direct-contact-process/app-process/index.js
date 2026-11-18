const controller = require('./src/controller')
const service = require('./src/service')
const CONSTANT = require('./src/property')
const commonLibrary = require(CONSTANT.COMMON_LIBRARY_LOCATION)

const lambdaHandler = async (event) => {
	const recordPromises = event.Records.map((record, index) => {
		return new Promise((resolve, reject) => {
			try {
				const parsedRequestMessageBody = JSON.parse(record.body)
				const flag = parsedRequestMessageBody.flag

				if(flag === commonLibrary.CREATE_PRE_FINANCING_FLAG){
					controller.directContact
					.processContact(parsedRequestMessageBody)
					.then(resolve)
					.catch(reject)
				}else if (flag === commonLibrary.UPDATE_PRE_FINANCING_FLAG) {
					controller.directContactUpdate
					.process(parsedRequestMessageBody)
					.then(resolve)
					.catch(reject)
				}else{
					throw new Error('There is not message \'flag\' field in Body')
				}
			} catch (error) {
				service.logger.error(`Processing message error: ${error.message}`)
				reject(error)
			}
		})
	})
	const response = await Promise.allSettled(recordPromises)
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

module.exports.handler = lambdaHandler
