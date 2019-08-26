require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const port = process.env.port || 3000

const User = require('./models/user')
const mongo = process.env.mongoose || 'mongodb://localhost/minhas-series-rest'

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

mongoose.connect(mongo, { useNewUrlParser: true })
    .then(() => {
        createInitialUsers()
        app.listen(port, () => console.log('Listening...'))
    })
    .catch(e => console.log(e))