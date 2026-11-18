const app = require('../../index')
const MOCKS = require('../mocks/index.mock')

const mockedLocalProposalData = MOCKS.HANDLER.VALID_INPUT_PAYLOAD()

app
	.handler(mockedLocalProposalData)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
