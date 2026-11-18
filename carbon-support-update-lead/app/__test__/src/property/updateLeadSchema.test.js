const MOCKS = require('../../mocks/index.mock')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const CONSTANT = require('../../../src/property')
const service = require('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a inputData call', () => {
	test('It should throw error when id_oportunidade, codigo_vdo and id_ramo are missing', () => {
		const data = MOCKS.MISSING_ALL()
		expect(() => {
			service.validation.inputData(data, CONSTANT.UPDATE_LEAD_SCHEMA)
		}).toThrow('The attributes values are not valid: codigo_vdo')
	})

	test('It should throw error when id_oportunidade and id_ramo are missing', () => {
		const data = MOCKS.MISSING_ID_OPORTUNIDADE_AND_ID_RAMO()
		expect(() => {
			service.validation.inputData(data, CONSTANT.UPDATE_LEAD_SCHEMA)
		}).toThrow('The attributes values are not valid: id_ramo')
	})

	test('It should throw error when id_oportunidade and codigo_vdo are missing', () => {
		const data = MOCKS.MISSING_ID_OPORTUNIDADE_AND_CODIGO_VDO()
		expect(() => {
			service.validation.inputData(data, CONSTANT.UPDATE_LEAD_SCHEMA)
		}).toThrow('The attributes values are not valid: codigo_vdo')
	})

	test('It should not throw error when id_oportunidade is present and codigo_vdo and/or id_ramo are missing', () => {
		const data = MOCKS.ONLY_ID_OPORTUNIDADE()
		expect(() => {
			service.validation.inputData(data, CONSTANT.UPDATE_LEAD_SCHEMA)
		}).not.toThrow('The attributes values are not valid: codigo_vdo, id_ramo')
	})

	test('It should not throw error when codigo_vdo and id_ramo are present and id_oportunidade is missing', () => {
		const data = MOCKS.CODIGO_VDO_AND_ID_RAMO()
		expect(() => {
			service.validation.inputData(data, CONSTANT.UPDATE_LEAD_SCHEMA)
		}).not.toThrow('The attributes values are not valid: id_oportunidade')
	})
})
