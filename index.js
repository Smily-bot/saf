//Creating server is also a part of core module i.e., http Module

const http = require('http');
const fs = require('fs');
const path = require('path');
var qs = require('querystring');

const hostname = "localhost";
const port = "3000";



//To create server:
const server = http.createServer((request,response) => {

    // console.log(request.headers);
    console.log('Request for ' + request.url + ' by method ' + request.method);
    if(request.method == 'GET'){
        var fileURL;

        if(request.url == '/'){
            fileURL = "/index.html";
        }else{
            fileURL = request.url;
        }

        var filePath = path.resolve('./public' + fileURL);
        const fileExt = path.extname(filePath);
        
        if(fileExt == '.html'){
            fs.exists(filePath, (exists) => {

                if(!exists){
                    response.statusCode = 404;
                    response.setHeader('Content-Type','text/html');
                    fs.createReadStream('public/' + response.statusCode + '.html').pipe(response);
                }else{
                    response.statusCode = 200;
                    response.setHeader('Content-Type','text/html');
                    fs.createReadStream(filePath).pipe(response);
                }
            })
        }else if(fileExt == '.gif'){
                response.statusCode = 200;
                response.setHeader('Content-Type','image/gif');
                fs.createReadStream(filePath).pipe(response);
        }else if(fileExt == '.jpg'){
            response.statusCode = 200;
            response.setHeader('Content-Type','image/jpg');
            fs.createReadStream(filePath).pipe(response);
    }else if(fileExt == '.png'){
        response.statusCode = 200;
        response.setHeader('Content-Type','image/png');
        fs.createReadStream(filePath).pipe(response);
}else if(fileExt == '.css'){
    response.statusCode = 200;
    response.setHeader('Content-Type','text/css');
    fs.createReadStream(filePath).pipe(response);
}else if(fileExt == '.js'){
    response.statusCode = 200;
    response.setHeader('Content-Type','text/javascript');
    fs.createReadStream(filePath).pipe(response);
}else if(fileExt == '.ttf'){
    response.statusCode = 200;
    response.setHeader('Content-Type','font/ttf');
    fs.createReadStream(filePath).pipe(response);
}
        
        else {
            response.statusCode = 404;
            response.setHeader('Content-Type','text/html');
            fs.createReadStream('public/' + response.statusCode + '.html').pipe(response);
        }

    }else if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            post = qs.parse(body);
            // use post['blah'], etc.
            console.log(post);
            response.statusCode = 200;
            response.setHeader('Content-Type','text/html');
            response.end('<html> <body> <h1> uploaded <br>'+ post.message +' </h1> </body> </html>');
        });
        
    }
    else{
        response.statusCode = 404;
        response.setHeader('Content-Type','text/html');
        response.end('<html> <body> <h1> uploaded </h1> </body> </html>');
    }

    
     


    // response.statusCode = 200;
    // response.setHeader('Content-Type','text/html');

    // response.end('<html> <body> <h1> Server Connection sucess :) </h1> </body> </html>')
})

server.listen(port,hostname, () => {
    console.log(`Server Running at http://${hostname}:${port}`);
});