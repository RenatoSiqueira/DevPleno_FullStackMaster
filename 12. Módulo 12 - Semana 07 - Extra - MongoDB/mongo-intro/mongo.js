const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

MongoClient.connect('mongodb://localhost:27017/intro-mongo', (err, db) => {
    const pessoas = db.collection('pessoas')

    pessoas.insert({
        nome: 'Renato',
        nascimento: '1981-06-15'
    }, (err, res) => {
        console.log(err, res)
    })

    const cursorPessoas = pessoas.find({})
    cursorPessoas.forEach(doc => {
        console.log(doc)
    }, () => console.log('Fim'))

    pessoas.update(
        {
            _id: mongodb.ObjectID('id')
        }, {
            $set: { nome: 'Renato Ely Siqueira' }
        },
        (err, res) => console.log(err))

    pessoas.remove({
        id: mongodb.ObjectID('id')
    }, (err, res) => console.log(err))

})