const { professionApi } = require('../../../src/api')
const MOCKS = require('../../mocks/index.mock')
const axios = require('axios')

jest.mock('axios')

afterEach(function () {
	jest.clearAllMocks()
})

const TOKEN = '123245'
describe('Give a test for professionApi.js', () => {
	test('Should return succes on call api professions', async () => {
		axios.mockImplementation(async (params) => {
			return MOCKS.PRODUCT_PROFESSION_RESPONSE()
		})

		const response = await professionApi.getProfessions(TOKEN)
		expect(response).toEqual(MOCKS.VALID_API_RESPONSE())
	})

	test('Should return error on call api professions', async () => {
		axios.mockImplementation(async (params) => {
			throw new Error('error on get product professions')
		})

		expect(async () => {
			await professionApi.getProfessions(TOKEN)
		}).rejects.toThrow(
			'Error on Product API: Error: error on get product professions'
		)
	})
})
