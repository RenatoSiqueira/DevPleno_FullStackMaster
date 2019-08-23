require('dotenv').config()
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const FB = require('fb')

mongoose.Promise = global.Promise

const User = require('./models/user')
const port = process.env.PORT || 3000
const { clientID, clientSecret, mongoServer } = process.env

const app = express()
app.use(session({ secret: 'FullStack' }))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'ejs')

passport.serializeUser((user, done) => { done(null, user) })
passport.deserializeUser((user, done) => { done(null, user) })

passport.use(new FacebookStrategy({
    clientID,
    clientSecret,
    callbackURL: 'http://localhost:3000/facebook/callback',
    profileFields: ['id', 'displayName', 'email', 'photos'],
    scope: ['user_friends']
}, async (accessToken, refreshToken, profile, done) => {
    const userDB = await User.findOne({ facebookId: profile.id })
    if (!userDB) {
        const user = new User({
            name: profile.displayName,
            facebookId: profile.id,
            accessToken
        })
        await user.save()
        done(null, user)
    } else {
        done(null, userDB)
    }
}))

app.get('/', (req, res) => { res.render('index') })

app.get('/friends', async (req, res) => {
    if (req.isAuthenticated()) {
        FB.setAccessToken(req.user.accessToken)
        FB.options({ version: 'v2.4' })
        const results = await FB.api('me/friends?fields=name,picture', 'get')
        res.render('friends', { results })
    } else {
        res.redirect('/facebook')
    }
})

app.get('/facebook', passport.authenticate('facebook'))
app.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => { res.redirect('/') }
)

mongoose.connect(mongoServer, { useNewUrlParser: true }).then(() => {
    app.listen(port, () => console.log('Running...'))
})
