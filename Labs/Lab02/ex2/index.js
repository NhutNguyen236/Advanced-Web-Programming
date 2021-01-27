const http = require('http')
const URL = require('url')
const queryString = require('querystring')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) =>{

    const url = URL.parse(req.url)
    // If you use languages which have nothing the same with English
    
    res.writeHead(200, {
        // add charset=utf-8 and plz dun space it like this charset = utf-8, looks nice but doesn't work
        'Content-Type' : 'text/html; charset=utf-8'
    })

    //console out the url path so you can see its query string
    console.log(url)

    // check if url pathname is main page
    if(url.pathname === '/'){
        let html = fs.readFileSync(path.join(__dirname, 'Login.html'))
        return res.end(html)
    }

    // result page
    if(url.pathname === '/result'){
        let query = queryString.decode(url.query)
        console.log(query)

        // If operand 1 not found
        if(!query.o1){
            let html = fs.readFileSync(path.join(__dirname, '404.html'))
            return res.end(html)
        }

        // if operand 2 not found
        if(!query.o2){
            return res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Bootstrap Example</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
            </head>
            <body>
                <div class="alert alert-danger container fluid mt-5 w-50" role="alert">
                    Operand 2 not found
                </div>
            </body>
            </html>`)
        }
        
        // Operator process
        else{
            let ops = ['+', '-', '*', '/'];
            if(!ops.includes(query.op)){
                return res.end(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <title>Bootstrap Example</title>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
                    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
                </head>
                <body>
                    <div class="alert alert-danger container fluid mt-5 w-50" role="alert">
                        No operator selected
                    </div>
                </body>
                </html>`)
            }
        }

        let a = parseInt(query.o1)
        let b = parseInt(query.o2)
        let ketQua = 0
        switch (query.op){ 
            case ('+'): 
                ketQua = a + b
                break
            case ('-'): 
                ketQua = a - b
                break
            case ('*'): 
                ketQua = a * b
                break
            case ('/'): 
                ketQua = a / b
                break
        }
        return res.end(`Result: ${a} ${query.op} ${b} = ${ketQua}`)
    }

    else{
        return res.end('404')
    }

})

// If you dun console.log it out, will receive nothing, OK
// Totally empty console after the node something.js
// Which means you have to remember this http://localhost:8080 by yourself
server.listen(8080, () => {
    console.log("The server is running at http://localhost:8080")
})