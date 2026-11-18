const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')
const utils = require('../../../../../../src/utils')

jest.mock('../../../../../../src/utils', () => ({
	date: {
		parseDateTime: jest.fn((dateString) => {
			if (dateString === 'invalid-date' || dateString === undefined) {
				throw new Error(`Invalid Date: ${dateString}`)
			}
			return new Date('2024-12-08T06:00:00.000Z')
		}),
		formatUtcDate: jest.fn((date) => {
			if (date.toISOString() === '2024-12-08T06:00:00.000Z') {
				return '2024-12-08T06:00:00.000Z'
			}
			if (date.toISOString() === '2024-12-08T06:00:00.000Z') {
				return '2024-12-08T06:00:00.000Z'
			}
			if (date.toISOString().includes('2024-12-04T18:00:00.000Z')) {
				return '2024-12-04T18:00:00.000Z'
			}
			if (date.toISOString().includes('2024-12-04T21:15:00.000Z')) {
				return '2024-12-04T21:15:00.000Z'
			}
			return 'MOCK_DATE'
		}),
	},
}))

beforeEach(() => {
	jest
		.useFakeTimers('modern')
		.setSystemTime(new Date('2024-12-04T21:00:00.000Z').getTime())
	jest.clearAllMocks()
})

describe('Teste do factory de resposta da API orderBook', () => {
	const AGENDAMENTO_PROGRAMADO = 'agendamento-programado'
	const AGENDAMENTO_IMEDIATO = 'agendamento-imediato'
	describe('getResponsePayload', () => {
		test('It should return correct response payload for schedule type "agendamento-programado"', () => {
			const inputData =
				MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_INPUT()

			const result =
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload(
					inputData,
					AGENDAMENTO_PROGRAMADO
				)

			expect(utils.date.parseDateTime).toHaveBeenCalledTimes(2)
			expect(result).toEqual(
				MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_RETURN()
			)
		})

		test('It should return correct response payload for schedule type "agendamento-imediato"', () => {
			const inputData =
				MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_IMEDIATO_INPUT()

			const result =
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload(
					inputData,
					AGENDAMENTO_IMEDIATO
				)

			expect(utils.date.parseDateTime).toHaveBeenCalledTimes(2)
			expect(result).toEqual(
				MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_IMEDIATO_RETURN()
			)
		})

		test('It should throw an error for invalid serviceDateTime format', () => {
			const invalidInput = {
				...MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_INPUT(),
				serviceDateTime: 'invalid-date',
			}

			expect(() =>
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload(
					invalidInput,
					AGENDAMENTO_PROGRAMADO
				)
			).toThrow('Invalid Date: invalid-date')
		})

		test('It should throw an error when reservationKey is missing', () => {
			const inputWithoutKey = {
				...MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_INPUT(),
				reservationKey: undefined,
			}

			expect(() =>
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload(
					inputWithoutKey
				)
			).toThrow('Schedule data missing reservationKey')
		})

		test('It should throw an error when serviceDateTime is missing', () => {
			const inputWithoutKey = {
				...MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_INPUT(),
				serviceDateTime: undefined,
			}

			expect(() =>
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload(
					inputWithoutKey,
					AGENDAMENTO_PROGRAMADO
				)
			).toThrow('Schedule data missing serviceDateTime')
		})

		test('It should throw an error when scheduleType is missing', () => {
			const inputWithoutKey = {
				...MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_INPUT(),
				scheduleType: undefined,
			}

			expect(() =>
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload(
					inputWithoutKey
				)
			).toThrow('Schedule data missing scheduleType')
		})

		test('It should throw an error when status is missing', () => {
			const inputWithoutKey = {
				...MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_INPUT(),
				status: undefined,
			}

			expect(() =>
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload(
					inputWithoutKey,
					AGENDAMENTO_PROGRAMADO
				)
			).toThrow('Schedule data status is invalid')
		})

		test('It should throw an error when schedule data for "agendamento-programado" is missing serviceDateTime', () => {
			const inputWithoutKey = {
				...MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_INPUT(),
				serviceDateTime: undefined,
			}

			expect(() =>
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload(
					inputWithoutKey,
					AGENDAMENTO_PROGRAMADO
				)
			).toThrow('Schedule data missing serviceDateTime')
		})

		test('It should throw an error when schedule data for "agendamento-programado" is missing scheduledEndDateAndTime', () => {
			const inputWithoutKey = {
				...MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_INPUT(),
				scheduledEndDateAndTime: undefined,
			}

			expect(() =>
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload(
					inputWithoutKey,
					AGENDAMENTO_PROGRAMADO
				)
			).toThrow('Schedule data missing scheduledEndDateAndTime')
		})

		test('It should throw an error when schedule data for "agendamento-imediato" is missing scheduledEstimatedTime', () => {
			const inputWithoutKey = {
				...MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_INPUT(),
				scheduledEstimatedTime: undefined,
			}

			expect(() =>
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload(
					inputWithoutKey,
					AGENDAMENTO_IMEDIATO
				)
			).toThrow('Schedule data missing scheduledEstimatedTime')
		})

		test.skip('It should throw an error when scheduledEndDateAndTime is missing, even with status NOK', () => {
			const inputWithoutScheduledDate = {
				...MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.SINGLE_PAYLOAD_INPUT(),
				scheduledEndDateAndTime: undefined,
			}

			expect(() =>
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload(
					inputWithoutScheduledDate,
					AGENDAMENTO_PROGRAMADO
				)
			).toThrow('Invalid Date: undefined')
		})

		test('It should return an array response when inputData is an array and calls getNewScheduleResponse', () => {
			const inputArray = [
				MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.SINGLE_PAYLOAD_INPUT(),
			]

			const result =
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload(
					inputArray,
					AGENDAMENTO_PROGRAMADO
				)

			expect(result).toEqual({
				newSchedule: expect.any(Array),
			})
		})
	})

	describe('getNewScheduleResponse', () => {
		test('It should return correct response for valid input', () => {
			const inputData =
				MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_NOT_DISPONIBLE_DATA_INPUT()

			const result =
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getNewScheduleResponse(
					inputData
				)

			expect(result).toEqual(
				MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_NOT_DISPONIBLE_DATA_RETURN()
			)
		})

		test('It should return an empty schedule for empty input', () => {
			const result =
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getNewScheduleResponse(
					[]
				)

			expect(result).toEqual({ newSchedule: [] })
		})

		test('It should correctly group schedules by date', () => {
			const inputData =
				MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_NOT_DISPONIBLE_DATA_INPUT()

			const result =
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getNewScheduleResponse(
					inputData
				)

			expect(result).toEqual(
				MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_NOT_DISPONIBLE_DATA_RETURN()
			)
		})

		test('It should throw an error for invalid date format', () => {
			const invalidInput = [
				{
					status: 'NOK',
					timeSlot: '08:00-10:00',
					serviceDateTime: 'invalid-date',
					statusDescription: 'SC',
				},
			]
			expect(() =>
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getNewScheduleResponse(
					invalidInput
				)
			).toThrow('Invalid Date: invalid-date')
		})

		test('It should correctly convert faixaHorario', () => {
			const inputData = [
				{
					timeSlot: '08:00-10:00',
					serviceDateTime: '05/12/2024 08:00',
					status: 'NOK',
					statusDescription: 'Indisponível',
				},
			]

			const result =
				factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getNewScheduleResponse(
					inputData
				)

			expect(result.newSchedule[0].schedules[0].time).toBe('08:00 às 10:00')
		})
	})
})
