const app = require('../../index')
const factory = require('./factory')

const currentDateTime = new Date()
const mockedLocalDataItem0SnsMessageAttributes =
	factory.sqsMockedLambdaPayload.getConsentsSnsMessageAttributes(
		currentDateTime,
		'1087633-24',
		'SERVICE_ORDER_RECEIVED'
	)
const mockedLocalDataItem0SnsMessage =
	factory.sqsMockedLambdaPayload.getConsentsSnsMessage(
		mockedLocalDataItem0SnsMessageAttributes,
		{
			carbonTraceId: '12345',
			eCommercePlatform: {
				orderNumber: '12345',
				loggedCPF: '48912354892',
			},
			externalId: '2410987',
			transactionId: 'e9d9299e-223b-42cd-9178-51f0d3442a2e',
			itemId: '4329',
			contactEmail: 'fulano.silva@gmail.com',
			installments: 1,
			amount: 98.72,
			leadIdentifier: '1723639908410',
			paymentData: {
				externo: true,
				empresa: '51',
				filial: '0101',
				hash: '',
				proposta: '',
				tipoTransacao: 'PRE_AUTORIZACAO',
			},
			integrationData: {
				serviceOrderNumber: '1087633-24',
				serviceOrder: {
					schedule: {
						startDateTime: '2024-09-20T08:00:00.000',
						endDateTime: '2024-09-20T10:00:00.000',
						openOsDateTime: '2024-09-20T10:00:00.000',
						key: '20092024153000162100',
					},
					siebelIntegrationId: '1726843125965902167',
					serviceId: '100',
					sku: 'ED001',
					specialtyCode: '44',
					originCode: '9',
					companyCode: '1',
					sourceSystemCode: '17',
					coupon: 'TESTE',
					problem: '586',
					subject: 'UI1',
					combo: {
						id: 53,
						items: [
							{
								productId: 2417,
								quantity: 1,
							},
							{
								productId: 2417,
								quantity: 1,
							},
						],
					},
				},
				customer: {
					name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
					socialName: '',
					email: 'fulano.silva@gmail.com',
					cellphone: '11222225555',
					documentNumber: '58489669074',
				},
				serviceAddress: {
					city: 'Sao Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista',
					street: 'Avenida Paulista',
					streetType: '',
					streetNumber: '982',
					latitude: -23.5649224,
					longitude: -46.6519376,
					reference: '',
					additionalInfo: '',
				},
			},
		}
	)
const mockedSnsTopicMessages = [
	factory.sqsMockedLambdaPayload.getSnsTopicMessage(
		mockedLocalDataItem0SnsMessage,
		mockedLocalDataItem0SnsMessageAttributes
	),
]

const sqsInputData = factory.sqsMockedLambdaPayload.getPayloadFromSnsTopic(
	mockedSnsTopicMessages,
	'791702935403',
	'ca-central-1',
	'791702935403',
	'service-order-schedule-confirm',
	'carbon-acq-service-order-schedule-confirm'
)

app
	.handler(sqsInputData)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
