const { handler } = require('../../')

const mockedLocalData = {
	body: JSON.stringify({
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '53864971039',
		codigoCampanha: '86',
		creditCards: false,
		eligibility: false
	}),
}

async function process() {
	try {
		const response = await handler(mockedLocalData)
		console.log('🚀 ~ Sucesso:', JSON.stringify(response, null, 2))
	} catch (error) {
		console.log('🚀 ~ Erro:', error)
	}
}

process()
