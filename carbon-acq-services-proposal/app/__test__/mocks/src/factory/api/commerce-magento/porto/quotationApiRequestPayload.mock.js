const MOCKS = require('../../../../../index.mock')

const mapInstallments = (installments = {}) =>
	Object.entries(installments).map(([number, price]) => ({
		number_of_installments: parseInt(number, 10),
		single_installment_price: price,
	}))

const buildResponsePayload = ({
	sku = 'HC100',
	finalValue = 319.9,
	finalValuePortoCard =  255.92,
	portoCardInstallments = {},
	otherCardInstallments = {},
} = {}) => ({
	quotation: {
		scope: 'porto_service',
		porto_service: {
			sku,
			forms_of_payment: [
				{
					code: 'porto_card',
					installments_available: mapInstallments(portoCardInstallments),
					final_price: finalValuePortoCard,
				},
				{
					code: 'other_card',
					installments_available: mapInstallments(otherCardInstallments),
					final_price: finalValue,
				},
			],
			is_recommendation: false,
		},
	},
})

exports.PAYLOAD_VALID_INPUT = () =>
	MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_PRICING.VALID_RETURN()

exports.PAYLOAD_DIFFERENTFINAL_VALUE_INPUT = () => {
	const baseInput =
		MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_PRICING.VALID_RETURN()

	return {
		...baseInput,
		products: baseInput.products.map((product, index) =>
			index === 0 ? { ...product, sku: 'HC100' } : product
		),
		paymentMethod: {
			portoCard: { installment: { 1: 319.9 } },
			otherCardBrands: { installment: { 2: 255.92 } },
		},
	}
}

exports.PAYLOAD_EMPTY_PAYMENTMETHODS_INPUT = () => {
	const baseInput =
		MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_PRICING.VALID_RETURN()

	return {
		...baseInput,
		products: baseInput.products.map((product, index) =>
			index === 0 ? { ...product, sku: 'HC100' } : product
		),
		paymentMethod: {
			portoCard: { installment: {} },
			otherCardBrands: { installment: {} },
		},
	}
}

exports.PAYLOAD_EXPECTED_OUTPUTEMPTY = () =>
	buildResponsePayload({
		portoCardInstallments: {},
		otherCardInstallments: {},
	})

exports.PAYLOAD_EXPECTED_OUTPUTVALID = () =>
	buildResponsePayload({
		portoCardInstallments: {
			1: 255.92,
			2: 127.96,
			3: 85.31,
			4: 63.98,
			5: 51.18,
			6: 42.65,
			7: 36.56,
			8: 31.99,
			9: 28.44,
			10: 25.59,
		},
		otherCardInstallments: { 1: 319.9, 2: 159.95, 3: 106.63, 4: 79.98 },
	})

exports.PAYLOAD_EXPECTED_OUTPUT_DIFFERENT_FINAL_VALUE = () =>
	buildResponsePayload({
		sku: 'HC100',
		finalValue: 319.9,
		portoCardInstallments: { 1: 319.9 },
		otherCardInstallments: { 2: 255.92 },
	})
