const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/vaga', (req, res) => {
    res.render('vaga')
})

app.listen(3000, (err) => {
    if (err)
        console.log('Erro ao iniciar o servidor...')
    else
        console.log('Server Started..')
})