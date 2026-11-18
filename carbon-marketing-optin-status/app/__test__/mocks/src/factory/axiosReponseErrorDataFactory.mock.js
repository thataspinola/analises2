exports.ERROR_NOT_FOULD = () => {
    return {
        response: {
            status: 404,
            data: 'Not Found',
        },
    }
}

exports.RESPONSE_NOT_FOULD = () => {
    return {
        status: 404,
        message: 'Not Found',
    }
}

exports.ERROR_BAD_REQUEST = () => {
    return {
        response: {
            status: 400,
            data: { message: 'Bad Request' },
        },
    }
}

exports.RESPONSE_BAD_REQUEST = () => {
    return {
        status: 400,
        message: JSON.stringify({ message: 'Bad Request' })
    }
}

exports.ERROR_TIMEOUT = () => {
    return {
        request: {},
        code: 'ECONNABORTED',
        message: 'timeout of 0ms exceeded',
    }
}


exports.REPONSE_TIMEOUT = () => {
    return {
        status: 500,
        message: 'ECONNABORTED - timeout of 0ms exceeded',
    }
}

exports.ERROR_UNKNOWN = () => {
    return {
        message: 'An unknown error occurred',
    }
}

exports.RESPONSE_UNKNOWN = () => {
    return {
        status: 500,
        message: 'An unknown error occurred',
    }
}

