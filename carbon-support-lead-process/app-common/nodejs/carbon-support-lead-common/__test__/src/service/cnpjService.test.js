const MOCKS = require('../../mocks/index.mock')
const service = require('../../../src/service')

describe('Given an isValidCNPJ call', () => {
	test('It should return true if the provided input is a valid CNPJ number', async () => {
		const isValidCNPJ = service.cnpj.isValid(
			MOCKS.SERVICE_CNPJ.VALID_CNPJ()
		)
		expect(isValidCNPJ).toEqual(true)
	})
	test('It should return true if the provided input is a valid CNPJ number with symbols', async () => {
		const isValidCNPJ = service.cnpj.isValid(
			MOCKS.SERVICE_CNPJ.VALID_CNPJ_WITH_SYMBOLS()
		)
		expect(isValidCNPJ).toEqual(true)
	})
	test('It should return true if the provided input is a valid CNPJ alphanumeric number', async () => {
		const isValidCNPJ = service.cnpj.isValid(
			MOCKS.SERVICE_CNPJ.VALID_ALPHANUMERIC_CNPJ()
		)
		expect(isValidCNPJ).toEqual(true)
	})
	test('It should return true if the provided input is a valid CNPJ alphanumeric lowercase number', async () => {
		const isValidCNPJ = service.cnpj.isValid(
			MOCKS.SERVICE_CNPJ.VALID_ALPHANUMERIC_LC_CNPJ()
		)
		expect(isValidCNPJ).toEqual(true)
	})
	test('It should return true if the provided input is a valid CNPJ alphanumeric number with symbols', async () => {
		const isValidCNPJ = service.cnpj.isValid(
			MOCKS.SERVICE_CNPJ.VALID_ALPHANUMERIC_WITH_SYMBOLS()
		)
		expect(isValidCNPJ).toEqual(true)
	})
	test('It should return false if the provided input is not a valid CNPJ number - both verification digits wrong', async () => {
		const isValidCNPJ = service.cnpj.isValid(
			MOCKS.SERVICE_CNPJ.INVALID_CNPJ_BOTH_VERIFICATION_DIGITS()
		)
		expect(isValidCNPJ).toEqual(false)
	})
	test('It should return false if the provided input is not a valid CNPJ number - just unit verification digit wrong', async () => {
		const isValidCNPJ = service.cnpj.isValid(
			MOCKS.SERVICE_CNPJ.INVALID_CNPJ_UNIT_VERIFICATION_DIGIT()
		)
		expect(isValidCNPJ).toEqual(false)
	})
	test('It should return false if the provided input is not a valid CNPJ alphanumeric number - both verification digits wrong', async () => {
		const isValidCNPJ = service.cnpj.isValid(
			MOCKS.SERVICE_CNPJ.INVALID_ALPHANUMERIC_CNPJ_BOTH_VERIFICATION_DIGITS()
		)
		expect(isValidCNPJ).toEqual(false)
	})
	test('It should return false if the provided input is not a valid CNPJ alphanumeric number - just unit verification digit wrong', async () => {
		const isValidCNPJ = service.cnpj.isValid(
			MOCKS.SERVICE_CNPJ.INVALID_ALPHANUMERIC_CNPJ_UNIT_VERIFICATION_DIGIT()
		)
		expect(isValidCNPJ).toEqual(false)
	})
	test('It should return false if the provided input has more characters then a valid CNPJ number', async () => {
		const isValidCNPJ = service.cnpj.isValid(
			MOCKS.SERVICE_CNPJ.INVALID_CNPJ_SIZE()
		)
		expect(isValidCNPJ).toEqual(false)
	})
})
