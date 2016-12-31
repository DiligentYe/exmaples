// 创建http服务器
var http = require('http');

// 创建服务
var server = http.createServer(function(request, response) {
    // 接收请求地址，根据请求地址，做出响应的判断
    var requestUrl = request.url;
    switch (requestUrl) {
        case '/signin':
            // 返回登陆页面
            signIn(request, response);
            break;
        case '/post':
            // 返回post处理后的结果
            post(request, response);
            break;
        default:
            response.writeHead(404, {});
            response.end();
            break;
    }
});

// 打开监听端口
server.listen(8080, function(error) {
    console.log('正在监听8080端口...');
});

function signIn(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.write('<!DOCTYPE html>');
    response.write('<html lang="en">');
    response.write('');
    response.write('<head>');
    response.write('    <meta charset="UTF-8">');
    response.write('    <title>登陆页面</title>');
    response.write('</head>');
    response.write('');
    response.write('<body>');
    response.write('    <form action="post" method="post">');
    response.write('        <table>');
    response.write('            <tr>');
    response.write('                <td>用户名</td>');
    response.write('                <td>');
    response.write('                    <input type="text" name="username" />');
    response.write('                </td>');
    response.write('            </tr>');
    response.write('            <tr>');
    response.write('                <td>密码</td>');
    response.write('                <td>');
    response.write('                    <input type="password" name="password">');
    response.write('                </td>');
    response.write('            </tr>');
    response.write('            <tr>');
    response.write('                <td></td>');
    response.write('                <td>');
    response.write('                    <input type="submit" value="登陆">');
    response.write('                </td>');
    response.write('            </tr>');
    response.write('        </table>');
    response.write('    </form>');
    response.write('</body>');
    response.write('');
    response.write('</html>');

    response.end();
}

function post(request, response) {
    // 接收post传递过来的参数
    var postStr = '';
    request.on('data', function(part) {
        postStr += part;
    });
    request.on('end', function() {
        console.log('postStr = ' + postStr);
        // 处理传递过来的参数字符串
        var querystring = require('querystring'); // 引入处理请求字符串的包
        var query = querystring.parse(postStr); // parse函数将字符串转化为对象
        console.log(query);
        response.end();
    });
}
