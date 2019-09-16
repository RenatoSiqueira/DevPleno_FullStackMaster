const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.set('view engine', 'ejs')

io.on('connection', socket => {
    console.log('a user has been connected..')
    socket.emit('msg', { body: 'Olá!' })
    setInterval(() => {
        socket.emit('msg', { body: 'Olá Socket Io Interval' })
    }, 2500)

    socket.on('msg', msg => console.log(msg))
})

app.get('/', (req, res) => {
    res.render('home')
})

http.listen(3000, () => console.log('running...'))