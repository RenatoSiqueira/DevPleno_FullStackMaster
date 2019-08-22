const express = require('express')
const router = express.Router()

const series = [
    { name: 'Friends' },
    { name: 'Breaking Bad' }
]

router.get('/', (req, res) => {
    res.send(series)
})

module.exports = router