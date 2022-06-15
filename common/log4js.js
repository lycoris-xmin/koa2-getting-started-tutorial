const log4js = require('log4js');
const config = require('../log4js.json');

const dateFormat = require('date-format');
dateFormat.ISO8601_FORMAT = 'yyyy-MM-dd hh:mm:ss.SSS';

log4js.configure(config);
const logger = log4js.getLogger();

/**
 * @function 基础日志记录
 * @param {string} requestid  请求唯一标识
 * @param {string} msg 日志信息
 */
 const info = (requestid, msg) => {
    requestid = requestid || 0;
    msg = msg || '';
    logger.info(`${requestid} => ${msg}`);
}

/**
 * @function 错误日志记录
 * @param {string} requestid   请求唯一标识
 * @param {string} msg 日志信息
 */
const error = (requestid, msg) => {
    requestid = requestid || 0;
    msg = msg || '';

    if (typeof msg === 'string')
        logger.error(`${requestid} => ${msg}`);
    else
        logger.error(`${requestid} => ${msg.stack}`);
}

module.exports = {
    info: info,
    error: error
};