const MOCKS = require('../../mocks/index.mock')
const service = require('../../../src/service')

describe('Given an isValidCNPJ call', () => {
	test('It should return true if the provided input is a valid CNPJ number', async () => {
		const isValidCNPJ = service.cnpjValidation.isValidCNPJ(
			MOCKS.CNPJVALIDATION_SERVICE_VALID_CNPJ()
		)
		expect(isValidCNPJ).toEqual(true)
	})
	test('It should return false if the provided input is not a valid CNPJ number - both verification digits wrong', async () => {
		const isValidCNPJ = service.cnpjValidation.isValidCNPJ(
			MOCKS.CNPJVALIDATION_SERVICE_INVALID_CNPJ_BOTH_VERIFICATION_DIGITS()
		)
		expect(isValidCNPJ).toEqual(false)
	})
	test('It should return false if the provided input is not a valid CNPJ number - just unit verification digit wrong', async () => {
		const isValidCNPJ = service.cnpjValidation.isValidCNPJ(
			MOCKS.CNPJVALIDATION_SERVICE_INVALID_CNPJ_UNIT_VERIFICATION_DIGIT()
		)
		expect(isValidCNPJ).toEqual(false)
	})
	test('It should return false if the provided input has more characters then a valid CNPJ number', async () => {
		const isValidCNPJ = service.cnpjValidation.isValidCNPJ(
			MOCKS.CNPJVALIDATION_SERVICE_INVALID_CNPJ_SIZE()
		)
		expect(isValidCNPJ).toEqual(false)
	})
})
