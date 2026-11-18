const MOCKS = require('../../mocks/index.mock')
const CONSTANT = require('../../../src/property/index')
const service = require('../../../src/service')

describe('Given a inputData call using SERVICE_PROPOSAL_SCHEMA', () => {
	test('It should not throw errors after validate an object that follows expected schema', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT(),
				CONSTANT.SERVICE_PROPOSAL_SCHEMA
			)
		}).not.toThrow()
	})

	test('It should not throw errors after validate an object that follows expected schema with combo product', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_WITH_COMBO_INPUT(),
				CONSTANT.SERVICE_PROPOSAL_SCHEMA
			)
		}).not.toThrow()
	})
})
