const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const app = express()

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    let contas = []
    if ('contas' in req.cookies) {
        contas = req.cookies.contas
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
    if ('contas' in req.cookies) {
        contas = req.cookies.contas
    }

    contas.push({
        num1, num2, op, total
    })

    res.cookie('contas', contas, { maxAge: 1000 })
    res.redirect('/')
})

app.listen(port, () => console.log('Running...'))