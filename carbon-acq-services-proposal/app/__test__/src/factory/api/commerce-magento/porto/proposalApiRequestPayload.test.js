const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')
const CONSTANT = require('../../../../../../src/property')

describe('getRequestPayload', () => {
	test('It should return the correct payload structure', () => {
		const parsedInputData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.parsedInputData

		const commerceQuotationId =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.commerceQuotationId

		const scheduleData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.scheduleData

		const leadData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.leadData

		const expectedPayload =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_RESPONSE()

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				scheduleData,
				leadData
			)
		expect(result).toEqual(expectedPayload)
	})

	test('It should return the correct payload with gtmAnonymousId, clientId, userId and measurementSessionId', () => {
		const parsedInputData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_WITH_GTMANONYMOUSID_CLIENTID_USERID_AND_MEASUREMENTSESSIONID_INPUT()
				.parsedInputData

		const commerceQuotationId =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.commerceQuotationId

		const scheduleData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.scheduleData

		const leadData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.leadData

		const expectedPayload =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_WITH_GTMANONYMOUSID_CLIENTID_USERID_AND_MEASUREMENTSESSIONID_RESPONSE()

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				scheduleData,
				leadData
			)
		expect(result).toEqual(expectedPayload)
	})

	test('It should return the correct payload with gtmAnonymousId, userId and measurementSessionId', () => {
		const parsedInputData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_WITH_GTMANONYMOUSID_CLIENTID_USERID_AND_MEASUREMENTSESSIONID_INPUT()
				.parsedInputData

		const commerceQuotationId =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.commerceQuotationId

		const scheduleData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.scheduleData

		const leadData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.leadData

		const expectedPayload =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_WITH_GTMANONYMOUSID_USERID_AND_MEASUREMENTSESSIONID_RESPONSE()

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				scheduleData,
				leadData
			)
		expect(result).toEqual(expectedPayload)
	})

	test('It should return the correct payload with gtmAnonymousId and userId', () => {
		const parsedInputData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_WITH_GTMANONYMOUSID_AND_USERID_INPUT()
				.parsedInputData

		const commerceQuotationId =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.commerceQuotationId

		const scheduleData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.scheduleData

		const leadData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.leadData

		const expectedPayload =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_WITH_GTMANONYMOUSID_AND_USERID_RESPONSE()

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				scheduleData,
				leadData
			)
		expect(result).toEqual(expectedPayload)
	})

	test('It should return the correct payload with clientId', () => {
		const parsedInputData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_WITH_CLIENTID_INPUT()
				.parsedInputData

		const commerceQuotationId =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.commerceQuotationId

		const scheduleData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.scheduleData

		const leadData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.leadData

		const expectedPayload =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_WITH_CLIENTIDBCP_RESPONSE()

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				scheduleData,
				leadData
			)
		expect(result).toEqual(expectedPayload)
	})

	test('It should return the correct payload with combo structure grouping each item by id', () => {
		const parsedInputData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_WITH_COMBO_INPUT()
				.parsedInputData

		const commerceQuotationId =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.commerceQuotationId

		const scheduleData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.scheduleData

		const leadData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.leadData

		const expectedPayload =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_WITH_COMBO_RESPONSE()

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				scheduleData,
				leadData
			)
		expect(result).toEqual(expectedPayload)
	})

	test('It should handle empty input data gracefully', () => {
		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				{},
				null,
				undefined,
				{}
			)

		expect(result).toEqual({
			proposal: {
				scope: 'porto_service',
				porto_service: expect.any(Object),
			},
		})
	})

	test('It should correctly use lead values when primary values are missing', () => {
		const parsedInputData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.parsedInputData

		parsedInputData.brokerName = ''
		parsedInputData.brokerPhone = null
		delete parsedInputData.brokerEmail
		delete parsedInputData.susepCode

		const commerceQuotationId =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.commerceQuotationId

		const scheduleData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.scheduleData

		const leadData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.leadData

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				scheduleData,
				leadData
			)

		const expectedPayload =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_WITH_LEAD_BROKERDATA_RESPONSE()

		expect(result).toEqual(expectedPayload)
	})

	test('It should maintain correct structure even with missing nested objects', () => {
		const { parsedInputData, commerceQuotationId } =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				null,
				{}
			)

		expect(result).toHaveProperty('proposal.porto_service')
		expect(result.proposal.porto_service).toHaveProperty('person')
		expect(result.proposal.porto_service).toHaveProperty('address')
		expect(result.proposal.porto_service).toHaveProperty('scheduling')
	})

	test('It should return correctly set the recommendation coupon to the payload', () => {
		const parsedInputData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.parsedInputData

		const commerceQuotationId =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.commerceQuotationId

		const scheduleData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.scheduleData

		const leadData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.leadData

		const isRecommendation = true

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				scheduleData,
				leadData,
				isRecommendation
			)
		expect(result.proposal.porto_service.coupon).toEqual(
			CONSTANT.RECOMMENDATION_COUPON
		)
	})

	test('It should correctly set the questions data to the payload', () => {
		const parsedInputData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.parsedInputData

		parsedInputData.serviceProvision.serviceOrder.questions = []

		parsedInputData.serviceProvision.serviceOrder.questions.push({
			question: 12345,
			answer: 'Test answer',
		})

		const commerceQuotationId =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.commerceQuotationId

		const scheduleData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.scheduleData

		const leadData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.leadData

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				scheduleData,
				leadData
			)
		expect(result.proposal.porto_service.questions).toEqual([
			{ question: 12345, answer: 'Test answer' },
		])
	})

	test('If product type guincho should set the required destination and vehicle data', () => {
		const parsedInputData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.parsedInputData

		parsedInputData.serviceProvision.products[0].type = 'guincho'
		parsedInputData.serviceProvision.serviceOrder.serviceAddresses.push({
			type: 'destino',
			city: 'São Paulo',
			state: 'SP',
			zipCode: '01310100',
			neighborhood: 'Bela Vista',
			additionalInfo: 'Apto 30',
			street: 'Avenida Paulista',
			latitude: -23.514836,
			streetNumber: '982',
			longitude: -46.3746187,
		})
		parsedInputData.serviceProvision.products[0].vehicleData = {
			vehicleLicenseCode: 'ABC1234',
			modelCode: 'XYZ987',
			modelYear: 2020,
			color: '1',
		}

		const commerceQuotationId =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.commerceQuotationId

		const scheduleData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.scheduleData

		const leadData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.leadData

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				scheduleData,
				leadData
			)
		expect(result.proposal.porto_service.destination).toEqual({
			additional_info: 'Apto 30',
			city: 'São Paulo',
			latitude: -23.514836,
			longitude: -46.3746187,
			neighborhood: 'Bela Vista',
			number: '982',
			state: 'SP',
			street: 'Avenida Paulista',
			streetType: 'Rua',
			zip_code: '01310100',
		})

		expect(result.proposal.porto_service.vehicle_data).toEqual({
			vehicle_license_code: 'ABC1234',
			model_code: 'XYZ987',
			model_year: 2020,
			color: '1',
		})
	})

	test('It should correctly set the scheduling data when schedule type is agendamento-imediato', () => {
		const parsedInputData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.parsedInputData

		const commerceQuotationId =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.commerceQuotationId

		const scheduleData =
			(MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT().scheduleData =
				{
					scheduleType: 'agendamento-imediato',
					startDateTime: '2024-12-08T06:00:00.000Z',
					estimatedDateTime: '2024-12-08T06:25:00.000Z',
					estimatedServiceTime: '2024-12-08T03:30.00.000Z',
					openOsDateTime: '2024-12-04T18:00:00.000Z',
					key: '0812202406000012887',
					expirationTime: '2024-12-04T21:15:00.000Z',
					expirationUrlRedirect: '/servicos',
				})

		const leadData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_INPUT()
				.leadData

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				scheduleData,
				leadData
			)
		expect(result.proposal.porto_service.scheduling).toEqual({
			end_date_time: null,
			estimated_date_time: '2024-12-08T06:25:00.000Z',
			estimated_service_time: '2024-12-08T03:30.00.000Z',
			expiration_timestamp: '2024-12-04T21:15:00.000Z',
			expired_url_redirect: '/servicos',
			key: '0812202406000012887',
			open_os_date_time: '2024-12-04T18:00:00.000Z',
			start_date_time: '2024-12-08T06:00:00.000Z',
			type: 'agendamento-imediato',
		})
	})
})
