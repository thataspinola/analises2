exports.getMessage = (
	cpf,
	destinationNumber,
	emailDestinationAddress,
	corporativeHeader,
	pescod,
	formData
) => {
	const message = {
		taxvat: cpf,
		destinationnumber: destinationNumber,
		emaildestinationaddress: emailDestinationAddress,
		corporativeheader: corporativeHeader,
		pescod: pescod,
		formData: formData,
	}

	return message
}
