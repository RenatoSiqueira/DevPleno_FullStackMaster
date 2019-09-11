const express = require('express')
const app = express()
const mongo = require('mongodb') 
const MongoClient = mongo.MongoClient

const port = process.env.PORT || 3000
const mongoURL = process.env.MONGOURL || 'mongodb://localhost/projeto-teste'
let database

app.get('/', (req, res) => {
 res.send(`Fullstack Master Server running...
 <a href="/add">Adicionar item no Mongo</a>
 <a href="/list">Listar itens</a>
 `)
})

app.get('/add', async(req, res) => {
  const items = database.collection('items')
  await items.insert({
    item: 'Random item - number '+Math.ceil(Math.random()*100)
  })
  res.redirect('/')
})
app.get('/list', async(req, res) => {
  const items = database.collection('items')
  const itemsDb = await items.find({}).toArray()
  res.send(itemsDb)
})

MongoClient.connect(mongoURL, (err, db) => {
  if(err){
    console.log(err)
  }else{
    database = db
    app.listen(port, (err) => {
      if(err){
        console.log(err)
      }else{
        console.log('server running...')
        console.log(process.env)
      }
    })
  }
})