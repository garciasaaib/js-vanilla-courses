// se basa en que existe una clase y a partir de esa clase se generan muchas otras diferentes
// en el prototipo las propiedades no se pierden, se sobre escriben solo en el objeto actual pero no en su prototipo heredado

const perro = {
    raza: 'Kilterrier',
    ladrar: function () {
        console.log('wow, soy un '+this.raza)
    }
}

// crea un objeto a partir de un prototipo
const kiltro = Object.create(perro)

kiltro.ladrar() // wow, soy un Kilterrier
kiltro.raza = 'Super perro'
kiltro.ladrar() // wow, soy un Super perro