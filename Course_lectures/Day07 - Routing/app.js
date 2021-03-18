var birds = require('./routes/birds.js');
var express = require('express');
var app = express();

app.use('/birds', birds);

var server = app.listen(8080, () =>{
    console.log("The server is now running at http://localhost:8080/birds");
})
 