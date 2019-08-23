require('dotenv').config()
const express = require('express')
const app = express()
const parse = require('xml2js').parseString
const bodyParser = require('body-parser')
const cors = require('cors')
const request = require('request-promise')

const { email, token } = process.env

app.use(cors)
app.use(bodyParser.urlencoded({ extended: true }))

const Pagseguro = require('pagseguro')

const dados = {
    email,
    token,
    mode: 'sandbox'
}

app.get('/', (req, res) => {
    res.send('pagseguro')
})

app.get('/pagar', (req, res) => {
    const pagseguro = new Pagseguro(dados)

    pagseguro.currency('BRL')
    pagseguro.reference('5555')
    pagseguro.addItem({
        id: 1,
        description: 'Bola quadrada',
        amount: '12.00',
        quantity: 4,
        weight: 1
    })
    pagseguro.setRedirectURL('http://localhost/pagok')
    pagseguro.setNotificationURL('http://localhost/notify')
    pagseguro.send((err, pags) => {
        parse(pags, (err, js) => {
            const url = 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code='
            res.redirect(url + js.checkout.code)
        })
    })
})

app.post('/notify', async (req, res) => {
    const notification = req.body.notificationCode
    const payment = await request({
        url: 'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions/notifications/' + notification + '?email=' + process.env.email + '&token=' + process.env.token,
        method: 'get'
    })

    const paymentObj = parse(payment, (err, dados) => {
        res.send(dados)
    })

})

app.listen(80, () => console.log('Running...'))