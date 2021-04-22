const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const emailValidator = require('email-validator')
const app = express()

const upload = multer({dest:'uploads', 
fileFilter: (req, file, callback) => {

    if (file.mimetype.startsWith('image/')) {
        callback(null, true) // cho phep upload
    }
    else callback(null, false) // không cho upload loại file khác ảnh
    
}, limits: {fileSize: 50000000}}) // 50 Mb max
app.set('view engine','ejs')

/*
    form body có nhiều định dạng khác nhau
    hiện tại html đang gửi dữ liệu theo dạng thông thường
    mà dạng thông thường tức là url-encoded nên
    ta đang cấu hình để bodyParser xử lý nội dung dạng url-encoded
 */

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/add', (req, res) => {
    res.render('add', {error:'', name:'', price:'', desc:'', image: emp})
})

app.post('/add', (req, res) => {

    let uploader = upload.single('image')
    uploader(req, res, err => {

        let {name, price, desc} = req.body
        let image = req.file

        // Leave it undefined first
        let error = undefined

        // check error first
        if (!name || name == 0) {
            error = 'The name is invalid or cannot be left empty'
        }

        else if(!price || price.length === 0){
            error = 'Price is invalid or cannot be left empty'
        }

        else if(isNaN(price) || parseInt(price) < 0){
            error = 'The price is invalid or cannot be a negative number'
        }

        else if (!desc || desc.length === 0) {
            error = 'Description is invalid or cannot be left empty'
        }

        else if(err){
            error = 'Image size is too large'
        }

        else if (!image) {
            error = 'No image or invalid image'
        }
        
        if(error){
            console.log(req.body)
            res.render('add', {error: error, name, price, desc: desc})
        }
        else{
            res.render('add', {error: 'Product added 🎉', name, price, desc: desc, image: image})
        }
        
    })
    
})

app.get('/login', (req, res) => {
    // ở đây cùng cần email và password dạng rỗng
    res.render('login', {email:'', password: ''})
})

app.post('/login', (req, res) => {
    let acc = req.body
    let error = ''
    if (!acc.email) {
        error = 'Vui lòng nhập email'
    }
    else if (!emailValidator.validate(acc.email)) {
        error = 'Email không đúng định dạng'
    }
    else if (!acc.password) {
        error = 'Vui lòng nhập mật khẩu'
    }
    else if (acc.password.length < 6) {
        error = 'Mật khẩu phải có từ 6 ký tự'
    }
    else if (acc.email !== 'admin@gmail.com' ||
            acc.password != '123456') {
        error = 'Sai email hoặc mật khẩu'
    }

    if (error.length > 0) {
        res.render('login', { errorMessage: error,
        email: acc.email,
        password: acc.password})
    }else {
        res.set('Content-Type', 'text/html')
        res.end('Đăng nhập thành công')
    }
})

app.use((req, res) => {
    res.set('Content-Type','text/html') // ctrl + S, không cần chạy lại npm start
    res.end('Liên kết này không được hỗ trợ')
})

app.listen(8080, () => console.log('http://localhost:8080'))