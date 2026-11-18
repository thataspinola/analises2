exports.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_WITHOUTOPTIONALATTRIBUTES_VALID_INPUT =
	() => {
		return {
			reservationKey: '02092024193000161456',
			serviceOrderNumber: '1085516',
			serviceOrderYear: '24',
		}
	}

exports.GETDATAREPORT_COUPONREDEEMRESPONSE_VALID_INPUT = () => {
	return {
		responseMessage:
			'A quantidade do cupom está em zero (0), porém o cupom consumido com sucesso',
	}
}

exports.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT = () => {
	return {
		reservationKey: '02092024193000161456',
		serviceOrderNumber: '1085516',
		serviceOrderYear: '24',
	}
}

exports.GETDATAREPORT_VALID_RETURN = () => {
	return {
		integrationData: {
			serviceOrder: {
				number: 'ABC123',
				coupon: 'GANHA10',
			},
			customer: {
				documentNumber: '1234******',
			},
		},
		responseMessage:
			'A quantidade do cupom está em zero (0), porém o cupom consumido com sucesso',
	}
}

exports.GETDATAREPORT_WITHOUTOPTIONALATTRIBUTES_VALID_RETURN = () => {
	return {
		integrationData: {
			serviceOrder: {
				number: 'ABC123',
				coupon: 'N/A',
			},
			customer: {
				documentNumber: '1234******',
			},
		},
		responseMessage:
			'A quantidade do cupom está em zero (0), porém o cupom consumido com sucesso',
	}
}
