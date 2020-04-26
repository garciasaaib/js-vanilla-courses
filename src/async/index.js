/**Es preferible usar async a lo demas por su facilidad de interpretacion
 * Recuerda que las peticiones asincronas pueden responderse ahora, luego o nunca
 */


//Esta cosa se va a tardar por lo que trabaja como una peticion a una api
//esto representa a la api
const doSomethingAsync = () => { //crea la funcion
  return new Promise((resolve, reject) => { //la hacemos promesa
    (true) //retornamos las respuestas de una promesa
    ? setTimeout(() => resolve('Do Something Async'),3000) //hacemos que se tarde 
    : reject(new Error('Test Error')) //buena practica de hacer el error
  })
} //listo


//ejecutamos la funcion como asincrona
//esto reprepresenta la peticion a la api
const doSomething = async () => { //declaramos esta arrow function asincrona
  const something = await doSomethingAsync() //decimos que esta es la peticion asincrona, osea que la mandamos al eventloop hasta que retorne algo
  console.log(something) //hasta que retorne algo mandamos a imprimir
} 


//esto representa el flujo de trabajo del eventloop
console.log('Before') //imprimimos
doSomething() //ejecutamos esta funcion pero como es asincrona js la agrega al event loop
console.log('After') //imprimimos




//este es el modo en que hacemos peticiones asincronas teniendo manejando el error
const anotherFunction = async () => { //declara la funcion asincrona
  try { //este funciona como then 
    const something = await doSomethingAsync() //hace la peticion asincrona
    console.log(something) //hace lo que tenga que hacer normalmente
  } catch (error) {
    console.error(error) //maneja el error
  }
}


//esto representa el flujo de trabajo del eventloop
console.log('Before') //imprimimos
anotherFunction() //ejecutamos esta funcion pero como es asincrona js la agrega al event loop
console.log('After') //imprimimos