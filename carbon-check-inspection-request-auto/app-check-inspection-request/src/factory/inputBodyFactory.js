exports.getBody = (record) => {
    const receivedFromDb = record.dynamodb?.OldImage
    if (receivedFromDb) {
        return {
            contactEmail: receivedFromDb.contactEmail.S,
            idTransaction: receivedFromDb.idTransaction.S,
            inspectionRequestDate: receivedFromDb.inspectionRequestDate.S,
            quotationNumber: receivedFromDb.quotationNumber.S,
            attemptAfterPaymentError: receivedFromDb.attemptAfterPaymentError?.BOOL || false,
            receivedFromDb: true
        }
    } else if (record.body) {
        return JSON.parse(record.body)
    }

    return null
}