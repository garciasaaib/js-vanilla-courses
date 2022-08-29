// este es un patron modulo
// una clase un constructor con metodos
// so easy 

const modulo = {
    prop: 'my prop',
    config: {
        lenguaje: 'es',
        cache: true,
    },
    //set new config
    setConfig: conf => {
        modulo.config = conf
    },
    isCacheEnabled: () => {
        console.log(modulo.config.cache ? 'y' : 'n')
    }
}