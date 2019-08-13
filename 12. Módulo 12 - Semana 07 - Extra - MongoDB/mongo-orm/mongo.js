const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose
    .connect('mongodb://localhost/mongo-orm', { useMongoClient: true })
    .then(() => {
        const PessoaSchema = mongoose.Schema({
            nome: String,
            cargo: String
        })
        const Pessoa = mongoose.model('Pessoa', PessoaSchema)
        const renato = new Pessoa({ nome: 'Renato Siqueira', cargo: 'CEO' })
        renato.save(() => console.log('Salvo'))

        Pessoa.find({}, (err, docs) => {
            console.log(docs)
        })

        Pessoa.remove({
            _id: 'id'
        }, (err, res) => console.log('ok'))
    })