var express = require('express');

var app = express();

app.set('view engine', 'jade');

app.get('/',(req, res) =>{
    res.render('default', {web_name: '', color: ''});
})

app.get('/:filename/:color', (req, res) => {
    var filename = req.params.filename;
    var color = req.params.color;

    res.render('default', {web_name: filename, color: color});
})

var server = app.listen(8080, ()=>{
    console.log("The server is now running at http://localhost:8080");
})

module.exports = app;