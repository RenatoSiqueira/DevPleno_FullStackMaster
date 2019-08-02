const PessoaModel = (sequelize, DataTypes) => {
    const Pessoa = sequelize.define('Pessoa', {
        nome: DataTypes.STRING,
        cargo: DataTypes.STRING
    })
    return Pessoa
}

module.exports = PessoaModel