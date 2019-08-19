const express = require('express')
const router = express.Router()

const User = require('../models/user')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy


router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

// Definindo a Estrategia Login Local
passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username })
    if (user) {
        const isValid = await user.checkPassword(password)
        if (isValid) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    } else {
        return done(null, false)
    }
}))

passport.use(new FacebookStrategy({
    clientID: '497233807746337',
    clientSecret: '977d03df145b906bb4b1c008bf1489d8',
    callbackURL: 'http://localhost:3000/facebook/callback',
    profileFields: ['id', 'displayName', 'email', 'photos']
}, async (accessToken, refreshToken, profile, done) => {
    const userDB = await User.findOne({ facebookId: profile.id })
    if (!userDB) {
        const user = new User({
            name: profile.displayName,
            facebookId: profile.id,
            role: ['restrito']
        })
        await user.save()
        done(null, user)
    } else {
        done(null, userDB)
    }
}))

router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
        if (!req.session.role) {
            req.session.role = req.user.role[0]
        }
        res.locals.role = req.session.role
    }
    next()
})

router.get('/change-role/:role', (req, res) => {
    if (req.isAuthenticated()) {
        if (req.user.role.indexOf(req.params.role) >= 0) {
            req.session.role = req.params.role
        }
    }
    res.redirect('/')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
}))

router.get('/facebook', passport.authenticate('facebook'))
router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/')
    }
)

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router