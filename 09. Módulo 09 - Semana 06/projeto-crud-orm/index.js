require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.port || 3000

const model = require('./models/index')
const pessoas = require('./routes/pessoas')

app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})
app.use('/pessoas', pessoas)

model.sequelize.sync().then(() => {
    app.listen(port, () => console.log('CRUD-ORM Listening'))
})