const main = require('../../')

const mockedLocalData = { body: JSON.stringify({
	"taxvat": "06865600789" 
	})
}

main.handler(mockedLocalData)
	.then((res) => {
		console.log(JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log(err)
	})
