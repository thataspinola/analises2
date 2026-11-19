import { describe, test, expect, beforeEach } from 'vitest'
import { createApplication } from '../helpers/application.mjs'
import fixture from '../fixtures/input.cjs'
const { VALID_INPUT_DATA, FACTORY_SUCCESS_RESPONSE } = fixture
let updateLeadFactory
beforeEach(() => { updateLeadFactory = createApplication()('src/factory/index.js').updateLeadFactory })

describe('Suite de testes de updateLeadFactory.js', () => {
	describe('makeUpdateLeadPayload', () => {
		test('Deve retornar o payload corretamente', () => {
			const response = updateLeadFactory.makeUpdateLeadPayload(VALID_INPUT_DATA.Records[0].dynamodb.OldImage)

			expect(typeof response).toBe('object')
			expect(response).toEqual(FACTORY_SUCCESS_RESPONSE)
		})
	})
})
