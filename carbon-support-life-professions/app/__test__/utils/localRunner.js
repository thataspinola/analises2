const handler = require('../..')

const event = {
	queryStringParameters: {
		query: 'bombeiro',
	},
}

handler
	.handler(event)
	.then((res) => {
		console.log('Local res: ', res)
	})
	.catch((err) => {
		console.log('Local err: ', err)
	})
