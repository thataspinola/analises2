const CONSTANT = require('../property')

class GraphQLError extends Error {
	constructor(message, code, stack) {
		super(message || CONSTANT.GRAPHQL_ERROR_DEFAULT_MESSAGE)
		this.name = this.constructor.name
		this.code = code
		this.stack = stack
	}
}

module.exports = GraphQLError
