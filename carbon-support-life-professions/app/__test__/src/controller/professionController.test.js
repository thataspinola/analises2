const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const { professionController } = require('../../../src/controller')
const MOCKS = require('../../mocks/index.mock')
const { professionApi } = require('../../../src/api')

jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/api')
jest.mock('../../../src/service')

describe('Given a profession controller test', () => {
	test('should return success controller', async () => {
		professionApi.getProfessions.mockImplementationOnce(() => {
			return MOCKS.VALID_API_RESPONSE()
		})

		const response = await professionController.getProfessions()
		expect(response).toEqual(MOCKS.CONTROLLER_PROFESSION_VALID_RESPONSE())
	})

    test('should return succes professions with filter',async () => {
        professionApi.getProfessions.mockImplementationOnce(() => {
			return MOCKS.VALID_API_RESPONSE()
		})

        const response = await professionController.getProfessions('Agente')
        expect(response).toEqual(MOCKS.CONTROLLER_PROFESSION_WITH_FILTER_VALID_RESPONSE())
    })

	test('should return error on get sensidia token',async () => {
        tokenLayer.getSensediaTokenCarbonCloud.mockImplementationOnce(() =>
			Promise.reject({ message: 'Token layer error' })
		)

        response = await professionController.getProfessions()
        expect(response).toEqual(MOCKS.CONTROLLER_ERROR_RESPONSE())
    })

    test('should return error on call api get professions',async () => {
        professionApi.getProfessions.mockImplementationOnce(() => {
			throw new Error('error on get professions api')
		})

        const response = await professionController.getProfessions()
        expect(response).toEqual(MOCKS.CONTROLLER_ERROR_RESPONSE())
    })

    test('should return error on empty professions',async () => {
        professionApi.getProfessions.mockImplementationOnce(() => {
			return MOCKS.PRODUCT_PROFESSION_EMPTY_RESPONSE()
		})

        const response = await professionController.getProfessions()
        expect(response).toEqual(MOCKS.CONTROLLER_ERROR_RESPONSE())
    })
})
