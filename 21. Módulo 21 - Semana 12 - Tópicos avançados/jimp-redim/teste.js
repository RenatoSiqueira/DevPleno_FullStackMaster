const Jimp = require('Jimp')

Jimp.read('teste.jpg', (err, image) => {
    image
        //.resize(100, 100)
        .cover(50, 100)
        //.greyscale()
        //.contrast(0.5)
        .write('teste-cover-50x100.jpg')
})