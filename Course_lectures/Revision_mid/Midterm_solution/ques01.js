var express = require('express')

var app = express()

app.set('view engine', 'jade')

app.get('/triangle', (req, res) => {
    res.render('triangle', {n: 5})
})

app.get('/triangle/:n', (req, res) => {
    var n = req.params.n;

    res.render('triangle', {n: n})
})

var server = app.listen(8080, () => {
    console.log('http://localhost:8080/triangle')
})