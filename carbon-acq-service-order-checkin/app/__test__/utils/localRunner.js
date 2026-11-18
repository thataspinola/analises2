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
    carbonTraceId: '179265dc-f013-4fe4-a010-a0aae2103877',
    eCommercePlatform: {
        orderNumber: '000155349',
        loggedCPF: '12345678901',
    },
    externalId: '6523230058',
    transactionId: 'd1d44177-3ad3-41f6-9869-53e20719d7bb',
    itemId: '4329',
    contactEmail: 'someone@somewhere.com.br',
    installments: 1,
    productCode: '82c2862b-7680-4ff2-b6fb-8fb3ad8001b2',
    amount: 25.8,
    leadIdentifier: '1723639908410',
    paymentData: {
        externo: false,
        empresa: '001',
        filial: '1',
        hash: '',
        proposta: '',
    },
    integrationData: {
		serviceOrderNumber : "000155349",
        serviceOrder: {
            schedule: {
                startDateTime: '2024-04-16T08:00:00.000',
                endDateTime: '2024-04-16T10:00:00.000',
                openOsDateTime: '2024-04-16T10:00:00.000',
                key: '02092024193000161456',
            },
            siebelIntegrationId: '160820240800009118209',
            serviceId: '1234',
            sku: 'ABC123',
            specialtyCode: '12345',
            originCode: '12',
            companyCode: '12345',
            sourceSystemCode: '12333',
            problem: '11',
            subject: '12',
            coupon: 'TESTE123',
            susep: 'TST03J',
            linkBrokerOrigin: false,
            combo: {
                id: '111',
                items: [
                    {
                        productId: '122222',
                        quantity: 1,
                    },
                ],
            },
        },
        customer: {
            name: 'Someone Somename',
            socialName: '',
            email: 'someone@somewhere.com.br',
            cellphone: '119876543210',
            documentNumber: '12345678901',
        },
        serviceAddress: {
            city: 'Sao Paulo',
            state: 'SP',
            zipCode: '01310100',
            neighborhood: 'Bela Vista',
            street: 'Avenida Paulista',
            latitude: -23.5649224,
            streetType: 1,
            streetNumber: '982',
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
	'service-order-checkin',
	'carbon-acq-service-order-checkin'
)

app
	.handler(sqsInputData)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
