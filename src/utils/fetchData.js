//se haran peticiones usando los datos que tenga dentro la peticion anterior
/* Reto:
1. Crear una funcion que nos permita traer info desde la api
2. Le pasaremos un callback
3. Hacer el llamado de lo que necesitamos
*/


// to es6

//instanciamos las peticiones viejas
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
//let API = 'https://rickandmortyapi.com/api/character/'

//Funcion de consulta con promises en es6
const fetchData = (url_api) => {
  //se declara pa promesa
  return new Promise ((resolve, reject) => {
    //crea un objeto con httprequest (porque no estamos trabajando en el navegador sino con el editor de texto)
    const xhttp = new XMLHttpRequest()
    xhttp.open('GET', url_api, true) //peticion
    xhttp.onreadystatechange = (() => { //verifica cada evento de cambio
      if (xhttp.readyState === 4) { //en state 4 se abre el siguiente paso 
        (xhttp.status === 200) //si es un 200 pasa lo siguiente
          //es el resolve de la promesa de arriba
          ? resolve(JSON.parse(xhttp.responseText)) //se retorna la respuesta de la api
          //es el reject de la promesa de arriba
          : reject(new Error('Error', url_api)) //si no es 200 se retorna un error
      }
    })
    //ahora se envia la peticion
    xhttp.send()
  })
}


//node aun usa commun JS por lo que no se puede usar import o export solamente como con babel
module.exports = fetchData

/**
 * Callbacks
Ventajas:
- soportado por cualquier navegador, viejo o nuevo
- Facil de implementar
- Facil de seguir la logica cuando son pocos callbacks
Desventajas
- Complejidad de lectura al callback hell
- Sintaxis tosca
- Dificultad para detectar exepciones 
 * Promises
Ventajas:
- Facilmente enlazables a comparacion del cb
- Permite buen asincronismo
Desventajas:
- No maneja exepciones
- Para manejar el error tienes que declarar en el catch o reject
- Tiene que ser usado una herramienta de compilacion pollifill
 * AsyncAwait
Ventajas: 
- Maneja excepciones
- Facilidad de lectura
- Facilidad de interpretacion por el desarrollador
Desventajas:
- Se tiene que esperar a hacer todo el try para obtener los valores
- Se tiene que usar un pollyfill

 */