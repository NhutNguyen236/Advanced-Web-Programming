const http = require('http')
const URL = require('url')
const queryString = require('querystring')

const server = http.createServer((req, res) =>{

    const url = URL.parse(req.url)
    // If you use languages which have nothing the same with English
    
    res.writeHead(200, {
        // add charset=utf-8 and plz dun space it like this charset = utf-8, looks nice but doesn't work
        'Content-Type' : 'text/html; charset=utf-8'
    })

    // res.end(``) will create a code snippet so here we go
    if(url.path === '/'){
        return res.end(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Node Calculator</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
        </head>
        <body>
        
        <style>
            .container{
                max-width: 600px;
                margin: auto;
            }
        
            checkbox{
                margin-right: 10px;
            }
        
            #error_message{
                color: red;
                font-size: 20px;
            }
        
        </style>
        
        
        <div class="container fluid mt-5">
        
            <div class="form-group">
                <label for="message">Số hạng 1:</label>
                <input type="text" class="form-control w-50" id="message" onkeyup = "displayMessage()" placeholder="Enter new message" name="message">
                <p id = "error_message"></p>
            </div>
        
            <div class="form-group">
                <label for="message">Số hạng 2:</label>
                <input type="text" class="form-control w-50" id="message" onkeyup = "displayMessage()" placeholder="Enter new message" name="message">
                <p id = "error_message"></p>
            </div>
        
            <div class="form-group">
                <label for="color">Phép tính:</label>
                <select class="form-control w-50" name="color" id="color" onchange = "changeColor()">
                    <option value="" disabled selected>Chọn phép tính</option>
                    <option value = "black">Cộng</option>
                    <option value = "red">Trừ</option>
                    <option value = "green">Nhân</option>
                    <option value = "blue">Chia</option value = "black">
                </select>
            </div>
        
            <button id="tinhbtn" type="button" onclick = "showMessage()" class="mt-4 btn btn-warning">Tính</button>
        
        </div>
        
        </body>
        </html>`)
    }
    if(url.path === '/result'){
        return res.end('this is /result page')
    }

    // Page not found simple if-else handler
    else{
        return res.end('404 Page not found')
    }
})

// If you dun console.log it out, will receive nothing, OK
// Totally empty console after the node something.js
// Which means you have to remember this http://localhost:8080 by yourself
server.listen(8080, () => {
    console.log("The server is running at http://localhost:8080")
})