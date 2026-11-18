const SCHEMA_DEFINITION = require('./searchProductsSchema')
exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

exports.GATEWAY_URL =
	process.env.GATEWAY_URL || 'https://ecom-stage.portoseguro.com.br'

exports.API_PATH = process.env.API_PATH || 'graphql'

exports.SEARCH_PRODUCTS_SCHEMA = SCHEMA_DEFINITION.SCHEMA

exports.SEARCH_PRODUCTS_TYPE_SKU = SCHEMA_DEFINITION.TYPE_SKU
exports.SEARCH_PRODUCTS_TYPE_ALL = SCHEMA_DEFINITION.TYPE_ALL
exports.SEARCH_PRODUCTS_TYPE_FILTER = SCHEMA_DEFINITION.TYPE_FILTER
exports.SEARCH_PRODUCTS_TYPE_CATEGORIES = SCHEMA_DEFINITION.TYPE_CATEGORIES
exports.SEARCH_PRODUCTS_TYPE_HIGHLIGHTS = SCHEMA_DEFINITION.TYPE_HIGHLIGHTS
exports.SEARCH_PRODUCTS_TYPE_PRODUCT_ALIAS =
	SCHEMA_DEFINITION.TYPE_PRODUCT_ALIAS
exports.SEARCH_PRODUCTS_TYPE_PRODUCT_CUPONS = SCHEMA_DEFINITION.TYPE_COUPONS

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API do Produto.`
exports.GRAPHQL_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao executar uma consulta GraphQL.`

/* istanbul ignore next */
exports.NODE_ENV = process.env.NODE_ENV || 'local'

exports.HIGHLIGHTS_DEFAULT =
	'hidraulicos, eletricos, desentupimento, eletrodomesticos'

exports.CATEGORIES_VITRINE = [
	{ name: 'Destaques', hash: 'destaques', menu: 'CASA', displayOrder: 1 },
	{
		name: 'Serviços Gerais',
		hash: 'servicos-gerais',
		menu: 'CASA',
		displayOrder: 2,
	},
	{ name: 'Encanador', hash: 'encanador', menu: 'CASA', displayOrder: 3 },
	{ name: 'Eletricista', hash: 'eletricista', menu: 'CASA', displayOrder: 4 },
	{ name: 'Limpeza', hash: 'limpeza', menu: 'CASA', displayOrder: 5 },
	{
		name: 'Ar-condicionado',
		hash: 'ar-condicionado',
		menu: 'CASA',
		displayOrder: 6,
	},
	{ name: 'Chaveiro', hash: 'chaveiro', menu: 'CASA', displayOrder: 7 },
	{ name: 'Auto e bike', hash: 'auto-e-bike', menu: 'CASA', displayOrder: 8 },
	{ name: 'Eletrodomésticos', hash: 'eletrodomesticos', menu: 'CASA', displayOrder: 9 },
	{ name: 'Serviços de gás', hash: 'gas', menu: 'CASA', displayOrder: 10 },
	{ name: 'Combos de Serviços', hash: 'combos', menu: 'CASA', displayOrder: 11 },
]
