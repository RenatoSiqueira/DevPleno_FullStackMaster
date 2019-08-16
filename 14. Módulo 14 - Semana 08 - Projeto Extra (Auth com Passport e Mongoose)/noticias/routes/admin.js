const express = require('express')
const router = express.Router()

const Noticia = require('../models/noticia')

router.use((req, res, next) => {
    if ('user' in req.session) {
        if (req.session.user.role.indexOf('admin') >= 0) {
            return next()
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/login')
    }
})

router.get('/', (req, res) => {
    res.send('admin')
})
router.get('/noticias', async (req, res) => {
    const noticias = await Noticia.find({})
    res.render('noticias/admin', { noticias })
})

module.exports = router