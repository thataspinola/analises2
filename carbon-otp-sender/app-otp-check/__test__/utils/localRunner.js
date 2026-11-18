const app = require('../../index')

const mockedLocalData = {
	body: JSON.stringify({
		taxvat: '80319257045',
		codigo: '1234567',
	}),
}

app
	.handler(mockedLocalData, {})
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
