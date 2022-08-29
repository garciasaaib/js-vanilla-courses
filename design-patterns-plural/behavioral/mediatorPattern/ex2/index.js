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
        }
    }

})()

Emitter.on('saludar', ({name}) => console.log(`hola ${name}`))
Emitter.emit('saludar', {name: "adrian"})