require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request-promise')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', async (req, res) => {
    const validate = await request({
        method: 'post',
        uri: 'https://www.google.com/recaptcha/api/siteverify',
        formData: {
            secret: process.env.secretRecaptcha,
            response: req.body['g-recaptcha-response'],
            remoteip: req.headers['x-forward-for'] || req.connection.remoteAddress
        }
    })
    const json = JSON.parse(validate)
    if (json.success) {
        res.send('Tudo OK')
    } else {
        res.send('Spam')
    }
})

app.listen(3000, () => console.log('Running...'))