const handler = require('../..')
const uuid = require('uuid')

const mockNotification = (events) => {
	let records = []
	for (const event of events) {
		const response = {
			messageId: `${uuid.v4()}`,
			receiptHandle: 'MessageReceiptHandle',
			body: JSON.stringify(event),
			attributes: {
				ApproximateReceiveCount: '1',
				SentTimestamp: '1523232000000',
				SenderId: '123456789012',
				ApproximateFirstReceiveTimestamp: '1523232000001',
			},
			messageAttributes: {},
			md5OfBody: '{{{md5_of_body}}}',
			eventSource: 'aws:sqs',
			eventSourceARN: 'arn:aws:sqs:ca-central-1:123456789012:MyQueue',
			awsRegion: 'ca-central-1',
		}

		records.push(response)
	}

	return {
		Records: records,
	}
}

const mockedLocalData = [
	{
		from: 'porto@portoseguro.com.br',
		to: ['willian.salvador@portoseguro.com.br'],
		cc: [],
		bcc: [],
		subject: 'Ocorreu um erro no seu pagamento',
		emailType: 'HTML',
		template: 'template/payment-rejected-notify.edge',
		metadata: {
			CUSTOMER_NAME: 'GOHAN, Larissa',
			CPF_CUSTOMER: '029468910-97, 029468910-97',
			TELEPHONE_CUSTOMER: '11911111111, 11911111111',
			EMAIL_CUSTOMER:
				'raul.seixas99999@email.com, larissa.ionafa@portoseguro.com.br',
		},
	},
]

const sqsInputData = mockNotification(mockedLocalData)

handler
	.handler(sqsInputData)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
