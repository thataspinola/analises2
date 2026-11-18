const MOCKS = require('../../../../../../index.mock')

exports.GETPAYLOAD_VALID_RETURN = () => {
	return [
        {
            "date": "2025-06-02",
            "dayOfWeek": "Segunda-feira"
        },
        {
            "date": "2025-06-03",
            "dayOfWeek": "Terça-feira"
        },
        {
            "date": "2025-06-04",
            "dayOfWeek": "Quarta-feira"
        }
    ]
}

exports.GETPAYLOAD_PARSEDJSON_VALID_INPUT = () => {
	return MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
}
