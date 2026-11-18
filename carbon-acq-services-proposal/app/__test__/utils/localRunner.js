const app = require('../../index')
const MOCKS = require('../mocks/index.mock')

const mockedLocalProposalData = MOCKS.HANDLER.VALID_INPUT_PAYLOAD()

// const mockedLocalProposalComboData =
// 	MOCKS.HANDLER.VALID_INPUT_WITH_COMBO_PAYLOAD()

// app
// 	.handler(mockedLocalProposalComboData)
// 	.then((res) => {
// 		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
// 	})
// 	.catch((err) => {
// 		console.log('LOCAL err: ', err)
// 	})

app
	.handler(mockedLocalProposalData)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
