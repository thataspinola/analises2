const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')

describe('Given an extractData call', () => {
	test('It should return extracted error data object when errorresponse comes from a http 400 error not caused by an invalid payload or a http error with expected structure', async () => {
		const extractedErrorData =
			factory.portais.msusuarios.users.statusResponseError.extractData(
				MOCKS.FACTORY_PORTAIS_MSUSUARIOS_USERS_STATUSRESPONSEERROR_EXTRACTDATA_ERRORRESPONSE_INPUT()
			)
		expect(extractedErrorData).toEqual(
			MOCKS.FACTORY_PORTAIS_MSUSUARIOS_USERS_STATUSRESPONSEERROR_EXTRACTDATA_VALID_RETURN()
		)
	})
	test('It should return extracted error data object when errorresponse comes from a http 400 error caused by an invalid payload', async () => {
		const extractedErrorData =
			factory.portais.msusuarios.users.statusResponseError.extractData(
				MOCKS.FACTORY_PORTAIS_MSUSUARIOS_USERS_STATUSRESPONSEERROR_EXTRACTDATA_INVALIDPAYLOAD_ERRORRESPONSE_INPUT()
			)
		expect(extractedErrorData).toEqual(
			MOCKS.FACTORY_PORTAIS_MSUSUARIOS_USERS_STATUSRESPONSEERROR_EXTRACTDATA_INVALIDPAYLOAD_VALID_RETURN()
		)
	})
	test('It should return extracted error data object when errorresponse comes from a http error caused by an unexpected structure', async () => {
		const extractedErrorData =
			factory.portais.msusuarios.users.statusResponseError.extractData(
				MOCKS.FACTORY_PORTAIS_MSUSUARIOS_USERS_STATUSRESPONSEERROR_EXTRACTDATA_UNEXPECTEDSTRUCTURE_ERRORRESPONSE_INPUT()
			)
		expect(extractedErrorData).toEqual(
			MOCKS.FACTORY_PORTAIS_MSUSUARIOS_USERS_STATUSRESPONSEERROR_EXTRACTDATA_UNEXPECTEDSTRUCTURE_VALID_RETURN()
		)
	})
})
