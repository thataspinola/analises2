const { handler } = require('../..')
const MOCKS = require('../mocks/index.mock')

const runTest = async (queryStringParameters) => {
	const event = {
		queryStringParameters: queryStringParameters,
	}

	try {
		const res = await handler(event)
		console.log(`Resposta para ${queryStringParameters}:`, res)
	} catch (err) {
		console.error(`Erro para ${queryStringParameters}:`, err)
	}
}

const testGET = async () => {
	await runTest(MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT())
}

const main = async () => {
	await testGET()
}

main().catch((err) => {
	console.error('Erro no LocalRunner:', err)
})
