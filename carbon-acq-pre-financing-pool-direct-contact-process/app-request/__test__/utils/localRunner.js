const app = require('../../index')

const mockedLocalData = JSON.stringify({
	client: {
		fullName: 'Nome Sobrenome',
		cpfCnpj: '01141361060',
		cellPhone: '19988774455',
		email: 'cliente@clienteproduto.com.br',
	},
	address: {
		zipCode: '01254-985',
	},
	marketingOptOutFlag: false,
	flag: "pre_financing_contact_request",
	channel: 'whatsapp',
	product: 'AUTOMOVEL',
})

console.log(JSON.stringify(mockedLocalData))

app
	.handler(mockedLocalData, {})
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
