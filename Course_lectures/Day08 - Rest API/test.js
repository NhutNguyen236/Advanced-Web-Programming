var express = require('express');

var app = express();

const data = [
    {
        id: 1,
        name: "name 1"
    },

    {
        id: 2,
        name: "name 2"
    },
]
// Get the last element in list
var lastID = data[data.length-1].id;

// Read
app.get('/product', (req, res) => {
    res.json(data);
})

//Create
app.post('/product', (req, res) => {
    var newData= {"id":lastID + 1,"name":"name" + (lastID + 1)};
    data.push(newData);
    res.json(data);
})

//Update

//Delete
app.delete('/product', (req, res) => {
    res.send('Delete request sent');
})

app.put('/product')
var server = app.listen(8080, () => {
    console.log('http://localhost:8080');
})
