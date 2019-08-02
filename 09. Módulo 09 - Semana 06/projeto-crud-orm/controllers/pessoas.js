const index = async ({ Pessoa }, req, res) => {
    const pessoas = await Pessoa.findAll()
    res.send(pessoas)
}

module.exports = {
    index
}