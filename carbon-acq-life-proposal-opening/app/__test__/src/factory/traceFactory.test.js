const factory = require('./../../../src/factory')
const nodeCrypto = require('node:crypto');

jest.mock('node:crypto');

describe('createdTraceId function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return the carbon-trace-id from headers if present', () => {
        const event = {
            headers: {
                'carbon-trace-id': 'trace-id-123'
            }
        };

        const result = factory.trace.createdTraceId(event);
        expect(result).toBe('trace-id-123');
    });

    test('should generate a new UUID if carbon-trace-id is not present', () => {
        const mockUUID = 'generated-uuid-456';
        nodeCrypto.randomUUID.mockReturnValue(mockUUID);

        const event = {
            headers: {}
        };

        const result = factory.trace.createdTraceId(event);
        expect(result).toBe(mockUUID);
        expect(nodeCrypto.randomUUID).toHaveBeenCalled();
    });

    test('should generate a new UUID if carbon-trace-id is not a string', () => {
        const mockUUID = 'generated-uuid-789';
        nodeCrypto.randomUUID.mockReturnValue(mockUUID);

        const event = {
            headers: {
                'carbon-trace-id': 123
            }
        };

        const result = factory.trace.createdTraceId(event);
        expect(result).toBe(mockUUID);
        expect(nodeCrypto.randomUUID).toHaveBeenCalled();
    });

    test('should generate a new UUID if headers are undefined', () => {
        const mockUUID = 'generated-uuid-101';
        nodeCrypto.randomUUID.mockReturnValue(mockUUID);

        const event = {};

        const result = factory.trace.createdTraceId(event);
        expect(result).toBe(mockUUID);
        expect(nodeCrypto.randomUUID).toHaveBeenCalled();
    });
});