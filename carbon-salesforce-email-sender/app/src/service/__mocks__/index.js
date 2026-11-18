const logger = {
	info: jest.fn(),
	warn: jest.fn(),
	error: jest.fn(),
	debug: jest.fn(),
	trace: jest.fn(),
	fatal: jest.fn(),
}

const validation = {
	inputData: jest.fn(),
}

module.exports = { logger, validation }
