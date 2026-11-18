const app = require('../../index')
const factory = require('./factory')

const mockedLocalData = [
	{
		flag: "pre_financing_contact_request",
		formData: {
			client: {
				fullName: 'Elias Pedro',
				cpfCnpj: '27059152067',
				cellPhone: '1198754422',
				email: 'elias.pedro@portoseguro.com.br',
				socialName: 'Elias Ribeiro',
			},
			address: {
				zipCode: '01254-985',
			},
			lead: { vdoCode: "1776254740501"},
			budget: {
				iof: "1,23",
				quotationValidity: "20/03/2026",
				installments: "4",
				installmentValue: "200",
				fullPaymentValue: "800"
			},
			marketingOptOutFlag: false,
			channel: 'whatsapp',
			product: 'AUTOMOVEL',
		},
	},
	{
		flag: "pre_financing_contact_request_update",
		formData: {
			lead: {
				vdoCode: "1226254760598",
				branchId: "24"
			}
		},
	},
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
