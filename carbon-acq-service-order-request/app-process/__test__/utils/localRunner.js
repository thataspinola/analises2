const app = require('../../index')
const MOCKS = require('../mocks/index.mock')
const event = JSON.parse(JSON.stringify(MOCKS.HANDLER.VALID_EVENT_INPUT()))
event.Records = [JSON.parse(JSON.stringify(event.Records[0]))]
const firstRecordParsedBody = JSON.parse(event.Records[0].body)

const generateSiebelIntegrationId = () => {
	return `${Date.now()}${Math.floor(Math.random() * 1000000)}`
}

firstRecordParsedBody.integrationData.serviceOrder.siebelIntegrationId =
	generateSiebelIntegrationId()
event.Records[0].body = JSON.stringify(firstRecordParsedBody)

app
	.handler(event)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
