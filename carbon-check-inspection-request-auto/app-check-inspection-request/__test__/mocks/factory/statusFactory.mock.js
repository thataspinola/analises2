const { INSPECTION } = require('../../../src/property')

exports.GET_OK_STATUS = () => INSPECTION.OK

exports.GET_PENDING_STATUS = () => INSPECTION.PENDING

exports.GET_REFUSED_STATUS = () => INSPECTION.REFUSED

exports.GET_ISSUED_STATUS = () => INSPECTION.ISSUED