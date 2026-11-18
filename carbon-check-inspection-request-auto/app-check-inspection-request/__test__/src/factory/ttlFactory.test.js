const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')
const CONSTANT = require('../../../src/property');

afterEach(() => {
	jest.restoreAllMocks()
	jest.clearAllMocks()
})

beforeAll(() => {
	jest.useFakeTimers('modern').setSystemTime(new Date(2023, 10, 21, 6, 35, 0, 0))
})

describe('Given an getMinutesSinceInspectionRequest call', () => {
	test('It should a response with the expected value', async () => {
		const returnValue = factory.ttl.getMinutesSinceInspectionRequest(MOCKS.INPUT_BODY_FACTORY.BODY_FROM_SQS())
		expect(returnValue).toEqual(5)
	})

    test('It should be a response with 0 when currentDate is less than the record date', async () => {
        jest.useFakeTimers('modern').setSystemTime(new Date(2023, 10, 21, 3, 15, 0, 0))
		const returnValue = factory.ttl.getMinutesSinceInspectionRequest(MOCKS.INPUT_BODY_FACTORY.BODY_FROM_SQS())
		expect(returnValue).toEqual(0)
	})
})

describe('Given an getTtlInMinutes  call', () => {
	test('It should a response with the expected value', async () => {
		const returnValue1 = factory.ttl.getTtlInMinutes(CONSTANT.THRESHOLD.UP_TO_FIFTEEN_MINUTES)
		expect(returnValue1).toEqual(CONSTANT.TTL.UP_TO_FIFTEEN_MINUTES)

        const returnValue2 = factory.ttl.getTtlInMinutes(CONSTANT.THRESHOLD.UP_TO_TWENTY_FOUR_HOURS)
		expect(returnValue2).toEqual(CONSTANT.TTL.UP_TO_TWENTY_FOUR_HOURS)
	
        const returnValue3 = factory.ttl.getTtlInMinutes(MOCKS.TTL_FACTORY.GET_MINUTES_BELOW_THE_MAX_LIMIT())
		expect(returnValue3).toEqual(CONSTANT.TTL.MAX_LIMIT)
	
        const returnValue4 = factory.ttl.getTtlInMinutes(MOCKS.TTL_FACTORY.GET_MINUTES_ABOVE_THE_MAX_LIMIT())
		expect(returnValue4).toBeNull()

		const returnValue5 = factory.ttl.getTtlInMinutes(MOCKS.TTL_FACTORY.GET_MINUTES_ABOVE_THE_MAX_LIMIT(), true)
		expect(returnValue5).toEqual(CONSTANT.TTL.UP_TO_FIFTEEN_MINUTES)
	})
})
