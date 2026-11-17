const factory = require('./../../../src/factory')
const nodeCrypto = require('node:crypto')

jest.mock('node:crypto')

describe('createdTraceId function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('deve retornar o carbon-trace-id dos headers se estiver presente', () => {
        const event = {
            headers: {
                'carbon-trace-id': 'test-trace-id'
            }
        }

        const result = factory.trace.createdTraceId(event)
        expect(result).toBe('test-trace-id')
    })

    test('deve gerar um novo UUID se o carbon-trace-id não estiver presente', () => {
        const mockUUID = 'generated-uuid'
        nodeCrypto.randomUUID.mockReturnValue(mockUUID)
        const event = {
            headers: {}
        }

        const result = factory.trace.createdTraceId(event)
        expect(result).toBe(mockUUID)
        expect(nodeCrypto.randomUUID).toHaveBeenCalled()
    })

    test('deve gerar um novo UUID se o carbon-trace-id não for uma string', () => {
        const mockUUID = 'generated-uuid'
        nodeCrypto.randomUUID.mockReturnValue(mockUUID)

        const event = {
            headers: {
                'carbon-trace-id': 123 
            }
        }

        const result = factory.trace.createdTraceId(event)
        expect(result).toBe(mockUUID)
        expect(nodeCrypto.randomUUID).toHaveBeenCalled()
    })
})