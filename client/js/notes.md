a função bind diz para qual contexto uma função apontará

ex: var query = document.funcaoCopiada.bind(document) // Neste caso a função está no escopo de 'document'
ex: var query = document.funcaoCopiada.bind(this) // Neste caso a função está no escopo de 'this'

Spread Operator: Tranforma um array em elementos separados quando passados como parametro em uma função
EX:
var fun = function(el01, el02){
    // do anything
}

var arr = [12, 34];

fun(...arr);

neste caso el01 sera 12 e el02 igual a 34

Arrow Functions: Nova forma de assinar funções
a função:
var fn = function(bar, foo){
    return bar + "ola " + foo;
}

pode se tornar:
var fn = (bar, foo) => bar + "ola " + foo

caso exista um so parametroos parenteses podem ser omitidos, quando apenas uma instrução for feita no corpo da função as chaves e 
a palavra return pode ser omitida, esta instrução sera retornada automaticamente

ARRAY REDUCE
negociacoesModel.negociacoes.reduce(function(total, elemento){
                    return total + elemento.volume;
                }, 0.0)

[1,2].reduce(
    function(totalizadorResultante, elementoAtual, indiceAtual, arrayReduzido){

    }, valorDeInicioParaTotalizador)                

transforma cada elemento de um array e retorna para um totalizador durante as iterações

INICIALIZACAO DE PARAMETROS
argumentos aceitam inicialização com valor padrão
EX:
function(texto="nome"){
    return "ola" + texto
}

HERANCA
é possivel usar heranca em js atraves da palavra reservada extends
e tambem  pode ser usado o metodo super para invocar o construtor da classe base

REFLECTION
devido o escopo de função ser dinamico, o elemento 'this' irá variar de acordo com a função que o chama
entretanto a momentos em que é necessário manter o contexto de um callback para isso pode ser usado o objeto reflection

Reflection.apply(funcaoChamada, contexto, arrayParametros);

neste caso o contexto passado será aplicado na função chamada e esta executará como se pertecesse a esse contexto

CONTEXTO LÉXICO
Arrow FUnctions não possuem o contexto variante como as funções normais, no momento de sua criação elas definem o contexto
e o mantem, ou seja, sua execução em callbacks futuros ainda utilizará o contexto de onde a arrow function foi criada


class Bar{
    constructor(fun){
        this._fun = fun;
    }

    makeAny(){
        this._fun(this); // neste momento os dois this serão iguais e a chamada irá falhar, pois o primeiro this deveria                                         // fazer referencia a funcao que criou 'fun', mas nesse caso esta apontando para a classe 'Bar'
    }
}

class Any(){
    contructor(){
        this._anyElement = new AnyElement();
        this_bar = new bar(function(model){
        this._anyElement.make(model) //esse é o this desejado pois ele tem a referencia para '_anyElement', mas ele se transformará quando                                   //for chamado em Bar
        });
    }
}

class Any(){
    contructor(){
        this._anyElement = new AnyElement();

        //desta forma o contexto se mantem e quando a classe Bar for chamar esta funçao o contexto estara certo
        this_bar = new bar(model =>this._anyElement.make(model));
    }
}