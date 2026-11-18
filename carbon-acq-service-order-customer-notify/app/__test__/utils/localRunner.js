const app = require('../../index')
const MOCKS = require('../mocks/index.mock')
const event = JSON.parse(JSON.stringify(MOCKS.HANDLER.VALID_EVENT_INPUT()))
event.Records = [JSON.parse(JSON.stringify(event.Records[0]))]
const firstRecordParsedBody = JSON.parse(event.Records[0].body)
const firstRecordParsedBodyParsedMessage = JSON.parse(
	firstRecordParsedBody.Message
)
firstRecordParsedBodyParsedMessage.payload.integrationData.customer.email =
	'email.teste@portoseguro.com.br' //TODO: Ao rodar, sempre substituir por um e-mail qual se tem acesso à caixa de entrada para validar o recebimento
event.Records[0].body = JSON.stringify({
	...firstRecordParsedBody,
	Message: JSON.stringify(firstRecordParsedBodyParsedMessage),
})

app
	.handler(event)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
