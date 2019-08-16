const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: [String],
        enum: ['restrito', 'admin']
    }
})

UserSchema.pre('save', function (next) {
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

UserSchema.methods.checkPassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if (err) {
                reject(err)
            } else {
                resolve(isMatch)
            }
        })
    })

}

const User = mongoose.model('User', UserSchema)
module.exports = User