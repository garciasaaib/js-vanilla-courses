const fetchData = require('../utils/fetchData')
//si algo nunca va a cambiar en la vida se pone con letras mayusculas
const API = 'https://rickandmortyapi.com/api/character/'


/**
 * 1 pedir el numero total de personajes
 * 2 pedir el nombre del primer personaje en la posicion 0
 * 3 pedir la dimension de ese personaje mediante la direccion de la api
 */

const anotherFunction = async (url_api) => { //declaramos la funcion como asincrona
  //todas las peticiones dentro de try y catch son tomadas como then por lo que se inician una vez terminado la anterior
  try { //usamos try catch para el manejo de respuestas, cada linea es manejada como un then 
    const data = await fetchData(url_api) //primera peticion o then
    const character = await fetchData(`${url_api}${data.results[0].id}`) //segunda peticion o dhen, usa la data de la anterior
    const origin = await fetchData(character.origin.url) //tercera peticion, usa la data de la anterior

    console.log(data.info.count)
    console.log(character.name)
    console.log(origin.dimension)
  } catch(error) { //si obtuvieramos un error eso seria lo que regresara
    console.error(error)
  }
}

console.log('Before')
anotherFunction(API) //esto se reflejara en consola hasta el ultimo, y muestra todo junto una vez termina
console.log('After')