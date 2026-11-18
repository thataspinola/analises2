const axios = require('axios')
const service = require('../../../../../src/service')
const CONSTANT = require('../../../../../src/property')
const {
	getCartHasRecommendation,
} = require('../../../../../src/api/commerce-magento/porto/cartHasRecommendationApi')

// Mock dependencies
jest.mock('axios')
jest.mock('../../../../../src/service')

describe('cartHasRecommendationApi', () => {
	beforeEach(() => {
		jest.clearAllMocks()

		// Setup logger mock
		service.logger = {
			error: jest.fn(),
		}
	})

	describe('getCartHasRecommendation', () => {
		const cartId = '12345'
		const customerCommerceToken = 'token'
		const expectedUrl = `${CONSTANT.COMMERCE_URL}/rest/V1/porto/cart/${cartId}/hasRecommendationProduct`
		const expectedConfig = {
			method: 'GET',
			url: expectedUrl,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${customerCommerceToken}`
			},
		}

		it('should return cart recommendation status when API call is successful', async () => {
			// Arrange
			const mockResponse = {
				data: {
					has_recommendation: true,
				},
			}
			axios.mockResolvedValueOnce(mockResponse)

			// Act
			const result = await getCartHasRecommendation(cartId, customerCommerceToken)

			// Assert
			expect(axios).toHaveBeenCalledWith(expect.objectContaining(expectedConfig))
			expect(result).toEqual({
				cartHasRecommendation: true,
			})
		})

		it('should throw an error if API response data is undefined', async () => {
			// Arrange
			axios.mockResolvedValueOnce({ data: undefined })

			// Act & Assert
			await expect(getCartHasRecommendation(cartId)).rejects.toThrow(
				"Erro inesperado recebido da chamada da API: Cannot read properties of undefined (reading 'has_recommendation')"
			)
		})

		it('should throw an error when axios request fails', async () => {
			// Arrange
			axios.mockRejectedValueOnce({
				response: { status: 500, data: { error: 'Internal Server Error' } },
			})

			// Act & Assert
			await expect(getCartHasRecommendation(cartId)).rejects.toThrow(
				'Erro recebido da chamada da API COMMERCE - CART_RECOMMENDATION: código \'500\' dados: \'{"error":"Internal Server Error"}\''
			)
		})
	})
})
