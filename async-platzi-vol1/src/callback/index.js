//paso3 corre la funsion sum
function sum(num1, num2) {
  return num1 + num2 //y retorna el resultado
}

//por estandar se usa el tercer parametro como callback
//paso 2 comienza la funcion calc, reciviendo numeros y a sum
function calc(num1, num2, callback) {
  return callback(num1, num2) // esto es equivalente a sum(2,2)
}

//paso 1 corre la funcion calc con estos parametros, uno de ellos es la funcion sum
console.log(calc(2, 2, sum)) //paso 4, imprimir




function date(callback) {
  console.log(new Date) //#2 primer print
  setTimeout(function () {
    let date = new Date
    callback(date)
  }, 3000) //#3 3 segundos
} //#5 fin

function printDate(dateNow) {
  console.log(dateNow) //#4 2do print
}

date(printDate)//#1