var http = require('http');
var fs = require('fs');
var file = "./index.html";
fs.readFile(file, function (err, html) {
    http.createServer(function (req, res) {
        var nombre = 'bacon';
        var html_string = html.toString();
        var variables = html_string.match(/[^\{\}]+(?=\})/g);
        for (var i = variables.length - 1; i >= 0; i--) {
            var value = eval(variables[i]);
            html_string = html_string.replace("{" + variables[i] + "}", value);
        }
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(html_string);
        res.end();
    }).listen(8080);
});
