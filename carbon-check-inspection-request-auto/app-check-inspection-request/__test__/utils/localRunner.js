const app = require('../../index')
const factory = require('./factory')

const mockedLocalData = [
	JSON.stringify({
		orderNumber: '3000617082',
		externalId: '00001',
		productCode: 'f626558b-a24b-4861-b0f8-50fc184f18fc',
		scope: 'auto',
		amount: 100,
		contactEmail: 'teste@teste.com.br',
		installments: 1,
		idTransaction: '00123456',
		inspectionStatusProcessCount: 0,
		inspectionRequestDate: '2023-11-21T01:30:00.000-05:00',
		quotationNumber: '30000572475',
	}),
]

const sqsInputData = factory.sqsMockedLambdaPayload.getPayload(mockedLocalData)

app
	.handler(sqsInputData)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
