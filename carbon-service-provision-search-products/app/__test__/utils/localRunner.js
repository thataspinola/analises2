const app = require('../../index')

//POST
const mockedLocalDataAllCategories = {
	body: JSON.stringify({
		type: 'categories',
		value: '',
	}),
}

const mockedLocalDataCategory = {
	body: JSON.stringify({
		type: 'categories',
		value: 'Limpeza',
	}),
}

const mockedLocalDataSku = {
	body: JSON.stringify({
		type: 'sku',
		value: 'LI001',
	}),
}

const mockedLocalDataHighlights = {
	body: JSON.stringify({
		type: 'highlights',
		value: '',
	}),
}

const mockedLocalDataAlias = {
	httpMethod: 'POST',
	body: JSON.stringify({
		type: 'productAlias',
		value: 'casa-em-dia',
	}),
}

const mockedLocalDataFilter = {
	body: JSON.stringify({
		type: 'filter',
		value: 'Eletros',
	}),
}

const mockedLocalDataAll = {
	body: JSON.stringify({
		type: 'all',
		value: '',
	}),
}

const mockedLocalDataCategoryProducts = {
	httpMethod: 'POST',
	body: JSON.stringify({
		type: 'categoryProducts',
		value: '',
	}),
}

const mockedLocalDataCategoryNotFound = {
	httpMethod: 'POST',
	body: JSON.stringify({
		type: 'categories',
		value: 'categoria-que-nao-existe',
	}),
}

Promise.all([
	// app
	// 	.handler(mockedLocalDataAllCategories)
	// 	.then((res) => {
	// 		console.log('LOCAL(all categories) res: ', JSON.stringify(res, null, 2))
	// 	})
	// 	.catch((err) => {
	// 		console.log('LOCAL(all categories) err: ', err)
	// 	}),
	app
		.handler(mockedLocalDataCategoryNotFound)
		.then((res) => {
			console.log('LOCAL (category not found) res: ', JSON.stringify(res, null, 2))
		})
		.catch((err) => {
			console.log('LOCAL (category not found) err: ', err)
		}),
	// app
	// 	.handler(mockedLocalDataCategory)
	// 	.then((res) => {
	// 		console.log('LOCAL (category) res: ', JSON.stringify(res, null, 2))
	// 	})
	// 	.catch((err) => {
	// 		console.log('LOCAL (category) err: ', err)
	// 	}),
	// app
	// 	.handler(mockedLocalDataSku)
	// 	.then((res) => {
	// 		console.log('LOCAL (sku) res: ', JSON.stringify(res, null, 2))
	// 	})
	// 	.catch((err) => {
	// 		console.log('LOCAL (sku) err: ', err)
	// 	}),
	// app
	// 	.handler(mockedLocalDataHighlights)
	// 	.then((res) => {
	// 		console.log('LOCAL (highlights) res: ', JSON.stringify(res, null, 2))
	// 	})
	// 	.catch((err) => {
	// 		console.log('LOCAL (highlights) err: ', err)
	// 	}),
	app
		.handler(mockedLocalDataAlias)
		.then((res) => {
			console.log('LOCAL (alias) res: ', JSON.stringify(res, null, 2))
		})
		.catch((err) => {
			console.log('LOCAL (alias) err: ', err)
		}),
	// app
	// 	.handler(mockedLocalDataFilter)
	// 	.then((res) => {
	// 		console.log('LOCAL (filter) res: ', JSON.stringify(res, null, 2))
	// 	})
	// 	.catch((err) => {
	// 		console.log('LOCAL (filter) err: ', err)
	// 	}),
	// app
	// 	.handler(mockedLocalDataAll)
	// 	.then((res) => {
	// 		console.log('LOCAL (all) res: ', JSON.stringify(res, null, 2))
	// 	})
	// 	.catch((err) => {
	// 		console.log('LOCAL (all) err: ', err)
	// 	}),
])
