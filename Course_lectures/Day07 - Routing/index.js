/* In Chapter 1, we require http to create server and so on 
But now, we have just installed express module so yeah! require it to use it
*/
var express = require('express');

var app = express();
app.set('view engine', 'jade');

/*
app.get('/',(req,res) =>{
    res.send('Hello World')
});
*/

// Route Paths demonstration 
app.route('/').get((req, res) =>{
    res.send('Welcome to Root page');
})

app.route('/about').get((req, res) =>{
    res.send('Welcome to About page');
})

app.route('/order').get((req, res) =>{
    res.send('Welcome to Order page');
})

// Route handler
// a simple regex to handle the repetitions
/**
    +: one or more repetitions.
    ?: either zero or one.
    *: zero or more repetitions.
 */
app.get('/us+er*', (req, res) => {
    res.send('Welcome to User page');
})

app.get('/user(name)?', (req, res) => {
    res.send('Welcome to User page');
})

// Double callback 
app.route('/next').get((req, res, next) =>{
    console.log('The res will be sent by the next function...')
    next()
}, (req, res)=>{
    res.send('Here we go')
})

app.use((req, res) =>{
    res.status(404)
    res.send('404 - Page not found')
})

var server = app.listen(8080, () =>{
    console.log("The server is now running at http://localhost:8080");
})