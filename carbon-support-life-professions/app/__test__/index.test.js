const { handler } = require('../index')
const { professionController } = require('../src/controller')
const MOCKS = require('./mocks/index.mock')

jest.mock('../src/controller')
jest.mock('../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Test for handler in index.js', () => {
	test('Should return success when call controller', async () => {
		professionController.getProfessions.mockImplementation(() => {
			return MOCKS.CONTROLLER_PROFESSION_VALID_RESPONSE()
		})

		const response = await handler()
		expect(response).toEqual(MOCKS.HANDLER_VALID_RESPONSE())
	})

	test('Should return error 500 when call controller', async () => {
		professionController.getProfessions.mockImplementation(() => {
			throw new Error('error get professions')
		})

		const response = await handler()
		expect(response).toEqual(MOCKS.HANDLER_RESPONSE_ERROR_500())
	})

	test('Should return error 400 when call controller', async () => {
		professionController.getProfessions.mockImplementation(() => {
			const error = new Error()
			error.code = 400
			throw error
		})

		const response = await handler()
		expect(response).toEqual(MOCKS.HANDLER_RESPONSE_ERROR_400())
	})
})
