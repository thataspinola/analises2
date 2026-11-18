const { handler } = require('../../')

const mockedLocalData = {
	// "scope": "pre-financing-pool",
    // "pre_financing_pool": {
    //     "tipoBem": "IMV",
    //     "valorCarta": 70000
    // }

	httpMethod: 'POST',
	body: JSON.stringify({
		scope: "pre-financing-pool",
		pre_financing_pool: {
			tipoBem: "AUT",
			parcela: 2800
		}
	})
}
async function process() {
	try {
		const response = await handler(mockedLocalData)
		console.log('Sucesso:', JSON.stringify(response))
	} catch (error) {
		console.log('Erro:', error)
	}
}

process()
