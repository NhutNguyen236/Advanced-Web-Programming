const http = require('http')
const url = require('url')
const queryString = require('querystring')

const server = http.createServer((req, res) =>{
    // If you use languages which have nothing the same with English
    
    res.writeHead(200, {
        // add charset=utf-8 and plz dun space it like this charset = utf-8, looks nice but doesn't work
        'Content-Type' : 'text/html; charset=utf-8'
    })
    res.end('heo là để ăn')
})

// If you dun console.log it out, will receive nothing, OK
// Totally empty console after the node something.js
// Which means you have to remember this http://localhost:8080 by yourself
server.listen(8080, () => {
    console.log("The server is running at http://localhost:8080")
})

