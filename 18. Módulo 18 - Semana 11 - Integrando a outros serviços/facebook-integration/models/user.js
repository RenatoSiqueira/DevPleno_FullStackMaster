const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    facebookId: String,
    accessToken: String,
    name: String
})

const User = mongoose.model('User', UserSchema)
module.exports = User