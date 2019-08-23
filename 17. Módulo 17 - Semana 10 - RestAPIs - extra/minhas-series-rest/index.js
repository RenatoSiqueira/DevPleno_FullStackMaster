const express = require('express')
const app = express()

const port = process.env.port || 3000

const series = require('./routes/series')
const mongo = process.env.mogoose || 'mongodb://localost/minhas-series-rest'

app.use('/series', series)

mogoose.connect(mongo, { useMongoClient: true })
    .then(() => app(port, () => console.log('Listening...')))
    .catch(e => console.log(e))