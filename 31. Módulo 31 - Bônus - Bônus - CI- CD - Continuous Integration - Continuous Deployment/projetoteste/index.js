const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const pages = require('./controllers/pages')

app.get('/', pages.home)
app.get('/page1', pages.page1)
app.get('/calc/:num1/:num2', pages.calc)

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('CI-CD Test Project - Running...')
  }
})