const app = require('../../index')
const factory = require('./factory')

const mockedLocalData = [
	JSON.stringify({
		taxvat: '25562387042',
		destinationnumber: '11987542247',
		corporativeheader:
			'eyJzZXNzaW9uSWQiOiI2OTA1NmY0Y2QyMDhhYWE4NTQ1Njg2MzlkMjgyMzcyNjQwNWU2ZWJmNTU5MzE0OTJkYzNjZTNhYWE2NzhmNTM5IiwiaXBBZGRyZXNzIjoiMTAuOTUuMTc0LjM3IiwidXNlckFnZW50IjoiUG9ydG8gU2VndXJvIDEuNTIuMCAoaVBob25lMTEpIiwicG9saWN5IjoiY2FkYXN0cm9faHViX3dlYiIsIm9yZ2FuaXphdGlvbklkIjoiNnQ0eHVna3IifQ==',
		formData: {
			nome: 'José da Silva',
			nomeSocial: 'Maria de Souza',
			email: 'email@teste.com',
			celular: '19998877665',
		},
		pescod: null,
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
