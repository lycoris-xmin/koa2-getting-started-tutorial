/*
 * @Author: lycoris zzyo.yj@outlook.com
 * @Date: 2022-06-09 10:41:41
 * @LastEditors: lycoris zzyo.yj@outlook.com
 * @LastEditTime: 2022-06-15 13:55:05
 * @FilePath: \koa2-getting-started-tutorial\controllers\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const demo = require('../application/demo.js');


// 由于这系列只讲后端，需要一个页面来配合，此处沿用之前篇章的处理函数，生成一个页面，供我们测试
const loginPage = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
    <form action="/login" method="post">
        <p>Name: <input name="name" value="lycoris"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
}

/**
 * 登录
 */
const login = async (ctx, next) => {
    const { name, pwd } = ctx.request.body;
    if (!name || !pwd)
        ctx.response.body = `<h1>Login error!</h1>`;

    if (name != 'lycoris' && pwd != '123456')
        ctx.response.body = `<h1>Login failed!</h1><p><a href="/">Try again</a></p>`;

    let html = `<h1>Welcome, ${name}!</h1>`;
    html += `<a href='/page/userinfo'>查看用户信息</a>`

    ctx.response.body = html;
}

/**
 * @function  获取demo表第一行数据
 * @param {*} ctx 
 * @param {*} next 
 */
const getfirstdemoData = async (ctx, next) => {
    //demo.getDemoFirstData();
    let data = await demo.getDemoFirstDataAsync();
    ctx.response.body = {
        resCode: 0,
        resMsg: '',
        data: data
    }
}

module.exports = {
    'GET|/page/login': loginPage,
    'POST|/login': login,
    'GET|/getfirstdemoData': getfirstdemoData
}
