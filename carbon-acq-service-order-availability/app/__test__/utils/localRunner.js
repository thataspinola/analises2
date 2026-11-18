const MOCKS = require('../mocks/index.mock')
const app = require('../../index')

const mockedLocalData = {
	body: JSON.stringify(MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()),
}

app
	.handler(mockedLocalData)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
