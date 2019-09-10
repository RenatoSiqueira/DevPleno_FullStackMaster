const express = require('express')
const path = require('path')
const app = express()

const port = process.env.port || 3000
const indexRouter = require('./routes/index')
const tabuadaRouter = require('./routes/tabuada')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/', indexRouter)
app.use('/tabuadas', tabuadaRouter)

app.listen(port, () => console.log('Tabuada Server on port: ' + port))