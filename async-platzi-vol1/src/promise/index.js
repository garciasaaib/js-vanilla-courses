//con ES6

//constante de que algo va a pasar que contiene una fun
const somethingWillHappen = () => {

  //va a regresar una promesa, que seria solo la sintax para inicializarla
  return new Promise((resolve, reject) => {
    
    //si esto es verdadero que haga un resolve
    if (true) {
      resolve('Hey! esta es la respuesta cuando todo sale bien')
    } else {
      reject('Whoops! reject significa que no se cumplio el if')
    }
  })
}


/**Gracias a que tenemos ya declarada la promesa podemos utilizar dos comandos dentro de nuestra funcion el then, finally y catch */
somethingWillHappen()
  .then(response => console.log(response))
  .catch(err => console.error(err))


//una promise con tiempo declarado para esperar la respuesta
const somethingWillHappen2 = () => {
  // hay que tener cuidado con el nombre de la clase de la promesa
  return new Promise((resolve, reject) => {
    if (true) {

      // de esta manera seteamos el tiempo del timer
      setTimeout(() => {
        resolve('Un timer dentro de una promesa')
      },2000) //tiempo en milisegundos
    } else {
      const error = new Error('Whooop! algo no pasó') //crea el error
      reject(error) //manda el errors
    }
  })
}


//esta promesa retornara lo que tenga que retornar despues de dos segundos como fue declarado en el setTimeout
somethingWillHappen2()
  .then(response => console.log(response)) //lo que se guardo en resolve
  .then(response => console.log('Holo'))
  .catch(err => console.error(err)) //lo que se guardo en reject como error

//correlo desde el package.json



/* Como correr varias promesas al mismo tiempo
 * Promesas encadenadas
 */

Promise.all([ //Se enlistan las promesas dentro de un array
  somethingWillHappen(),
  somethingWillHappen2()
])
  .then(response => {
    //nos dara las respuesta como un array dentro de response
    //antes de ello le podemos dar un nombre
    console.log('Array of results', response)
  })
  .catch(err => {
    console.error(err)
  })