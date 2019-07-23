const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cadastro'
})

const fs = require('fs')
const writable = fs.createWriteStream('pessoas.csv')
writable.write('id,nome\n', () => {
    connection.connect((err) => {
        if (err) {
            console.log('Error on Connect')
        } else {
            const query = connection.query('select * from pessoas')
            query.on('result', row => {
                //console.log(row)
                connection.pause()
                const data = row.id + ',' + row.nome + '\n'

                writable.write(data, () => {
                    connection.resume()
                    //console.log('Written')
                })
            })
            query.on('end', () => {
                writable.end()
                connection.end()
                console.log('Finished')
            })
        }
    })
})
