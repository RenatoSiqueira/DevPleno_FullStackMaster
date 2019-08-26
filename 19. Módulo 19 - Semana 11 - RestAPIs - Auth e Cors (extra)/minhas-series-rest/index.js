/*

GET /series == retorna todas as séries
POST /series == crio uma nova série
GET /series/id == retorna uma série
DELETE /series/id == excluo uma série
PUT /series/id == altero uma série

*/
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.jwtSecret

const User = require('./models/user')

const port = process.env.port || 3000

const series = require('./routes/series')
const users = require('./routes/users')

const mongo = process.env.mongoose || 'mongodb://localhost/minhas-series-rest'

mongoose.Promise = global.Promise
app.use(bodyParser.json())

app.post('/auth', async (req, res) => {
    const user = req.body
    const userDB = await User.findOne({ username: user.username })
    if (userDB) {
        if (userDB.password === user.password) {
            const payload = {
                id: userDB._id,
                username: userDB.username,
                roles: userDB.roles
            }
            jwt.sign(payload, jwtSecret, (err, token) => {
                res.send({
                    success: true,
                    token: token
                })
            })
        } else {
            res.send({ success: false, message: 'Wrong Credentials' })
        }
    } else {
        res.send({ success: false, message: 'Wrong Credentials' })
    }
})

const createInitialUsers = async () => {
    const total = await User.countDocuments({})
    if (total === 0) {
        const user = new User({
            username: 'renato',
            password: '123',
            roles: ['restrito', 'admin']
        })
        await user.save()

        const user2 = new User({
            username: 'restrito',
            password: '123',
            roles: ['restrito']
        })
        await user2.save()
    }
}

app.use('/series', series)
app.use('/users', users)

mongoose.connect(mongo, { useNewUrlParser: true })
    .then(() => {
        createInitialUsers()
        app.listen(port, () => console.log('Listening...'))
    })
    .catch(e => console.log(e))