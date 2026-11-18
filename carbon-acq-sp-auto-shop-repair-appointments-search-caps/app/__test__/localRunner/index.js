const MOCKS = require('../mocks/index.mock.js')
const app = require('../../index')

const runTest = async (mockedLocalData) => {
	const event = {
		body: JSON.stringify(mockedLocalData)
	}

	try {
		const res = await app.handler(event)
		console.log(`Resposta para ${JSON.stringify(mockedLocalData)}:`, res)
	} catch (err) {
		console.error(`Erro para ${mockedLocalData}:`, err)
	}
}

const testPOST = async () => {
	await runTest(MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT())
}

const main = async () => {
	await testPOST()
}

main().catch((err) => {
	console.error('Erro no LocalRunner:', err)
})
