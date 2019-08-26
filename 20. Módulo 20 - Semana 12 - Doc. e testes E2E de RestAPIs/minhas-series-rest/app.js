const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.jwtSecret

const User = require('./models/user')

const series = require('./routes/series')
const users = require('./routes/users')

app.use(bodyParser.json())

app.use('/series', series)
app.use('/users', users)

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

module.exports = app