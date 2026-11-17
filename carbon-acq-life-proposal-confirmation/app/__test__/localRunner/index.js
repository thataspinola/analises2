const { handler } = require('../../')

const mockedLocalData = {
	body: JSON.stringify({
		numeroOrcamento: '99999999',
		estadoSaude: 'Não',
		profissao: '2410-05',
	}),
}

handler(mockedLocalData)
	.then((res) => {
		console.log(JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log(err)
	})
