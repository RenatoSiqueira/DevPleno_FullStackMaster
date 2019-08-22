const express = require('express')
const app = express()

const port = process.env.port || 3000

const series = require('./routes/series')

app.use('/series', series)

app(port, () => console.log('Listening...'))