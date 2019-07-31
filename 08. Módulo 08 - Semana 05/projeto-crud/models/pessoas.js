const findAll = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query('select * from pessoas', (err, results) => {
            if (err)
                reject(err)
            else
                resolve(results)
        })
    })
}

const deleteOne = (connection, id) => {
    return new Promise((resolve, reject) => {
        connection.query('delete from pessoas where id =' + id + ' limit 1', (err) => {
            if (err)
                reject(err)
            else
                resolve()
        })
    })
}

const create = (connection, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`insert into pessoas (nome, nascimento, cargo) values ('${data.nome}', '${data.nascimento}', '${data.cargo}')`, (err) => {
            if (err)
                reject(err)
            else
                resolve()
        })
    })
}

module.exports = {
    findAll,
    deleteOne,
    create
}