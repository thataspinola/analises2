const { handler } = require('../../')

const mockedLocalData = {
	plate: 'FYP0099',
	description: 'LOGAN',
	yearModel: 2016,
}

async function process() {
	try {
		const response = await handler({
			queryStringParameters: {
				plate: mockedLocalData.plate,
			},
		})
		console.log('🚀 ~ Sucesso ao veículo buscar por placa:', response)
	} catch (error) {
		console.log('🚀 ~ Erro ao buscar veículo por placa:', error)
	}

	try {
		const response = await handler({
			queryStringParameters: {
				description: mockedLocalData.description,
				yearModel: mockedLocalData.yearModel,
			},
		})
		console.log(
			'🚀 ~ Sucesso ao buscar veículo por descrição e ano modelo:',
			response
		)
	} catch (error) {
		console.log(
			'🚀 ~  Erro ao buscar veículo por descrição e ano modelo:',
			error
		)
	}
}

process()
