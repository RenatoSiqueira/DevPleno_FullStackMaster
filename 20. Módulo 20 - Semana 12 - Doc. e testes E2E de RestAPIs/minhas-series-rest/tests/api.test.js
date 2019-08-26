require('dotenv').config()
const request = require('supertest')
const app = require('../app')
const expect = require('chai').expect

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const mongo = process.env.mongoTest

const User = require('../models/user')
const Serie = require('../models/serie')

describe('Testing RestAPI', () => {

    before('connecting to mongodb', async () => {
        await mongoose.connect(mongo, { useNewUrlParser: true })
        await User.deleteMany({})
        const user = new User({
            username: 'Teste',
            password: '1234',
            roles: ['restrito']
        })
        await user.save()

        await Serie.deleteMany({})
        return true
    })

    it('Should return error', done => {
        request(app)
            .get('/series')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(err).be.null
                expect(res.body.success).be.false
                done()
            })
    })

    it('Should auth an user', done => {
        request(app)
            .post('/auth')
            .send({ username: 'renato', password: '123' })
            .expect(200)
            .end((err, res) => {
                console.log(res.body)
                expect(res.body.success).be.true
                expect(res.body.token).be.string
                done()
            })
    })

    it('Should auth not an user', done => {
        request(app)
            .post('/auth')
            .send({ username: 'invalidUser', password: 'test' })
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).be.false
                expect(res.body.token).be.string
                done()
            })
    })

    describe('auth as restrito', () => {
        let token = ''
        before('get token', (done) => {
            request(app)
                .post('/auth')
                .send({ username: 'renato', password: '123' })
                .end((err, res) => {
                    token = res.body.token
                    done()
                })
        })

        it('should return no series', (done) => {
            request(app)
                .get('/series')
                .set('x-access-token', token)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).be.empty
                    done()
                })
        })

        it('should create a new series', (done) => {
            request(app)
                .post('/series')
                .set('x-access-token', token)
                .send({ name: 'minha serie', status: 'to-watch' })
                .expect(200)
                .end((err, res) => {
                    expect(res.body._id).be.string
                    done()
                })
        })
    })
})