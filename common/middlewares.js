const { FriendlyError } = require('./error.class.js');

/*
 * @Author: lycoris zzyo.yj@outlook.com
 * @Date: 2022-06-09 16:21:26
 * @LastEditors: lycoris zzyo.yj@outlook.com
 * @LastEditTime: 2022-06-15 13:43:23
 * @FilePath: \koa2-getting-started-tutorial\common\middlewares.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @function 全局异常捕捉
 * @param {*} ctx 
 * @param {*} next 
 */
const errorCatch = async (ctx, next) => {
    try {
        // 等待接口流程逻辑处理
        await next();

    } catch (error) {
        ctx.response.status = 200;
        // 具体返回什么，由项目工程去确定，此处只做示例展示
        ctx.response.body = {
            resCode: -1,
            resMsg: '服务器繁忙,请稍后再试!'
        };

        //全局异常捕获
        ctx.tool.log.error(0, `${ctx.request.path} => ${error.stack || error.message}`);
    }
}


/**
 * @function 身份验证处理
 * @param {Object} ctx 
 * @param {Object} next 
 */
const permission = async (ctx, next) => {
    // 请求参数统一赋值给body
    if (ctx.request.method == "GET")
        ctx.request.body = ctx.request.query;

    let path = ctx.request.path,
        body = ctx.request.body,
        headers = ctx.headers;

    // 根据你获取到的信息进行验证
    // 比如验证请求头是否包含 token 字段,并且token字段的值为1234567

    // // 没有请求头返回404
    // if (!headers) {
    //     ctx.response.status = 404;
    //     return;
    // }

    // // 没有token请求头返回401
    // if (!headers.token) {
    //     ctx.response.status = 401;
    //     ctx.tool.log.error(0, '请求头中找不到token');
    //     return;
    // }

    // // 没有token请求头返回405
    // if (headers.token != '123456') {
    //     ctx.response.status = 405;
    //     ctx.tool.log.error(0, 'token验证失败');
    //     return;
    // }

    //验证通过放行，等待后续中间件处理
    await next();
}

/**
 * @function 友好异常捕获
 * @param {*} ctx 
 * @param {*} next 
 */
const friendlyHandler = async (ctx, next) => {
    try {

        // 等待接口流程逻辑处理
        await next();

    } catch (error) {
        // 异常捕获，判断error是否为FriendlyError(友好异常)
        if (error instanceof FriendlyError) {
            // 解构里面的属性
            const { resCode, resMsg } = error.Friendly;

            // 判断属性是否有值
            if (!resCode && !resMsg)
                throw error;

            // 属性有值的话，赋值给返回值处理
            ctx.response.body = {
                resCode: resCode || -1,
                resMsg: resMsg || '服务异常'
            };
        }
    }
}

/**
 * @function IP黑白名单控制
 * @param {*} ctx 
 * @param {*} next 
 */
const ipControl = async (ctx, next) => {
    try {
        let clientIp = ctx.headers['x-forwarded-for'] || ctx.headers['x-real-ip'] || ctx.request.ip;

        // 如果反向代理，则x-forwarded-for可能会有多个IP
        if (clientIp.indexOf(',') > -1) {
            // 根据,分组
            clientIp = clientIp.split(',');
            // 过滤无效的IP记录
            clientIp = clientIp.filter((x) => x != undefined && x != null && x != '' && x != 'undefined');
            // 获取第一个有效的记录既为客户端IP
            clientIp = clientIp ? clientIp[0] : '-';
        }

        // 拿到IP后，根据自己的业务需求做你自己想做的事
        // do something

        await next();
    } catch (error) {
        // 异常处理 
        // do something
    }
}

/**
 * @function 请求入参解密
 * @param {*} ctx 
 * @param {*} next 
 */
const requestDecrypt = async (ctx, next) => {
    try {
        let body = ctx.request.body || ctx.request.query;

        // 参数为空的时候 返回404
        if (!body) {
            ctx.response.status = 404;
            return;
        }

        // 解密(解密方法此处仅是示例，根据业务自行编写方法处理)
        // ctx.request.body = Decrypt(body);

        await next();
    } catch (error) {
        // 异常处理 
        // do something
    }
};

/**
 * @function 返回值公共参数赋值
 * @param {*} ctx 
 * @param {*} next 
 */
const responseFill = async (ctx, next) => {
    try {
        // 去除入参的请求唯一标识
        let requestId = ctx.headers['RequestId'];

        await next();

        // 返回的赋值给返回值
        ctx.response.body.requestId = requestId;
    } catch (error) {
        // 异常处理 
        // do something
    }
}

module.exports = {
    ipControl: ipControl,
    errorCatch: errorCatch,
    friendlyHandler: friendlyHandler,
    permission: permission,
    requestDecrypt: requestDecrypt,
    responseFill: responseFill
}