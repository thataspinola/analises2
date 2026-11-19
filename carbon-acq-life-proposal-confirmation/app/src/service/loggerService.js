const logMetadata = require('./logMetadata')
const CONSTANT = require('../property')
const pino = require('pino')
const packageJson = require('./../../package.json')

const logger = pino({
    hooks: {
        logMethod(args, method) {
            const first = args[0]
            const errorKey = first && typeof first === 'object'
                ? ['err', 'error', 'rawError'].find((key) => Object.hasOwn(first, key))
                : undefined
            if (first instanceof Error || errorKey) {
                const metadata = first instanceof Error ? {} : { ...first }
                const error = first instanceof Error ? first : first[errorKey]
                delete metadata.err
                delete metadata.error
                delete metadata.rawError
                return method.call(this, { ...metadata, error: logMetadata.errorSummary(error) }, 'Operation failed')
            }
            return method.apply(this, args)
        },
    },
    serializers: {
        err: logMetadata.errorSummary,
        error: logMetadata.errorSummary,
    },
    redact: {
        paths: ['rawError', 'body', 'payload', 'event', 'Event', 'request', 'response', 'config', 'headers', 'token', 'authorization', 'password', '*.rawError', '*.body', '*.payload', '*.headers'],
        remove: true,
    },
	formatters: {
		bindings() {
			return {
				environment: CONSTANT.NODE_ENV,
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
