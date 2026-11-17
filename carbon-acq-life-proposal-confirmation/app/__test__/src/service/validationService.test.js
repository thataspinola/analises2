const service = require('../../../src/service')
const mocks = require('../../mocks')
const error = require('../../../src/error');

describe('inputData function', () => {
	test('should not throw an error for valid data', () => {
        const validInput = { name: 'John Doe', age: 30 }

        expect(() => service.validationService.inputData(validInput, mocks.VALID_SCHEMA)).not.toThrow()
    })

    test('should throw a ValidationError for missing required fields', () => {
		const invalidInput = { name: 'John Doe' }

        expect(() => service.validationService.inputData(invalidInput, mocks.VALID_SCHEMA)).toThrow(error.ValidationError)
        expect(() => service.validationService.inputData(invalidInput, mocks.VALID_SCHEMA)).toThrow(
            'The attributes values are not valid: age'
        )
    })

    test('should throw a ValidationError for invalid data types', () => {
        const invalidInput = { name: 'John Doe', age: 'thirty' }
        expect(() => service.validationService.inputData(invalidInput, mocks.VALID_SCHEMA)).toThrow(error.ValidationError)
        expect(() => service.validationService.inputData(invalidInput, mocks.VALID_SCHEMA)).toThrow(
            'The attributes values are not valid: age'
        )
    })

    test('should throw a ValidationError for invalid minLength', () => {
        const invalidInput = { name: 'Jo', age: 30 }

        expect(() => service.validationService.inputData(invalidInput, mocks.VALID_SCHEMA)).toThrow(error.ValidationError)
        expect(() => service.validationService.inputData(invalidInput, mocks.VALID_SCHEMA)).toThrow(
            'The attributes values are not valid: name'
        )
    })

    test('should throw a ValidationError for multiple errors', () => {
        const invalidInput = { age: 17 }

        expect(() => service.validationService.inputData(invalidInput, mocks.VALID_SCHEMA)).toThrow(error.ValidationError)
        expect(() => service.validationService.inputData(invalidInput, mocks.VALID_SCHEMA)).toThrow(
            'The attributes values are not valid: name'
        )
    })
})