const app = require('../../index')

const messageData = {
	scope: "travel",
	status: "PAGA", 
	leadIdentifier: "1759928032993",
	integrationData: {
		idBranch: 610,
	}
}

const mockedLocalData = {
	Records: [
		{
			messageId: `1212312edqwse12`,
			receiptHandle: 'MessageReceiptHandle',
			body: JSON.stringify(messageData),
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
	],
}

app.handler(mockedLocalData)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
