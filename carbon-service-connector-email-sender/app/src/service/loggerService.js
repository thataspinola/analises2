const CONSTANT = require('../property')
const packageJson = require('../../package.json')
const pino = require('pino')

const logger = pino({
	formatters: {
		bindings() {
			return {
				environment: CONSTANT.NODE_ENV_VALUE,
				application: packageJson.name.slice(packageJson.name.indexOf('/') + 1),
				version: packageJson.version,
			}
		},
		level(label) {
			return {
				log_level: label.toUpperCase(),
			}
		},
	},
	timestamp: () => `,"date":"${new Date().toISOString()}"`,
	messageKey: 'log_message',
})

module.exports = logger
