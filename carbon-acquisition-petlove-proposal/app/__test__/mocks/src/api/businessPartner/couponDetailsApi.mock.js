const MOCKS = require('../../../index.mock')

const GETBUSINESSPARTNER_COUPONDETAILS_VALID_RETURN_VALUE = {
	data: {
		name: 'PARTNER10',
		description: 'Teste de parceiro 10% OFF',
		type: 'percentage',
		discount: '10',
		cycles: 1,
		code: 'PARTNER10',
		dt_start: '2025-05-20',
	},
}

exports.GETBUSINESSPARTNER_COUPONDETAILS_VALID_RETURN = () => {
	return GETBUSINESSPARTNER_COUPONDETAILS_VALID_RETURN_VALUE
}
