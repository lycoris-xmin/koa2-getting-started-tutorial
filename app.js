/*
 * @Author: lycoris zzyo.yj@outlook.com
 * @Date: 2022-06-06 15:34:30
 * @LastEditors: lycoris zzyo.yj@outlook.com
 * @LastEditTime: 2022-06-15 13:39:37
 * @FilePath: \koa2-getting-started-tutorial\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入koa框架
const koa = require('koa');
// 引入json解析中间件
const bodyparser = require('koa-bodyparser')();
// 引入跨域中间件
const cors = require('koa-cors')();
// 引入静态资源中间件
const serve = require('koa-static')
// 引入动态注册路由js文件
const { autoRegisterRoute } = require('./common/autoRegisterRoute.js');
// 引入自定义中间件js文件
const middlewares = require('./common/middlewares.js');
// 引入配置文件js
const config = require('./common/config.js');
// 引入log工具
const log = require('./common/log4js.js');
// 引入自定义错误类
const { FriendlyError } = require('./common/error.class.js');

// 初始化koa
const app = new koa();

// 加载工具服务注入
app.use(async (ctx, next) => {
    //工具类绑定
    ctx.tool = {
        log: log
    }

    await next();
});

// 跨域处理
app.use(cors);

app.use(middlewares.ipControl);

// 加载静态资源中间件
app.use(serve('./static'));

// 加载全局异常捕捉
app.use(middlewares.errorCatch);

// 加载返回值公共参数赋值
app.use(middlewares.responseFill);

// 加载请求入参解密
app.use(middlewares.requestDecrypt);

// 加载友好异常捕捉
app.use(middlewares.friendlyHandler);

// 全局异常捕捉测试方法
// app.use(async (ctx, next) => {
//     // throw new Error('一个被程序员漏掉的异常');
//     throw new FriendlyError({ resCode: -2, resMsg: '友好异常' })
// });

// 加载json解析中间件
app.use(bodyparser);

// 加载身份验证中间件
app.use(middlewares.permission);

// 动态注册路由
const route = autoRegisterRoute(`${__dirname}/controllers`);

// 引入路由
app.use(route.routes());

// 启动接口服务
app.listen(config.application.port, () => {
    log.info(0, `Server is start Url:http://localhost:${config.application.port}`);
});