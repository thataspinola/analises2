
exports.GET_LEAD_CACHE_RETURN = () => {
    return {
        LEAD_ID: "dqwd12e12e132-12e1eee12"
    }
}

exports.GET_SECOUND_LEAD_CACHE_RETURN = () => {
    return {
        LEAD_ID: "dqwd12e12e132-12eee12-sd122qwqw43wdq"
    }
}

exports.GET_DYNAMODB_LEAD_INPUT = () => {
    return {
        vdoCode:"teste", 
        branchId:"tes1", 
        leadId:"12312"
    }
}

exports.GET_RETURN_METHOD_CREATE = () => {
    return {
        $metadata: { httpStatusCode: 200 },
    }
}

exports.GET_RETURN_METHOD_GET = () => {
    return {Item: {LEAD_ID: "w12ed9121wdas"}}
} 