require('dotenv').config()
const express = require('express')
const mysql = require('mysql')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.Port || 3000
const connection = mysql.createConnection({
    host: process.env.hostDB,
    user: process.env.userDB,
    port: process.env.portDB,
    password: process.env.passDB,
    database: process.env.databaseDB
})

const dependencies = {
    connection
}

const pessoas = require('./routes/pessoas')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})
app.use('/pessoas/', pessoas(dependencies))

connection.connect((err) => {
    if (err)
        console.log('Error on Connect', err)
    else {
        app.listen(port, () => console.log('Server Started on: ' + port))
    }
})
