const pino = require('pino')
const { NODE_ENV } = require('../property')
const packageJson = require('../../package.json')

const pinoConfig = {
	formatters: {
		bindings() {
			return {
				application: packageJson.name.slice(packageJson.name.indexOf('/') + 1),
				environment: `${NODE_ENV}`,
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
}

module.exports = pino(pinoConfig)
