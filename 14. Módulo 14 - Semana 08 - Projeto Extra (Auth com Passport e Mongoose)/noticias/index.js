require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-Session')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise

const { port, mongo } = process.env

const User = require('./models/user')
const Noticia = require('./models/noticia')
const Noticias = require('./routes/noticias')
const Restrito = require('./routes/restrito')
const Auth = require('./routes/auth')
const Pages = require('./routes/pages')
const Admin = require('./routes/admin')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(session({ secret: 'fullstack-master' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/', Auth)
app.use('/', Pages)

app.use('/noticias', Noticias)
app.use('/restrito', Restrito)
app.use('/admin', Admin)

const createInitialUser = async () => {
    const total = await User.count({})
    if (total === 0) {
        const user = new User({
            username: 'user1',
            password: 'teste',
            role: ['restrito', 'admin']
        })
        await user.save()

        const user2 = new User({
            username: 'user2',
            password: 'teste',
            role: ['restrito']
        })
        await user2.save()

        console.log('user created')
    } else {
        console.log('user created skipped')
    }
    /*
    const noticia = new Noticia({
        title: 'Notícia Publica ' + new Date().getTime(),
        content: 'Content',
        category: 'public'
    })
    await noticia.save()
    const noticia2 = new Noticia({
        title: 'Notícia Privada ' + new Date().getTime(),
        content: 'Content',
        category: 'private'
    })
    await noticia2.save()
    */
}

mongoose
    .connect(mongo, { useNewUrlParser: true })
    .then(() => {
        createInitialUser()
        app.listen(port, () => console.log('Running...'))
    })
    .catch(e => console.log(e))

