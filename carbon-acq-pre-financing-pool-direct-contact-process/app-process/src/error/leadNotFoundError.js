class LeadNotFoundError extends Error {
	constructor(args) {
		super(args)
		this.name = 'LeadNotFoundError'
	}
}

module.exports = LeadNotFoundError
