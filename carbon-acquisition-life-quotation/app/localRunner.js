const handler = require('.')

const mockedLocalData = {
	body: JSON.stringify({
		lifeinsurance: {
			date_of_birth: '1990-06-22',
			susep: 'CMHUBJ',
			salesMedium: 'HUB'
		}
	})
}

handler
	.handler(mockedLocalData, {})
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
