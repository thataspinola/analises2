const app = require('../../index')

const mockedLocalData = {
	body: JSON.stringify({
		nome: 'Josenaldo Dias çisã Zacâ àieá',
		nomeSocial: 'Sílva Divã',
		taxvat: '90443272085',
		email: 'elto.silvan@portoseguro.com.br',
		celular: '11981234198',
		tentativas: 1,
		sessionId: '202391111219317701711-6T4XUGKR',
		ipAddress: '10.95.174.37',
		userAgent: 'Porto Seguro 1.52.0 (iPhone11)',
	}),
}

console.log(JSON.stringify(mockedLocalData))

app
	.handler(mockedLocalData, {})
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
