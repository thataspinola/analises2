const CONST = require('../../../src/property')
global[CONST.LOGGER] = 'teste'
const service = require('../../../src/service')

describe('given loggerService call', () => {
	test('should not do anything if logger is already instantiated', () => {
		expect(global[CONST.LOGGER]).toBe('teste')
	})
})
