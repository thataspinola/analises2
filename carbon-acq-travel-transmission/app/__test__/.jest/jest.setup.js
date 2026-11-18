global.logger = require('../../config/logger')
require('../../src/utils/errorHandler')

logger.info = jest.fn(() => null)
logger.error = jest.fn(() => null)
logger.warn = jest.fn(() => null)
logger.debug = jest.fn(() => null)
