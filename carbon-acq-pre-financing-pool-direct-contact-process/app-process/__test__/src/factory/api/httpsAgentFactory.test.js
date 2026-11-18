const factory = require('../../../../src/factory')
const MOCKS = require('./../../../mocks/index.mock')

describe('Suite de testes de httpsAgentFactory.js', () => {
    test('Deve retornar um agent', () => {
        const httpsAgent = factory.api.httpsAgent.createHttpsAgent(MOCKS.FACTORY_API_HTTPS_AGENT.CERTIFICATE())

        expect(httpsAgent.options.ca).toEqual(MOCKS.FACTORY_API_HTTPS_AGENT.CERTIFICATE())
    })
})