// Callbacks
function sum(num1, num2) {
  return num1 + num2;
}

function calc(num1, num2, callback) {
  return callback(num1, num2)
}

console.log(calc(2,2,sum));

// SetTimeout
setTimeout(() => {
  console.log('Hola JS')
}, 1000)


function saludo(name) {
  console.log(`Hola ${name}`);
}

setTimeout(saludo, 5000, "Adrian");