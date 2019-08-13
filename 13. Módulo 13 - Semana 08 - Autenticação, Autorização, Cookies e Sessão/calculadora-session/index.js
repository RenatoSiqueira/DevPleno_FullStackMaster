const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const port = process.env.PORT || 3000
const app = express()

//app.use(cookieParser())
app.use(session({
    secret: 'devpleno',
    cookie: {
        maxAge: 10 * 60 * 1000
    }
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    console.log('Session Id', req.session.id)
    let contas = []
    if ('contas' in req.session) {
        contas = req.session.contas
    }
    res.render('index', {
        contas
    })
})

app.post('/calc', (req, res) => {
    let { num1, num2, op } = req.body

    num1 = parseInt(num1)
    num2 = parseInt(num2)

    let total = 0
    if (op === '+') {
        total = num1 + num2
    } else if (op === '-') {
        total = num1 - num2
    } else if (op === '*') {
        total = num1 * num2
    } else if (op === '/') {
        total = num1 / num2
    }

    let contas = []
    if ('contas' in req.session) {
        contas = req.session.contas
    }

    contas.push({
        num1, num2, op, total
    })

    req.session.contas = contas
    res.redirect('/')
})

app.listen(port, () => console.log('Running...'))