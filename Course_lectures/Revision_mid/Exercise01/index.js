var express = require('express');

var app = express();

app.set('view engine', 'jade');

app.get('/',(req, res) =>{
    res.render('rectangle');
})

app.get('/rectangle',(req, res) =>{
    var {chieudai, chieurong} = req.query;
    console.log('Chieu dai la ' + chieudai + ' Chieu rong la ' + chieurong);

    if(chieudai == "" || chieurong == ""){
        res.render('rectangle', {vis: 'none', warning: 'Vui lòng nhập đủ các số đo'});
    }

    else{
        if(isNaN(chieudai) || isNaN(chieurong)){
            res.render('rectangle', {vis: 'none', warning: 'Vui lòng nhập số đo hợp lệ'});
        }

        else{
            var dai = parseInt(chieudai);
            var rong = parseInt(chieurong);
            
            res.render('rectangle', {vis: 'none', dai: dai, rong: rong});
        }
    }
})

var server = app.listen(8080, ()=>{
    console.log("The server is now running at http://localhost:8080");
})

