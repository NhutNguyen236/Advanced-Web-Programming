// essential Module import
const bodyParser = require('body-parser')
const express = require('express')
const email_validator  = require('email-validator')
const multer = require('multer')

var app = express()

// set web app view engine
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))

var upload = multer({ dest: 'uploads/', 
fileFilter: (req, file, callback) => {

    // Use of mimetype will check out if it is image or not
    if(file.mimetype.startsWith('image/')){
        callback(null, true)
    }

    else{
        callback(null, false)
    }
    // Before uploading, print its infor out to console
    console.log(file)
    /*
    // Allow uploading
    callback(null, true)
    */
}, limits: {fileSize: 5000}}) // upload up to 5KB maximum

app.get('/', (req, res) => {
    res.render('index')
})


app.get('/login', (req, res) => {
    res.render('login', {email_value: '', password_value: ''})
})

// The name will be sent to this one so catch them by their names
// POST method for login page
app.post('/login', (req, res) => {
    let account = req.body
    if(!account.email){
        res.render('login', {error_mess: 'Please enter your email 😢', email_value: account.email, password_value: account.password})
        console.log('Please enter your email 😢')
    }

    // Try out with email-validator
    if(!email_validator.validate(account.email)){
        res.render('login', {error_mess: 'The email is in the wrong form 😭', email_value: account.email, password_value: account.password})
    }

    // Don't try email_validator here, heard the name? it's for email
    else if(!account.password){
        res.render('login', {error_mess: 'Please enter password 😢', email_value: account.email, password_value: account.password})
        console.log('Please enter password 😢')
    }
    
    else if(account.password.length < 6){
        res.render('login', {error_mess: 'Oh no...Length of the password is less than 6 😅', email_value: account.email, password_value: account.password})
    }

    else if(account.email !== 'admin@gmail.com'){
        res.render('login', {error_mess: 'Wrong email 😭', email_value: account.email, password_value: account.password})
    }

    else if(account.password !== '123456'){
        res.render('login', {error_mess: 'Wrong password 😭', email_value: account.email, password_value: account.password})
    }

    // If everything is OK, go to index.ejs
    else{
        res.render('index')
        console.log('You are good to go now 😆', account)
    }
})

// Go to adding product page 
app.get('/add', (req, res) => {
    res.render('add', {error_message: ''})
})

app.post('/add', (req, res) => {
    let uploader = upload.single('image')
    uploader(req, res, err => {
        let product = req.body
        let image = req.file
        
        if(err){
            res.render('add', {error_message: 'Image is more than 5KB😭'})
        }

        else if(!image){
            res.render('add', {error_message: 'The image file is unacceptable or cannot be left empty😭'})
        }

        //console.log(product)
        //console.log(image)
        else{
            res.render('add', {error_message: 'Product added 😃'})
        }
    })
    
})

// Render error.ejs for pages which were not defined before
app.use('/:route', (req, res) =>{
    var route = req.params.route

    res.render('error', {'title': 'We are sorry for this search but', 'page_name': route, 'error_message': 'is somewhere on the Moon 🌕'})
})

app.listen(8080, () => {
    console.log('This app is listening to http://localhost:8080')
})