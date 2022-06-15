const userinfo = async (ctx, next) => {
    var html = '<h1>名字：lycoris</h1>';
    html += '<h1>性别：保密</h1>';
    html += '<h1>年龄：18</h1>';
    html += '<h1>地址：中国</h1>';
    ctx.response.body = html;
}


module.exports = {
    'GET|/page/userinfo': userinfo,
}