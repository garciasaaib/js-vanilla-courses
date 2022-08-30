const Emitter = (() => {
    // lista de eventos
    const topics = {}

    // funcion para veridicar que no existe el evento
    const hOP = topics.hasOwnProperty

    return {
        // si no existe el topic, agrega su key, le da el valor [] y luego agrega su funcion al array
        on: (topic, listener) => {
            // call(contexto, parametros)
            if (!hOP.call(topics, topic)) topics[topic] = [] 
            topics[topic].push(listener)
        },

        // si no existe el topic sale de la funcion
        // si existe ejecuta cada uno de las funciones de su array
        // mandandole los parametros si es que los mandan
        emit: (topic, params) => {
            if (!hOP.call(topics, topic)) return
            topics[topic].forEach(item =>
                item(params != undefined ? params : {})
            );
        },

        // retornar el listado de metodos no es buena practica
        // pero para que lo veas
        topics
    }

})()

Emitter.on('saludar', ({name}) => console.log(`hola ${name}`))
Emitter.on('grettings', ({name}) => console.log(`grettings ${name}`))
Emitter.on('aloha', ({name}) => console.log(`aloha ${name}`))
Emitter.on('konishiwa', ({name}) => console.log(`konishiwa ${name}`))
Emitter.emit('saludar', {name: "adrian"})

console.log(Emitter.topics);