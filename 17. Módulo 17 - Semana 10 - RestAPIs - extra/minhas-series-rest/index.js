/*

GET /series == retorna todas as séries
POST /series == crio uma nova série
GET /series/id == retorna uma série
DELETE /series/id == excluo uma série
PUT /series/id == altero uma série

*/

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const port = process.env.port || 3000

const series = require('./routes/series')
const mongo = process.env.mongoose || 'mongodb://localhost/minhas-series-rest'
mongoose.Promise = global.Promise

app.use(bodyParser({ extended: true }))
app.use('/series', series)

mongoose.connect(mongo, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => console.log('Listening...'))
    })
    .catch(e => console.log(e))