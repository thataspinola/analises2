const factory = require('../../../src/factory')
const MOCKS = require('./../../mocks/src/factory/httpsAgentFactory.mock')

describe('Suite de testes de httpsAgentFactory.js', () => {
    test('Deve retornar um agent', () => {
        const httpsAgent = factory.httpsAgent.createHttpsAgent(MOCKS.CERTIFICATE())

        expect(httpsAgent.options.ca).toEqual(MOCKS.CERTIFICATE())
    })
})