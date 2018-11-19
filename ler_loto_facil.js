var lineReader = require('line-reader'), Promise = require('bluebird');

var numeroMap = new Map();

let lerLinha = (line) => {
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



var eachLine = Promise.promisify(lineReader.eachLine);
eachLine('./numeros.csv', function(line) {
    lerLinha(line);
}).then(function() {
  var mapAsc = new Map([...numeroMap.entries()].sort((a, b) => {
    return a[1] > b[1] ? -1 : 1;
  }));

  let listaChaves = [];
  for (var key of mapAsc.keys()) {
    listaChaves.push(key);
  }

  let _15PrimeirosNumeros = [];
  for (let x = 0; x < 15; x++) {
    _15PrimeirosNumeros.push(listaChaves[x]);
  }

  let _15UltimosNumeros = [];
  for (let x = (listaChaves.length - 15); x < listaChaves.length; x++) {
    _15UltimosNumeros.push(listaChaves[x]);
  }

  console.log('Todos os números: ', listaChaves);
  console.log('Primeiros números: ', _15PrimeirosNumeros);
  console.log('Últimos números  : ', _15UltimosNumeros);
}).catch(function(err) {
  console.error(err);
});