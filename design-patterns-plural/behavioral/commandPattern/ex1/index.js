const Commander = (() => {
    // hidden methods
    const o = {
        comprar: x => {
            console.log(`Comprando ${x}`)
        },
        vender: x => {
            console.log(`Vendiendo ${x}`)
        },
    }

    // visible methods
    return {
        run: (comando, argumentos) => {
            if (!o[comando]) {
                console.log('este comando no existe')
                return
            }
            o[comando](argumentos)
        
        }

    }
})()

Commander.run('vender','pizza')
Commander.run('comprar','piña')
Commander.run('robar','piña')