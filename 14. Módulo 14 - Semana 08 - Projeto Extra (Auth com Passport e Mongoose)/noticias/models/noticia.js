const mongoose = require('mongoose')
const NoticiaSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String
})

const Noticia = mongoose.model('Noticia', NoticiaSchema)

module.exports = Noticia