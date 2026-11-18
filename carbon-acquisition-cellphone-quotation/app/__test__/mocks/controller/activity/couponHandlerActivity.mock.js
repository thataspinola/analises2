const COUPON_BY_CODE = {
    codigo: 'COUPON10',
    percentualDesconto: 10,
    descricao: 'Cupom por código'
}

const COUPON_BY_BRAND = {
    variacao: 'SAMSUNG',
    percentualDesconto: 15,
    descricao: 'Cupom por marca'
}

const COUPON_BY_MODEL = {
    variacao: 'SAMSUNG-S23',
    percentualDesconto: 20,
    descricao: 'Cupom por modelo'
}

const INPUT_REQUEST_WITH_COUPON = {
    cellPhone: {
        productDetails: {
            phoneBrandCode: 'SAMSUNG',
            phoneModelCode: 'S23'
        },
        coupon: 'COUPON10'
    }
}

const INPUT_REQUEST_WITHOUT_COUPON = {
    cellPhone: {
        productDetails: {
            phoneBrandCode: 'SAMSUNG',
            phoneModelCode: 'S23'
        },
        coupon: null
    }
}

const INPUT_REQUEST_WITHOUT_BRAND = {
    cellPhone: {
        productDetails: {
            phoneBrandCode: null,
            phoneModelCode: 'S23'
        },
        coupon: 'COUPON10'
    }
}

const INPUT_REQUEST_WITHOUT_MODEL = {
    cellPhone: {
        productDetails: {
            phoneBrandCode: 'SAMSUNG',
            phoneModelCode: null
        },
        coupon: 'COUPON10'
    }
}

const INPUT_REQUEST_WITHOUT_BRAND_AND_MODEL = {
    cellPhone: {
        productDetails: {
            phoneBrandCode: null,
            phoneModelCode: null
        },
        coupon: 'COUPON10'
    }
}

const SUCCESS_RESPONSE = {
    codigo: 'COUPON10',
    percentualDesconto: 10,
    descricao: 'Cupom por código'
}

module.exports = {
    COUPON_BY_CODE,
    COUPON_BY_BRAND,
    COUPON_BY_MODEL,
    INPUT_REQUEST_WITH_COUPON,
    INPUT_REQUEST_WITHOUT_COUPON,
    INPUT_REQUEST_WITHOUT_BRAND,
    INPUT_REQUEST_WITHOUT_MODEL,
    INPUT_REQUEST_WITHOUT_BRAND_AND_MODEL,
    SUCCESS_RESPONSE
}
