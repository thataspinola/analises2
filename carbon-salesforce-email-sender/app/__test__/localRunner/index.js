const app = require('../../index')

const mockedLocalDataWithTransactionId = {
	body: JSON.stringify({
		transactionId: '1152911716',
		status: 'SUCCESS',
		scope: 'phone',
	}),
}

const mockedLocalDataWithTransactionIdPortableDevice = {
	body: JSON.stringify({
		transactionId: '1152631931',
		status: 'SUCCESS',
		scope: 'portable_device',
	}),
}

app
	.handler(mockedLocalDataWithTransactionId)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})

const mockedLocalDataWithPaymentData = {
	body: JSON.stringify({
		status: 'ERROR',
		scope: 'phone',
		paymentData: {
			orderNumber: '000007834',
			orderPaymentId: '19283192983012-akjshdkjhasd-aksjdla',
			externalId: '58000000010551',
			chargeId: 'alkjsdklajlskdjakljsdkl',
			productCode: 61,
			scope: 'phone',
			amount: 100,
			contactEmail: 'jose@das.couves',
			status: 'PAGA',
			installments: 1,
			charges: [
				{
					paymentMethod: 'CREDIT_CARD',
					amount: 300.0,
					creditCard: {
						id: '7dc64d75-63a7-46a0-8ed6-9ab11d52f3eb',
						preferred: true,
						saveCard: false,
					},
				},
			],
		},
	}),
}

app
	.handler(mockedLocalDataWithPaymentData)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
