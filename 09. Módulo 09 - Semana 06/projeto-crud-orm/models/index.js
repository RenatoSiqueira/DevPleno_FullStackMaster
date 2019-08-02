const Sequelize = require('sequelize')
const sequelize = new Sequelize('cadastro-orm', process.env.user, process.env.password, {
    dialect: 'mysql',
    host: process.env.host
})

const models = {}
const fs = require('fs')
const path = require('path')

fs
    .readdirSync(__dirname)
    .filter((file) => file !== 'index.js')
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file))
        models[model.name] = model
    })

//const pessoa = sequelize.import('./pessoa.js')

module.exports = {
    sequelize,
    models
}