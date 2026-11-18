const errors = require('../error')

exports.externalApiErrorFactory = (error) => {
	if (error.code == 400) {
		return new errors.BadRequest(error)
	} else if (error.code == 404) {
		return new errors.NotFoundError(error)
	}

	return new errors.ExternalApiError(error)
}
