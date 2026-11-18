exports.EVENT_HANDLER_TRACE = () => {
    return {
        headers: {
            'carbon-trace-id': 'trace-id-123'
        }
    }
}

exports.EVENT_HANDLER_TRACE_UNDEFINED = () => {
    return {
        headers: {}
    }
}


exports.EVENT_HANDLER_TRACE_NOT_STRING = () => {
    return {
        headers: {
            'carbon-trace-id': 123
        }
    }
}

exports.TRACE_ID_UUID = () => {
    return 'generated-uuid-789'
}
