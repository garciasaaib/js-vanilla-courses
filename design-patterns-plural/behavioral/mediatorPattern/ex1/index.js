// Es un objeto que define como otros objetos van a interactuar
// Redux implementa el mediador
const mediator = () => {
    // lista de eventos
    const events = {}

    // agrega un evento a la lista si no existe
    const subscribe = (event, fn) => {
        if (!events[event]) {
            events[event] = []
        }
        events[event].push(fn)
    }

    const dispatch = function (event, payload) {
        if (!events[event]) {
            return false
        }
        events[event].forEach(fn => fn(payload))
    }

    return {
        subscribe,
        dispatch
    }
}


mediador.subscribe('login', ({username, password}) => {
    // inicio de sesion
    console.log('Welcome ' + username)
})

mediador.dispatch('login', {username: "adrian", password: "123456"})


/** diferencias entre mediador y observador
    el mediador necesita un objeto a parte para manejar las comunicaciones de todos los objetos
    el observador modifica el objeto que va a escuchar
 */