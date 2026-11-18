class UserDataValidationError extends Error {
	constructor(message) {
		super(message)
		this.name = this.constructor.name
		this.code = 400
	}
}

global.UserDataValidationError = UserDataValidationError
