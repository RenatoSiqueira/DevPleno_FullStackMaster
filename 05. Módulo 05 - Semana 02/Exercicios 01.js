// Exercícios sobre Closure
/*
    1) Qual o resultado da execução deste trecho de código e porquê?

    function test() {  ​   
        console.log(a)   
        console.log(foo())
    
        var a = 1
        function foo() {
            return 2
        }
    }

    test()
*/

undefined
2

/*
    2) Qual o resultado?
    
    var a = 1; 

    function someFunction(number) {
        function otherFunction(input) {
            return a
        }
        a = 5
        return otherFunction;
    }

var firstResult = someFunction(9)
var result = firstResult(2)
*/

5

/*
    3) Qual o resultado? Explique sua resposta.

    var fullname = 'Tulio Faria'
    var obj = {
    fullname: 'Jose Silva',
    prop: {
        fullname: 'Nome Sobrenome',
        getFullname: function() {
            return this.fullname;
        }
    }
    };

    console.log(obj.prop.getFullname())

    var test = obj.prop.getFullname

    console.log(test())
*/

'Nome Sobrenome'
undefined



/*
    4) O que sairá no console neste exemplo a seguir:

    var a = 1
    function b() { 
        a = 10
        return; 
        function a() {} 
    } 
    b()
    console.log(a)
*/

1