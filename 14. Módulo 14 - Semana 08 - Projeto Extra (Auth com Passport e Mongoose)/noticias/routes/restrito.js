const express = require('express')
const router = express.Router()

const Noticia = require('../models/noticia')

router.use((req, res, next) => {
    if ('user' in req.session) {
        if (req.session.user.role.indexOf('restrito') >= 0) {
            return next()
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/login')
    }
})

router.get('/', (req, res) => {
    res.send('Restrito')
})
router.get('/noticias', async (req, res) => {
    const noticias = await Noticia.find({ category: 'private' })
    res.render('noticias/restrito', { noticias })
})

module.exports = router