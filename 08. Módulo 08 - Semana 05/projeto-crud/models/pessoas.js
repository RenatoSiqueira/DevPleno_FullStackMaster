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

module.exports = {
    findAll
}