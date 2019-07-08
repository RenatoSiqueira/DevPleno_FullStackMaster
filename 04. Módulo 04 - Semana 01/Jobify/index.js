const express = require('express')
const sqlite = require('sqlite')
const app = express()

const dbConnection = sqlite.open('banco.sqlite', { Promise })

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', async (req, res) => {
    const db = await dbConnection
    const categorias = await db.all('select * from categorias;')
    console.log(categorias)
    res.render('home', { categorias })
})

app.get('/vaga', (req, res) => {
    res.render('vaga')
})

const init = async () => {
    const db = await dbConnection
    await db.run('create table if not exists categorias(id INTEGER PRIMARY KEY, categoria TEXT);')
    //const categoria = 'Engineering Team'
    //await db.run(`insert into categorias (categoria) values ('${categoria}');`)
}
init()

app.listen(3000, (err) => {
    if (err)
        console.log('Erro ao iniciar o servidor...')
    else
        console.log('Server Started..')
})