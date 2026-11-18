const xss = require('xss')

const sanitizeInput = (obj) => {
    if (typeof obj === 'string') {
        return xss(obj)
    }
    if (Array.isArray(obj)) {
        return obj.map(sanitizeInput)
    }
    if (typeof obj === 'object' && obj !== null) {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k, sanitizeInput(v)])
        )
    }

    return obj
}

exports.sanitizeInput = sanitizeInput