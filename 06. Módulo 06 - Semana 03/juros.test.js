const juros = require('./juros')

test('Juros Simples', () => {
    const C = 100
    const i = 0.10
    const t = 1
    const jurosEsperados = 10
    const jurosCalculados = juros.jurosSimples(C, i, t)
    expect(jurosCalculados).toBe(jurosEsperados)
})

test('Montante Simples', () => {
    const C = 100
    const i = 0.10
    const t = 1
    const montanteEsperado = 110
    const jurosSimples = jest.fn()
    jurosSimples.mockImplementation(() => 10)
    const montanteSimples = juros.pure.montanteJurosSimples({ jurosSimples })
    const montante = montanteSimples(C, i, t)
    expect(jurosSimples.mock.calls[0]).toEqual([C, i, t])
    expect(montante).toBe(montanteEsperado)
})

test('Montante Juros Compostos', () => {
    const C = 1000
    const i = 0.10
    const t = 1
    const jurosEsperados = 1100
    const jurosCalculados = juros.montanteJurosCompostos(C, i, t)
    expect(jurosCalculados).toBe(jurosEsperados)
})

test('Juros Compostos', () => {
    const C = 1000
    const i = 0.10
    const t = 1
    const montanteJurosCompostos = jest.fn()
    montanteJurosCompostos.mockImplementation(() => 1100)

    const jurosCompostos = juros.pure.jurosCompostos({ montanteJurosCompostos })
    const jurosCalculados = jurosCompostos(C, i, t)

    expect(montanteJurosCompostos.mock.calls[0]).toEqual([C, i, t])
    expect(jurosCalculados).toBe(100)
})