const express = require('express');
const app = express();

app.set('view engine', 'jade');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/submit', (req, res) => {
    res.render('submit');
})
var data = [
    {
        email: 'erer',
        pass: '232323'
    }
];



app.post('/submit', (req, res) => {
    let email = req.body.email;
    let pass = req.body.pass;

    data.push(req.body);
    console.log(data);
})

console.log(data);

app.listen(8080, () => {
    console.log('http://localhost:8080/submit');
})