require('dotenv').config()
/* istanbul ignore next */
exports.NODE_ENV = process.env.NODE_ENV || 'development'

exports.AWS_REGION = 'ca-central-1'
exports.TRAVEL_QUEUE =
	process.env.TRAVEL_QUEUE ||
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-acq-travel-transmission'
exports.RESIDENTIAL_QUEUE =
	process.env.RESIDENTIAL_QUEUE ||
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-acq-residential-transmission'
