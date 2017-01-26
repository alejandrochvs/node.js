var express = require('express');
var app = express();
var hola = "Hola mundoo!"
app.set('view engine', 'jade');
app.get("/", function (req, res) {
    res.render("index", {
        hola: hola
    });
})
app.listen(8080);
