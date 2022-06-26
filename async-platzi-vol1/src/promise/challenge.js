
//traemos a fetchDAta para usarlo
const fetchData = require('../utils/fetchData')
const API = 'https://rickandmortyapi.com/api/character/'

/**1 peticion de el numero total de personajes
 * 2 peticion del nombre del primer personaje
 * 3 peticion de la dimension del primer personaje
 */

//esta es la peticion a la api asi como esta
fetchData(API) 
  .then(data => { //cuando la hace nos regresa un objeto data
    console.log(data.info.count) //ese objeto lo desmenusamos en el log
    return fetchData(`${API}${data.results[0].id}`) //retornamos otra peticion + un id
  })
  .then(data => { // este data contendra lo que se retorno en el anterior then, es decir el contenido de la peticion
    console.log(data.name) // de lo obtenido imprime el name
    return fetchData(data.origin.url) //hacemos fetch a una url que se encuentra dentro de data
  })
  .then(data => { //a lo obtenido se le da el nombre de data
    console.log(data.dimension) //y de ello se toma este parametro para imprimirlo
  })
  //recuerda siempre manejar los errores
  .catch(err => console.error(err))