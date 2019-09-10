const list = (req, res) => {
    res.render('tabuada/list')
}

const tabuada = (req, res) => {

    res.render('tabuada/tabuada', {
        num: req.params.num
    })
}

module.exports = {
    list,
    tabuada
}