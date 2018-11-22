var lineReader = require('line-reader'), Promise = require('bluebird');

var numeroMap = new Map();
var jogosMap = new Map();
var jogos = [];
var repetidos = 0;
var naoRepetidos = 0;

let lerLinha = (line) => {
    let arrayNumerosSort = line.split(",").sort((a,b) => {
      return Number(a) > Number(b) ? 1 : -1;
    });

    jogos.push(arrayNumerosSort.toString());

    if (jogosMap.get(arrayNumerosSort.toString())) {
      jogosMap.set(arrayNumerosSort.toString(), jogosMap.get(arrayNumerosSort.toString()) + 1);
      repetidos++;
    } else {
      jogosMap.set(arrayNumerosSort.toString(), 1);
      naoRepetidos++;
    }

    let arrayNumeros = line.split(",");

    arrayNumeros.forEach(element => {
        let num = Number(element);
        let numero = numeroMap.get(num);
        if (numero) {
            numeroMap.set(num, numeroMap.get(num) + 1);
        } else {
            numeroMap.set(num, 1);
        }
    });
};


function combinacoes(a, b, m, acc, retorno) {
  // acc são os elementos que já fazem parte da combinação
  if ( acc == undefined ) acc = []; // no início, ela começa vazia
  // retorno é a lista de combinações encontradas
  if ( retorno === undefined ) retorno = []; // idem
  if ( m == 0 ) {        // se o número de elementos a serem inseridos chegou a zero
      retorno.push(acc); // coloque a combinação atual na lista
      return retorno;    // e retorne
  }
  if ( a > b )           // se a passou b, não existem mais combinações
      return retorno;    // retorne o que foi achado anteriormente

  // Primeiro fazemos todas as combinações que incluem a
  // i.e. combinamos a com as combinações de tamanho m-1
  combinacoes(a+1, b, m-1, acc.concat([a]), retorno);

  // Depois todas as que não incluem a
  // i.e. ignoramos a, e fazemos as combinações de a+1 pra frente
  return combinacoes(a+1, b, m, acc, retorno);
}


var eachLine = Promise.promisify(lineReader.eachLine);
eachLine('./numeros.csv', function(line) {
    lerLinha(line);
}).then(function() {
  var mapAsc = new Map([...numeroMap.entries()].sort((a, b) => a[1] > b[1] ? -1 : 1));

  console.log('Não repetidos: ', naoRepetidos);
  console.log('Repetidos: ', repetidos);

  let listaChaves = [];
  for (var key of mapAsc.keys()) {
    listaChaves.push(key);
  }

  let _15MaisVotados = [];

  for (let x = 0; x < 15; x++) {
    _15MaisVotados.push(listaChaves[x]);
  }

  let _15PrimeirosNumeros = [];
  for (let x = 0; x < 15; x++) {
    _15PrimeirosNumeros.push(listaChaves[x]);
  }

  let _15UltimosNumeros = [];
  for (let x = (listaChaves.length - 15); x < listaChaves.length; x++) {
    _15UltimosNumeros.push(listaChaves[x]);
  }

  console.log('Todos os números: ', _15MaisVotados.toString());
  console.log('Primeiros números: ', _15PrimeirosNumeros.toString());
  console.log('Últimos números  : ', _15UltimosNumeros.toString());

  let jogo01 = '1,2,3,4,5,7,8,9,10,11,13,15,18,21,24';
  let jogo02 = '2,3,4,6,7,9,12,14,15,17,20,21,23,24,25';
  let jogo03 = '1,2,3,4,6,7,8,9,10,11,13,14,17,21,23';

  _15PrimeirosNumeros.sort((a,b) => a > b ? 1 : -1);
  _15UltimosNumeros.sort((a,b) => a > b ? 1 : -1);

  for ((value) of jogos) {
    if (value === _15PrimeirosNumeros.toString()) {
      console.log(`Jogo ${_15PrimeirosNumeros.toString()} já existe`);
    }
    if (value === _15UltimosNumeros.toString()) {
      console.log(`Jogo ${_15PrimeirosNumeros.toString()} já existe`);
    }
    if (value === jogo01) {
      console.log(`Jogo ${jogo01} já existe`);
    }
    if (value === jogo02) {
      console.log(`Jogo ${jogo02} já existe`);
    }
    if (value === jogo03) {
      console.log(`Jogo ${jogo03} já existe`);
    }
  }

}).catch(function(err) {
  console.error(err);
});