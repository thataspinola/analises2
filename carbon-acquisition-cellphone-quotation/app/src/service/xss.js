const xss = require('xss')

exports.sanitizeInput = (data) => {
    const stack = [{ parent: null, key: null, value: data }]

    while (stack.length > 0) {
        const { parent, key, value } = stack.pop()

        if (typeof value === 'string') {
            const sanitized = xss(value)
            if (parent !== null) parent[key] = sanitized
            else data = sanitized
        } else if (typeof value === 'object' && value !== null) {
            Object.keys(value).forEach(k => {
                stack.push({ parent: value, key: k, value: value[k] })
            })
        }
    }

    return data
}