const MOCKS = require('../../../index.mock')

const GETBUSINESSPARTNER_CHECKOUTSIMULATION_VALID_RETURN_VALUE = {
	data: {
		discountCouponCycles: 1,
		discountCouponAmount: 1.49,
		discountBinAmount: 0,
		discountBinCycles: 0,
		discountBinDescription: null,
		discounts: [
			{
				id: 'COUPON',
				title: 'Total desconto por cupom',
				value: 1.49,
				cycles: 1,
				totalValue: 1.49,
			},
		],
		installments: [
			13.409999999999998, 14.899999999999999, 14.899999999999999,
			14.899999999999999, 14.899999999999999, 14.899999999999999,
			14.899999999999999, 14.899999999999999, 14.899999999999999,
			14.899999999999999, 14.899999999999999, 14.899999999999999,
		],
		singlePayment: 177.31000000000003,
		singlePaymentGross: 238.79999999999998,
	},
}

exports.GETBUSINESSPARTNER_CHECKOUTSIMULATION_VALID_RETURN = () => {
	return GETBUSINESSPARTNER_CHECKOUTSIMULATION_VALID_RETURN_VALUE
}
