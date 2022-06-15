const fs = require('fs');
const path = require('path');

var jsfile = [];

/**
 * @function 动态添加接口方法
 * @param {string} dir 文件夹路径
 */
function addController(dir) {

    //读取文件
    let files = fs.readdirSync(dir);

    files.forEach((fileName) => {
        //拼接文件路径
        let fillPath = path.join(dir, fileName),
            //获取文件类别
            file = fs.statSync(fillPath);

        if (file.isDirectory()) {
            //如果是文件夹则递归读取下一层
            addController(fillPath, fillPath);
        } else {
            // 如果是js文件则直接添加进js文件数组
            if (fileName.endsWith('.js'))
                jsfile.push(fillPath);
        }
    });
}

/**
 * @function 添加koa-route接口路由
 * @param {object} mapping js开放的模块
 * @param {module} route koa-route
 */
function addMapping(mapping, route) {
    if (mapping) {
        for (let map in mapping) {
            try {
                // 拆解module.exports的key
                // 获取接口请求方式
                let method = map.split('|')[0];
                // 获取接口请求地址
                let url = `${map.split('|')[1]}`;

                if (method == "GET") {
                    route.get(url, mapping[map]);
                    console.log(`koa-route => GET: ${url}`);
                } else if (method == "POST") {
                    if (map.split('|')[2] === 'upload')
                        route.post(url, uploadfonfig, mapping[map]);
                    else
                        route.post(url, mapping[map]);
                    console.log(`koa-route => POST: ${url}`);
                } else if (method == "PUT") {
                    route.put(url, mapping[map]);
                    console.log(`koa-route => PUT: ${url}`);
                } else if (method == "DELETE") {
                    route.delete(url, mapping[map]);
                    console.log(`koa-route => DELETE: ${url}`);
                } else {
                    console.log('0', `koa-route => add fail! ${map}`);
                }
            } catch (e) {
                console.log('0', `koa-route => add fail! ${map}`);
            }
        }
    }
}

/**
 * @function 动态加载接口
 * @param {String} dir 接口文件夹根目录
 */
function autoRegisterRoute(dir) {
    //声明koa路由
    let route = require('koa-router')();

    //提取所有js文件
    addController(dir);

    if (jsfile) {
        //循环注册路由
        for (let mapping of jsfile)
            addMapping(require(mapping), route);
    } else
        console.log('koa-route => add fail! 无接口文件');

    return route;
}

module.exports = {
    autoRegisterRoute: autoRegisterRoute
}