exports.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_WITHOUTOPTIONALATTRIBUTES_VALID_INPUT =
	() => {
		return {
			reservationKey: '02092024193000161456',
			serviceOrderNumber: '1085516',
			serviceOrderYear: '24',
		}
	}

exports.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT = () => {
	return {
		reservationKey: '02092024193000161456',
		serviceOrderNumber: '1085516-24',
	}
}

exports.GETDATAREPORT_VALID_RETURN = () => {
	return {
		reservationKey: '02092024193000161456',
		serviceOrderNumber: '1085516',
		serviceOrderYear: '24',
	}
}

exports.GETDATAREPORT_WITHOUTOPTIONALATTRIBUTES_VALID_RETURN = () => {
	return {
		reservationKey: '02092024193000161456',
		serviceOrderNumber: '1085516',
		serviceOrderYear: '24',
	}
}
