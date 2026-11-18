const { controller } = require('../../../src/controller')
const MOCKS = require('../../mocks/src/controller/updateLeadController.mock')
const { updateLeadApi } = require('../../../src/api')
const { validation } = require('../../../src/service')
const Errors = require('../../../src/error')

jest.mock('../../../src/api')
jest.mock('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
})

describe('Test for updateLeadController.js file', () => {
	test('should return success on call updateLeadApi', () => {
		const spyApi = jest
			.spyOn(updateLeadApi, 'putUpdateLead')
			.mockImplementation(() => {
				return {}
			})

		expect(async () => {
			await controller.process(MOCKS.VALID_INPUT_DATA())
		}).not.toThrow()

		expect(validation.inputData).toHaveBeenCalledTimes(1)
		expect(spyApi).toHaveBeenCalledTimes(1)
	})

	test('It should return validation error schema', async () => {
		const jestValidation = jest.spyOn(validation, 'inputData').mockImplementationOnce(() => {
			throw new Errors.ValidationError('validation')
		})

		await expect(
			controller.process(MOCKS.VALID_INPUT_DATA())
		).rejects.toThrow('validation')

		expect(updateLeadApi.putUpdateLead).not.toHaveBeenCalled()
		expect(jestValidation).toHaveBeenCalledTimes(1)
	})

})
