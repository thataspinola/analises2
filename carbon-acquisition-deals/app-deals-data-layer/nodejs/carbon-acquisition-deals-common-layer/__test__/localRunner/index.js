const dealsDataLayer = require('../../index')

const dealsData = {
	scope: 'eligibility',
	document: '77777777777',
	data: JSON.stringify({
		name: 'João da Silva',
	}),
}

const getDeals = {
	document: '21289337578',
}

const runner = async () => {
	try {
		const saveResponse = await dealsDataLayer.saveDealsData(dealsData)
		console.log(
			'>> Local Save Deals Response: ',
			JSON.stringify(saveResponse, null, 4)
		)
		// const getResponse = await dealsDataLayer.getDealsData(getDeals)
		// console.log('>> Local Get Deals Response: ', getResponse)
	} catch (error) {
		console.log('local error message: ', error.message)
		console.log('local error code: ', error.code)
		console.log('local error name: ', error.name)
	}
}

runner()
