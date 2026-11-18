exports.GETDATAREPORT_CUSTOMERALREADYNOTIFIED_TRUE_VALID_INPUT = () => {
	return true
}
exports.GETDATAREPORT_CUSTOMERALREADYNOTIFIED_FALSE_VALID_INPUT = () => {
	return false
}
exports.GETDATAREPORT_CUSTOMERNOTIFYREQUESTSENT_TRUE_VALID_INPUT = () => {
	return true
}
exports.GETDATAREPORT_CUSTOMERNOTIFYREQUESTSENT_FALSE_VALID_INPUT = () => {
	return false
}
exports.GETDATAREPORT_UPDATECUSTOMERNOTIFYSTATUSRETURN_VALID_INPUT = () => {
	return {
		requestId: 'V5JD8W45RBCNHFD083HGSS6CJVV4KONS05AEMVJF66Q9ASUAAJG',
		message: 'Atualizando o status de que o cliente foi notificado com sucesso',
	}
}
exports.GETDATAREPORT_VALID_RETURN = () => {
	return {
		customerNotifyReturnMessage: 'SENT',
		updateCustomerNotifyStatusReturnRequestId:
			'V5JD8W45RBCNHFD083HGSS6CJVV4KONS05AEMVJF66Q9ASUAAJG',
	}
}
exports.GETDATAREPORT_NODATA_VALID_RETURN = () => {
	return {
		customerNotifyReturnMessage: 'N/A',
		updateCustomerNotifyStatusReturnRequestId: 'N/A',
	}
}

exports.GETDATAREPORT_ALREADYNOTIFIED_VALID_RETURN = () => {
	return {
		customerNotifyReturnMessage: 'ALREADY-SENT',
		updateCustomerNotifyStatusReturnRequestId: 'N/A',
	}
}
