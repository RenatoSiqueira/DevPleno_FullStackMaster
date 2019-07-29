const express = require('express')
const pessoasController = require('../controllers/pessoas')

const pessoasRouter = ({ connection }) => {
    const router = express.Router()
    router.get('/', pessoasController.index.bind(null, connection))
    return router
}


module.exports = pessoasRouter