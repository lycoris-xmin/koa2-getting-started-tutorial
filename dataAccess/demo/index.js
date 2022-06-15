/*
 * @Author: lycoris zzyo.yj@outlook.com
 * @Date: 2022-06-15 13:18:41
 * @LastEditors: lycoris zzyo.yj@outlook.com
 * @LastEditTime: 2022-06-15 13:52:54
 * @FilePath: \koa2-getting-started-tutorial\dataAccess\demo\clibus_demo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mysql = require('../mysql.js');

const getdemofirst = function (callback) {
    let sql = 'SELECT * FROM demo;';
    mysql.ExecuteScalar(sql, callback);
}

const getdemofirstAsync = async function () {
    let sql = 'SELECT * FROM demo;';
    return await mysql.ExecuteScalarAsync(sql);
}

module.exports = {
    getdemofirst,
    getdemofirstAsync
}

