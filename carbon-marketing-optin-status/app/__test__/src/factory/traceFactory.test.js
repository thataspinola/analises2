const factory = require('./../../../src/factory')
const nodeCrypto = require('node:crypto');
const MOCKS = require('./../../mocks/src/factory/traceFactory.mock')

jest.mock('node:crypto')

describe('generateTraceId function', () => {
    beforeEach(() => {
        nodeCrypto.randomUUID.mockImplementation(() => MOCKS.TRACE_ID_UUID())
    })

    test('should return the carbon-trace-id from headers if present', () => {
        const result = factory.trace.generateTraceId(MOCKS.EVENT_HANDLER_TRACE())
        expect(result).toBe(MOCKS.EVENT_HANDLER_TRACE().headers['carbon-trace-id'])
    })

    test('should generate a new UUID if carbon-trace-id is not present', () => {
        const result = factory.trace.generateTraceId(MOCKS.EVENT_HANDLER_TRACE_UNDEFINED())
        expect(result).toBe(MOCKS.TRACE_ID_UUID())
        expect(nodeCrypto.randomUUID).toHaveBeenCalled()
    })

    test('should generate a new UUID if carbon-trace-id is not a string', () => {
        const result = factory.trace.generateTraceId(MOCKS.EVENT_HANDLER_TRACE_NOT_STRING())
        expect(result).toBe(MOCKS.TRACE_ID_UUID())
        expect(nodeCrypto.randomUUID).toHaveBeenCalled()
    })

    test('should generate a new UUID if headers are undefined', () => {
        const result = factory.trace.generateTraceId({})
        expect(result).toBe(MOCKS.TRACE_ID_UUID())
        expect(nodeCrypto.randomUUID).toHaveBeenCalled()
    })
})