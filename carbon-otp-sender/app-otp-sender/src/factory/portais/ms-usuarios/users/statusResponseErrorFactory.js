exports.extractData = (axiosErrorResponse) => {
	let errorDataValue = axiosErrorResponse.data //The failover structure to print, when error messages came with from an unknow structure
	if (axiosErrorResponse.data.errors && axiosErrorResponse.data.errors.length) {
		//Error message when receives HTTP 400 usually came from this structure
		errorDataValue = axiosErrorResponse.data.errors[0]
	} else if (axiosErrorResponse.data.details) {
		//Error message when receives HTTP 400 caused by invalid payload usually came from this structure
		errorDataValue = axiosErrorResponse.data.details
	}
	return errorDataValue
}
