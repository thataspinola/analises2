describe('Given tests for controller/activity/index.js', () => {
	test('It should expose couponHandler activity', () => {
		const activity = require('../../../../src/controller/activity')

		expect(activity).toHaveProperty('couponHandler')
		expect(typeof activity.couponHandler.execute).toBe('function')
	})
})