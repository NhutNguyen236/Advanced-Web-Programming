const express = require('express')
const socketio = require('socket.io')

const app = express()
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index'))
app.get('/login', (req, res) => res.render('login'))
app.get('/chat', (req, res) => res.render('chat'))

const webServer = app.listen(8080, () => console.log('http://localhost:8080'))
const io = socketio(webServer)

io.on('connection', handleNewConnection)

function handleNewConnection(client) {
    console.log('New client connected: ' + client.id)

    client.on('disconnect', () => console.log('\tClient ' + client.id + ' disconnected from server.'))
    client.emit('welcome', 'Welcome to socketio')
}