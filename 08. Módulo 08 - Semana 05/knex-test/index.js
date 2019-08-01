const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'devpleno',
        database: 'cadastro'
    }
})

const execute = async () => {
    console.log('Kenx Operations')
    /*
    await knex('pessoas').insert({ nome: 'Teste' })
    */

    /*
    const pessoas = await knex('pessoas').select('*')
    console.log(pessoas).where({ id: 1 }).update({ nome: João })
    */

    await knex('pessoas').where({ id: 1 }).del()
}

execute()