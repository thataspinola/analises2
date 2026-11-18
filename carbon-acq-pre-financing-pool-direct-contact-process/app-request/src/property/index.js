/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'

const { join } = require('path')

exports.NODE_ENV = NODE_ENV_VALUE

exports.COMMON_LIBRARY_LOCATION = getCommonLibraryLocation(NODE_ENV_VALUE)

exports.AWS_REGION = 'ca-central-1'
exports.DIRECT_CONTACT_REQUESTS_QUEUE =
	process.env.DIRECT_CONTACT_REQUESTS_QUEUE ||
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-pre-financing-pool-direct-contact-requests'
function getCommonLibraryLocation(NODE_ENV) {
	const LOCAL_LOCATION = join(
		__dirname,
		'../../../app-common/nodejs/carbon-acq-pre-financing-pool-direct-contact-common'
	)
	const LAYER_LOCATION =
		'/opt/nodejs/carbon-acq-pre-financing-pool-direct-contact-common'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return LOCAL_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}
