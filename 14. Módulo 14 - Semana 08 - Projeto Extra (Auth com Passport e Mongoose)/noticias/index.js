const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const port = process.env.port || 3000

const mongo = process.env.MONGODB || 'mongodb://localhost/noticias'

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('index')
})

mongoose
    .connect(mongo, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => console.log('Running...'))
    })
    .catch(e => console.log(e))

/*
const User = require('./models/user')
const user = new User({
username: 'renato',
password: 'teste'
})
user.save(() => console.log('Saved.'))
*/