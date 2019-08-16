const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.use((req, res, next) => {
    if ('user' in req.session) {
        res.locals.user = req.session.user
        res.locals.role = req.session.role
    }
    next()
})

router.get('/change-role/:role', (req, res) => {
    if ('user' in req.session) {
        if (req.session.user.role.indexOf(req.params.role) >= 0) {
            req.session.role = req.params.role
        }
    }
    res.redirect('/')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    const isValid = await user.checkPassword(req.body.password)

    if (isValid) {
        req.session.user = user
        req.session.role = user.role[0]
        res.redirect('/restrito/noticias')
    } else {
        res.redirect('/login')
    }

})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router