const handler = require('../..')
const uuidV4 = require('uuid').v4()

const mockUpdateLeadRequest = (events) => {
	let records = []
	for (const event of events) {
		const response = {
			messageId: `${uuidV4}`,
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
		codigo_vdo: 12345,
		id_ramo: 27,
		pmc_observacoes: 'Produto precisa de vistoria previa',
	},
]

const sqsInputData = mockUpdateLeadRequest(mockedLocalData)

handler
	.handler(sqsInputData)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
