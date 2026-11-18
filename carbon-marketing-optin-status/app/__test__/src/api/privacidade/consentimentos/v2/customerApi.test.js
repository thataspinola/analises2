const api  = require('../../../../../../src/api')
const MOCKS = require('../../../../../mocks/src/api/privacidade/consentimentos/v2/customerApi.mock')
const axios = require('axios')
const factory = require('../../../../../../src/factory')
const CONSTANTS = require('../../../../../../src/property')

jest.mock('axios')
jest.mock('../../../../../../src/factory')
jest.mock('../../../../../../logger')

beforeEach(() => {
    axios.mockImplementation(async (params) => {
        if(params.url.includes(`${CONSTANTS.GATEWAY_URL}/${CONSTANTS.CONSENTS_API_PATH}`)){
            if (params?.params.cpf === MOCKS.VALID_INPUT_DATA().taxvat) {
                return {data: MOCKS.RESPONSE_CONSENTS_API()}
            }else{
                throw MOCKS.NOT_FOUND_ERROR()
            }
        }
    })

    factory.axiosResponseErrorData.mockImplementation(() => MOCKS.AXIOS_DATA_ERROR())
    factory.externalApi.externalApiErrorFactory.mockImplementation(() => MOCKS.NOT_FOUND_ERROR())
    factory.httpsAgent.createHttpsAgent.mockImplementation(() => MOCKS.GET_HTTPS_AGENT())
})

describe('Given tests for consentsApi.js', () => {
    test('It should return success when call api', async () => {
        await api.privacidade.consentimentos.v1.customer.get(
            MOCKS.VALID_INPUT_DATA(),
            MOCKS.TOKEN(),
            MOCKS.CERTIFICATE(),
            MOCKS.TRACE_ID()
        )

        expect(axios).toHaveBeenCalledWith(MOCKS.AXIOS_CONFIG())
    })

    test('Deve lidar com erros não mapeados', async () => {
        await expect(
            api.privacidade.consentimentos.v1.customer.get(MOCKS.INVALID_INPUT_DATA(), 
            MOCKS.TOKEN(),
            MOCKS.CERTIFICATE(),
            MOCKS.TRACE_ID())
        ).rejects.toThrow(MOCKS.NOT_FOUND_ERROR())

        expect(factory.axiosResponseErrorData).toHaveBeenCalledWith(MOCKS.NOT_FOUND_ERROR())
    })
})
