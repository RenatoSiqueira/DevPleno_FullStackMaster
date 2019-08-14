const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userShema.pre('save', function (next) {
    const user = this

    if (!user.isModified('password')) {
        return next()
    }

    bcrypt.genSalt((err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash
            next()
        })
    })
})

const User = mongoose.model('User', userShema)
module.exports = User