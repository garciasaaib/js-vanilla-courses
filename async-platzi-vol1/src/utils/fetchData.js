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

Datos recividos por una promesa: resolve y reject

Método recomendando por la comunidad para manejar asincronismo en JavaScript: async await

El estado 4 de xhttp.readyState hace referencia: completed

El método then() retorna: json

La recomendación de la comunidad para anidar callbacks es: maximo 3 callbacks

Expresión la cual pausa la ejecución de la función así­ncrona y espera la resolución de la Promise: then

Nos permite definir una función así­ncrona: async

Para qué utilizamos `JSON.parse(xhttp.responseText)`: xml to objeto inmutable

Nos permite ejecutar una serie de promesas secuencialmente : promise.all()

Las promesas resuelven un principal problema de las callbacks: callback hell

Cómo aseguramos manejar los errores asincrónicos correctamente: try{} catch (err) {}

Cuál es la forma correcta de retornar un Error en reject: reject(new Error('Error'))

Para qué nos sirve el método "catch()" : Registrar la razon del rechazo 

Para qué nos sirve el método XMLHttpRequest: hacer solicitudes http facilmente

 */