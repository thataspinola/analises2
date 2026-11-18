const factory = require('../../../../src/factory/responseFactory')

describe('buildResponse', () => {
	test('should return a response object with the specified status', () => {
		const exampleStatus = 'success'
		const result = factory.buildResponse(exampleStatus)
		expect(typeof result).toBe('object')
		expect(result).toEqual({
			status: exampleStatus,
		})
	})
})
