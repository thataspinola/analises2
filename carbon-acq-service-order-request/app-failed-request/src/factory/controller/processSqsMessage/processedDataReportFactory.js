exports.getDataReport = (
	reservingResponse,
	cancelPaymentReservationResponse,
	customerNotifiedResponse
) => {
	const payload = {
		reservingResponse: reservingResponse ? 'SAVED' : 'N/A',
		cancelPaymentReservationResponse: cancelPaymentReservationResponse
			? 'CANCELED'
			: 'N/A',
		customerNotifiedResponse: customerNotifiedResponse ? 'SENT' : 'N/A',
	}

	return payload
}
