const express = require('express')
const sqlite = require('sqlite')
const bodyParser = require('body-parser')
const app = express()

const path = require('path')

const dbConnection = sqlite.open(path.resolve(__dirname, 'banco.sqlite'), { Promise })
const port = process.env.PORT || 3000

app.use('/admin', (req, res, next) => {
    if (req.hostname === 'localhost')
        next()
    else
        res.send('Não Permitido.')
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    const db = await dbConnection
    const categoriasDb = await db.all('select * from categorias;')
    const vagas = await db.all('select * from vagas;')
    const categorias = categoriasDb.map(cat => {
        return {
            ...cat,
            vagas: vagas.filter(vaga => vaga.categoria === cat.id)
        }
    })
    res.render('home', { categorias })
})

app.get('/vaga/:id', async (req, res) => {
    //console.log(req.params.id)
    const db = await dbConnection
    const vaga = await db.get('select * from vagas where id = ' + req.params.id)
    //console.log(vaga)
    res.render('vaga', { vaga })
})

app.get('/admin', (req, res) => {
    res.render('admin/home')
})

app.get('/admin/vagas', async (req, res) => {
    const db = await dbConnection
    const vagas = await db.all('select * from vagas;')
    res.render('admin/vagas', { vagas })
})

app.get('/admin/categorias', async (req, res) => {
    const db = await dbConnection
    const categorias = await db.all('select * from categorias;')
    res.render('admin/categorias', { categorias })
})

app.get('/admin/vagas/delete/:id', async (req, res) => {
    const db = await dbConnection
    await db.run('delete from vagas where id = ' + req.params.id)
    res.redirect('/admin/vagas')
})

app.get('/admin/categorias/delete/:id', async (req, res) => {
    const db = await dbConnection
    await db.run('delete from categorias where id = ' + req.params.id)
    res.redirect('/admin/categorias')
})

app.get('/admin/vagas/nova', async (req, res) => {
    const db = await dbConnection
    const categorias = await db.all('select * from categorias')
    res.render('admin/nova-vaga', { categorias })
})

app.get('/admin/categorias/nova', (req, res) => {
    res.render('admin/nova-categoria')
})

app.get('/admin/vagas/editar/:id', async (req, res) => {
    const db = await dbConnection
    const categorias = await db.all('select * from categorias')
    const vaga = await db.get('select * from vagas where id = ' + req.params.id)
    res.render('admin/editar-vaga', { categorias, vaga })
})

app.get('/admin/categorias/editar/:id', async (req, res) => {
    const db = await dbConnection
    const categoria = await db.get('select * from categorias where id =' + req.params.id)
    res.render('admin/editar-categoria', { categoria })
})

app.post('/admin/vagas/nova', async (req, res) => {
    const db = await dbConnection
    const { titulo, descricao, categoria } = req.body
    await db.run(`insert into vagas (categoria, titulo, descricao) values ('${categoria}', '${titulo}', '${descricao}');`)
    res.redirect('/admin/vagas')
})

app.post('/admin/categorias/nova', async (req, res) => {
    const db = await dbConnection
    const { categoria } = req.body
    await db.run(`insert into categorias (categoria) values ('${categoria}');`)
    res.redirect('/admin/categorias')
})

app.post('/admin/vagas/editar/:id', async (req, res) => {
    const db = await dbConnection
    const { titulo, descricao, categoria } = req.body
    const { id } = req.params
    await db.run(`update vagas set categoria = '${categoria}', titulo = '${titulo}', descricao = '${descricao}' where id = ${id};`)
    res.redirect('/admin/vagas')
})

app.post('/admin/categorias/editar/:id', async (req, res) => {
    const db = await dbConnection
    const { categoria } = req.body
    const { id } = req.params
    await db.run(`update categorias set categoria = '${categoria}' where id = ${id};`)
    res.redirect('/admin/categorias')
})

const init = async () => {
    const db = await dbConnection
    await db.run('create table if not exists categorias(id INTEGER PRIMARY KEY, categoria TEXT);')
    await db.run('create table if not exists vagas(id INTEGER PRIMARY KEY, categoria INTEGER, titulo TEXT, descricao TEXT);')
    //const categoria = 'Marketing Team'
    //await db.run(`insert into categorias (categoria) values ('${categoria}');`)
    //const vaga = 'Fullstack Developer (Remote)'
    //const descricao = 'Vaga para fullstack developer com conhecimentos ninja'
    //await db.run(`insert into vagas (categoria, titulo, descricao) values (1, '${vaga}', '${descricao}');`)
}
init()

app.listen(port, (err) => {
    if (err)
        console.log('Erro ao iniciar o servidor...')
    else
        console.log('Server Started..')
})