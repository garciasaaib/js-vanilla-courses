const users = [
  { edad: 17, nombre: 'Adrian', apellido: 'Garcia'},
  { edad: 24, nombre: 'Luis', apellido: 'Perez'},
  { edad: 1, nombre: 'Pedro', apellido: 'Ramirez'},
  { edad: 1, nombre: 'Jose', apellido: 'Rodriguez'},
]


// const traePrimerInfante = data => {
//   const infantes = data.filter(x => x.edad < 2)
//   const primerInfante = infantes[0]
//   const infante = {
//     nombreCompleto: `${primerInfante.nombre} ${primerInfante.apellido}`,
//     edad: primerInfante.edad,
//   }
//   return  `${infante.nombreCompleto} tiene ${infante.edad} año(s)`
// }

const traePrimerInfante = data => {
  return toStringInfante(format(head(data.filter(x => x.edad < 2))))
}

const head = list => list[0]

const format = x => ({
  nombreCompleto: `${x.nombre} ${x.apellido}`,
  edad: x.edad,
})

const toStringInfante = (obj) => `${obj.nombreCompleto} tiene ${obj.edad} año(s)`

traePrimerInfante(users)