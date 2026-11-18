const app = require('../../index')

const mockedLocalData = {
	cpf: '00000017400',
}

app
	.handler({
		queryStringParameters: mockedLocalData,
	})
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
