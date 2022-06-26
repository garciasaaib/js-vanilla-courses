//se haran peticiones usando los datos que tenga dentro la peticion anterior
/* Reto:
1. Crear una funcion que nos permita traer info desde la api
2. Le pasaremos un callback
3. Hacer el llamado de lo que necesitamos
*/

//instanciamos las peticiones viejas
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
let API = 'https://rickandmortyapi.com/api/character/'

//Funcion de consulta con callback
function fetchData(url_api, callback) {
  //Objeto de consulta
  let xhttp = new XMLHttpRequest()
  //metodo open( metodo get, url, asincrono?)
  xhttp.open('GET', url_api, true) 
  //Escuchando los eventos change del 0 al 4
  xhttp.onreadystatechange = function(event) {
    //verifica si es 4, significa que ha terminado 
    if (xhttp.readyState === 4) { 
      //verifica que se haya terminado con exito
      if(xhttp.status === 200) { 
        //callback( sin error, info en json )
        callback(null, JSON.parse(xhttp.responseText)) 
        //en caso de que no haya sido un 200
      } else { 
        //crea el mensaje de error
        const error = new Error('error '+ url_api)
        //retorna el error en el primer parametro del callback y en el segundo null 
        return callback(error, null) 
      }
    }
  }
  //ahora se envia la peticion
  xhttp.send()
}

//ejecutamos la funcion de peticion para obtener el listado
fetchData(API, function(error1, data1) {
  //si hay un error, termina y nos devuelv el error
  if (error1) return console.error(error1)
  //si no hace otra peticion para obtener la posicion 0
  fetchData(API + data1.results[0].id, function (error2, data2) {
    //si hay un error retorna el error y termina
    if (error2) return console.error(error2)
    // si no hay error hacemos un fetchdata de la locacion de
    fetchData(data2.origin.url, function(error3, data3) {
      if (error3) return console.error(error3)
      console.log(data1.info.count)
      console.log(data2.name)
      console.log(data3.dimension)
      //esto se puede alargar a callback to hell
    })
  })
})