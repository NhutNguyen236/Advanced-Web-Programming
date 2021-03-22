var express = require('express');
var fs = require('fs');

var app = express();

app.use(async (req, res, next) => {
    const path = req.path.toLocaleLowerCase();
    if(fs.existsSync(_dirname + '/views' + path + '.jade')){
        return res.render(path.replace(/^\//, ''));
    }
    next();
})

var server = app.listen(8080, () => {
    console.log('Go to http://localhost:8080');
})