/*
 * @Author: lycoris zzyo.yj@outlook.com
 * @Date: 2022-06-15 13:17:57
 * @LastEditors: lycoris zzyo.yj@outlook.com
 * @LastEditTime: 2022-06-15 13:54:37
 * @FilePath: \koa2-getting-started-tutorial\application\demo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const clibus = require('../dataAccess/demo');

/**
 * @function 获取demo表第一行数据
 */
const getDemoFirstData = function () {
    clibus.getdemofirst((err, data) => {
        console.log(data);
    });
}

/**
 * @function 获取demo表第一行数据
 * @returns 
 */
const getDemoFirstDataAsync = async function () {
    let data = await clibus.getdemofirstAsync().catch(err => {
        console.log(err);
        throw err;
    });
    console.log(data);
    return data;
}

module.exports = {
    getDemoFirstData,
    getDemoFirstDataAsync
}