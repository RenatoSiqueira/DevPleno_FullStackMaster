const express = require('express')
const mysql = require('mysql')
const path = require('path')
const app = express()
const port = process.env.Port || 3000
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cadastro'
})

connection.connect((err) => {
    if (err)
        console.log('Error on Connect')
    else
        console.log('Connected')
})

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => console.log('Server Started on: ' + port))