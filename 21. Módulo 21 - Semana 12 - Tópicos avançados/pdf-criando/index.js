const PdfPrinter = require('pdfmake')

const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Bold.ttf',
        italics: 'fonts/Roboto-BlackItalic.ttf'
    }
}


const express = require('express')
const app = express()

const lines = []
lines.push(
    [
        { text: 'Nome', style: 'header' },
        { text: 'Email', style: 'header' },
        { text: 'Situação', style: 'header' }
    ]
)

for (let i = 0; i < 300; i++) {
    let ativo = 'Ativo'
    if (i % 2 === 0) {
        ativo = { text: 'Inativo', style: 'inativo' }
    }
    lines.push(['Renato Siqueira', 'Teste@email.com', ativo])
}

const printer = new PdfPrinter(fonts)
const docDefinition = {
    content: [
        {
            image: 'images/logo.png',
            fit: [80, 100]
        },
        { text: 'FullStack Master' },
        {
            table: {
                widths: ['*', '*', 100],
                body: lines
            }
        }
    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true
        },
        inativo: {
            fontSize: 18,
            bold: true
        }
    },
    footer: (page, pages) => {
        return {
            columns: [
                'Este documento é parte integrante do FullStack Master', {
                    alignment: 'rigth',
                    text: [
                        { text: page.toString(), italics: true },
                        ' de ',
                        { text: pages.toString(), italics: true },
                    ]
                }
            ],
            margin: [40, 0]
        }
    }
}

app.get('/get/:name', (req, res) => {
    const pdf = printer.createPdfKitDocument({
        content: 'Olá ' + req.params.name
    })
    // inline: show in the browser
    // attachment: download the pdf file
    res.header('Content-disposition', 'attachment; filename=meu-pdf.pdf')
    res.header('Content-type', 'application/pdf')
    pdf.pipe(res)
    pdf.end()
})

/*
const pdf = printer.createPdfKitDocument(docDefinition)
const fs = require('fs')

pdf.pipe(fs.createWriteStream('doc.pdf'))
pdf.end()
*/

app.listen(3000, () => console.log('Running...'))