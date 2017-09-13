const env = require('./config/env');
const winston = require('winston');

const logger = new winston.Logger();

if (env !== 'prod') {
    logger.add(winston.transports.Console);
    logger.info('non PROD env chosen. Logging to console too.');
}

if (env === 'dev') {
    // TODO: Add some external logging service (a la logz.io) :)
}

logger.info('Logger loaded successfully');

module.exports = logger;