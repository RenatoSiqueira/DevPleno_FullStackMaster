require('dotenv').config()
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    dialect: 'mysql',
    host: process.env.host
})

const Pessoa = sequelize.define('Pessoa', {
    nome: Sequelize.STRING,
    nascimento: Sequelize.DATE
})

const Usuario = sequelize.define('Usuario', {
    usuario: Sequelize.STRING,
    senha: Sequelize.STRING
})

const Projeto = sequelize.define('Projeto', {
    nome: sequelize.STRING
})

Pessoa.hasOne(Usuario)
Usuario.belongsTo(Pessoa)
Pessoa.hasMany(Projeto)
Projeto.belongsTo(Pessoa)

const testDb = async () => {
    await sequelize.sync({ force: true })
    const pessoa = await Pessoa.create({
        nome: 'Renato',
        nascimento: '1981-01-01'
    })
    const user = Usuario.create({
        usuario: 'renato',
        senha: '12345'
    })
    user.setPessoa(pessoa)
    //sequelize.authenticate().then(() => console.log('Connected'))
}

testDb()