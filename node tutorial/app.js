const http = require('http');
const path = require('path');
const fs = require('fs');
const server = http.createServer((req, res) => {
    //   if (req.url == "/") {
    //       fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //           res.end(content);
    //       })
    //   }

    //caminho dos arquivos
    let pathFile = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);



    //extensão
    let extname = path.extname(pathFile);

    //tipo
    let contentType = 'text/html';

    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;

        case '.js':
            contentType = 'text/javascript';
            break;
        case '.html':
            contentType = 'text/html';
            break;
        default:
            break;
    }

    fs.readFile(pathFile, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                //não achou a pagina
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(404, { 'content-type': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else {
                //erro de servidor
                res.writeHead(500);
                res.end('Erro interno:' + err.code);
            }
            //caso de certo
        } else {
            res.writeHead(200, { 'content-type': extname });
            res.end(content, 'utf8');
        }
    })




})

server.listen('3000');