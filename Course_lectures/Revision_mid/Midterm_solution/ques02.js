var express = require('express')

var app = express()

app.set('view engine', 'jade')

const monhoc = {
    1:{'tenmonhoc': 'Cau truc du lieu va giai thuat', 'sotc': 2},
    2:{'tenmonhoc': 'Tri tue nhan tao', 'sotc': 2.5},
    3:{'tenmonhoc': 'Xu ly anh so', 'sotc': 3}
}

monhoc[1].mamonhoc = 1
monhoc[2].mamonhoc = 2
monhoc[3].mamonhoc = 3

var new_monhoc = []
new_monhoc.push(monhoc[1])
new_monhoc.push(monhoc[2])
new_monhoc.push(monhoc[3])

// res.json as a array and add mamonhoc as an attribute
app.get('/api', (req, res) => {
    res.json(new_monhoc)
})

app.get('/api/:tu_khoa', (req, res) => {
    var key = req.params.tu_khoa
    var tenmonhoc = ''

    new_monhoc.forEach(item => {
        if(item.tenmonhoc.includes(key) == true){
            tenmonhoc = item.tenmonhoc
        }
    })

    if(!tenmonhoc){
        res.json({'code': 0, 'message': 'Subject not found'})
    }
    else{
        res.send(tenmonhoc)
    }
})
var server = app.listen(8080, () => {
    console.log('http://localhost:8080/api')
})
