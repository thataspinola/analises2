exports.formatQuotationResponse = (rawData) => {
    if (!rawData || !Array.isArray(rawData.decisao)) {
        return rawData
    }

    const formattedDecisao = rawData.decisao.map((item) => {
        if (item.grupo && item.grupo.prazoTotal) {
            const fullString = item.grupo.prazoTotal
 
            const regex = /(\d+).*?\(((\d+).*?)\)/
            const match = fullString.match(regex)

            if (match) {
                item.grupo.prazoTotal = match[1]
                item.grupo.prazoRestante = match[3]
            } else {
                const onlyNumbers = fullString.match(/\d+/g)
               item.grupo.prazoTotal = onlyNumbers ? onlyNumbers[0] : fullString
                item.grupo.prazoRestante = (onlyNumbers && onlyNumbers[1]) ? onlyNumbers[1] : null
            }
        }
        return item
    })

    return {
        ...rawData,
        decisao: formattedDecisao
    }
}