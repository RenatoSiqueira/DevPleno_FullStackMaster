const mongoose = require('mongoose')
const CommentSchema = mongoose.Schema({
    comment: String
})
const serieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enumValues: ['to-watch', 'watching', 'watched']
    },
    comments: [CommentSchema]
})

const Serie = mongoose.define('Serie', serieSchema)

module.exports = Serie