describe('Given tests for api/index.js', () => {
	test('It should expose vida and couponApi modules', () => {
		const api = require('../../../src/api')

		expect(api).toHaveProperty('vida')
		expect(api).toHaveProperty('couponApi')
		expect(typeof api.couponApi.getCouponData).toBe('function')
	})
})