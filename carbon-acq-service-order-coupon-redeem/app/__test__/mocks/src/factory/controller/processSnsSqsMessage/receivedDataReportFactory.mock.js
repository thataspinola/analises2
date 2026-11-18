exports.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_WITHOUTOPTIONALATTRIBUTES_VALID_INPUT =
	() => ({
		coupon: undefined,
		documentNumber: '12345678901',
	})

exports.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT = () => {
	return {
		coupon: 'TEST1',
	}
}

exports.GETDATAREPORT_VALID_RETURN = () => {
	return {
		cupom: 'TEST1',
		cpfCnpj: '12345678901',
		numeroOs: '1028586-23',
	}
}

exports.GETDATAREPORT_WITHOUTOPTIONALATTRIBUTES_VALID_RETURN = () => {
	return {
		cupom: 'N/A',
		cpfCnpj: '12345678901',
		numeroOs: null,
	}
}
