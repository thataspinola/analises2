class DuplicatedLeadError extends Error {
	constructor(args) {
		super(args)
		this.name = 'DuplicatedLeadError'
	}
}

module.exports = DuplicatedLeadError
