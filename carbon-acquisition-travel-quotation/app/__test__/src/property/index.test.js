describe('Given tests for property/index.js', () => {
	afterEach(() => {
		jest.resetModules()
		delete process.env.COUPON_API_URL
	})

	test('It should read COUPON_API_URL from env', () => {
		process.env.COUPON_API_URL = 'https://coupon-api.test'
		jest.resetModules()

		const properties = require('../../../src/property')

		expect(properties.COUPON_API_URL).toBe('https://coupon-api.test')
	})
})