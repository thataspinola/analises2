const controller = require('../../../src/controller')
const repository = require('../../../src/repository')
const MOCKS = require('../../mocks/src/controller/dealsController.mock')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Deals Controller tests', () => {
	describe('Method Save scenarios', () => {
		test('It should receive a save deals data and return it.', async () => {
			const spyRepository = jest
				.spyOn(repository.deals, 'save')
				.mockImplementation(() => {
					return MOCKS.SUCCESS_SAVE_RESPONSE()
				})

			const response = await controller.deals.saveDealsData(
				MOCKS.VALID_DATA_SAVE()
			)

			expect(spyRepository).toHaveBeenCalled()
			expect(response).toEqual(MOCKS.SUCCESS_SAVE_RESPONSE())
		})

		test('It should receive a save deals data without scope input and throw error.', async () => {
			const spyRepository = jest.spyOn(repository.deals, 'save')

			const response = await controller.deals.saveDealsData(
				MOCKS.INVALID_DATA_WITHOUT_SCOPE_SAVE()
			)

			expect(response).toEqual(
				MOCKS.CONTROLLER_REQUEST_BAD_REQUEST_INVALID_SCOPE()
			)

			expect(spyRepository).not.toHaveBeenCalled()
		})

		test('It should receive a save deals data without document input and throw error.', async () => {
			const spyRepository = jest.spyOn(repository.deals, 'save')

			const response = await controller.deals.saveDealsData(
				MOCKS.INVALID_DATA_WITHOUT_DOCUMENT_SAVE()
			)

			expect(response).toEqual(
				MOCKS.CONTROLLER_REQUEST_BAD_REQUEST_INVALID_DOCUMENT()
			)

			expect(spyRepository).toHaveBeenCalledTimes(0)
		})

		test('It should receive a save deals data without data input and throw error.', async () => {
			const spyRepository = jest.spyOn(repository.deals, 'save')

			const response = await controller.deals.saveDealsData(
				MOCKS.INVALID_DATA_WITHOUT_DATA_SAVE()
			)

			expect(response).toEqual(
				MOCKS.CONTROLLER_REQUEST_BAD_REQUEST_INVALID_DATA()
			)

			expect(spyRepository).toHaveBeenCalledTimes(0)
		})
	})

	describe('Method Get scenarios', () => {
		test('It should receive a get deals data and return it.', async () => {
			const spyRepository = jest
				.spyOn(repository.deals, 'get')
				.mockImplementation(() => {
					return MOCKS.SUCCESS_GET_RESPONSE()
				})

			const response = await controller.deals.getDealsData(
				MOCKS.VALID_DATA_GET()
			)

			expect(spyRepository).toHaveBeenCalled()
			expect(spyRepository).toHaveBeenCalledWith(
				'carbon-acquisition-deals',
				'12345678901'
			)
			expect(response).toEqual(MOCKS.SUCCESS_GET_RESPONSE())
		})

		test('It should receive a get deals data without document input and throw error.', async () => {
			const spyRepository = jest.spyOn(repository.deals, 'get')

			const response = await controller.deals.getDealsData(
				MOCKS.INVALID_DATA_WITHOUT_DOCUMENT_GET()
			)

			expect(response).toEqual(
				MOCKS.CONTROLLER_REQUEST_BAD_REQUEST_INVALID_DOCUMENT()
			)

			expect(spyRepository).toHaveBeenCalledTimes(0)
		})
	})
})
