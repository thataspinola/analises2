const { parseDateTime, formatUtcDate, formatDateString } = require('../../../src/utils/dateUtils')

describe('dateUtils', () => {
	describe('parseDateTime', () => {
		test('It should correctly parse and return Date object for DD/MM/YYYY HH:mm:ss format', () => {
			const dateString = '14/10/2025 15:30:00'
			const expectedDate = new Date('2025-10-14T15:30:00.000Z')

			const result = parseDateTime(dateString)

			expect(result.getTime()).toEqual(expectedDate.getTime())
		})

		test('It should correctly parse DD/MM/YYYY HH:mm format, assuming seconds=0', () => {
			const dateString = '14/10/2025 09:15'
			const expectedDate = new Date('2025-10-14T09:15:00.000Z')

			const result = parseDateTime(dateString)

			expect(result.getTime()).toEqual(expectedDate.getTime())
		})

		test('It should correctly parse and return Date object for YYYY-MM-DDTHH:mm:ss ISO format', () => {
			const dateString = '2025-10-14T15:30:00'
			const result = parseDateTime(dateString)

			expect(result).toBeInstanceOf(Date)
			expect(isNaN(result.getTime())).toBe(false)
		})

		test('It should throw error for an entirely invalid date string', () => {
			const invalidString = 'not-a-date'
			expect(() => parseDateTime(invalidString)).toThrow(
				'Invalid Date: not-a-date'
			)
		})

		test('It should throw error for an invalid day (e.g., 32/10/2025)', () => {
			const invalidDateString = '32/10/2025 10:00'
			expect(() => parseDateTime(invalidDateString)).toThrow(
				'Invalid Date: 32/10/2025 10:00'
			)
		})

		test('It should throw error for a string with too few parts (e.g., just date)', () => {
			const invalidDateString = '14/10/2025'
			expect(() => parseDateTime(invalidDateString)).toThrow(
				/Invalid Date format/
			)
		})

		test('It should throw error when input is null or undefined', () => {
			expect(() => parseDateTime(null)).toThrow(
				'Invalid input type. Expected string, got object'
			)
			expect(() => parseDateTime(undefined)).toThrow(
				'Invalid input type. Expected string, got undefined'
			)
			expect(() => parseDateTime('')).toThrow('Invalid Date: ')
		})
	})

	describe('formatUtcDate', () => {
		test('It should format a Date object into YYYY-MM-DDTHH:mm:ss.000Z format', () => {
			const dateToFormat = new Date('2024-12-08T06:00:00.123Z')
			const expectedFormat = '2024-12-08T06:00:00.000Z'

			const result = formatUtcDate(dateToFormat)

			expect(result).toBe(expectedFormat)
		})

		test('It should handle dates exactly at the second mark', () => {
			const dateToFormat = new Date('2024-01-01T00:00:00.000Z')
			const expectedFormat = '2024-01-01T00:00:00.000Z'

			const result = formatUtcDate(dateToFormat)

			expect(result).toBe(expectedFormat)
		})

		test('It should handle dates one millisecond before the second mark', () => {
			const dateToFormat = new Date('2024-01-01T00:00:00.999Z')
			const expectedFormat = '2024-01-01T00:00:00.000Z'

			const result = formatUtcDate(dateToFormat)

			expect(result).toBe(expectedFormat)
		})
	})

	describe('formatDateString', () => {
		test('should convert "16/10/2025 10:30" to "2025-10-16T10:30:00"', () => {
			const input = '16/10/2025 10:30'
			const expectedOutput = '2025-10-16T10:30:00'
			expect(formatDateString(input)).toBe(expectedOutput)
		})

		test('should convert "01/01/2023 00:00" to "2023-01-01T00:00:00"', () => {
			const input = '01/01/2023 00:00'
			const expectedOutput = '2023-01-01T00:00:00'
			expect(formatDateString(input)).toBe(expectedOutput)
		})

		test('should convert "31/12/1999 23:59" to "1999-12-31T23:59:00"', () => {
			const input = '31/12/1999 23:59'
			const expectedOutput = '1999-12-31T23:59:00'
			expect(formatDateString(input)).toBe(expectedOutput)
		})
	})
})
