var http = require('http');
var fs = require('fs');
var parser = require('./params_parser.js');
var p = parser.parse;
var file = "../index1.html";
http.createServer(function (req, res) {
    if (req.url.indexOf("favicon.ico") > 0) {
        return;
    }
    fs.readFile(file, function (err, html) {
        var html_string = html.toString();
        var variables = html_string.match(/[^\{\}]+(?=\})/g);
        var nombre = "";
        var parametros = p(req);
        for (var i = variables.length - 1; i >= 0; i--) {
            variable = variables[i];
            html_string = html_string.replace("{" + variables[i] + "}", parametros[variables[i]]);
        }
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(html_string);
        res.end();
    });
}).listen(8080);
