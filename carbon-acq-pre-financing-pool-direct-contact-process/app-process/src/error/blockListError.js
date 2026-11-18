class BlockListError extends Error {
	constructor(args) {
		super(args)
		this.name = 'BlockListError'
	}
}

module.exports = BlockListError
