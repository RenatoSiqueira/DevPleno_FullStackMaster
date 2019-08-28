const express = require('express')
const app = express()

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let database

const redis = require('redis')
const redisClient = redis.createClient()

const findDB = (db, collectionName) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collectionName)
        const cursor = collection.find({})
        const data = []
        cursor.forEach(doc => data.push(doc), () => resolve(data))
    })
}

const getCache = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, value) => {
            if (err) {
                reject(err)
            } else
                resolve(value)
        })
    })
}

const setCache = (key, value) => {
    return new Promise((resolve, reject) => {
        redisClient.set(key, value, 'EX', 3600, err => {
            if (err) {
                reject(err)
            } else
                resolve(true)
        })
    })
}

app.get('/', async (req, res) => {
    const value = await getCache('listPessoas')
    if (value) {
        res.send(JSON.parse(value))
        console.log('cache hit')
    } else {
        const data = await findDB(database, 'pessoas')
        setCache('listPessoas', JSON.stringify(data))
        console.log('cache miss')
        res.send(data)
    }
})

MongoClient.connect('mongodb://localhost:27017/intro-mongo', { useNewUrlParser: true }, (err, db) => {
    database = db.db('intro-mongo')
    app.listen(3000, () => console.log('Listening...'))
})