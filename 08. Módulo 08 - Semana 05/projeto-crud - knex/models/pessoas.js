const findAll = async (connection) => {
    return await connection('pessoas').select('*')
}

const findById = async (connection, id) => {
    const result = await connection('pessoas')
        .where({ id })
    return result[0]
}

const deleteOne = async (connection, id) => {
    return await connection('pessoas')
        .where({ id })
        .del()
}

const create = async (connection, data) => {
    return await connection('pessoas')
        .insert({ nome: data.nome, nascimento: data.nascimento, cargo: data.cargo })
}

const update = async (connection, id, data) => {
    return await connection('pessoas')
        .update({ nome: data.nome, nascimento: data.nascimento, cargo: data.cargo })
        .where({ id })
}

module.exports = {
    findAll,
    findById,
    deleteOne,
    create,
    update
}