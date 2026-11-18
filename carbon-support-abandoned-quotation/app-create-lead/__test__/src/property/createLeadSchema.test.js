const MOCKS = require('../../mocks/index.mock')
const CONSTANT = require('../../../src/property/index')
const service = require('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a inputData cal using CREATE_LEAD_SCHEMA', () => {
	test('It should not throw errors after validate an object that follows expected schema', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.VALID_INPUT(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw errors after validate an object that follows expected schema (including financing loans)', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.VALID_INPUT_FINANCING_LOANS(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw errors after validate an object that follows expected schema (called with payload that includes just required fields)', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.VALID_INPUT_JUSTREQUIRED(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw errors after validate an object that follows expected schema with pescod', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.VALID_INPUT_WITH_PESCOD(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw errors after validate an object that follows expected schema with idlink and linkorigin', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.VALID_INPUT_WITH_IDLINK_LINKORIGIN(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw errors after validate an object that follows expected schema with pescod, idlink and linkorigin', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.VALID_INPUT_WITH_PESCOD_IDLINK_LINKORIGIN(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})

	test('It should not throw errors after validate an object that follows expected schema without any utm_xxx field', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.VALID_INPUT_WITHOUT_UTMS(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw errors after validate an object that follows expected schema without idProduct', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.VALID_INPUT_WITHOUT_IDPRODUCT(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw errors after validate an object that follows expected schema without idProductType', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.VALID_INPUT_WITHOUT_IDPRODUCTTYPE(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw errors after validate an object that follows expected schema without idProduct and idProductType', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.VALID_INPUT_WITHOUT_IDPRODUCT_IDPRODUCTTYPE(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw errors after validate an object that follows expected schema without susepcode', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.VALID_INPUT_WITHOUT_SUSEPCODE(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should not throw errors after validate an object that follows expected schema for automobile insurance', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.VALID_INPUT_AUTOMOBILE(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})
	test('It should throw error after validate an object that does not include "idBranch" field', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.INVALID_INPUT_MISSING_IDBRANCH(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).toThrow('The attributes values are not valid: idBranch')
	})
	test('It should throw error after validate an object that does not include "client" field', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_CREATELEADSCHEMA.INVALID_INPUT_MISSING_CLIENT(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).toThrow('The attributes values are not valid: client')
	})
})
