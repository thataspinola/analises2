const MOCKS = require('../../mocks/index.mock')
const { sanitizeInput } = require('../../../src/service/xss')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a sanitizeInput call', () => {
	test('It should return the same string when input has no XSS content', () => {
		const result = sanitizeInput(MOCKS.SERVICE_XSS.PLAIN_STRING())
		expect(result).toEqual(MOCKS.SERVICE_XSS.PLAIN_STRING())
	})

	test('It should sanitize a string containing XSS script tag', () => {
		const result = sanitizeInput(MOCKS.SERVICE_XSS.PLAIN_STRING_WITH_XSS())
		expect(result).toEqual(MOCKS.SERVICE_XSS.PLAIN_STRING_WITH_XSS_SANITIZED())
	})

	test('It should return the same number when input is a number', () => {
		const result = sanitizeInput(MOCKS.SERVICE_XSS.NUMBER_INPUT())
		expect(result).toEqual(MOCKS.SERVICE_XSS.NUMBER_INPUT())
	})

	test('It should return null when input is null', () => {
		const result = sanitizeInput(MOCKS.SERVICE_XSS.NULL_INPUT())
		expect(result).toBeNull()
	})

	test('It should sanitize XSS content inside object properties and mutate the original object', () => {
		const input = MOCKS.SERVICE_XSS.OBJECT_WITH_XSS()
		const result = sanitizeInput(input)
		expect(result).toEqual(MOCKS.SERVICE_XSS.OBJECT_WITH_XSS_SANITIZED())
		expect(result).toBe(input)
	})

	test('It should sanitize XSS content inside nested object properties', () => {
		const result = sanitizeInput(MOCKS.SERVICE_XSS.NESTED_OBJECT_WITH_XSS())
		expect(result).toEqual(MOCKS.SERVICE_XSS.NESTED_OBJECT_WITH_XSS_SANITIZED())
	})

	test('It should sanitize XSS content inside an array', () => {
		const result = sanitizeInput(MOCKS.SERVICE_XSS.ARRAY_WITH_XSS())
		expect(result).toEqual(MOCKS.SERVICE_XSS.ARRAY_WITH_XSS_SANITIZED())
	})

	test('It should sanitize XSS content inside an object with nested array', () => {
		const result = sanitizeInput(MOCKS.SERVICE_XSS.OBJECT_WITH_ARRAY_WITH_XSS())
		expect(result).toEqual(MOCKS.SERVICE_XSS.OBJECT_WITH_ARRAY_WITH_XSS_SANITIZED())
	})
})
