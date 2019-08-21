const pessoas = require('../models/pessoas')


const index = async (connection, req, res) => {
    const params = {
        pageSize: req.query.pageSize || 10,
        currentPage: req.query.page || 0
    }
    const results = await pessoas.findAll(connection, params)
    res.render('pessoas/index', { results })
}

const deleteOne = async (connection, req, res) => {
    await pessoas.deleteOne(connection, req.params.id)
    res.redirect('/pessoas')
}

const createForm = (req, res) => {
    res.render('pessoas/create')
}

const createProcess = async (connection, req, res) => {
    await pessoas.create(connection, req.body)
    req.redirect('/pessoas')
}

const updateForm = async (connection, req, res) => {
    const pessoa = await pessoas.findById(connection, req.params.id)
    res.render('pessoas/update', { pessoa })
}

const updateProcess = async (connection, req, res) => {
    await pessoas.update(connection, req.params.id, req.body)
    req.redirect('/pessoas')
}

module.exports = {
    index,
    deleteOne,
    createForm,
    createProcess,
    updateForm,
    updateProcess
}