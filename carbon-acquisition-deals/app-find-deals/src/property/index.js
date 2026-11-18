require('dotenv').config()
/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
exports.NODE_ENV = NODE_ENV_VALUE

exports.DEALS_DATA_LIBRARY_LOCATION =
	'@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer'
