const logger = {
	info: jest.fn(),
	error: jest.fn(),
	warn: jest.fn(),
	debug: jest.fn(),
	trace: jest.fn(),
	fatal: jest.fn(),
	silent: jest.fn(),
}

const validation = {
	inputData: jest.fn(),
}

module.exports = { logger, validation }
