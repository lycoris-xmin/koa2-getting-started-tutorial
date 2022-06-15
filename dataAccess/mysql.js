/*
 * @Author: lycoris zzyo.yj@outlook.com
 * @Date: 2022-06-15 12:44:03
 * @LastEditors: lycoris zzyo.yj@outlook.com
 * @LastEditTime: 2022-06-15 13:51:21
 * @FilePath: \koa2-getting-started-tutorial\dataAccess\mysql.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const client = require('mysql');
const log = require('../common/log4js.js');
const { mysql } = require('../common/config.js');

//定义pool池
var pool = client.createPool(mysql);

/**
 * @function 读取内容第一行
 * @param {*} sql 
 * @param {*} params 
 * @param {*} callback 
 */
function ExecuteScalar(sql, params, callback) {

    if (params && typeof params == 'function') {
        callback = params;
        params = void 0;
    }

    pool.getConnection((err, conn) => {
        if (err) {
            log.error(0, `数据库执行失败: ${err.stack || err.message}`);
            if (callback)
                callback(err, null);
        }

        if (params) {
            conn.query(sql, params, (err, rows) => {
                //回收pool
                conn.release();
                if (err) {
                    if (callback)
                        callback(err, null);
                    return;
                }

                if (callback)
                    callback(null, rows && rows.length >= 1 ? rows[0] : null);
            });
        } else {
            conn.query(sql, (err, rows) => {
                //回收pool
                conn.release();
                if (err) {
                    log.error(0, `数据库执行失败: ${err.stack || err.message}`);
                    if (callback)
                        callback(err, null);
                    return;
                }

                if (callback)
                    callback(null, rows && rows.length >= 1 ? rows[0] : null);
            });
        }
    });
}

/**
 * @function 读取内容第一行
 * @param {*} sql 
 * @param {*} params 
 * @returns {err,data} 
 */
async function ExecuteScalarAsync(sql, params) {
    return new Promise((resolve, reject) => {
        ExecuteScalar(sql, params, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}

module.exports = {
    ExecuteScalar,
    ExecuteScalarAsync
}