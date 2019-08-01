require('dotenv').config()
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    dialect: 'mysql',
    host: process.env.host
})

const Usuario = sequelize.define('Usuario', {
    usuario: Sequelize.STRING,
    senha: Sequelize.STRING
})

const testDb = async () => {
    await sequelize.sync()
    Usuario.create({
        usuario: 'renato',
        senha: '12345'
    })
    //sequelize.authenticate().then(() => console.log('Connected'))
}

testDb()