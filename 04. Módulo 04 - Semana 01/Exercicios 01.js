/* 
    1) Dado um vetor de números, como poderia ser realizada a soma de todos os valores utilizando reduce.
*/
const vetor = [1, 2, 3, 4, 5]
const somar = (acc, valor) => acc + valor
const somaReduce = vetor.reduce(somar, 0)
console.log(somaReduce)

/*
    2) Dado um vetor de números, como poderia ser realizada a soma de todos os valores 
    pares utilizando reduce e filter.
*/
const ehPar = item => item % 2 === 0
const somaParesReduce = vetor.filter(ehPar).reduce(somar, 0)
console.log(somaParesReduce)

/*
    3) Dado um vetor de números, como poderia ser realizada a soma de todos os valores 
    ímpares utilizando reduce e filter.
*/
const ehImpar = item => item % 2 !== 0
const somaImparesReduce = vetor.filter(ehImpar).reduce(somar, 0)
console.log(somaImparesReduce)

/*
    4) Dado um vetor de valores, retorne um objeto com quantas vezes cada valor está 
    presente no vetor (dica: utilize reduce)
*/
const vetor2 = [1, 2, 3, 4, 2, 1, 3, 2, 1, 'renato']
const qtasVezes = (agg, val) => {
    if (!agg[val]) {
        agg[val] = 0
    }
    agg[val] = agg[val] + 1
    return agg
}
const times = vetor2.reduce(qtasVezes, {})
console.log(times)


/*
    5) Dado um vetor de valores, retorne um vetor com somente os valores únicos do vetor 
    (aqueles que ocorrem apenas 1 vez dentro do vetor) 
    Dica 1: utilize reduce, filter e keys, 
    Dica 2: escreva console.log(Object.keys()) e veja como ele poderá te ajudar neste exercício)
*/
const vetor3 = [1, 2, 2, 3, 4, 5, 5]
const howManyTimes = (agg, val) => {
    if (!agg[val]) {
        agg[val] = 0
    }
    agg[val] = agg[val] + 1
    return agg
}
const contagem = vetor3.reduce(howManyTimes, {})
const keys = Object.keys(contagem)
const unique = keys.filter(key => contagem[key] === 1)
console.log(unique)

/*
    6) Dado um vetor com números, retorne somente os números pares;
*/
const somentePares = vetor.filter(ehPar)
console.log('Somente Pares', somentePares)

/*
    7) Dado um vetor com números, retorne somente os números ímpares;
*/
const somenteImpares = vetor.filter(ehImpar)
console.log('Somente Pares', somenteImpares)

/*
    8) Uma função é chamada da seguinte forma:
    calculadora(10, '+', 20)
    crie o corpo da função de forma que ela realize as 4 operações aritméticas
*/
const calculadora = (valorA, tipo, valorB) => {
    let result
    if (tipo === '+') result = valorA + valorB
    if (tipo === '-') result = valorA - valorB
    if (tipo === '*') result = valorA * valorB
    if (tipo === '/') result = valorA / valorB
    return result
}
console.log(calculadora(10, '+', 20))


/*
    9) Modifique a calculadora do exercício anterior para que ela receba 2 números 
    e uma função, e realize o cálculo. Exemplo:
    const soma = (num1, num2) => num1+num2
    const calculadoraFn = (....) => ….
    calculadoraFn(10, soma, 20)
*/
const soma = (num1, num2) => num1 + num2
const subtracao = (num1, num2) => num1 - num2
const multiplicacao = (num1, num2) => num1 * num2
const divisao = (num1, num2) => num1 / num2

const calculadoraFn = (valorA, operacao, valorB) => operacao(valorA, valorB)
console.log(calculadoraFn(10, soma, 20))