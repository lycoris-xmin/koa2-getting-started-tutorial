/*
 * @Author: lycoris zzyo.yj@outlook.com
 * @Date: 2022-06-14 15:26:22
 * @LastEditors: lycoris zzyo.yj@outlook.com
 * @LastEditTime: 2022-06-14 15:39:28
 * @FilePath: \koa2-getting-started-tutorial\common\error.class.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

class FriendlyError extends Error {
    Friendly = {};
    constructor(message) {
        super(message);
        this.message = '友好异常';
        this.name = 'FriendlyError';
        this.Friendly = message;
    }
}

class ApplicationError extends Error {
    ApplicationError = {};
    constructor(message, res) {
        super(message);
        this.message = message;
        this.name = 'FriendlyError';
        this.ApplicationError = res;
    }
}

module.exports = {
    FriendlyError,
    ApplicationError
}