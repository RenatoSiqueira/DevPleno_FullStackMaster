const UsuarioModel = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        username: DataTypes.STRING,
        senha: DataTypes.STRING,
    })
    return Usuario
}

module.exports = UsuarioModel